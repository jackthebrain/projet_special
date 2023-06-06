const cors = require('cors')
const express = require('express')
const app = express()
const {reservation} = require('../config/config')
app.use(express.json())
app.use(cors())

//create reservation

const createReservation = async (req, res) => {
    const data = req.body;
    await reservation.add(data);
    res.send({ msg: "reservation Added" })
  }

// delete reservation

const deletReservation = async (req, res) => {
    const id = req.body.id
    await reservation.doc(id).delete()
    res.send({ msg: "Deleted" })
  }
  
// get reservation by idTrip

const getReservationById = async (req, res) => {
    const idTrip = req.body.idTrip;
    const querySnapshot = await reservation.where("idTrip", "==", idTrip).get();
    const results = [];
    querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
    });
    res.send(results);
  }
  
// get reservation by id 

const getReservation = async (req, res) => {
    const id = req.body.id
    const docRef = reservation.doc(id)
    const docSnapshot = await docRef.get()
    const docData = { id: docSnapshot.id, ...docSnapshot.data() }
    res.send(docData)
  }

// get reservations

const getReservations = async (req, res) => {
  const snapshot = await reservation.get()
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  res.send(list);
}

const getReservationByUser = async (req, res) => {
  const idUser = req.body.idUser;
  const querySnapshot = await reservation.where("idUser", "==", idUser).get();
  const results = [];
  querySnapshot.forEach((doc) => {
  results.push({ id: doc.id, ...doc.data() });
  });
  res.send(results);
}

const deleteReservationById = async (req,res) => {
  const idTrip = req.body.idTrip;
  const querySnapshot = await reservation.where("idTrip", "==", idTrip).get();
  querySnapshot.docs.map(async (doc) => {
  await doc.ref.delete();
  });
  res.send("deleted");
  }
  module.exports = { getReservationById , deletReservation, createReservation,getReservation,getReservations,getReservationByUser,deleteReservationById }