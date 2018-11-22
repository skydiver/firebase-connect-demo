const Firebase = require('./lib/firebase');

const config = require('./firebase-config');
const firebaseConnection = new Firebase(config);

(async () => {
  // Save to database
  await firebaseConnection.store('random', Math.random());

  // Read from database
  const random = await firebaseConnection.read('random');
  console.log(random);

  // Close connection
  await firebaseConnection.close();
})();