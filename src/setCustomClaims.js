const admin = require('firebase-admin');

const serviceAccount = require('./path-to-your-firebase-adminsdk-json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


admin.auth().getUserByEmail('friend1@example.com')
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      accessGranted: true
    });
  })
  .then(() => {
    console.log('Custom claims set for friend1@example.com');
  })
  .catch((error) => {
    console.log(error);
  });

// Repeat for other users as needed
