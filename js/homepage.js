var startDateDisplay = new Date(1950, 10, 1);
var endDateDisplay = new Date(2020, 6, 1);

console.log("startDate", startDateDisplay)
console.log("endDate", endDateDisplay)

// var startDateTest = new Date(2007, 10, 1);
// var endDateTest = new Date(2020, 6, 1);
var startDateTest = new Date(2007, 12, 1);
var endDateTest = new Date(2009, 6, 1);

const titles = {
  gdp: "GDP",
  m2: "M2",
  unemployment: "Unemployment Rate (%)",
  sp500: "S&P 500",
  
  testgdp: "Test GDP",
  testm2: "Test M2",
  testunemployment: "Test Unemployment Rate (%)",
  testsp500: "Test S&P 500",
};

var parseDate = d3.timeParse("%Y-%m-%d")

const financialCrisis = [
  // {start: parseDate("1948-11-01"), end: parseDate("1949-10-01"), name: ""},
  // {start: parseDate("1953-07-01"), end: parseDate("1954-05-01"), name: ""},
  // .... skips many. TODO: add 
  {start: parseDate("1980-01-01"), end: parseDate("1980-07-01"), name: "1980 recession"},
  {start: parseDate("1981-07-01"), end: parseDate("1982-11-01"), name: "1981–1982 recession"},
  {start: parseDate("1990-07-01"), end: parseDate("1991-03-01"), name: "Early 1990s recession"},
  {start: parseDate("2001-03-01"), end: parseDate("2001-11-01"), name: "Early 2000s Recession"},
  // {start: parseDate("2007-12-01"), end: parseDate("2009-06-01"), name: "2008 Great Depression"},
  // {start: parseDate("2020-02-01"), end: new Date(), name: "Covid Crisis"},
  {start: parseDate("1947-01-01"), end: new Date(), name: "All"},
]


const qes = [
  // ==== 2008 Financial Crisis
  // {start: parseDate("2008-12-01"), end: parseDate("2010-03-01")}, 
  // {start: parseDate("2010-11-01"), end: parseDate("2011-06-01")}, 
  // {start: parseDate("2012-09-01"), end: parseDate("2013-12-01")}, 

  // // ===== covid19
  // {start: parseDate("2012-09-01"), end: parseDate("2013-12-01")}, 
  // {start: parseDate("2020-06-01"), end: new Date()}, 
]

// ==================== Add button
d3.select(".buttons")
	  .selectAll("button")
		.data(financialCrisis)
    .enter()
    .append("button")
    .classed("btn", true)
    .classed("btn-success", true)
    .classed("btn-secondary", false)
    .style("margin", "0 3px")
    .text(function(d) {return d.name})
		.on("click", function(d) {
      dataSwap(d);
      // change color of the selected button
      d3
        .selectAll("button")
        .style("background-color", "white");
      this.style.backgroundColor = "#4DAAA7";
    })

function dataSwap(d) {
  let oldstartDate = new Date(d.start);
  startDateDisplay = new Date(oldstartDate)

  // option1: plot graph 120 days before recession
  startDateDisplay.setDate(oldstartDate.getDate() - 180)
  console.log("old start date", oldstartDate)
  console.log("start date", startDateDisplay)
  
  // // option2: plot graph start from recession date
  // startDate = d.start;
  
  endDateDisplay = d.end;

  // update info card
  console.log("update left info card title")
  console.log("data", d)
  d3.select("#leftinfocard")
    .select("h5")
    .text(d.name);

  // re-render the graph based on this new start and end date
  d3.selectAll("svg")
    .remove();
  draw();
  draw("test")

}

// =================== Parse Data

// parse: unemployment, M2
function parseData(data) {
  data = data.observations;
  data = data.map((d) => ({
    date: parseDate(d.date),
    value: +d.value,
  }));
  //include 2007 ~ current data
  // data = data.filter((d) => (d.date >= startDate && d.date <= endDate));

  return data;
}

// parse GDP and S&P500 CSV
function parseCSV(data) {
  // data: Array of object [{}]
  data = data.map((d) => ({
    date: new Date(d["Date"]),
    value: +d["Value"],
  }));

  // data = data.filter((d) => d.date >= startDate && d.date <= endDate);

  return data;
}

