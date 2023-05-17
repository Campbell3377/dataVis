function scatterPlot() {

    var width = 800;
    var height = 600;
    var margin = {top: 10, right: 30, bottom: 30, left: 40}
    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;
    // var tooltip = toolTip(200);

    var currXScale = 'danceability';
    var currYScale = 'tempo';

    var xScale;
    var yScale;
  
  
    var xScales = {
      'duration': d3.scaleLinear().domain([0, 613030]).range([margin.left, width]),
      'danceability': d3.scaleLinear().domain([0, 1]).range([margin.left, width]),
      'popularity': d3.scaleLinear().domain([0, 100]).range([margin.left, width]),
      'energy': d3.scaleLinear().domain([0, 1]).range([margin.left, width]),
      'key': d3.scaleLinear().domain([0, 11]).range([margin.left, width]),
      'loudness': d3.scaleLinear().domain([-24.25, 0.175]).range([margin.left, width]),
      'release_date': d3.scaleLinear().domain([d3.timeParse('mm/dd/YYYY')('1/1/1900'), d3.timeParse('mm/dd/YYYY')('9/9/2022')]).range([margin.left, width]),
      'acousticness': d3.scaleLinear().domain([0, 1]).range([margin.left, width]),
      'liveness': d3.scaleLinear().domain([0, 1]).range([margin.left, width]),
      'valence': d3.scaleLinear().domain([0, 1]).range([margin.left, width]),
      'tempo': d3.scaleLinear().domain([33, 220]).range([margin.left, width])
    }
    var yScales = {
      'duration': d3.scaleLinear().domain([0, 613030]).range([height - margin.bottom, 0]),
      'danceability': d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, 0]),
      'popularity': d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, 0]),
      'energy': d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, 0]),
      'key': d3.scaleLinear().domain([0, 11]).range([height - margin.bottom, 0]),
      'loudness': d3.scaleLinear().domain([-24.25, 0.175]).range([height - margin.bottom, 0]),
      'release_date': d3.scaleLinear().domain([d3.timeParse('mm/dd/YYYY')('1/0/1900'), d3.timeParse('mm/dd/YYYY')('9/9/2022')]).range([height - margin.bottom, 0]),
      'acousticness': d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, 0]),
      'liveness': d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, 0]),
      'valence': d3.scaleLinear().domain([0, 1]).range([height - margin.bottom, 0]),
      'tempo': d3.scaleLinear().domain([33, 220]).range([height - margin.bottom, 0])
    }



    var svg = null;
    var scatter = null;
    var nodes = [];


    var fillColor = d3.scaleLinear()
          .domain([25, 100])
          .range(['#fff', '#0773f7']);

    function createNodes(rawData) {
        // Max total_followers for scale domain
        var maxAmount = d3.max(rawData, function (d) { return d.total_followers; });
        // var popAmount = d3.extent(rawData, function (d) { return +d.popularity; });
    
        // Sizes bubbles based on area.
        // @v4: new flattened scale names.

        
    
        // Use map() to convert raw data into node data.
        // Checkout http://learnjsdata.com/ for more on
        // working with data.
        var myNodes = rawData.map(function (d) {
          return {
            track_name: d.track_name,
            artist_name: d.artist_name,
            duration: +d.duration,
            release_date: d3.timeParse('mm/dd/YYYY')(d.release_date),
            popularity: +d.popularity,
            danceability: +d.danceability,
            energy: +d.energy,
            key: +d.key,
            loudness: +d.loudness,
            acousticness: +d.acousticness,
            liveness: +d.liveness,
            valence: +d.valence,
            tempo: d.tempo
          };
        });

        myNodes.sort(function(a, b) { return b.value - a.value; });
        console.log(myNodes);
        return myNodes;
    }

    function nodeX() {
        // console.log(xScales[currXScale]);
        return xScales[currXScale];
    }

    function nodeY() {
        return yScales[currYScale];
    }

    var plot = function plot(vis_div, data) {       //Add svg elements to vis div (send vis and data at the bottom)
        nodes = createNodes(data);

        svg = d3.select(vis_div)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        yScale = nodeY()
        svg.append('g')
            .attr('class', 'y_axis')
            .attr('transform', 'translate(40, 0)')
            .style('color', 'white')
            .call(d3.axisLeft(yScale));

        svg.append('g')
            .attr('class', 'x_axis')
            .attr('transform', 'translate(0,' + (height-margin.bottom) + ')')
            .style('color', 'white')
            .call(d3.axisBottom(nodeX()));

        scatter = svg.selectAll('dot')
            .data(nodes)
            .enter()
            .append('circle')
                .attr('cx', function (d) { return nodeX()(d[currXScale]); })
                .attr('cy', function (d) { return nodeY()(d[currYScale]); })
                .attr('r', 1.5)
                .style('fill', '#0773f7')
                .on('mouseover', showDetail)
                .on('mouseout', hideDetail);
                // .on('click', updateArtist);

        // groupBubbles();
    };



    // function nodeGenrePos(d) {
    //     // console.log(genreCenters[d.genre_bin].x);
    //     // console.log(d);
    //     return genreCenters[d.genre_bin].x;
    // }



    function showDetail(d) {        //For mouse hover on svg element
        // change outline to indicate hover state.
        // d3.select(this).style('fill', 'black');
        // var e = d3.select(this).datum();
        // console.log(e);
    
        // var content = '<span class="name">Artist: </span><span class="value">' +
        //               e.artist_name +
        //               '</span><br/>' +
        //               '<span class="name">Track Name: </span><span class="value">' +
        //               e.track_name +
        //               '</span>';
    
        // tooltip.showTooltip(content, d);
    }

    function hideDetail(d) {       //reset elements after mouse over
        // console.log(d);
        // d3.select(this).style('fill', '#0773f7');
    
        // tooltip.hideTooltip();
    }

    plot.changeX = function (x) {
        console.log(x);
        currXScale = x;
        scatter.transition('change')
                .duration(1000)
                .attr('cx', function (d) { return nodeX()(d[currXScale]); });

        xScale = nodeX();
        svg.select('g.x_axis')
            .transition('change2')
            .duration(1000)
            .call(xScale);

    }

    plot.changeY = function (y) {
        currYScale = y;
        console.log(currYScale)
        scatter.transition('change')
                .duration(1000)
                .attr('cy', function (d) { return nodeY()(d[currYScale]); });

        yScale = nodeY();
        svg.select('g.y_axis')
            .transition()
            .duration(1000)
            .call(yScale);
    }


    // chart.toggleDisplay = function (displayName) {
    //     if (displayName === 'genre') {
    //         splitBubbles();

    //     }
    //     else {
    //         groupBubbles();
    //     }
    // }

    return plot;
}



