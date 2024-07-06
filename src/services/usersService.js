import UserManager from "../dao/mongo/classes/user.dao.js";

const userManager = new UserManager();

function find() {
  return userManager.find();
}
function findById(uid) {
  return userManager.findById(uid);
}
function findByIdAndUpdate(uid, update) {
  return userManager.findByIdAndUpdate(uid, update);
}
function findOne(user) {
  return userManager.findOne(user);
}
function findByIdAndDelete(uid) {
  return userManager.findByIdAndDelete(uid);
}
export default {
  findById,
  findByIdAndUpdate,
  findOne,
  find,
  findByIdAndDelete,
};
