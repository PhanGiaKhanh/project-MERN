const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
// users: tên của table DB
module.exports = mongoose.model("users", UserSchema);
