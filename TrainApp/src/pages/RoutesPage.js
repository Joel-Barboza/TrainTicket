import React, { useState, useEffect } from "react";
import { PostTrainRoutes, GetTrainRoutes } from "../services/TrainRouteService";

import RoutesGraph from "../components/RoutesGraph";

const RoutesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      let routes = await GetTrainRoutes();
      setData(routes);
    }

    loadData();
  }, []);

  return (
    <>
      <main role="group" className="routes-page">
        <section>
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Cost</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <tr key={index}>
                  <td>{element.start}</td>
                  <td>{element.end}</td>
                  <td>{element.cost}</td>
                  <td>{element.distanceInKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <aside>
          <RoutesGraph />
        </aside>
      </main>
    </>
  );
};

export default RoutesPage;
