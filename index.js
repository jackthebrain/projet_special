
const car = require ("./controllers/crud_car")
const trip = require("./controllers/trip_crud")
const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

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
