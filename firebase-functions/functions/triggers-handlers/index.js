const { db } = require("../util/admin");

exports.createNotificationOnLike = snapshot => {
  return db
    .doc(`/posts/${snapshot.data().postId}`)
    .get()
    .then(doc => {
      if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: "like",
          read: false,
          postId: doc.id
        });
      }
    })
    .catch(err => console.error(err));
};

exports.deleteNotificationOnUnLike = snapshot => {
  return db
    .doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch(err => {
      console.error(err);
      return;
    });
};

exports.createNotificationOnComment = snapshot => {
  return db
    .doc(`/posts/${snapshot.data().postId}`)
    .get()
    .then(doc => {
      if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: "comment",
          read: false,
          postId: doc.id
        });
      }
    })
    .catch(err => {
      console.error(err);
      return;
    });
};

exports.onUserImageChange = change => {
  console.log(change.before.data());
  console.log(change.after.data());
  if (change.before.data().imageUrl !== change.after.data().imageUrl) {
    console.log("image has changed");
    const batch = db.batch();
    return db
      .collection("posts")
      .where("userHandle", "==", change.before.data().handle)
      .get()
      .then(data => {
        data.forEach(doc => {
          const post = db.doc(`/posts/${doc.id}`);
          batch.update(post, { userImage: change.after.data().imageUrl });
        });
        return batch.commit();
      });
  } else return true;
};

exports.onPostDelete = (snapshot, context) => {
  const postId = context.params.postId;
  const batch = db.batch();
  return db
    .collection("comments")
    .where("postId", "==", postId)
    .get()
    .then(data => {
      data.forEach(doc => {
        batch.delete(db.doc(`/comments/${doc.id}`));
      });
      return db
        .collection("likes")
        .where("postId", "==", postId)
        .get();
    })
    .then(data => {
      data.forEach(doc => {
        batch.delete(db.doc(`/likes/${doc.id}`));
      });
      return db
        .collection("notifications")
        .where("postId", "==", postId)
        .get();
    })
    .then(data => {
      data.forEach(doc => {
        batch.delete(db.doc(`/notifications/${doc.id}`));
      });
      return batch.commit();
    })
    .catch(err => console.error(err));
};
