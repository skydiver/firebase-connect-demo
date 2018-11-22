const firebase = require('firebase');

class Firebase {
  constructor(config, path = '/') {
    firebase.initializeApp(config);
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

  async close() {
    await this.db.goOffline();
  }
}

module.exports = Firebase;