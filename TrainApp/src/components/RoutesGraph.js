// import React, { useEffect, useState } from "react";
// import { GetTrainRoutes } from "../services/TrainRouteService";
// import * as d3 from "d3";

// const RoutesGraph = () => {
//   const [routes, setRoutes] = useState([]);

//   useEffect(() => {
//     async function loadData() {
//       let routesOnDB = await GetTrainRoutes();
//       setRoutes(routesOnDB);
//     }
//     loadData();
//   }, []);

//   useEffect(() => {
//     // Use D3 to render the graph
//     renderGraph();
//   }, [routes]);

//   const renderGraph = () => {
//     const svg = d3.select("#graph-container");

//     // Clear previous graph
//     svg.selectAll("*").remove();

//     // Prepare data
//     // Create a set to store unique node IDs
//     const nodeSet = new Set();

//     // Map over routes and add start and end places to the set
//     routes.forEach((route) => {
//       nodeSet.add(route.start);
//       nodeSet.add(route.end);
//     });

//     // Convert the set to an array and map over it to create nodes
//     const nodes = Array.from(nodeSet).map((id) => ({ id }));

//     const links = routes.map((route) => ({
//       source: route.start,
//       target: route.end,
//     }));

//     // Define D3 force simulation
//     const simulation = d3
//       .forceSimulation(nodes)
//       .force("charge", d3.forceManyBody())
//       .force(
//         "link",
//         d3.forceLink(links).id((d) => d.id)
//       )
//       .force("center", d3.forceCenter(400, 400));

//     // Draw links
//     svg
//       .selectAll("line")
//       .data(links)
//       .enter()
//       .append("line")
//       .attr("stroke", "black")
//       .attr("stroke-width", 1);

//     // Draw nodes
//     const node = svg
//       .selectAll("circle")
//       .data(nodes)
//       .enter()
//       .append("circle")
//       .attr("r", 5)
//       .attr("fill", "red");

//     // Update node positions on tick
//     simulation.on("tick", () => {
//       node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
//     });
//   };

//   return <div><svg id="graph-container" width="800" height="600"></svg></div>
// };

// export default RoutesGraph;

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

    // Load data immediately and then every 5 seconds
    loadData();
    // const interval = setInterval(() => {
    //   loadData();
    // }, 5000);

    // // Cleanup the interval on component unmount
    // return () => clearInterval(interval);
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
      key={JSON.stringify(graph)} // Force re-render when graph changes
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        // If you want access to vis.js network API you can set the state in a parent component using this property
      }}
    />
  );
};

export default RoutesGraph;

// import React from "react";
// import { useEffect, useState } from "react";
// import { GetTrainRoutes } from "../services/TrainRouteService";
// import Graph from "react-graph-vis";
// import { timeout } from "d3";

// const RoutesGraph = () => {
//   const [routes, setRoutes] = useState([]);
//   // const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
//   const [graph, setGraph] = useState({ nodes: [], edges: [] })

//   useEffect(() => {
//     async function loadData() {
//       let routesOnDB = await GetTrainRoutes();
//       setRoutes(routesOnDB);

//     }

//     // setInterval(() => {
//     //   setCurrentTime(Date().toLocaleString());
//     // }, 1000)

//     const interval = setInterval(() => {
//       loadData();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     let newGraph = { nodes: [], edges: [] };
//     setGraph(newGraph);
//     const nodeSet = new Set();

//     routes.forEach((route) => {
//       if (!nodeSet.has(route.start)) {
//         newGraph.nodes.push({ id: route.start, label: route.start, title: `${route.start} tooltip text` });
//         nodeSet.add(route.start);
//       }
//       if (!nodeSet.has(route.end)) {
//         newGraph.nodes.push({ id: route.end, label: route.end, title: `${route.end} tooltip text` });
//         nodeSet.add(route.end);
//       }

//       newGraph.edges.push({ from: route.start, to: route.end, label: `${route.distanceInKm} km` });
//     });

//     setGraph(newGraph);
//   }, [routes]);

//   // const graph = {
//   //   nodes: [
//   //     { id: 1, label: "Node 1", title: "node 1 tootip text" },
//   //     { id: 2, label: "Node 2", title: "node 2 tootip text" },
//   //     { id: 3, label: "Node 3", title: "node 3 tootip text" },
//   //     { id: 4, label: "Node 4", title: "node 4 tootip text" },
//   //     { id: 5, label: "Node 5", title: "node 5 tootip text" },
//   //   ],
//   //   edges: [
//   //     { from: 1, to: 2 },
//   //     { from: 1, to: 3 },
//   //     { from: 2, to: 4 },
//   //     { from: 2, to: 5 },
//   //   ],
//   // };

//   const options = {
//     layout: {
//       hierarchical: true,
//     },
//     edges: {
//       color: "#000000",
//     },
//     height: "500px",
//   };

//   const events = {
//     select: function (event) {
//       var { nodes, edges } = event;
//     },
//   };
//   return (
//     <Graph
//       graph={graph}
//       options={options}
//       events={events}
//       getNetwork={(network) => {
//         //  if you want access to vis.js network api you can set the state in a parent component using this property
//       }}
//     />
//   );
// };

// export default RoutesGraph;