// =================== DataLoader: load data, parseData, render data

class DataLoaderCSV {
  constructor(url, id) {
    this.data = d3
      .csv(url)
      // .then((result) => console.log("S&P 500 data: ", result))
      .then(parseCSV)
      // .then((result) => console.log("S&P 500 data: ", result));
  }
}

class DataLoaderJson {
  constructor(url, id) {
    this.data = d3
      .json(url)
      // .then((result) => {
      //   console.log(result);
      // })
      // .json(
      //   "https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=5e3091f338bf5c58830d5720f72250a1&file_type=json"
      // );
      .then(parseData)
      // .then(console.log) // console.log return nothing
  }
}

// =================== Render Function
function render(data, option, onMouseover, onMouseout) {
  // topic is either "gpd", "unemployment", "m2"
  // side could be left or right
  const {id, isDotPlot} = option;
  
  data = data.filter((d) => !Number.isNaN(d.value));
  // console.log(id, "data", data);

  const svgWidth = 550;
  const svgHeight = 300;
  const margin = {
    top: 50,
    bottom: 50,
    left: 75,
    right: 50,
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // xScale
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d["date"]))
    .nice()
    .range([0, width]);

  //yScale
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d["value"]))
    .nice()
    .range([height, 0]);
  
  const svg = d3
    .select(`#${id}svgContainer`)
    .classed("relativeContainer", true)
    .append("svg")
    .attr("id", `${id}svg`)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ============== line Plot
  function LinePlot() {
    const line = d3
      .line()
      .x((d) => xScale(d["date"]))
      .y((d) => yScale(d["value"]));
  
    svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("stroke-array", 5);
      
  }
    
  if (id !== "unemployment") {
    LinePlot()
  }
    
  // ========== Draw Dots Plot
  const radiusScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d["value"]))
    .range([0.5, 10])

  const smallDotSize = 0.5;
  const normalDotSize = 2;
  const bigDotSize = 7; 

  const dotSize = (d, highlighted=false) => {
    if (isDotPlot && highlighted){
      return Math.max(radiusScale(d["value"]), bigDotSize);
    } else if (isDotPlot) {
      return radiusScale(d["value"]);
    } else if (highlighted){
      return data.length < 200 ? bigDotSize : bigDotSize - 2.5;
    } else {
      return data.length < 200 ? normalDotSize : smallDotSize;
    }
  };

  const strokeStyle = isDotPlot ? "black" : "#69b3a2";
  
  const colorScale = d3.scaleSequential(d3.interpolateGreys)
    .domain(d3.extent(data, d => d["value"]));
  
  const fillStyle = (d) => {
    if (isDotPlot) {
      return colorScale(d["value"]);
    } else {
      return "#69b3a2";
    }
  };

  const dotPlot = svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(d["date"]))
    .attr("cy", (d) => yScale(d["value"]))
    .attr("r", d => dotSize(d))
    .style("fill", fillStyle)
    .style("stroke", strokeStyle);


  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale)
          .tickFormat(d3.timeFormat("%Y-%b")))
    .selectAll("text")	
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", svgWidth / 2)
    .attr("y", margin.top - 50)
    // .attr("y", (0 - margin.top)/2)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text(`${titles[id]}`);
  
  // ============== Highlight and Unhighlight Functions
  // GDP - every 3 month
  // Unemployment - every 3 month
  // M2 - every 7 days
  // Sp500 - everyone except weekend and holiday

  // Purpose: if one point in one of the graphs is selected, 
  // the corresponding point(s) in other graphs will also be highlighted with 
  // bigger size and diff color.
  function highlight(di) {
    dotPlot
      .attr("r", (dj) => {
        const highlighted = di.date.getMonth() === dj.date.getMonth() && di.date.getYear() === dj.date.getYear();
        return dotSize(dj, highlighted);
      })
      .style("fill", (dj) => (di.date.getMonth() === dj.date.getMonth() && 
        di.date.getYear() === dj.date.getYear()) ? 
        "red" : "#69b3a2"
      )
  }

  function unhighlight() {
    dotPlot
      .attr("r", d => dotSize(d))
      .style("fill", fillStyle)
    
    tooltip.style("visibility", "hidden");
  };

  const formatDate = d3.timeFormat("%B %d, %Y");
  const formatValue = d3.format(".0f")
  function calculatePercentageChange(d) {
    var val = (d.value - data[0].value) / data[0].value * 100;
    val =  d3.format(".2f")(val);
    return val;
  };
  
  var tooltip = d3
    .select(`#${id}svgContainer`)
    .select("tooltip")
    .classed("mytooltip", true)
    .style("visibility", "hidden");
  
  function showTooltip(d) {
    tooltip
      .style("visibility", "visible")
      .html(formatDate(d.date) + ": " + formatValue(d.value) + "<br /> Change Since Start: " + calculatePercentageChange(d) + "%")
      .style("left", `${event.layerX + 10}px`)             
      .style("top", `${event.layerY - 10}px`);
  }

  // ============== QE rectangles
  function drawRectQE(qe) {
    const startX = xScale(qe.start)
    const widthX = xScale(qe.end) - startX
    
    svg
      .append("rect")
      .attr("class", "qe")
      .attr("x", startX)
      .attr("y", 10)
      .attr("width", widthX)
      .attr("height", height - 10)
      .attr("fill", "#d3d3d3")
      .style("opacity", 0.5)
    
    svg.append("text")
      .text("QE")
      .attr("x", startX + 5)
      .attr("y", 30)
      .style("opacity", 0.7)
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
  }

  qes.forEach(drawRectQE)
  

  // ============== public object 
  return {
    dotPlot,
    highlight,
    unhighlight,
    showTooltip,
  }
}


