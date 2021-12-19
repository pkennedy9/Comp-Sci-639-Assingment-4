// var format = d3.format(",");

// // Set tooltips
// var tip = d3.tip()
//             .attr('class', 'd3-tip')
//             .offset([-10, 0])
//             .html(function(d) {
//               return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Life Expectancy: </strong><span class='details'>" + format(d.life_expectancy) +"<br></span>" + "<strong>Alcohol: </strong><span class='details'>" + format(d.alcohol) + "<br></span>" + "<strong>BMI: </strong><span class='details'>" + format(d.bmi) + "<br></span>" + "<strong>Measles: </strong><span class='details'>" + format(d.measles) + "<br></span>" + "<strong>Adult Mortality: </strong><span class='details'>" + format(d.adult_mortality) + "<br></span>" + "<strong>HIV/AIDs: </strong><span class='details'>" + format(d.hiv_aids) + "<br></span>";
//             })

// var margin = {top: 0, right: 0, bottom: 0, left: 0},
//             width = 960 - margin.left - margin.right,
//             height = 500 - margin.top - margin.bottom;

// var color = d3.scaleThreshold()      
//     .domain([36,42,48,54,60,66,72,78,84,90])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

// var adult_mort_color = d3.scaleThreshold()      
//     .domain([0,25,75,100,150,200,250,300,350,500])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

// var pop_color = d3.scaleThreshold()      
//     .domain([0,10000,20000,30000,40000,50000,60000,70000,80000,90000])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

// var alc_color = d3.scaleThreshold()      
//     .domain([0,1,3,4,5,6,7,9,11,16])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);
    
// var bmi_color = d3.scaleThreshold()      
//     .domain([0,10,20,30,40,50,60,65,70,90])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

// var measles_color = d3.scaleThreshold()      
//     .domain([0,25,100,250,500,1000,2000,3000,10000,100000])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

// var hiv_color = d3.scaleThreshold()      
//     .domain([0,0.1,0.2,0.4,0.6,1,2,3,5,10])
//     .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);


// var path = d3.geoPath();

// var svg2 = d3.select("body")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append('g')
//             .attr('class', 'map');

// var projection = d3.geoMercator()
//                    .scale(130)
//                   .translate( [width / 2, height / 1.5]);

// var path = d3.geoPath().projection(projection);

// svg2.call(tip);

// queue()
//     .defer(d3.json, "world_countries.json")
//     .defer(d3.csv, "world_population_updated4.csv")
//     .await(ready);

// function ready(error, data, life_expectancy) {
//   var populationById = {};

//   life_expectancy.forEach(function(d) { populationById[d.id] = +d.life_expectancy; });
//   data.features.forEach(function(d) { d.life_expectancy = populationById[d.id] });

//   svg2.append("g")
//       .attr("class", "countries")
//     .selectAll("path")
//       .data(data.features)
//     .enter().append("path")
//       .attr("d", path)
//       .style("fill", function(d) { return color(populationById[d.id]); })
//       .style('stroke', 'white')
//       .style('stroke-width', 1.5)
//       .style("opacity",0.8)
//       // tooltips
//         .style("stroke","white")
//         .style('stroke-width', 0.3)
//         .on('mouseover',function(d){
//           tip.show(d);

//           d3.select(this)
//             .style("opacity", 1)
//             .style("stroke","white")
//             .style("stroke-width",3);
//         })
//         .on('mouseout', function(d){
//           tip.hide(d);

//           d3.select(this)
//             .style("opacity", 0.8)
//             .style("stroke","white")
//             .style("stroke-width",0.3);
//         });

//   svg2.append("path")
//       .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
//        // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
//       .attr("class", "names")
//       .attr("d", path);
// }

// function re_ready2(selectedOption) {

//   return function(error, data, column) {
//     var valueById = {};

