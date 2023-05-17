//Initial variable setup
var container = d3.select('.container');
var scrolly = container.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

var scrolly2 = container.select('#scrolly2');
var figure2 = scrolly2.select('figure');
var article2 = scrolly2.select('article');
var step2 = article2.selectAll('.step'); 

var scrolly3 = container.select('#scrolly3');
var figure3 = scrolly3.select('figure');
var article3 = scrolly3.select('article');
var step3 = article3.selectAll('.step'); 

// initialize the scrollama by steps
var scroller = scrollama({ blocks: '.step'});
var scroller2 = scrollama({ blocks: '.step'});
var scroller3 = scrollama({ blocks: '.step'});

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
            break;
        case 1:
            // console.log('hello');
            // splitFunc('genre');
            break;
		default:
			break;
	}
}

function handleResize2() 
{  
    var stepHeight = Math.floor(window.innerHeight * 0.75);
	step2.style('height', stepHeight + 'px');
	step2.style('width', '250px')

	var h = window.innerHeight / 2;
	var margin = (window.innerHeight - h) / 2;

	figure2
		.style('height', h + 'px')
		.style('top', margin + 'px');


	scroller2.resize();
}

// scrollama event handlers
function handleStepEnter2(response) 
{  
    step2.classed('is-active', function (d, i) {
		return i === response.index;
	});

    // update graphic based on step here
	let index = response.index;
	let direct = response.direction;

	switch(index){
        case 0:
            // toolTipState = 'title';
            break;
		default:
			break;
	}
}

function handleResize3() 
{  
    var stepHeight = Math.floor(window.innerHeight * 0.75);
	step3.style('height', stepHeight + 'px');
	step3.style('width', '250px')

	var h = window.innerHeight / 2;
	var margin = (window.innerHeight - h) / 2;

	figure3
		.style('height', h + 'px')
		.style('top', margin + 'px');


	scroller3.resize();
}

// scrollama event handlers
function handleStepEnter3(response) 
{  
    step3.classed('is-active', function (d, i) {
		return i === response.index;
	});

    // update graphic based on step here
	let index = response.index;
	let direct = response.direction;

	switch(index){
        case 0:
            // toolTipState = 'title';
            if(direct === 'up'){
                splitFunc('all');
            }
            break;
        case 1:
            // console.log('hello');
            splitFunc('genre');
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
    // setupStickyfill();s

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();
    handleResize2();
    handleResize3();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);

    scroller2
        .setup({
            step: "#scrolly2 article .step",
            offset: 0.67,
            debug: false
        })
        .onStepEnter(handleStepEnter2);

        scroller3
        .setup({
            step: "#scrolly3 article .step",
            offset: 1.0,
            debug: false
        })
        .onStepEnter(handleStepEnter3);

    // setup resize event
    // window.addEventListener("resize", handleResize);
}

// start it up
init();