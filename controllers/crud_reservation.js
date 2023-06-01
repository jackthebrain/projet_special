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
    results.push({ idTrip: doc.idTrip, ...doc.data() });
    });
    res.send(results);
  }
  module.exports = { getReservationById , deletReservation, createReservation }