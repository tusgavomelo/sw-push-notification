var utils = {

	// converts base64 string to unit8 array
	urlBase64ToUint8Array: function(base64String) {
	  const padding = '='.repeat((4 - base64String.length % 4) % 4);
	  const base64 = (base64String + padding)
	    .replace(/\-/g, '+')
	    .replace(/_/g, '/');

	  const rawData = window.atob(base64);
	  const outputArray = new Uint8Array(rawData.length);

	  for (let i = 0; i < rawData.length; ++i) {
	    outputArray[i] = rawData.charCodeAt(i);
	  }
	  return outputArray;
	},

	// toggle form field and button state
	updateForm: function(isSubscribed) {
		var inputNome = document.querySelector('input[name="name"]');
		var inputSubmit = document.querySelector('input[type="submit"]');
		if (isSubscribed) {
			inputNome.disabled = true;
			inputSubmit.value = 'Disable notifications';
		}
		else {
			inputNome.disabled = false;
			inputNome.value = '';
			inputSubmit.value = 'Enable notifications';
		}
	},

	// requests to push-sender api
	apiRequest: function(endpoint, body = {}, method = 'get') {
		var url = 'http://localhost:3000' + endpoint
		var headers = new Headers({
			'Content-Type': 'application/json'
		});

		return fetch(url, { method: method, headers: headers, body: body })
		.then(function(response) {
			return response.json();
		})
		.catch(function (err) {
			console.log('can`t request push-sender api', err);
		})
	}
 }