// function display (data) {
//     // if(error){
//     //     console.log(error);
//     // }
//     console.log('hello');
//     myScatterPlot('#vis1', data)
// }

// function changeXScale() {
//     myScatterPlot.changeX(this.value);
// }

// function changeYScale() {
//     myScatterPlot.changeY(this.value);
// }

function setupButtons () {
    d3.select('#scrolly')
        .select('#x_select')
        .on('change.one', function(d) { myScatterPlot.changeX(this.value)});

    d3.select('#scrolly')
        .select('#y_select')
        .on('change.one', function(d) { myScatterPlot.changeY(this.value)});

    d3.select('#scrolly2')
        .select('#x_select')
            .on('change.one', function(d) {
                    myScatterPlot.changeX(this.value)
                    d3.select('#scrolly')
                        .select('#x_select')
                            .property('value', this.value);
            });

    d3.select('#scrolly2')
        .select('#y_select')
            .on('change.one', function(d) {
                    myScatterPlot.changeY(this.value)
                    d3.select('#scrolly')
                        .select('#y_select')
                            .property('value', this.value);
            });
}

// function addCommas(nStr) {
//     nStr += '';
//     var x = nStr.split('.');
//     var x1 = x[0];
//     var x2 = x.length > 1 ? '.' + x[1] : '';
//     var rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//       x1 = x1.replace(rgx, '$1' + ',' + '$2');
//     }
  
//     return x1 + x2;
// }

// function toolTip(width) {
//     var tool = d3.select('body')
//         .append('div')
//         .attr('class', 'tooltip')
//         .attr('id', 'tooltipBub')
//         .style('pointer-events', 'none');

//     if (width) {
//         tool.style('width', width);
//     }

//     hideTooltip();


//     function showTooltip(content, event) {
//         tool.style('opacity', 1)
//             .html(content);

//         updatePos(event);
//     }

//     function hideTooltip() {
//         tool.style('opacity', 0);
//     }

//     function updatePos(event) {
//         // console.log(event);
//         var outofBounds = 0;
//         // if (event.pageX > (width+1500)) {
//         //     outofBounds = event.pageX - (width + 1500);
//         // }
//         tool.style('left', (event.pageX + 10 - outofBounds) + 'px')
//             .style('top',  (event.pageY - 75) + 'px');
//     }

//     return {
//         showTooltip: showTooltip,
//         hideTooltip: hideTooltip,
//         updatePos: updatePos
//     };
// }

var myScatterPlot = scatterPlot();

d3.csv('../data/spotify_daily_charts_tracks.csv').then(function(d) {
    console.log(d);
    // display(d);
    myScatterPlot('#vis1', d)
    console.log('hello')
});

setupButtons();





