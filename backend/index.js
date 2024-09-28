const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//db connection import
const connectToDatabase = require('./db');



//routes import
const orgRouter = require('./routes/org');
const participantRouter = require('./routes/participant');


//config integration
dotenv.config();

// Connect to MongoDB
connectToDatabase();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//initialising routes
app.use('/org', orgRouter);
app.use('/participant', participantRouter);


app.get('/', (req, res) => {
  res.send("hello");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
