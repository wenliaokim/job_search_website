const express = require('express');
const jobsearch = require('./routes/jobsearch.js');
const users = require('./routes/users.js');
const favorites = require('./routes/favorites.js');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');    

const PORT = process.env.PORT || 8000;


const mongoString = 'mongodb+srv://jingyi:q1w2e3r4t5@webdev.voyib.mongodb.net/jobsearch?retryWrites=true&w=majority';
mongoose.connect(mongoString, { useNewUrlParser: true })
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();
app.use(cors());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(session({secret: "my demo secret",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/jobsearch', jobsearch);
app.use('/users', users);
app.use('/favorites', favorites);


app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//     console.log("received request");
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });
  

app.listen(PORT, function() {
    console.log(`server started on port ${PORT}`);
});