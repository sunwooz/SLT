var width = 1200;
var height = 800;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-180)
    .linkDistance(70)
    .size([width, height]);

var svg = d3.select("svg#cloud");

d3.json("cloud.json", function(json) {
    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var links = svg.append("g").selectAll("line.link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrow)");

    var nodes = svg.selectAll("circle.node")
        .data(force.nodes())
        .enter().append("g").append("circle")
        .attr("class", "node")
        .attr("r", 8)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

    nodes.append("title")
        .text(function(d) { return d.name; });

    var g = svg.selectAll("g")
        .data(force.nodes())
        .insert("text")
        .attr("x", function(d) { return d.x })
        .attr("y", function(d) { return d.y })
        .attr("fill", "red")
        .text(function(d) { return d.name });

    force.on("tick", function() {
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        g.attr("x", function(d) { return d.x })
            .attr("y", function(d) { return d.y });
    });
});