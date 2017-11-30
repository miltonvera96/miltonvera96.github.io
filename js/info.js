var SVG_NS = 'http://www.w3.org/2000/svg';

function supportsSvg() {
    return document.implementation &&
        (
            document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.0') ||
            document.implementation.hasFeature('SVG', '1.0')
        );
}

function getDataFromDefinitionList(definitionList) {
  var children = definitionList.children;
  
  var yearIndex = {};
  var data = [];
  var currentYear = null;
  
  for (var childIndex = 0; childIndex < children.length; childIndex++) {
    var child = children[childIndex];
    
    if (child.nodeName == 'DT') {
      currentYear = child.textContent;
    } else if (child.nodeName == 'DD' && currentYear !== null) {
      if (!yearIndex[currentYear]) {
        yearIndex[currentYear] = data.length;
        data.push({
          year: +currentYear,
          values: []
        });
      }
      
      data[yearIndex[currentYear]].values.push(child.textContent);
    }
  }
  console.log(data);
  return data;
}

function createSvgElement() {
  var element = document.createElementNS(SVG_NS, 'svg');
  element.setAttribute('width', '100%');
  element.setAttribute('height', '250px');
  
  
  element.classList.add('timeline-visualization');
  
  return element;
}

function drawTimeline(svgElement, data) {

  var paper = Snap(svgElement);
  
  var canvasSize = parseFloat(getComputedStyle(paper.node)["width"]);
  
  var start = +data[0].year;
  var end = +data[data.length - 1].year;
  
  // add some padding
  start--;
  end++; end++;
  
  var range = end - start;
  
  paper.line(0, 200, canvasSize, 200).attr({
    'stroke': 'black',
    'stroke-width': 2
  });
  
  data.forEach(function(datum) {
    var x = canvasSize * (datum.year - start) / range;
    
    paper.circle(x, 200, 6);
    
    paper.text(x, 230, datum.year).attr({
      'text-anchor': 'middle'
    });
    
    var averageIndex = (datum.values.length - 1) / 2;
    var xOffsetSize = 24;
    datum.values.forEach(function(value, index) {
      var offset = (index - averageIndex) * xOffsetSize;
      
      paper.text(x + offset, 180, value)
        .attr({
          'text-anchor': 'start'
        })
        .transform('r -45 ' + (x + offset) + ' 180');
    });
  });
}

if (supportsSvg()) {

  	var timeline = document.querySelector('.timeline');
  
  	//timeline.style.display = 'none';
  
  	//var data = getDataFromDefinitionList(timeline);
  	//var data = JSON.parse($("#json"));

  	var svgElement = createSvgElement();

  	timeline.parentNode.insertBefore(svgElement, timeline);

   	$.getJSON("js/ventas.json", function(data) {
   		drawTimeline(svgElement, data);
    });
  
  //drawTimeline(svgElement, data);
}

var grafico;

function cargar(archivo) {
 	

    $.getJSON("js/" + archivo, function(data) {
      grafico = data;
      dibujar();
    });
}


var margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

// rounded percentage
var formatPercent = d3.format(".0%");

// var x = d3.scale.ordinal()
//   .rangeRoundBands([0, width], .1);

// var y = d3.scale.linear()
//   .range([height, 0]);

// var xAxis = d3.svg.axis()
//   .scale(x)
//   .orient("bottom");

// var yAxis = d3.svg.axis()
//   .scale(y)
//   .orient("left")
//   .tickFormat(formatPercent);

// var tip = d3.tip()
//   .attr('class', 'd3-tip')
//   .offset([-10, 0])
//   .html(function(d) {
//     return "<strong>Frecuencia:</strong> <span style='color:red'>" + d.y + "</span>";
//   })

// var svg = d3.select(".Anio").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// svg.call(tip);


// FUNCION PARA DIBUJAR GRAFICO CON SVG

function dibujar(){

	var x = d3.scale.ordinal()
  		.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	  .range([height, 0]);

	var xAxis = d3.svg.axis()
	  .scale(x)
	  .orient("bottom");

	var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .tickFormat(formatPercent);

	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
	    return "<strong>Frecuencia:</strong> <span style='color:red'>" + d.y + "</span>";
	  })

	var svg = d3.select(".Anio").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);


	  x.domain(grafico.map(function(d) { return d.x; }));
	  y.domain([0, d3.max(grafico, function(d) { return d.y; })]);


	var xGroup = svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	var yGroup = svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Frequencia");

	svg.selectAll(".bar")
	      .data(grafico)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.x); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.y); })
	      .attr("height", function(d) { return height - y(d.y); })
	      .on('mouseover', tip.show)
	      .on('mouseout', tip.hide)
}

function type(d) {
  d.y = +d.y;
  return d;
}

$("#freq2017").click(function(){
	$("div.Anio svg").remove();
	cargar("frecuencias2017.json");
});

$("#freq2016").click(function(){
	$("div.Anio svg").remove();
	cargar("frecuencias2016.json");
});

$("#freq2015").click(function(){
	$("div.Anio svg").remove();
	cargar("frecuencias2015.json");
});
//grafico.forEach(dibujar);

window.onload = function(){

	cargar("frecuencias2017.json");
};