//     if (selectedOption == "life_expectancy") {
//       column.forEach(function(d) { valueById[d.id] = +d.life_expectancy; });
//       data.features.forEach(function(d) { d.life_expectancy = valueById[d.id] }); 
//     } else if (selectedOption == "adult_mortality") {
//       column.forEach(function(d) { valueById[d.id] = +d.adult_mortality; });
//       data.features.forEach(function(d) { d.adult_mortality = valueById[d.id] });
//     } else if (selectedOption == "population") {
//       column.forEach(function(d) { valueById[d.id] = +d.population; });
//       data.features.forEach(function(d) { d.population = valueById[d.id] });
//     } else if (selectedOption == "alcohol") {
//       column.forEach(function(d) { valueById[d.id] = +d.alcohol; });
//       data.features.forEach(function(d) { d.alcohol = valueById[d.id] });
//     } else if (selectedOption == "bmi") {
//       column.forEach(function(d) { valueById[d.id] = +d.bmi; });
//       data.features.forEach(function(d) { d.bmi = valueById[d.id] });
//     } else if (selectedOption == "measles") {
//       column.forEach(function(d) { valueById[d.id] = +d.measles; });
//       data.features.forEach(function(d) { d.measles = valueById[d.id] });
//     } else {
//       column.forEach(function(d) { valueById[d.id] = +d.hiv_aids; });
//       data.features.forEach(function(d) { d.hiv_aids = valueById[d.id] });
//     }

//     svg2.append("g")
//         .attr("class", "countries")
//       .selectAll("path")
//         .data(data.features)
//       .enter().append("path")
//         .attr("d", path)
//         .style("fill", function(d) {
//           if (selectedOption == "life_expectancy") { return color(valueById[d.id]);}
//           else if (selectedOption == "adult_mortality") { return adult_mort_color(valueById[d.id]);}
//           else if (selectedOption == "population") { return pop_color(valueById[d.id]);}
//           else if (selectedOption == "alcohol") { return alc_color(valueById[d.id]);}
//           else if (selectedOption == "bmi") { return bmi_color(valueById[d.id]);}
//           else if (selectedOption == "measles") { return measles_color(valueById[d.id]);}
//           else { return hiv_color(valueById[d.id]);}
//         })
//         .style('stroke', 'white')
//         .style('stroke-width', 1.5)
//         .style("opacity",0.8)
//         // tooltips
//           .style("stroke","white")
//           .style('stroke-width', 0.3)
//           .on('mouseover',function(d){
//             tip.show(d);

//             d3.select(this)
//               .style("opacity", 1)
//               .style("stroke","white")
//               .style("stroke-width",3);
//           })
//           .on('mouseout', function(d){
//             tip.hide(d);

//             d3.select(this)
//               .style("opacity", 0.8)
//               .style("stroke","white")
//               .style("stroke-width",0.3);
//           });

//     svg2.append("path")
//         .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
//          // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
//         .attr("class", "names")
//         .attr("d", path);
//   }
// }


// function updateMap2(d, selectedOption) {
//   var tip = d3.tip()
//       .attr('class', 'd3-tip')
//       .offset([-10, 0])
//       .html(function(d) {
//          if (selectedOption == "life_expectancy") {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Life Expectancy: </strong><span class='details'>" + format(d.life_expectancy) +"</span>";
//          } else if (selectedOption == "adult_mortality") {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Adult Mortality: </strong><span class='details'>" + format(d.adult_mortality) +"</span>";
//         } else if (selectedOption == "population") {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
//         } else if (selectedOption == "alcohol") {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Alcohol: </strong><span class='details'>" + format(d.alcohol) +"</span>";
//         } else if (selectedOption == "bmi") {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>BMI: </strong><span class='details'>" + format(d.bmi) +"</span>";
//         } else if (selectedOption == "measles") {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Measles: </strong><span class='details'>" + format(d.measles) +"</span>";
//         } else {
//             return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>HIV/AIDs: </strong><span class='details'>" + format(d.hiv_aids) +"</span>";
//         }
//       })

//   var path = d3.geoPath();

//   var svg2 = d3.select("body")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append('g')
//             .attr('class', 'map');
            
//   svg2.call(tip);

//   queue()
//     .defer(d3.json, "world_countries.json")
//     .defer(d3.csv, "world_population_updated4.csv")
//     .await(re_ready2(selectedOption));
// }

// d3.select("#selectButton2").on("change", function(d) {
//   var selectedOption = d3.select(this).property("value")
//   updateMap2(d, selectedOption)
// })