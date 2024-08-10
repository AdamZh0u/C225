// Generate a random graph with 10 nodes and random links
const nodes = d3.range(10).map((i) => ({ id: i }));
const links = [];
const matrix = Array.from({ length: 10 }, () => new Array(10).fill(0));

nodes.forEach((source, a) => {
  nodes.forEach((target, b) => {
    if (a !== b && Math.random() < 0.3) {
      // 30% chance of link
      const value = Math.floor(Math.random() * 10) + 1; // Random weight 1-10
      links.push({ source: source.id, target: target.id, value });
      matrix[a][b] = value;
    }
  });
});

// Create a force simulation for the network
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3.forceLink(links).id((d) => d.id)
  )
  .force("charge", d3.forceManyBody().strength(-50))
  .force("center", d3.forceCenter(200, 200));

const svgNetwork = d3.select("#network");
const link = svgNetwork
  .append("g")
  .attr("stroke", "#999")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", (d) => Math.sqrt(d.value));

const node = svgNetwork
  .append("g")
  .attr("fill", "steelblue")
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 5)
  .call(
    d3
      .drag()
      .on("start", (event) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on("drag", (event) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", (event) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      })
  );

simulation.on("tick", () => {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
  node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
});

// Draw the adjacency matrix
const svgMatrix = d3.select("#matrix");
const cellSize = 40;
matrix.forEach((row, i) => {
  row.forEach((value, j) => {
    const cell = svgMatrix
      .append("rect")
      .attr("x", j * cellSize)
      .attr("y", i * cellSize)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("class", "matrix-cell")
      .attr("fill", value > 0 ? "orange" : "white");

    if (value > 0) {
      svgMatrix
        .append("text")
        .attr("x", j * cellSize + cellSize / 2)
        .attr("y", i * cellSize + cellSize / 2)
        .attr("dy", "0.35em")
        .text(value)
        .attr("text-anchor", "middle");
    }
  });
});
