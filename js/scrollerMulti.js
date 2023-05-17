//Initial variable setup
var container = d3.select('.container');

var scrolly3 = container.select('#scrolly3');
var figure3 = scrolly3.select('figure');
var article3 = scrolly3.select('article');
var step3 = article3.selectAll('.step'); 

var scrolly4 = container.select('#scrolly4');
var figure4 = scrolly4.select('figure');
var article4 = scrolly4.select('article');
var step4 = article4.selectAll('.step');

var scrolly5 = container.select('#scrolly5');
var figure5 = scrolly5.select('figure');
var article5 = scrolly5.select('article');
var step5 = article5.selectAll('.step'); 

var scrolly6 = container.select('#scrolly6');
var figure6 = scrolly6.select('figure');
var article6 = scrolly6.select('article');
var step6 = article6.selectAll('.step'); 

// initialize the scrollama by steps

var scroller3 = scrollama({ blocks: '.step'});
var scroller4 = scrollama({ blocks: '.step'});
var scroller5 = scrollama({ blocks: '.step'});
var scroller6 = scrollama({ blocks: '.step'});

// resize function to set dimensions on load and on page resize


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
            console.log('1');
            if(direct == 'up') {
                changePlot('danceability', 'energy');
            }
            break;
        case 1:
            console.log('2');
            changePlot('loudness', 'energy');
            break;
        case 2:
            changePlot('acousticness', 'liveness');
            break;
        case 3:
            changePlot('duration', 'popularity');
            break;
        case 4:
            changePlot('key', 'energy');
                break;
        case 4:
                break;
		default:
			break;
	}
}

function handleResize4() 
{  
    var stepHeight = Math.floor(window.innerHeight * 0.75);
	step4.style('height', stepHeight + 'px');
	step4.style('width', '250px')

	var h = window.innerHeight / 2;
	var margin = (window.innerHeight - h) / 2;

	figure4
		.style('height', h + 'px')
		.style('top', margin + 'px');


	scroller4.resize();
}

// scrollama event handlers
function handleStepEnter4(response) 
{  
    step4.classed('is-active', function (d, i) {
		return i === response.index;
	});

    // update graphic based on step here
	let index = response.index;
	let direct = response.direction;

	switch(index){
        case 0:
            console.log('1');
            if(direct == 'up') {
                changeHeat('danceability', 'energy');
            }
            break;
        case 1:
            console.log('2');
            changeHeat('loudness', 'energy');
            break;
        case 2:
            changeHeat('acousticness', 'liveness');
            break;
        case 3:
            changeHeat('duration', 'popularity');
            break;
        case 4:
            changeHeat('key', 'energy');
                break;
        case 4:
                break;
		default:
			break;
	}
}

function handleResize5() 
{  
    var stepHeight = Math.floor(window.innerHeight * 0.75);
	step5.style('height', stepHeight + 'px');
	step5.style('width', '250px')

	var h = window.innerHeight / 2;
	var margin = (window.innerHeight - h) / 3;

	figure5
		.style('height', h + 'px')
		.style('top', margin + 'px');


	scroller5.resize();
}

// scrollama event handlers
function handleStepEnter5(response) 
{  
    step5.classed('is-active', function (d, i) {
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

function handleResize6() 
{  
    var stepHeight = Math.floor(window.innerHeight * 0.75);
	step6.style('height', stepHeight + 'px');
	step6.style('width', '250px')

	var h = window.innerHeight / 2;
	var margin = (window.innerHeight - h) / 2;

	figure6
		.style('height', h + 'px')
		.style('top', margin + 'px');


	scroller6.resize();
}

// scrollama event handlers
function handleStepEnter6(response) 
{  
    step6.classed('is-active', function (d, i) {
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
    handleResize3();
    handleResize4();
    handleResize5();
    handleResize6();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)

    scroller3
        .setup({
            step: "#scrolly3 article .step",
            offset: 0.25,
            debug: false
        })
        .onStepEnter(handleStepEnter3);

    scroller4
        .setup({
            step: "#scrolly4 article .step",
            offset: 0.50,
            debug: false
        })
        .onStepEnter(handleStepEnter4);

    scroller5
        .setup({
            step: "#scrolly5 article .step",
            offset: 0.75,
            debug: false
        })
        .onStepEnter(handleStepEnter5);

    scroller6
        .setup({
            step: "#scrolly6 article .step",
            offset: 1.0,
            debug: false
        })
        .onStepEnter(handleStepEnter6);

    // setup resize event
    // window.addEventListener("resize", handleResize);
}

// start it up
init();