d3.json("noforce.json", function(json) {

  var c10 = d3.scale.category10();
  var svg = d3.select("body")
   .append("svg")
   .attr("width", "80%")
   .attr("height", 800);

  // var drag = d3.behavior.drag()
  //   .on("drag", function(d, i) {
  //     console.log(d3.event)
  //     d.x += d3.event.dx
  //     d.y += d3.event.dy
  //     d3.select(this).attr("x", d.x - 25).attr("y", d.y - 25);
  //     links.each(function(l, li) {
  //       if (l.source == i) {
  //         d3.select(this).attr("x1", d.x).attr("y1", d.y);
  //       } else if (l.target == i) {
  //         d3.select(this).attr("x2", d.x).attr("y2", d.y);
  //       }
  //     });
  //   });

  var links = svg.selectAll("link")
    .data(json.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("x1", function(l) {
      var sourceNode = json.nodes.filter(function(d, i) {
        return i == l.source;
      })[0];
      d3.select(this).attr("y1", sourceNode.y);
      return sourceNode.x;
    })
    .attr("x2", function(l) {
      var targetNode = json.nodes.filter(function(d, i) {
        return i == l.target;
      })[0];
      d3.select(this).attr("y2", targetNode.y);
      return targetNode.x;
    })
    .attr("fill", "none")
    .attr("stroke", "black");

  var nodes = svg.selectAll("node")
    .data(json.nodes)
    .enter().append("rect")
    .attr("class", "node")
    .attr("x", function(d) {
      return d.x - 25;
    })
    .attr("y", function(d) {
      return d.y - 25;
    })
    .attr("width", 50)
    .attr("height", 50)
    .attr("fill", function(d, i) {
      return c10(i);
    });
    // .call(drag);

  nodes.on("click", function(item, i) {
    selectedNode = nodes.filter(function(d) {
      return d.name == item.name;
    });

    selectedNode
      .transition()
      .delay(300)
      .duration(3000)
      .ease("elastic")
      .attr("width", 100)
      .attr("height", 100)
      .attr("x", function(d) {
        return d.x - 50;
      })
      .attr("y", function(d) {
        return d.y - 50;
      });

  });

  $('#createButton').on('click', function(item, i) {
    var x = $('#x').val();
    var y = $('#y').val();

    var newData = {
      name: 'New',
      x: x,
      y: y
    }

    d3.select('svg').append("rect")
      .attr('class', 'node')
      .attr("x", newData.x).attr("y", newData.y)
      .attr('width', 50)
      .attr('height', 50)
      .attr('fill', function() {
        return c10(d3.selectAll('.node').size);
      });
    
  });
});