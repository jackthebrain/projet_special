const cors = require('cors')
const express = require('express')
const app = express()
const cars = require('./config')
app.use(express.json())
app.use(cors())

// get cars

app.get("/get", async (req, res) => {
    const snapshot = await cars.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.send(list);
  });

// create car

app.post("/create", async (req, res) => {
    const data = req.body;
    await cars.add(data);
    res.send({ msg: "trip Added" })
  });

// update car data

app.post("/update", async (req, res) => {
    const id = req.body.id
    delete req.body.id
    const data = req.body
    await cars.doc(id).update(data)
    res.send({ msg: "Updated" })
  });
  
// delete car

app.post("/delete", async (req, res) => {
    const id = req.body.id
    await cars.doc(id).delete()
    res.send({ msg: "Deleted" })
  });

// get  car/ get car by user i

app.post("/getTrip", async (req, res) => {
    const id = req.body.id
    const docRef = cars.doc(id)
    const docSnapshot = await docRef.get()
    const docData = { id: docSnapshot.id, ...docSnapshot.data() }
    res.send(docData)
  });

// get cars by id ownder

  app.post("/getCarsOwned", async (req, res) => {
    const idOwner = req.body.idOwner;
    const querySnapshot = await cars.where("idOwner", "==", idOwner).get();
    const results = [];
    querySnapshot.forEach((doc) => {
    results.push({ idOwner: doc.idOwner, ...doc.data() });
    });
    res.send(results);
  });

app.listen(4000, ()=> console.log("up & running on 4000"))
