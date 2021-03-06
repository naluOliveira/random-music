const {
  express,
  mongoose,
  connectMongo,
  passport,
  session,
  bodyParser,
  path,
} = require('./models/dependencies.js');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
require('./models/user');
require('./models/genres');
require('./models/music');
require('./auth/spotify');

const MongoStrore = connectMongo(session);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const User = mongoose.model('users');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true,
    store: new MongoStrore({ mongooseConnection: mongoose.connection }),
    cookie: {},
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: [
      'playlist-read-collaborative',
      'playlist-read-private',
      'user-library-read',
      'user-top-read',
      'user-read-playback-position',
      'user-read-recently-played',
      'streaming',
      'user-read-email',
      'user-read-private',
    ],
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/api/logout', (req, res) => {
  User.findOne({ _id: req.user.id })
    .then((result) => {
      const {
        accessToken,
        refreshToken,
        savedPlaylists,
        recentlyPlayed,
      } = result;
      accessToken = undefined;
      refreshToken = undefined;
      savedPlaylists = [];
      recentlyPlayed = [];
      result.save();
    })
    .catch((err) => console.log(err));
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

app.use(require('./routes'));

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT);
