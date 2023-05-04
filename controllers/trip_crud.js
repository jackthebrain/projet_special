const cors = require('cors')
const express = require('express')
const app = express()
const {trips} = require('../config/config')
app.use(express.json())
app.use(cors())

// get trips

const getTrips = async (req, res) => {
    const snapshot = await trips.get()
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.send(list);
  }

// create trip

const createTrip = async (req, res) => {
    const data = req.body;
    await trips.add(data);
    res.send({ msg: "trip Added" })
  }

// update trip data

const updateTrip =async (req, res) => {
    const id = req.body.id
    delete req.body.id
    const data = req.body
    await trips.doc(id).update(data)
    res.send({ msg: "Updated" })
  }
  
// delete trip

const deleteTrip = async (req, res) => {
    const id = req.body.id
    await trips.doc(id).delete()
    res.send({ msg: "Deleted" })
  }

// get  trip

const getTrip = async (req, res) => {
    const id = req.body.id
    const docRef = trips.doc(id)
    const docSnapshot = await docRef.get()
    const docData = { id: docSnapshot.id, ...docSnapshot.data() }
    res.send(docData)
  }

// decrement places

const places = async (req, res) => {
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
}

module.exports = { getTrip, getTrips, createTrip, deleteTrip, updateTrip, places }
