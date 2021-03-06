var startDateDisplay = new Date(1950, 10, 1);
var endDateDisplay = new Date(2020, 6, 1);
const MAX_SAMPLE_SIZE = 1000;

console.log("startDate", startDateDisplay)
console.log("endDate", endDateDisplay)

var startDateTest = new Date(1980, 1, 1);
var endDateTest = new Date(1980, 7, 1);

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
  // {start: parseDate("1980-01-01"), end: parseDate("1980-07-01"), name: "1980 recession", info: [
  //   "GDP Change: -2.2%",
  //   "Recession Period: Jan 1980 - Jul 1980",
  //   "Recession Duration: 6 months",
  //   ]},
  {start: parseDate("1981-07-01"), end: parseDate("1982-11-01"), name: "1981–1982 recession", info: [
    "GDP Change: -2.7%",
    "Recession Period: Jul 1981 - Nov 1982",
    "Recession Duration: 1 year",
    ]},
  {start: parseDate("1990-07-01"), end: parseDate("1991-03-01"), name: "Early 1990s recession", info: [
    "GDP Change: -1.4%",
    "Recession Period: Jul 1990 - Mar 1991",
    "Recession Duration: 8 months",
    ]},
  {start: parseDate("2001-03-01"), end: parseDate("2001-11-01"), name: "Early 2000s Recession", info: [
    "GDP Change: -0.3%",
    "Recession Period: Mar 2001 - Nov 2001",
    "Recession Duration: 8 months",
    ]},
  {start: parseDate("2007-12-01"), end: parseDate("2009-06-01"), name: "2008 Great Depression", info: [
    "GDP Change: -5.1%",
    "Recession Period: Dec 2007 ~ Jun 2009",
    "Recession Duration: 1 Year 6 months",
    ]},
  // {start: parseDate("2020-02-01"), end: new Date(), name: "Covid Crisis"},
  {start: parseDate("1947-01-01"), end: new Date(), name: "All Data Available: 1947 ~ 2020", info: []},
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
    .style("margin", "2px 3px")
    .style("font-size", "12px")
    .text(function(d) {return d.name})
		.on("click", function(d) {
      dataSwap(d);
      // change color of the selected button
      d3
        .selectAll("button")
        .classed("btn-secondary", d2 => d2 === d ? false : true)
        .classed("btn-success", d2 => d2 === d ? true : false);
    })

function dataSwap(d) {
  let oldstartDate = new Date(d.start);
  startDateDisplay = new Date(oldstartDate)

  // option1: plot graph 120 days before recession
  // startDateDisplay.setDate(oldstartDate.getDate() - 120)
  console.log("old start date", oldstartDate)
  console.log("start date", startDateDisplay)
  
  // // option2: plot graph start from recession date
  startDateDisplay = d.start;
  
  endDateDisplay = d.end;

  // update info card
  d3.select("#leftinfocard")
    .select("h5")
    .text(d.name);

  var recessionInfo = [
    "GDP Drop: 3%",
    "Recession Period: Jan 2008 ~ Feb 2009",
    "Recession Duration: 8 months",
    ];

  function getInfo(dataPoint) {
    var item;
    for (item of financialCrisis) {
      if (item.name == dataPoint.name) {
        return item.info;
      }
    }
  };
  
  d3.select("#leftinfocard")
    .select("p")
    .selectAll("ul")
    .remove()
  
    d3.select("#leftinfocard")
    .select("p")
    .append("ul")
    .selectAll("li")
    .data(getInfo(d))
    .enter()
    .append("li")
    .html(String);

  // re-render the graph based on this new start and end date
  d3.select("#SonyaContainer")
    .selectAll("svg")
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

function limitSampleSize(data) {
  // Uniformly sample points from data array.
  // Ensure the max sample size <= MAX_SAMPLE_SIZE.
  const totalSize = data.length;
  if (totalSize <= MAX_SAMPLE_SIZE) {
    return data;
  }

  let sampledData = [];
  const samplePerN = parseInt(totalSize / MAX_SAMPLE_SIZE);
  for (let i = 0; i < totalSize; i += samplePerN) {
    sampledData.push(data[i]);
  }

  return sampledData;
}

// =================== DataLoader: load data, parseData, render data

class DataLoaderCSV {
  constructor(url, id) {
    this.data = d3
      .csv(url)
      // .then((result) => console.log("S&P 500 data: ", result))
      .then(parseCSV)
      .then(limitSampleSize)
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
  const svgHeight = 250;
  const margin = {
    top: 10,
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
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
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
    
  LinePlot()
    
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
  
  function getDivergingDomain() {
    // let [low, high] = d3.extent(data, d => d["value"]);
    // Hard-code the numbers below to ensure color consistency across plots.
    const high = 8.0;
    const neutral = 5.5;
    const low = 3.0;
    return [high, neutral, low];
  }
  const colorScale = d3.scaleDiverging(d3.interpolateRdYlGn)
    .domain(getDivergingDomain());
  
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
    .enter()
    .append("circle")
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
    .attr("transform", "rotate(-25)");

  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", svgWidth / 2.5)
    .attr("y", margin.top)
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
      .style("left", `${d3.event.offsetX + 10}px`)
      .style("top", `${d3.event.offsetY - 10}px`);
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

  
  // ============ update test option
  let test = "";
  if (test_version) {
    test = test_version;
  }
  
  // ======= Render all using data
  Promise.all([
    loaderGDP.data, 
    loaderUnemployment.data, 
    // loaderM2.data, 
    loaderSP500.data,
  ]).then((results) => {
    console.log("results", results)

    for (let i = 0; i < results.length; i++) {
      if (test_version) {
        results[i] = results[i].filter((d) => (d.date >= startDateTest && d.date <= endDateTest));
      } else {
        results[i] = results[i].filter((d) => (d.date >= startDateDisplay && d.date <= endDateDisplay));
      }
    }
    
    const [
      dataGDP, 
      dataUnemployment, 
      // dataM2, 
      dataSP500,
    ] = results;

    const renderGDP = render(dataGDP, {id: `${test}gdp`});
    // const renderM2 = render(dataM2, {id: `${test}m2`});
    const renderSP500 = render(dataSP500, {id: `${test}sp500`});
    const renderUnemployment = render(dataUnemployment, {id: `${test}unemployment`, isDotPlot:true});
  
    // ========== handleMouseover and handleMourout
    function handleMouseover(di, renderObject) {
      renderGDP.highlight(di)
      renderUnemployment.highlight(di)
      // renderM2.highlight(di)
      renderSP500.highlight(di)
      renderObject.showTooltip(di)
    }
  
    function handleMouseout() {
      renderGDP.unhighlight()
      renderUnemployment.unhighlight()
      // renderM2.unhighlight()
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
    // setMouseEvents(renderM2);
    setMouseEvents(renderSP500);
  
  })
}

draw()
draw("test")
