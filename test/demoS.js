function bubbleChart() {

    var width = 800;
    var height = 600;
    
  
    var tooltip = toolTip(200);
  
    var center = { x: width / 2, y: height / 2 };
  
    var genreCenters = {
      'rock': { x: width / 4, y: height / 2 },
      'pop': { x: width / 2, y: height / 2 },
      'rap': { x: 3 * width / 4, y: 3 * height / 4 },
      'jazz': { x: width / 3, y: 3 * height / 4 },
      'edm': { x: 2 * width / 3, y: height / 2}
    };
  
    var genreTitleX = {      
      'rock': width / 4,
      'pop': width / 2,
      'rap': width - 160,
      'jazz': width / 3,
      'edm': 2 * width / 3
    };

    genreColor = {
        'rock': d3.scaleLinear().domain([0, 100]).range(['#fff', '#cc0443']),
        'pop': d3.scaleLinear().domain([0, 100]).range(['#fff', '#05bbf2']),
        'rap': d3.scaleLinear().domain([0, 100]).range(['#fff', '#f5a105']),
        'jazz': d3.scaleLinear().domain([0, 100]).range(['#fff', '#8904cc']),
        'edm': d3.scaleLinear().domain([0, 100]).range(['#fff', '#050df5'])
    }

    var forceStrength = 0.03;

    var svg = null;
    var bubbles = null;
    var nodes = [];

    function charge(d) {
        //let force 
        return -Math.pow(d.radius, 2.0) * forceStrength;
        // let expForce = -Math.pow(force * 0.09, 2.0);
        // return force;
    }

    var simulation = d3.forceSimulation()
    .velocityDecay(0.2)
    .force('x', d3.forceX().strength(forceStrength).x(center.x))
    .force('y', d3.forceY().strength(forceStrength).y(center.y))
    .force('charge', d3.forceManyBody().strength(charge))
    .on('tick', ticked);

    // @v4 Force starts up automatically,
    //  which we don't want as there aren't any nodes yet.
    simulation.stop();

    var fillColor = d3.scaleLinear()
          .domain([25, 100])
          .range(['#fff', '#0773f7']);

    function createNodes(rawData) {
        // Max total_followers for scale domain
        var maxAmount = d3.max(rawData, function (d) { return d.total_followers; });
        // var popAmount = d3.extent(rawData, function (d) { return +d.popularity; });
    
        // Sizes bubbles based on area.
        // @v4: new flattened scale names.
        var radiusScale = d3.scalePow()
          .exponent(0.5)
          .range([2, 30])
          .domain([0, maxAmount]);

        
    
        // Use map() to convert raw data into node data.
        // Checkout http://learnjsdata.com/ for more on
        // working with data.
        var myNodes = rawData.map(function (d) {
          return {
            id: d.artist_id,
            radius: radiusScale(+d.total_followers),
            value: +d.total_followers,
            name: d.artist_name,
            genres: d.genres,
            genre_bin: d.genre,
            popularity: +d.popularity,
            source: d.source,
            x: Math.random() * 900,
            y: Math.random() * 800
          };
        });

        myNodes.sort(function(a, b) { return b.value - a.value; });
        console.log(myNodes);
        return myNodes;
    }

    var chart = function chart(vis_div, data) {
        nodes = createNodes(data);

        svg = d3.select(vis_div)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        bubbles = svg.selectAll('bubble')
            .data(nodes, d => d.id);

        var bubblesE = bubbles.enter().append('circle')
            .classed('bubble', true)
            .attr('r', 0)
            .attr('fill', function (d) { return fillColor(d.popularity); })
            .attr('stroke', function (d) { return d3.rgb(fillColor(d.popularity)).darker(); })
            .attr('stroke-width', 2)
            .on('mouseover', showDetail)
            .on('mouseout', hideDetail)
            .on('click', updateArtist);
        
        bubbles = bubbles.merge(bubblesE);

        bubbles.transition()
            .duration(2000)
            .attr('r', d => d.radius);

        simulation.nodes(nodes);

        groupBubbles();
    };

    function ticked() {
        bubbles
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    }

    function nodeGenrePos(d) {
        // console.log(genreCenters[d.genre_bin].x);
        // console.log(d);
        return genreCenters[d.genre_bin].x;
    }

    function nodeGenreColor(d) {
        return genreColor[d.genre_bin]
    }

    function groupBubbles() {
        // hideGenreTitles();

        bubbles.transition('color')
            .duration(1000)
            .attr('fill', function (d) { return fillColor(d.popularity); })
            .attr('stroke', function (d) { return d3.rgb(fillColor(d.popularity)).darker(); })

        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

        simulation.alpha(1).restart();
    }

    function title() {

    }

    function splitBubbles() {
        // showGenreTitles();

        bubbles.transition('color')
            .duration(1000)
            .attr('fill', function (d) { return nodeGenreColor(d)(d.popularity); })
            .attr('stroke', function (d) { return d3.rgb(nodeGenreColor(d)(d.popularity)).darker(); })
        //Align x forces to draw bubbles to their genre
        simulation.force('x', d3.forceX().strength(forceStrength).x(nodeGenrePos));
        //restart simulation
        simulation.alpha(1).restart();
    }

    // function hideGenreTitles() {
    //     svg.selectAll('.genre').remove();
    // }

    // function showGenreTitles() {
    //     var genreData = [];
    //     for (var key in genreTitleX) genreData.push(key);
    //     console.log(genreData);
    //     var genres = svg.selectAll('.genre')
    //         .data(genreData)

    //     genres.enter().append('genre')
    //         .attr('class', 'genre')
    //         .attr('x', d => genreTitleX[d])
    //         .attr('y', 40)
    //         .attr('text-anchor', 'middle')
    //         .text(d => d);
    // }

    function showDetail(d) {
        // change outline to indicate hover state.
        d3.select(this).attr('stroke', 'black');
        var e = d3.select(this).datum();
        // console.log(e);
    
        var content = '<span class="name">Artist: </span><span class="value">' +
                      e.name +
                      '</span><br/>' +
                      '<span class="name">Followers: </span><span class="value">' +
                      addCommas(e.value) +
                      '</span><br/>' +
                      '<span class="name">Sub-Genre(s): </span><span class="value">' +
                      e.genres +
                      '</span>';
    
        tooltip.showTooltip(content, d);
    }

    function hideDetail(d) {
        // reset outline
        var e = d3.select(this).style('fill');
        // console.log(d);
        d3.select(this)
          .attr('stroke', d3.rgb((e)).darker());
    
        tooltip.hideTooltip();
    }

    function updateArtist(d) {
        var e = d3.select(this).datum();
        console.log(e.source.toString());
        d3.select('#scrolly')
            .select('iFrame')
                .attr('src', e.source.toString());
    }

    chart.toggleDisplay = function (displayName) {
        if (displayName === 'genre') {
            splitBubbles();

        }
        else {
            groupBubbles();
        }
    }

    return chart;
}



