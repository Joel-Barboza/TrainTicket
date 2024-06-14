import React, {useState, useEffect} from "react";
import { GetPlacesList, Delete } from "../services/TrainRouteService";

const DeleteRoute = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [places, setPlaces] = useState([])

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

  const handleDelete = async () => {
    const result = await Delete(start, end);
    return result;
  }

  return (
    <main>
      <h1>Delete</h1>
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
        <button onClick={handleDelete}>Delete</button>
    </main>
  );
};

export default DeleteRoute;