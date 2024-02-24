const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

/*
{
    name: '',
    email: '',
    password: '',
    confirm: '',
}
*/

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
      },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true,
      }, 
    packages: [{ type: Schema.Types.ObjectId, ref: "Package" }],
    // salt: {
    //   type: String,
    //   required: true,
    // },
    // iterations: {
    //   type: Number,
    //   required: true,
    // },
    // token: {
    //   type: String
    // },
    // expire_at: {
    //   type: Number
    // },  
    // is_admin: {
    //   type: Boolean,
    //   default: false
    // }
  }, {
    timestamps: true
  });
  
// Compile the schema into a model and export it
// highlight-next-line
module.exports = mongoose.model("User", userSchema);