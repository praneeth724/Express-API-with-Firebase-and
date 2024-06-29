const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const app = express();
const port = 3000;

var serviceAccount = require("./service-account.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "nodetest-2e93d.firebaseio.com",
});

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});


app.get("/people", (req, res) => {
  try {
    const db = getFirestore();
    const people = db.collection("people");
    people.get().then((snapshot) => {
      const peopleList = [];
      snapshot.forEach((doc) => {
        peopleList.push(doc.data());
      });
      res.send(peopleList);
    });
  } catch (error) {
    res.status(500);
  }
});

app.post("/people", (req, res) => {
  const reqBody = req.body;
  try {
    const db = getFirestore();
    const people = db.collection("people");
    people.add(reqBody).then(() => {
      res.send({
        message: "Successfully added a new person",
        person: reqBody,
      });
    });
  } catch (error) {
    res.status(500);
    res.send({
      message: "Error adding a new person",
      error: error,
    });
  }
});
















// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/people1", (req, res) => {
//   res.send("You are getting /people");
// });