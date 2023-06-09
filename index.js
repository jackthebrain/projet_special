
const car = require ("./controllers/crud_car")
const trip = require("./controllers/trip_crud")
const reservation = require("./controllers/crud_reservation")
const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())


//get trips created

app.post('/deleteReserVtaion', reservation.deleteReservationById);


app.post('/getTripsCreated', trip.getTripsCreated);

//create reservation

app.post("/createReservation",reservation.createReservation);

//get reservation by user

app.post("/getReservationByUser",reservation.getReservationByUser);

//delete reservation 

app.post("/deletReservation",reservation.deletReservation);

//get  reservations

app.get("/getReservations",reservation.getReservations);

// get resercation by idtrip

app.post("/getReservationById",reservation.getReservationById);

// get resercation by id

app.post("/getReservation",reservation.getReservation);

// get gars

app.get("/getCars",car.getCars);

// create car

app.post("/createCar",car.createCar);

// update car data

app.post("/updateCar",car.updateCar );
  
// delete car

app.post("/deleteCar",car.deletCar);

// get  car/ get car by user i

app.post("/getCarById",car.getcarById);

// get cars by id owner

app.post("/getCarsOwned",car.getCarOwned);

// get trips

app.get("/getTrips",trip.getTrips);

// create trip

app.post("/createTrip",trip.createTrip);

// update trip data

app.post("/updateTrip",trip.updateTrip);
  
// delete trip

app.post("/deleteTrip",trip.deleteTrip);

// get  trip

app.post("/getTrip",trip.getTrip);

// decrement places

app.post('/places',trip.places);


app.listen(4000, ()=> console.log("up & running on 4000"))
