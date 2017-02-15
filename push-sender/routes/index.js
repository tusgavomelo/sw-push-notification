var express = require('express');
var router = express.Router();
var webpush = require('web-push');

router.get('/', function(req, res, next) {
  var db = req.app.get('database');
  db.collection('subscriptions').find().toArray(function(err, results) {
    if (err) return console.log(err)
    res.render('index', { subscriptions: results });
  });
});

router.get('/public-key', function(req, res, next) {
	var publicKey = req.app.get('server-keys').publicKey;
  res.json({ key: publicKey });
});

router.post('/user/subscribe', function(req, res, next) {
	var subscription = req.body;
	var db = req.app.get('database');
	db.collection('subscriptions').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
  	res.json({ status: 'created' });
  });
});

router.delete('/user/subscribe', function(req, res, next) {
	var db = req.app.get('database');
  console.log(req.body);
	db.collection('subscriptions').findOneAndDelete({subscription: req.body.subscription}, function(err, result) {
		if (err) return res.send(500, err)
  	res.json({ status: 'deleted' });
  });
});

router.post('/push', function(req, res, next) {
  var subscription = JSON.parse(req.body.subscription);
  var vapidKeys = req.app.get('server-keys');

  webpush.setGCMAPIKey('AIzaSyDVB8yOxKBfyrCn7ajKstqB7NiAhQ02Swk');
  webpush.setVapidDetails(
    'mailto:gcastromelo94@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  console.log(subscription.endpoint);

  webpush.sendNotification(subscription, 'Hello from the other server');

  res.redirect('/');
});

module.exports = router;
