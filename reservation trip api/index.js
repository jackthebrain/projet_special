const cors = require('cors');
const express = require('express')
const app = express()
const trips = require('./config')
app.use(express.json())
app.use(cors())

// get trips

app.get("/get", async (req, res) => {
    const snapshot = await trips.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });

// decrement places

app.post('/places', async (req, res) => {
  const id = req.body.id;
  var nbrPlaces= req.body.nbrPlaces;
  const docRef = trips.doc(id);
  const docSnapshot = await docRef.get();
  const docData = docSnapshot.data();
  const currentPlaces = docData.places;
  const updatedPlaces = currentPlaces - nbrPlaces;
  await docRef.update({ places: updatedPlaces });
  const updatedDocSnapshot = await docRef.get();
  const updatedDocData = updatedDocSnapshot.data();
  res.send(updatedDocData);
  });

// get  trip

app.post("/getTrip", async (req, res) => {
    const id = req.body.id;
    const docRef = trips.doc(id);
    const docSnapshot = await docRef.get();
    const docData = { id: docSnapshot.id, ...docSnapshot.data() };
    res.send(docData);
});




app.listen(4000, ()=> console.log("up & running on 4000"))
