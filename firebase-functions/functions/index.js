const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const cors = require("cors");
app.use(cors());

const {
  getAllPosts,
  addOnePost,
  getPost,
  commentOnPost,
  likePost,
  unlikePost,
  deletePost
} = require("./api-handlers/posts");

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
} = require("./api-handlers/users");

const {
  createNotificationOnLike,
  deleteNotificationOnUnLike,
  createNotificationOnComment,
  onUserImageChange,
  onPostDelete
} = require("./triggers-handlers");

// Posts routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, addOnePost);
app.get("/post/:postId", getPost);
app.delete("/post/:postId", FBAuth, deletePost);
app.get("/post/:postId/like", FBAuth, likePost);
app.get("/post/:postId/unlike", FBAuth, unlikePost);
app.post("/post/:postId/comment", FBAuth, commentOnPost);

// Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

// the API function
exports.api = functions.https.onRequest(app);

// background triggers functions

exports.createNotificationOnLike = functions.firestore
  .document("likes/{id}")
  .onCreate(createNotificationOnLike);

exports.deleteNotificationOnUnLike = functions.firestore
  .document("likes/{id}")
  .onDelete(deleteNotificationOnUnLike);

exports.createNotificationOnComment = functions.firestore
  .document("comments/{id}")
  .onCreate(createNotificationOnComment);

exports.onUserImageChange = functions.firestore
  .document("/users/{userId}")
  .onUpdate(onUserImageChange);

exports.onPostDelete = functions.firestore
  .document("/posts/{postId}")
  .onDelete(onPostDelete);
