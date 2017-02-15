#### Simple notification system between 2 servers example
I've made this when I was learning how to use service workers

##### You must have
 - node
 - google chrome version >= 42
 - access to the internet, because the database isn't locally here

##### How to run it
 - clone this repo
 - run `npm install` on both `push-receiver` and `push-sender` directories
 - run `npm start` on both `push-receiver` and `push-sender` directories
 - on your browser, access `http://localhost:3000` (push-sender)
 - and `http://localhost:4000` (push-receiver)
 - on the push-receiver, input your name on the field and press `Enable notifications`
 - now go to push-sender and see your name there. Click on `push`
 - a notification should appear, that's it 😁