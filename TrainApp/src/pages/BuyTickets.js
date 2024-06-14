import React, { useEffect, useState, useContext } from "react";
import { GetPlacesList, GetRouteCost } from "../services/TrainRouteService";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { BuyTicketsService } from "../services/BuyTicketsService";

const BuyTickets = () => {
  const [places, setPlaces] = useState([]);
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [numTickets, setNumTickets] = useState(0);
  const [cost, setCost] = useState(1);
  const [dateRange, setDateRange] = useState(true);
  const [fromDijkstra, setFromDijkstra] = useState([]);
  const { loggedIn, username } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleDateString("fr-CA")
  );
  const [minEndTime, setMinEndTime] = useState("");

  useEffect(() => {
    async function loadData() {
      let placesList = await GetPlacesList();
      setPlaces(placesList);
      setStartStation(placesList[0]);
      setEndStation(placesList[0]);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (travelDate !== "" && travelEndDate !== "") {
      setNumTickets(datediff(parseDate(travelDate), parseDate(travelEndDate)));
    }
  }, [travelDate, travelEndDate]);

  useEffect(() => {
    async function loadData() {
      let dijkstra = await GetRouteCost(startStation, endStation);
      setFromDijkstra(dijkstra);

      setCost(
        dijkstra.filter((route) => route.endVertex === endStation)[0]
          .totalWeight * 25
      );
    }

    if (startStation !== "" && endStation !== "") {
      loadData();
      //
      // console.log(fromDijkstra.filter((route) => route.EndVertex === endStation).totalWeight)
    }
  }, [startStation, endStation]);

  useEffect(() => {
    async function loadData() {
      let dijkstra = await GetRouteCost(startStation, endStation);
      setFromDijkstra(dijkstra);

      setCost(
        dijkstra.filter((route) => route.endVertex === endStation)[0]
          .totalWeight * 25
      );
    }

    if (startStation !== "" && endStation !== "") {
      loadData();
    }
  }, [startStation, endStation]);

  const handleBuyTickets = async () => {
    console.log(
      username,
      [startStation, endStation],
      travelDate,
      travelEndDate
    );
    // let buy;
    // try {
    //   if (dateRange) {
    //     buy = await BuyTicketsService(
    //       username,
    //       [startStation, endStation],
    //       travelDate,
    //       travelEndDate
    //     );
    //   } else {
    //     buy = await BuyTicketsService(
    //       username,
    //       [startStation, endStation],
    //       travelDate,
    //       travelDate
    //     );
    //   }
    // } catch (error) {
    //   console.log("Ticket purchased:", buy);
    //   console.error("Error posting routes:", error);
    // }
  };

  const calcDiscount = () => {
    let discount = (cost / 100) * 2 * numTickets;
    if (cost - (cost / 100) * 2 * (numTickets + 1) < (cost / 100) * 90) {
      discount = (cost / 100) * 2 * (numTickets + 1);
    }
    return discount;
  };
  const parseDate = (date) => {
    var dateTokens = date.split("-");

    return new Date(dateTokens[0], dateTokens[1] - 1, dateTokens[2]);
  };

  const handleNotLoggedIn = () => {
    navigate("../login");
  };

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  return (
    <>
      {loggedIn ? (
        <main className="buy-tickets-page">
          <h1>Buy Tickets</h1>

          <label>
            Start Station:
            <select
              name="start-places"
              id="startPlaces"
              onChange={(e) => {
                setStartStation(e.target.value);
              }}
            >
              {places.map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </label>
          <label>
            End Station:
            <select
              name="end-places"
              id="endPlaces"
              onChange={(e) => {
                setEndStation(e.target.value);
              }}
            >
              {places.map((place, index) => (
                <option key={index} value={place}>
                  {place}
                </option>
              ))}
            </select>
          </label>

          {dateRange ? (
            <>
              <label>Travel Date:</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={currentTime}
                required
              />
            </>
          ) : (
            <div role="group">
              <label>
                Start Date:
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => {
                    setTravelDate(e.target.value);
                    setMinEndTime(e.target.value);
                  }}
                  min={currentTime}
                  required
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  value={travelEndDate}
                  onChange={(e) => setTravelEndDate(e.target.value)}
                  min={minEndTime}
                  required
                />
              </label>
            </div>
          )}
          <label>
            Enable date Range
            <input
              type="checkbox"
              role="switch"
              onChange={() => {
                dateRange ? setDateRange(false) : setDateRange(true);
                dateRange ? setNumTickets(0) : console.log("");
              }}
            />
          </label>
          <button type="button" onClick={handleBuyTickets}>
            Buy Tickets
          </button>

          <p>Price: {cost - calcDiscount()}</p>
        </main>
      ) : (
        <main>
          <h1>You need to log in as user first</h1>
          <button onClick={handleNotLoggedIn}>Go to Log In page</button>
        </main>
      )}
    </>
  );
};

export default BuyTickets;