function display (data) {
    // if(error){
    //     console.log(error);
    // }
    // console.log(data);
    myBubbleChart('#vis3', data)
}

// function setupButtons() {
//     d3.select('#controlBar')
//       .selectAll('.button')
//       .on('click', function () {
//         // Remove active class from all buttons
//         d3.selectAll('.button').classed('active', false);
//         // Find the button just clicked
//         var button = d3.select(this);
//         // console.log('hello');
//         // Set it as the active button
//         button.classed('active', true);
  
//         // Get the id of the button
//         var buttonId = button.attr('id');
  
//         // Toggle the bubble chart based on
//         // the currently clicked button.
//         myBubbleChart.toggleDisplay(buttonId);
//       });
// }

function splitFunc (genre) {
    myBubbleChart.toggleDisplay(genre);
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
  
    return x1 + x2;
}

function toolTip(width) {
    var tool = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .attr('id', 'tooltipBub')
        .style('pointer-events', 'none');

    if (width) {
        tool.style('width', width);
    }

    hideTooltip();


    function showTooltip(content, event) {
        tool.style('opacity', 1)
            .html(content);

        updatePos(event);
    }

    function hideTooltip() {
        tool.style('opacity', 0);
    }

    function updatePos(event) {
        // console.log(event);
        var outofBounds = 0;
        // if (event.pageX > (width+1500)) {
        //     outofBounds = event.pageX - (width + 1500);
        // }
        tool.style('left', (event.pageX + 10 - outofBounds) + 'px')
            .style('top',  (event.pageY - 75) + 'px');
    }

    return {
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        updatePos: updatePos
    };
}

var myBubbleChart = bubbleChart();

d3.csv('charts_test.csv').then(function(d) {
    d.forEach(e => {
        e.total_followers = +e.total_followers;
    });
    console.log(d);
    display(d);
});

// setupButtons();