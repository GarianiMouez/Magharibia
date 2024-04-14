const adminServices = require("../services/admin");
const clientServices = require("../services/client");
const { checkPassword } = require("../utils/crypto");

const jwtHandler = async (payload, done) => {
  try {
    let user;
    if (payload.accountType === "ADMIN") {
      user = await adminServices.getById(payload.sub);
    } else if (payload.accountType === "CLIENT") {
      user = await clientServices.getById(payload.sub);
    } else {
      return done(null, false);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const adminLocalHandler = async (username, password, done) => {
  try {
    const user = await adminServices.getByUsername(username);
    if (!user) {
      return done(null, false);
    }
    if (!(await checkPassword(password, user.password))) {
      return done(null, false);
    }
    delete user.password;
    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(error, false);
  }
};

const clientLocalHandler = async (username, password, done) => {
  try {
    const user = await clientServices.getByUsername(username);
    console.lolg("eeeee");
    if (!user) {
      console.log("assba");
      return done(null, false);
    }
    if (!(await checkPassword(password, user.password))) {
      return done(null, false);
    }
    delete user.password;
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

module.exports = {
  jwtHandler,
  adminLocalHandler,
  clientLocalHandler,
};
