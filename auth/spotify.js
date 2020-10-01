const {
  passport,
  passportSpotify,
  mongoose,
} = require('../models/dependencies');

const User = mongoose.model('users');
const SpotifyStrategy = passportSpotify.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECTURI,
      proxy: true,
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({ spotifyID: profile.id });
        if (existingUser) {
          existingUser.accessToken = accessToken;
          existingUser.refreshToken = refreshToken;
          existingUser.save();
          return done(null, existingUser);
        }

        const user = await new User({
          spotifyID: profile.id,
          displayName: profile.displayName,
          imageURL: profile.photos[0] || '',
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        user.save();

        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
