const peaks = [
  [1, 2, 5], [1, 4, 3], [1, 10, 100], [1, 3, 1],
  [2, 5, 1], [2, 7, 15],
  [3, 5, 3], [3, 6, 1],
  [4, 10, 23],
  [5, 9, 10],
  [6, 8, 1],
  [7, 9, 1],
  [8, 7, 1],
  [9, 10, 1],
  [10, 999, 999],
];

function find_shortest_path(first_peak, last_peak, peak) {
  const way_weight = {};
  let targetVertexCount = 0; // кол-во вершин
  way_weight[first_peak] = [0];
  peak.forEach((count) => {
    if (!way_weight[count[0]]) {
      way_weight[count[0]] = [Number.MAX_VALUE];
      targetVertexCount++;
    }
  });

  while (targetVertexCount--) {
    peak.forEach((edge) => {
      if (edge[1] != 999) {
        if (way_weight[edge[0]][0] + edge[2] < way_weight[edge[1]][0]) {
          way_weight[edge[1]] = [way_weight[edge[0]][0] + edge[2], edge[0]];
        }
      }
    });
  }

  document.getElementById('weight').value = way_weight[last_peak][0];

  var graph = new Graph();
  for (var i = 0; i < peaks.length; i++) {
    if (peaks[i][1] != 999) {
      graph.addEdge(peaks[i][0], peaks[i][1], {
        directed: true,
        label: peaks[i][2],
      });
    }
  }

  var way = last_peak + "+";
  while (last_peak != first_peak) {
    way += way_weight[last_peak][1] + "+";

    graph.addEdge(way_weight[last_peak][1], last_peak, {
      stroke: "#fff",
      fill: "#E2071C",
    });

    last_peak = way_weight[last_peak][1];
  };

  way = way.slice(0, -1);
  way += " <---";

  document.getElementById('way').value = way;

  $("#canvas").replaceWith($('<div id="canvas" ></div>'))
  var layouter = new Graph.Layout.Spring(graph);
  layouter.layout();
  var renderer = new Graph.Renderer.Raphael('canvas', graph, 512, 368);
  renderer.draw();

  return way_weight;
}