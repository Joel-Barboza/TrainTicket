import React, { useState, useEffect } from "react";
import { AddTrainRoutes, GetPlacesList } from "../services/TrainRouteService";

const AddRoute = () => {
  const [routes, setRoutes] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [cost, setCost] = useState(0);
  const [distanceInKm, setDistanceInKm] = useState(0);
  const [places, setPlaces] = useState([])

  const loadData = async () => {
    try {
      const routesOnDB = await AddTrainRoutes(start, end, cost, distanceInKm);
      setRoutes(routesOnDB);
    } catch (error) {
      console.error("Error loading routes:", error);
    }
  };
  const [newPlace, setNewPlace] = useState("");
  useEffect(() => {
    async function loadData() {
      let placesList = await GetPlacesList();
      setPlaces(placesList);
    }

    loadData();
    // setInterval(() => {
    //   loadData();
    // }, 5000);
  }, []);


  const handleAddNewRoute = () =>  {
    loadData();
  }
  return (
    <main>
      <h1>Add Route</h1>
      <form>
        <div className="row-select-start-end">
          <label>
            Select start point:
            <select name="start-places" id="startPlaces" onChange={(e) => {
                setStart(e.target.value);
              }}>
              {places.map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select End point:
            <select name="end-places" id="endPlaces" onChange={(e) => {
                setEnd(e.target.value);
              }}>
              {places.map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </label>
        </div>
          <label>
            Enter route distance in Km:
            <input
              type="number"
              value={distanceInKm}
              onChange={(e) => {setDistanceInKm(e.target.value); setCost(e.target.value*25)}}
              required
            />
          </label>
          <p>Ticket cost: ${cost}</p>
        <button type="button" onClick={handleAddNewRoute}>Add Route</button>
      </form>
      <hr />
      <form>
        <label>Can't find the place in the list?</label>
        <h2>Add new place:</h2>
        <div className="row-select-start-end">
          <label>
            Enter the name of the new place:
            <input
              type="text"
              value={newPlace}
              onChange={(e) => setNewPlace(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="button" onClick={console.log("fsdf")}>Add</button>
      </form>
    </main>
  );
};

export default AddRoute;
