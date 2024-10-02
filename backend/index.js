const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const auth0Config = require('./auth0Config');
//db connection import
const connectToDatabase = require('./db');



//routes import
const orgRouter = require('./routes/org');
const participantRouter = require('./routes/participant');
const verifyRouter = require('./routes/verify');


//config integration
dotenv.config();

// Connect to MongoDB
connectToDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// Use Auth0 middleware with authRequired set to false
app.use(auth({
  ...auth0Config,
  authRequired: false,
}));

// Allow unauthenticated access to /verify route
app.use('/verify', verifyRouter); // This route will be accessible without authentication

// Protect /org and /participant routes with Auth0 middleware
app.use('/org', orgRouter); // Protect org routes
app.use('/participant', participantRouter); // Protect participant routes


app.get('/', (req, res) => {
  res.send("hello");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
