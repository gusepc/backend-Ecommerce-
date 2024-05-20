import UserManager from "../dao/mongo/classes/user.dao.js";

const userManager = new UserManager();

function findById(uid) {
  return userManager.findById(uid);
}
function findByIdAndUpdate(uid, update) {
  return userManager.findByIdAndUpdate(uid, update);
}
function findOne(user) {
  return userManager.findOne(user);
}
export default {
  findById,
  findByIdAndUpdate,
  findOne,
};
