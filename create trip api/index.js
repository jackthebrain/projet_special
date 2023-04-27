const cors = require('cors')
const express = require('express')
const app = express()
const trips = require('./config')
app.use(express.json())
app.use(cors())

// get trips

app.get("/get", async (req, res) => {
    const snapshot = await trips.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.send(list);
  });

// create trip

app.post("/create", async (req, res) => {
    const data = req.body;
    await trips.add(data);
    res.send({ msg: "trip Added" })
  });

// update trip data

app.post("/update", async (req, res) => {
    const id = req.body.id
    delete req.body.id
    const data = req.body
    await trips.doc(id).update(data)
    res.send({ msg: "Updated" })
  });
  
// delete trip

app.post("/delete", async (req, res) => {
    const id = req.body.id
    await trips.doc(id).delete()
    res.send({ msg: "Deleted" })
  });

// get  trip

app.post("/getTrip", async (req, res) => {
    const id = req.body.id
    const docRef = trips.doc(id)
    const docSnapshot = await docRef.get()
    const docData = { id: docSnapshot.id, ...docSnapshot.data() }
    res.send(docData)
  });

app.listen(4000, ()=> console.log("up & running on 4000"))
