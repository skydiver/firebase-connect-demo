const firebase = require('firebase');

class Firebase {
  constructor(config, path = '/', anon = false) {
    this.app = firebase.initializeApp(config);
    if (anon) {
      this.signInAnonymously();
    }
    this.db = firebase.database();
    this.ref = this.db.ref(path);
  }

  async read(param) {
    const paramRef = this.ref.child(param);
    const response = await paramRef.once('value');
    return response.val();
  }

  async store(param, value) {
    const paramRef = this.ref.child(param);
    await paramRef.set(value);
  }

  async remove(param) {
    const paramRef = this.ref.child(param);
    paramRef.remove();
  }

  async signInAnonymously() {
    await this.app.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log({
        errorCode,
        errorMessage
      });
    });
  }

  async close() {
    await this.db.goOffline();
    await this.app.auth().signOut();
    await this.app.delete();
  }
}

module.exports = Firebase;