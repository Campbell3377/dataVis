var container = d3.select('.container');
var scrolly = container.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');

// initialize the scrollama
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




function init() {
    setupStickyfill();

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers
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