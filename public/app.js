let app = null;
let db = null;
let myPost = null;

document.addEventListener('DOMContentLoaded', event=> {
  app = firebase.app(0);
  db = firebase.firestore();
  if (location.hostname === "localhost") {
    db.useEmulator("localhost", 8080);
  }
  myPost = db.collection('posts').doc('firstpost');
  myPost.get().then(doc => {
    const data = doc.data();
    console.log(data);
    // document.write(data.title + '<br>');
  });
  myPost.onSnapshot(doc => {
    const data = doc.data();
    // document.write(data.title + '<br>');
    console.log(data.title);
  });

  getPostsList();
});

function getPostsList() {
  const postsListRefs = db.collection('posts');
  const query = postsListRefs.where('price', '>', 10);
  // postsListRefs.orderBy('price', '==', 5).limit(10);
  query.get().then(posts => {
    posts.forEach(p => {
      const data = p.data();
      console.log(`Title: ${data.title}, price: ${data.price}`);
    });
  });
}

/**
 * update an existing post's title
 */
function updatePost(e) {
  /*
  const db = firebase.firestore();
  if (location.hostname === 'localhost') {
    db.useEmulator('localhost', 8080);
  }
  const myPost = db.collection('posts').doc('firstpost');
  */
  myPost.update({ title: e.target.value });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
      console.log(user);
    })
    .catch(e => {
      console.log(e);
    });
}