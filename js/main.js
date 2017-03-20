//execute script when window is loaded
window.onload = function(){
    
   
     var cityPop = [
        { 
            city: 'Albuquerque',
            population: 556495
        },
        {
            city: 'Santa Fe',
            population: 69976
        },
        {
            city: 'Rio Rancho',
            population: 91956
        },
        {
            city: 'Los Alamos',
            population: 12019
        }
    ];

    var w = 930, h = 500;
    
    var container = d3.select("body")//get the <body> element from the DOM
        .append("svg")//put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //always assign a class (as the block name) for styling and future selection
        .style("background-color", "rgba(0,0,0,0.2)");
    
    var innerRect = container.append("rect") //put a new rect in the svg
        .datum(400) //a single value is a DATUM
        .attr("width", function(d){ //rectangle width
            return d * 2.1; //400 * 2 = 800
        })
        .attr("height", function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 70) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
    
    var x = d3.scaleLinear()  //create the scale
        .range([90, 760]) //output min and max
        .domain([0, 3]); //input min and max
    
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50]) //was 440, 95
        .domain([0, 700000]); //was minPop, maxPop
    
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);

         
    var circles = container.selectAll(".circles") //create an empty selection
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //inspect the HTML--holy crap, there's some circles there
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            //calculate the radius based on population value as circle area
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i) + 8;
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000");//black circle stroke
    
    var yAxis = d3.axisLeft(y);//create y axis generator
    
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .call(yAxis);
    
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 20)")
        .call(yAxis);
    
     var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) - 1;
        });

    //first line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 10;
        })
        .text(function(d){
            return d.city;
        });

    
     var format = d3.format(","); //formatter
    
    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 10;
        })
        .attr("dy", "15") //vertical offset
        .text(function(d){
            return "Pop. " + d.population;
        });

};