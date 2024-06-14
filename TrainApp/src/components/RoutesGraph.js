

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { GetTrainRoutes } from "../services/TrainRouteService";
import Graph from "react-graph-vis";

const RoutesGraph = () => {
  const [routes, setRoutes] = useState([]);
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    async function loadData() {
      let routesOnDB = await GetTrainRoutes();
      setRoutes(routesOnDB);
    }

    loadData();

  }, []);

  useEffect(() => {
    let newGraph = { nodes: [], edges: [] };
    const nodeSet = new Set();


    routes.forEach((route) => {
      if (!nodeSet.has(route.start)) {
        newGraph.nodes.push({ id: route.start, label: route.start, title: `${route.start} tooltip text` });
        nodeSet.add(route.start);
      }
      if (!nodeSet.has(route.end)) {
        newGraph.nodes.push({ id: route.end, label: route.end, title: `${route.end} tooltip text` });
        nodeSet.add(route.end);
      }

      newGraph.edges.push({ from: route.start, to: route.end, label: `${route.distanceInKm} km` });
    });

    if (newGraph != graph) {
      setGraph(newGraph);

    }
  }, [routes]);

  const options = useMemo(() => ({
    layout: {
      randomSeed: 0,
    },
    edges: {
      color: "#cacaca",
      arrows: {
        to: {
          enabled: true, 
          type: "arrow"
        },
        from: {
          enabled: false
        }
      },
      length: 200
      
    },
    physics:{
      enabled: true
    },
    interaction:{
      dragNodes: false,
      dragView: false,
      selectable: true,
      zoomView: false,
    },
    height: "500",
  }), []);

  const events = useMemo(() => ({
    select: function (event) {
      var { nodes, edges } = event;
    },
  }), []);

  const MemoizedGraph = useMemo(() => React.memo(Graph), []);

  return (
    <MemoizedGraph
      key={JSON.stringify(graph)} 
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
      }}
    />
  );
};

export default RoutesGraph;

