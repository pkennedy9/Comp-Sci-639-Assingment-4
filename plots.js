var margin = { top: 10, right: 20, bottom: 30, left: 100 },
  width = 400,//- margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var test_color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y);

var scat_svg1 = d3.select("#test").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("id", "scat_svg")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("updated_fields.csv", function (error, data)
{
  if (error) throw error;
  data.forEach(function (d)
  {
    d.life_expectancy = +d.life_expectancy;
    d.measles = +d.measles;
  });

  x.domain(d3.extent(data, function (d) { return d.life_expectancy; })).nice();
  y.domain(d3.extent(data, function (d) { return d.life_expectancy; })).nice();

  scat_svg1.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("fill", "black")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Life Expectancy");

  scat_svg1.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("fill", "black")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .style("text-anchor", "end")
    .text("Life Expectancy")

  scat_svg1.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function (d) { return x(d.life_expectancy); })
    .attr("cy", function (d) { return y(d.life_expectancy); })
    .style("fill", "blue");
})

function update_scat_1(d, select_option_2)
{
  //d3.select("#scat_svg").remove();
  //d3.select("#new_svg").remove();
  //var new_x;

  // var new_svg = d3.select("body").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .attr("id", "new_svg")
  //   .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("updated_fields.csv", function (error, data)
  {
    if (error) throw error;

    data.forEach(function (d)
    {
      d.life_expectancy = +d.life_expectancy;
      if (select_option_2 == "life_expectancy") {
        d.life_expectancy = +d.life_expectancy;
        x.domain(d3.extent(data, function (d) { return d.life_expectancy; })).nice();
      } else if (select_option_2 == "diphtheria") {
        d.diphtheria = +d.diphtheria;
        x.domain(d3.extent(data, function (d) { return d.diphtheria; })).nice();
      } else if (select_option_2 == "hepatitis_b") {
        d.hepatitis_b = +d.hepatitis_b;
        x.domain(d3.extent(data, function (d) { return d.hepatitis_b; })).nice();
      } else if (select_option_2 == "polio") {
        d.polio = +d.polio;
        x.domain(d3.extent(data, function (d) { return d.polio; })).nice();
      } else if (select_option_2 == "bmi") {
        d.bmi = +d.bmi;
        x.domain(d3.extent(data, function (d) { return d.bmi; })).nice();
      } else if (select_option_2 == "measles") {
        d.measles = +d.measles;
        x.domain(d3.extent(data, function (d) { return d.measles; })).nice();
      } else if (select_option_2 == "gdp") {
        d.gdp = +d.gdp;
        x.domain(d3.extent(data, function (d) { return d.gdp; })).nice();
      }

      y.domain(d3.extent(data, function (d) { return d.life_expectancy; })).nice();

    });

    scat_svg1.selectAll("text").remove();

    scat_svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("fill", "black")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(function (d)
      {
        if (select_option_2 == "diphtheria") { return "Diphtheria"; }
        else if (select_option_2 == "bmi") { return "BMI"; }
        else if (select_option_2 == "life_expectancy") { return "Life Expectancy"; }
        else if (select_option_2 == "polio") { return "Polio"; }
        else if (select_option_2 == "measles") { return "Measles"; }
        else if (select_option_2 == "gdp") { return "GDP"; }
        else if (select_option_2 == "hepatitis_b") { return "Hepatitis B"; }
      });


    scat_svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("fill", "black")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Life Expectancy")

    scat_svg1.selectAll(".dot")
      .transition()
      .delay(function (d, i) { return i; })
      .duration(500)
      .attr("cx", function (d)
      {
        if (select_option_2 == "life_expectancy") { return x(d.life_expectancy); }
        else if (select_option_2 == "diphtheria") { return x(d.diphtheria); }
        else if (select_option_2 == "hepatitis_b") { return x(d.hepatitis_b); }
        else if (select_option_2 == "polio") { return x(d.polio); }
        else if (select_option_2 == "bmi") { return x(d.bmi); }
        else if (select_option_2 == "measles") { return x(d.measles); }
        else if (select_option_2 == "gdp") { return x(d.gdp); }
      })
      .attr("cy", function (d) { return y(d.life_expectancy); })
      .style("fill", "blue");
    // new_svg.selectAll(".dot")
    //       .data(data)
    //     .enter().append("circle")
    //       .attr("class", "dot")
    //       .attr("r", 3.5)
    //       .attr("cx", function(d) { 
    //         if (select_option_2 == "life_expectancy") { return x(d.life_expectancy);} 
    //         else if (select_option_2 == "diphtheria") { return x(d.diphtheria); } 
    //         else if (select_option_2 == "hepatitis_b") { return x(d.hepatitis_b);} 
    //         else if (select_option_2 == "polio") { return x(d.polio);} 
    //         else if (select_option_2 == "bmi") { return x(d.bmi); } 
    //         else if (select_option_2 == "measles") {  return x(d.measles);} 
    //         else if (select_option_2 == "gdp") { return x(d.gdp); } 
    //    })
    //     .attr("cy", function(d) { return y(d.life_expectancy); })
    //     .style("fill", "blue");
  })

}

d3.select("#selectButton2").on("change", function (d)
{
  var select_option_2 = d3.select(this).property("value")
  update_scat_1(d, select_option_2)
  update_map_1(d, select_option_2)
})

