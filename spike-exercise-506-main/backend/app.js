const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config")

const app = express()
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // parse json requests
app.use(bodyParser.urlencoded({ extended: true })); // parse urlencoded requests


const db = require("./models")
let Role = db.role;

db.mongoose.connect(dbConfig.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to db.");
    dbInitialize();
  })
  .catch((err) => {
    console.error("Error when connecting to db", err);
    process.exit();
  });

dbInitialize = () => {
  Role.estimatedDocumentCount((err, count) => {
  if (!err && count === 0) {
    new Role({
      name: "potentialRenter"
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'potentialRenter' to roles collection");
    });

    new Role({
      name: "renter"
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'renter' to roles collection");
    });

    new Role({
      name: "owner"
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'owner' to roles collection");
    });
  }
});
}

//basic test route
app.get('/', (req, res) => {
  res.json({message: "Spike Exercise!"})
})

//routes
require("./routes")(app)

app.listen(8080, () => {
  console.log('Example app listening at http://localhost:8080')
})
