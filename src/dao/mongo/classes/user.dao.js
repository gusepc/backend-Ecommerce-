import userModel from "../models/usser.model.js";

class UserManager {
  constructor() {}
  async crate(user) {
    try {
      return await userModel.create(user);
    } catch (error) {}
  }
  async findOne(user) {
    try {
      return await userModel.findOne(user);
    } catch (error) {}
  }
  async findById(uid) {
    try {
      return await userModel.findById(uid);
    } catch (error) {}
  }
  async findByIdAndUpdate(uid, update) {
    return await userModel.findByIdAndUpdate(uid, update, { new: true });
  }
}

export default UserManager;
