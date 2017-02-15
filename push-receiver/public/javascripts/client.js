var serverPublicKey;
var swRegister;
var isSubscribed;

document.addEventListener('DOMContentLoaded', function() {
	utils.apiRequest('/public-key')
	.then(function(json) {
		serverPublicKey = utils.urlBase64ToUint8Array(json.key);
		registerServiceWorker();
	})
});


function registerServiceWorker() {
	navigator.serviceWorker.register('/javascripts/sw.js')
	.then(function(register) {
		console.log('service worker registered', register);
		swRegister = register;

		initApp();
	});
}

function initApp() {
	setInitialState();
	bindForm();
}

function setInitialState() {
	swRegister.pushManager.getSubscription()
	.then(function (subscription) {
		isSubscribed = subscription !== null;
		utils.updateForm(isSubscribed);
	})
}

function bindForm() {
	var form = document.querySelector('#toggle-subscription');
	form.addEventListener('submit', function(e) {
		e.preventDefault();

		var userName = this.querySelector(':scope input[name="name"]').value;

		if (!isSubscribed) {
			subscribe(userName).then(function() {
				isSubscribed = true;
				utils.updateForm(isSubscribed);
			});
		} else {
			unsubscribe().then(function() {
				isSubscribed = false;
				utils.updateForm(isSubscribed);
			});
		}
	});
}

function subscribe(userName) {
	var subscribeOptions = {
  	userVisibleOnly: true,
  	applicationServerKey: serverPublicKey
	}

	return swRegister.pushManager.subscribe(subscribeOptions)
	.then(function(subscription) {
		console.log('user subscribed', subscription);
		return subscription;
	})
	.then(function(subscription) {
		var payload = {
			name: userName,
			subscription: JSON.stringify(subscription)
		}

		return utils.apiRequest('/user/subscribe', JSON.stringify(payload), 'post');
	});
}

function unsubscribe() {
	return swRegister.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
    	console.log('user unsubscribed', subscription);
    	subscription.unsubscribe();
  		var payload = {
  	  	subscription: JSON.stringify(subscription)
  	  }

  	  return utils.apiRequest('/user/subscribe', JSON.stringify(payload), 'delete');
    }
  })
}