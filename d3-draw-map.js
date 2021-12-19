var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function (d)
  {
    return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Life Expectancy: </strong><span class='details'>" + format(d.life_expectancy) + "<br></span>" + "<strong>Hepatitis B: </strong><span class='details'>" + format(d.hepatitis_b) + "<br></span>" + "<strong>BMI: </strong><span class='details'>" + format(d.bmi) + "<br></span>" + "<strong>Measles: </strong><span class='details'>" + format(d.measles) + "<br></span>" + "<strong>Diphtheria: </strong><span class='details'>" + format(d.diphtheria) + "<br></span>" + "<strong>GDP: </strong><span class='details'>" + format(d.gdp) + "<br></span>" + "<strong>Polio: </strong><span class='details'>" + format(d.polio) + "<br></span>";
  })

var margin = { top: -80, right: 0, bottom: -15, left: 0 },
  width = 750 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
  .domain([50, 55, 60, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var diphtheria_color = d3.scaleThreshold()
  .domain([0, 10, 20, 40, 60, 70, 80, 90, 95, 100])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var hep_b_color = d3.scaleThreshold()
  .domain([0, 10, 20, 40, 60, 70, 80, 90, 95, 100])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var polio_color = d3.scaleThreshold()
  .domain([0, 10, 20, 40, 60, 70, 80, 90, 95, 100])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var bmi_color = d3.scaleThreshold()
  .domain([20, 21.5, 23, 24.5, 26, 27.5, 29, 30, 31.5, 33])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var measles_color = d3.scaleThreshold()
  .domain([0, 25, 100, 250, 500, 1000, 2000, 3000, 10000, 100000])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);

var gdp_color = d3.scaleThreshold()
  .domain([10, 250, 500, 750, 1000, 5000, 15000, 25000, 75000, 200000])
  .range(["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]);


var path = d3.geoPath();

var svg = d3.select("#map1")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append('g')
  .attr('class', 'map');

var projection = d3.geoMercator()
  .scale(110)
  .translate([width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

queue()
  .defer(d3.json, "world_countries.json")
  .defer(d3.csv, "updated_fields.csv")
  .await(ready);

function ready(error, data, life_expectancy)
{
  var populationById = {};

  life_expectancy.forEach(function (d) { populationById[d.id] = +d.diphtheria; });
  data.features.forEach(function (d) { d.diphtheria = populationById[d.id] });
  life_expectancy.forEach(function (d) { populationById[d.id] = +d.hepatitis_b; });
  data.features.forEach(function (d) { d.hepatitis_b = populationById[d.id] });
  life_expectancy.forEach(function (d) { populationById[d.id] = +d.polio; });
  data.features.forEach(function (d) { d.polio = populationById[d.id] });
  life_expectancy.forEach(function (d) { populationById[d.id] = +d.bmi; });
  data.features.forEach(function (d) { d.bmi = populationById[d.id] });
  life_expectancy.forEach(function (d) { populationById[d.id] = +d.measles; });
  data.features.forEach(function (d) { d.measles = populationById[d.id] });
  life_expectancy.forEach(function (d) { populationById[d.id] = +d.gdp; });
  data.features.forEach(function (d) { d.gdp = populationById[d.id] });
  life_expectancy.forEach(function (d) { populationById[d.id] = +d.life_expectancy; });
  data.features.forEach(function (d) { d.life_expectancy = populationById[d.id] });

  svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function (d)
    {
      return color(populationById[d.id]);
    }
    )
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity", 0.8)
    // tooltips
    .style("stroke", "white")
    .style('stroke-width', 0.3)
    .on('mouseover', function (d)
    {
      tip.show(d);

      d3.select(this)
        .style("opacity", 1)
        .style("stroke", "white")
        .style("stroke-width", 3);
    })
    .on('mouseout', function (d)
    {
      tip.hide(d);

      d3.select(this)
        .style("opacity", 0.8)
        .style("stroke", "white")
        .style("stroke-width", 0.3);
    });

  svg.append("path")
    .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
    // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    .attr("class", "names")
    .attr("d", path);
}

function re_ready(selectedOption)
{

  return function (error, data, column)
  {
    var valueById = {};

    column.forEach(function (d) { valueById[d.id] = +d.life_expectancy; });
    data.features.forEach(function (d) { d.life_expectancy = valueById[d.id] });
    column.forEach(function (d) { valueById[d.id] = +d.diphtheria; });
    data.features.forEach(function (d) { d.diphtheria = valueById[d.id] });
    column.forEach(function (d) { valueById[d.id] = +d.hepatitis_b; });
    data.features.forEach(function (d) { d.hepatitis_b = valueById[d.id] });
    column.forEach(function (d) { valueById[d.id] = +d.polio; });
    data.features.forEach(function (d) { d.polio = valueById[d.id] });
    column.forEach(function (d) { valueById[d.id] = +d.bmi; });
    data.features.forEach(function (d) { d.bmi = valueById[d.id] });
    column.forEach(function (d) { valueById[d.id] = +d.measles; });
    data.features.forEach(function (d) { d.measles = valueById[d.id] });
    column.forEach(function (d) { valueById[d.id] = +d.gdp; });
    data.features.forEach(function (d) { d.gdp = valueById[d.id] });


    if (selectedOption == "life_expectancy") {
      column.forEach(function (d) { valueById[d.id] = +d.life_expectancy; });
      //data.features.forEach(function (d) { d.life_expectancy = valueById[d.id] });
    } else if (selectedOption == "diphtheria") {
      column.forEach(function (d) { valueById[d.id] = +d.diphtheria; });
      //data.features.forEach(function (d) { d.diphtheria = valueById[d.id] });
    } else if (selectedOption == "hepatitis_b") {
      column.forEach(function (d) { valueById[d.id] = +d.hepatitis_b; });
      //data.features.forEach(function (d) { d.hepatitis_b = valueById[d.id] });
    } else if (selectedOption == "polio") {
      column.forEach(function (d) { valueById[d.id] = +d.polio; });
      //data.features.forEach(function (d) { d.polio = valueById[d.id] });
    } else if (selectedOption == "bmi") {
      column.forEach(function (d) { valueById[d.id] = +d.bmi; });
      //data.features.forEach(function (d) { d.bmi = valueById[d.id] });
    } else if (selectedOption == "measles") {
      column.forEach(function (d) { valueById[d.id] = +d.measles; });
      //data.features.forEach(function (d) { d.measles = valueById[d.id] });
    } else if (selectedOption == "gdp") {
      column.forEach(function (d) { valueById[d.id] = +d.gdp; });
      //data.features.forEach(function (d) { d.gdp = valueById[d.id] });
    }

    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", function (d)
      {
        if (selectedOption == "life_expectancy") { return color(valueById[d.id]); }
        else if (selectedOption == "diphtheria") { return diphtheria_color(valueById[d.id]); }
        else if (selectedOption == "hepatitis_b") { return hep_b_color(valueById[d.id]); }
        else if (selectedOption == "polio") { return polio_color(valueById[d.id]); }
        else if (selectedOption == "bmi") { return bmi_color(valueById[d.id]); }
        else if (selectedOption == "measles") { return measles_color(valueById[d.id]); }
        else if (selectedOption == "gdp") { return gdp_color(valueById[d.id]); }
      })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity", 0.8)
      // tooltips
      .style("stroke", "white")
      .style('stroke-width', 0.3)
      .on('mouseover', function (d)
      {
        tip.show(d);

        d3.select(this)
          .style("opacity", 1)
          .style("stroke", "white")
          .style("stroke-width", 3);
      })
      .on('mouseout', function (d)
      {
        tip.hide(d);

        d3.select(this)
          .style("opacity", 0.8)
          .style("stroke", "white")
          .style("stroke-width", 0.3);
      });

    svg.append("path")
      .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
      // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);
  }
}


function updateMap(d, selectedOption)
{
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d)
    {
      if (selectedOption == "life_expectancy") {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Life Expectancy: </strong><span class='details'>" + format(d.life_expectancy) + "</span>";
      } else if (selectedOption == "adult_mortality") {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Diphtheria: </strong><span class='details'>" + format(d.diphtheria) + "</span>";
      } else if (selectedOption == "hepatitis_b") {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Hepatitis B: </strong><span class='details'>" + format(d.hepatitis_b) + "</span>";
      } else if (selectedOption == "polio") {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Polio: </strong><span class='details'>" + format(d.polio) + "</span>";
      } else if (selectedOption == "bmi") {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>BMI: </strong><span class='details'>" + format(d.bmi) + "</span>";
      } else if (selectedOption == "measles") {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Measles: </strong><span class='details'>" + format(d.measles) + "</span>";
      } else {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>GDP: </strong><span class='details'>" + format(d.gdp) + "</span>";
      }
    })

  var path = d3.geoPath();

  // var svg = d3.select("body")
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .append('g')
  //   .attr('class', 'map');

  svg.call(tip);

  queue()
    .defer(d3.json, "world_countries.json")
    .defer(d3.csv, "updated_fields.csv")
    .await(re_ready(selectedOption));
}

d3.select("#selectButton1").on("change", function (d)
{
  var selectedOption = d3.select(this).property("value")
  updateMap(d, selectedOption)
})