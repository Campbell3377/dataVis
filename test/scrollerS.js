//Initial variable setup
var container = d3.select('.container');
var scrolly = container.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama by steps
var scroller = scrollama({ blocks: '.step'});

// resize function to set dimensions on load and on page resize
function handleResize() 
{  
    var stepHeight = Math.floor(window.innerHeight * 0.75);
	step.style('height', stepHeight + 'px');
	step.style('width', '250px')

	var h = window.innerHeight / 2;
	var margin = (window.innerHeight - h) / 2;

	figure
		.style('height', h + 'px')
		.style('top', margin + 'px');

	// 3. update width of chart by subtracting from text width
	// var chartMargin = 32;
	// var textWidth = text.node().offsetWidth;
	// var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
	// // make the height 1/2 of viewport
	// var chartHeight = Math.floor(window.innerHeight / 2);

	// chart
	// 	.style('width', chartWidth + 'px')
	// 	.style('height', chartHeight + 'px');

	// 4. tell scrollama to update new element dimensions
	scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) 
{  
    step.classed('is-active', function (d, i) {
		return i === response.index;
	});

    // update graphic based on step here
	let index = response.index;
	let direct = response.direction;

	switch(index){
        case 0:
            // toolTipState = 'title';
            // groupBubbles();

            if(direct === 'up'){
                splitFunc('all');
            }
            break;
        case 1:
            // console.log('hello');
            // splitFunc('genre');
            break;
		default:
			break;
	}
}

function setupStickyfill() {
	d3.selectAll(".sticky").each(function() {
        Stickyfill.add(this);
    });
}

// function handleContainerEnter(response) 
// {  
//     // response = { direction }

// 	// sticky the graphic
// 	graphic.classed('is-fixed', true);
// 	graphic.classed('is-bottom', false);
// }

// function handleContainerExit(response) 
// {  
//     // response = { direction }

// 	// un-sticky the graphic, and pin to top/bottom of container
// 	graphic.classed('is-fixed', false);
// 	graphic.classed('is-bottom', response.direction === 'down');
// }

// kick-off code to run once on load
function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.5,
            debug: false
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", handleResize);
}

// start it up
init();