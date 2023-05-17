var popularitySvg;
var lineMargin = {
  top: 20,
  right: 60,
  bottom: 60,
  left: 100,
};
var div;
var svgPopularity;
var margin = {
    top: 10,
    right: 10,
    bottom: 30,
    left: 60,
  },
  width = 460 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

var lineWidth;
var lineHeight;
var lineInnerHeight;
var lineInnerWidth;

document.addEventListener("DOMContentLoaded", function () {
  popularitySvg = d3.select("#popularity_svg");
  lineWidth = +popularitySvg.style("width").replace("px", "");
  lineHeight = +popularitySvg.style("height").replace("px", "");
  lineInnerWidth = lineWidth - lineMargin.left - lineMargin.right;
  lineInnerHeight = lineHeight - lineMargin.top - lineMargin.bottom;

  svgPopularity = d3
    .select("#popularity_svg")
    .append("g")
    .attr(
      "transform",
      "translate(" + ((650 - width) / 2 - 40) + "," + (1000 - height) / 2 + ")"
    );

  div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip-map")
    .style("opacity", 0);

  d3.json("data/spotify_daily_charts_artists.json").then(function (data) {
    console.log(data);

    drawBarPlot(data);
  });
});

function drawBarPlot(data) {
  console.log(data);

  var x = d3
    .scaleBand()
    .range([0, width + 1050])
    .domain(
      data.map(function (d) {
        return d["artist_name"];
      })
    )
    .padding(0.2);

  svgPopularity
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "18px")
    .style("font-weight", "bold");

  var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  svgPopularity.append("g").call(d3.axisLeft(y)).style("font-size", "18px");

  svgPopularity
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d["artist_name"]);
    })
    .attr("y", function (d) {
      return y(d["popularity"]);
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
      return height - y(d["popularity"]);
    })
    .attr("fill", function (d) {
      if (d["genre"] == "pop") {
        return "darkgreen";
      } else if (d["genre"] == "rap") {
        return "darkred";
      } else {
        return "darkblue";
      }
    })
    .on("mouseover", function (d, i) {
      var xPos = +d3.select(this).attr("x");
      var wid = +d3.select(this).attr("width");
      d3.select(this)
        .transition()
        .duration(500)
        .attr("class", "hoverEffect")
        .attr("x", xPos - 10)
        .attr("width", wid + 20);
      div.transition().duration(50).style("opacity", 1);
      div
        .html(
          `Artist: ${i["artist_name"]}</br>Followers: ${i["total_followers"]}</br>Genre: ${i["genre"]}`
        )
        .style("left", d.pageX + 10 + "px")
        .style("top", d.pageY + 10 + "px");
    })
    .on("mousemove", function (d, i) {
      div
        .html(
          `Artist: ${i["artist_name"]}</br>Followers: ${i["total_followers"]}</br>Genre: ${i["genre"]}`
        )
        .style("left", d.pageX + 10 + "px")
        .style("top", d.pageY + 10 + "px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(500)
        .attr("class", "hoverEffect_1")
        .attr("x", function (d) {
          return x(d["artist_name"]);
        })
        .attr("width", x.bandwidth());
      div.transition().duration(50).style("opacity", 0);
    });
  svgPopularity
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -height / 2)
    .attr("font-weight", 1000)
    .attr("font-family", "sans-serif")
    .attr("font-size", "25px")
    .text("Popularity Index out of 100");
  svgPopularity
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2 + 500)
    .attr("y", height + margin.top + 130)
    .attr("font-weight", 1000)
    .attr("font-family", "sans-serif")
    .attr("font-size", "25px")
    .text("Names of the top 10 Artists");
  svgPopularity
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2 + 150)
    .attr("y", -100)
    .attr("font-weight", 800)
    .attr("font-family", "sans-serif")
    .attr("font-size", "25px")
    .text("Top 10 Artists divided by the Popularity Index");
  svgPopularity
    .append("rect")
    .attr("x", width + 805)
    .attr("y", -150)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "darkred");

  svgPopularity
    .append("text")
    .attr("x", width + 835)
    .attr("y", -140)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .text("Rap");
  svgPopularity
    .append("rect")
    .attr("x", width + 805)
    .attr("y", -85)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "darkblue");

  svgPopularity
    .append("text")
    .attr("x", width + 835)
    .attr("y", -70)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .text("Rock");
  svgPopularity
    .append("rect")
    .attr("x", width + 805)
    .attr("y", -115)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "darkgreen");

  svgPopularity
    .append("text")
    .attr("x", width + 835)
    .attr("y", -100)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .text("Pop");
}
