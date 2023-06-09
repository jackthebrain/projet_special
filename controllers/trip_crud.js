const cors = require('cors')
const express = require('express')
const app = express()
const {trips,reservation} = require('../config/config')
const db = require('../config/config')
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

// get trip by id Creator

const getTripsCreated = async (req, res) => {
  const idCreator = req.body.idCreator;
  const querySnapshot = await trips.where("idCreator", "==", idCreator).get();
  const results = [];
  querySnapshot.forEach((doc) => {
  results.push({ id: doc.id, ...doc.data() });
  });
  res.send(results);
}

// deleteReservationsWithTrip by id Creator

const deleteReservationsWithTrip = (req, res) => {
  const tripId = req.body.id;

  // Find and remove the trip
  const tripIndex = trips.findIndex((trip) => trip.id === tripId);
  if (tripIndex !== -1) {
    const deletedTrip = trips.splice(tripIndex, 1)[0];

    // Find and remove reservations associated with the trip
    const deletedReservations = reservation.filter((reservation) => reservation.idTrip === tripId);
    reservation = reservation.filter((reservation) => reservation.idTrip !== tripId);

    res.send({ msg: 'Deleted', deletedTrip, deletedReservations });
  } else {
    res.status(404).send({ error: 'Trip not found' });
  }
};

module.exports = { getTrip, getTrips, createTrip, deleteTrip, updateTrip, places, getTripsCreated,deleteReservationsWithTrip };

