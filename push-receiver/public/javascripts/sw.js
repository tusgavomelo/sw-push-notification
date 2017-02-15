self.addEventListener('push', function(event) {
  console.log('[service worker] push received');

  const title = 'It works';
  const options = {
    body: event.data.text(),
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});