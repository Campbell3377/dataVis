function barChart() {

    // var width = 800;
    // var height = 600;
    // var margin = {top: 10, right: 30, bottom: 30, left: 40}
    // width = width - margin.left - margin.right;
    // height = height - margin.top - margin.bottom;

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
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
    
    var lineWidth;
    var lineHeight;
    var lineInnerHeight;
    var lineInnerWidth;
    // var tooltip = toolTip(200);

    var currXScale = 'danceability';
    var currYScale = 'tempo';



    var svg = null;
    var svgPopularity = null;
    var nodes = [];
    var div;


    var fillColor = d3.scaleLinear()
          .domain([25, 100])
          .range(['#fff', '#0773f7']);

    function createNodes(rawData) {
        // Max total_followers for scale domain
        // var maxAmount = d3.max(rawData, function (d) { return d.total_followers; });
        // var popAmount = d3.extent(rawData, function (d) { return +d.popularity; });
    
        // Sizes bubbles based on area.
        // @v4: new flattened scale names.

        
    
        // Use map() to convert raw data into node data.
        // Checkout http://learnjsdata.com/ for more on
        // working with data.
        var myNodes = rawData.map(function (d) {
          return {
            id: d.artist_id,
            followers: +d.total_followers,
            name: d.artist_name,
            genres: d.genres,
            genre: d.genre,
            popularity: +d.popularity,
            source: d.source,
          };
        });

        myNodes.sort(function(a, b) { return b.value - a.value; });
        console.log(myNodes);
        return myNodes;
    }

    var chart = function chart(vis_div, data) {       //Add svg elements to vis div (send vis and data at the bottom)
        nodes = createNodes(data);

        

        svg = d3.select(vis_div)
        .append('svg')
        .attr('width', 1100)
        .attr('height', 800);

        div = d3
          .select("#scrolly5")
          .select('svg')
          .append("div")
          .attr("class", "tooltip-map")
          .style("opacity", 0);

        svgPopularity = svg
        .append("g")
        .attr(
          "transform", "translate(" + ((900 - width) / 2 - 40) + "," + (700 - height) / 2 + ")"
        );

        
    
    
        var x = d3
        .scaleBand()
        .range([0, width-margin.right])
        .domain(
        nodes.map(function (d) {
            return d["name"];
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

  var y = d3.scaleLinear().domain([0, 100]).range([height-margin.top, 0]);
  svgPopularity.append("g").call(d3.axisLeft(y)).style("font-size", "18px");

  svgPopularity
    .selectAll("mybar")
    .data(nodes)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d["name"]);
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
        return "#05bbf2";
      } else if (d["genre"] == "rap") {
        return "#f5a105";
      } else {
        return "#cc0443";
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
          `Artist: ${i["name"]}</br>Followers: ${i["followers"]}</br>Genre: ${i["genre"]}`
        )
        .style("left", d.pageX + 10 + "px")
        .style("top", d.pageY + 10 + "px");
    })
    .on("mousemove", function (d, i) {
      div
        .html(
          `Artist: ${i["name"]}</br>Followers: ${i["followers"]}</br>Genre: ${i["genre"]}`
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
          return x(d["name"]);
        })
        .attr("width", x.bandwidth());
      div.transition().duration(50).style("opacity", 0);
    });
  svgPopularity
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", -width)
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
    .text("Names of the top 15 Artists");
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
    .attr("fill", "#f5a105");

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
    .attr("fill", "#cc0443");

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
    .attr("fill", "#05bbf2");

  svgPopularity
    .append("text")
    .attr("x", width + 635)
    .attr("y", -100)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .text("Pop");
    }



    return chart;
}


var myBarChart = barChart();

d3.csv('../data/spotify_daily_charts_artists_top.csv').then(function(d) {
    console.log(d);
    // display(d);
    myBarChart('#vis5', d);
    console.log('hello');
});