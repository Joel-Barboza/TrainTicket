import {
  select,
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
} from "d3";
import { useEffect, useState } from "react";

const nodes = [{ d: "1" }, { d: "2" }, { d: "3" }];

const links = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  /*  {"source":0, "target": 1}, */
];

function Graph() {
  const [simulation, setsimulation] = useState(null);
  /*   useEffect(() => {
      first
        
          return () => {
            second
          }
  }, [simulation.tick]);*/
  const svg = select("#container");

  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  const simu = forceSimulation(nodes)
    .force("charge", forceManyBody)
    .force("link", forceLink(links))
    .force("center", forceCenter(centerX, centerY));

  setsimulation(simu);

  const circles = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 10);

  const lines = svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "black");

  simulation.on("tick", () => {
    circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
    lines
      .attr("x1", (link) => link.source.x)
      .attr("y1", (link) => link.source.y)
      .attr("x2", (link) => link.source.x)
      .attr("y2", (link) => link.source.y);
  });
  return (
    <div>
      <svg id="container" width={width} height={width}></svg>
    </div>
  );
}

export default Graph;
