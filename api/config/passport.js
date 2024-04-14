const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { getPubKey } = require("../utils/crypto");
const {
  adminLocalHandler,
  clientLocalHandler,
  jwtHandler,
} = require("./passportHandlers");

const PUB_KEY = getPubKey();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
  ignoreExpiration: false,
  jsonWebTokenOptions: {
    maxAge: "1d",
  },
};

passport.use(
  new JwtStrategy(jwtOptions, async (req, jwtPayload, done) => {
    return await jwtHandler(jwtPayload, done);
  })
);

const localOptions = { passReqToCallback: true, usernameField: "username" };

passport.use(
  new LocalStrategy(localOptions, async (req, user, password, done) => {
    if (req.accountType === "ADMIN") {
      return await adminLocalHandler(user, password, done);
    } else if (req.accountType === "CLIENT") {
      return await clientLocalHandler(user, password, done);
    } else {
      return done(null, false);
    }
  })
);

module.exports = passport;
