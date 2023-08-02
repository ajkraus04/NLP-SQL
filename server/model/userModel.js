require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { bool } = require('prop-types');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const mongoURI = process.env.MONGO_URI;

//Connect to DB
mongoose.connect(mongoURI);

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

const responseSchema = new Schema({
  query: { type: String, required: true, unique: true },
  response: { type: String, required: true },
});

const Response = mongoose.model('Response', responseSchema);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hashed: { type: Boolean, default: false },
  pastQueries: [responseSchema],
});

userSchema.pre('save', async function (next) {
  if (!this.hashed) {
    console.log('Password being hashed');
    this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.hashed = true;
  }

  return next();
});

const User = mongoose.model('User', userSchema);

module.exports = { Session, User, Response };
