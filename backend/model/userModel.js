import bcrybt from "bcryptjs";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a Name"],
    },
    email: {
      type: String,
      required: [true, "A user must have an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "A user must have a Password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrybt.genSalt(10);

  this.password = await bcrybt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrybt.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

export default User;