// ============= Call the Function to plot everything ===========================

// ===== load and parse data =============
// const urlGDP = "./data/gdp.json";
const urlGDP = "./data/gdp_v2.csv";
const urlUnemployment = "./data/unemployment.json";
const urlM2 = "./data/m2.json";
const urlSP500 = "./data/sp500.csv";

//// ============= load data
const loaderGDP = new DataLoaderCSV(
  urlGDP,
  "gdp",
);

const loaderUnemployment = new DataLoaderJson(
  urlUnemployment,
  "unemployment",
);

const loaderM2 = new DataLoaderJson(urlM2, "m2");

const loaderSP500 = new DataLoaderCSV(
  urlSP500,
  "sp500",
);

// ===== draw the plots =============

function draw(test_version) {
  console.log('calling draw...')

  
  // ============ update test option
  let test = "";
  if (test_version) {
    test = test_version;
  }
  
  // ======= Render all using data
  Promise.all([loaderGDP.data, loaderUnemployment.data, loaderM2.data, loaderSP500.data]).then((results) => {

    // for (let data of results) {
    //   console.log(data)
    // }

    console.log("results", results)

    for (let i = 0; i < results.length; i++) {
      if (test_version) {
        results[i] = results[i].filter((d) => (d.date >= startDateTest && d.date <= endDateTest));
      } else {
        results[i] = results[i].filter((d) => (d.date >= startDateDisplay && d.date <= endDateDisplay));
      }
    }
    
    const [dataGDP, dataUnemployment, dataM2, dataSP500] = results;

    const renderGDP = render(dataGDP, {id: `${test}gdp`});
    const renderM2 = render(dataM2, {id: `${test}m2`});
    const renderSP500 = render(dataSP500, {id: `${test}sp500`});
    const renderUnemployment = render(dataUnemployment, {id: `${test}unemployment`, isDotPlot:true});
  
    // ========== handleMouseover and handleMourout
    function handleMouseover(di, renderObject) {
      renderGDP.highlight(di)
      renderUnemployment.highlight(di)
      renderM2.highlight(di)
      renderSP500.highlight(di)
      renderObject.showTooltip(di)
    }
  
    function handleMouseout() {
      renderGDP.unhighlight()
      renderUnemployment.unhighlight()
      renderM2.unhighlight()
      renderSP500.unhighlight()
    }
  
    function setMouseEvents(renderObject) {
      renderObject.dotPlot
        .on("mouseover", di => handleMouseover(di, renderObject))
        .on("mouseout", handleMouseout);
    }
  
    // ========== setMouseevent for all four plots
    setMouseEvents(renderGDP);
    setMouseEvents(renderUnemployment);
    setMouseEvents(renderM2);
    setMouseEvents(renderSP500);
  
  })
}

draw()
draw("test")
