const startYear = new Date(2007, 0, 1);
console.log("startYear", startYear);

const titles = {
  gdp: "GDP",
  m2: "M2",
  unemployment: "Unemployment Rate (%)",
  sp500: "S&P 500",
};

// =================== Parse Data

// parse: GDP, unemployment, M2
function parseData(data) {
  data = data.observations;
  data = data.map((d) => ({
    date: new Date(d.date),
    value: +d.value,
  }));
  //include 2007 ~ current data
  data = data.filter((d) => d.date >= startYear);

  return data;
}

// parse S&P500 CSV
function parseSP500(data) {
  // data: Array of object [{}]
  data = data.map((d) => ({
    date: new Date(d["Date"]),
    value: +d["Adj Close"],
  }));

  data = data.filter((d) => d.date >= startYear);

  return data;
}

// =================== DataLoader: load data, parseData, render data

class DataLoaderCSV {
  constructor(url, id) {
    this.data = d3
      .csv(url)
      // .then((result) => console.log("S&P 500 data: ", result))
      .then(parseSP500)
      // .then((result) => console.log("S&P 500 data: ", result));
  }
}

class DataLoader {
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
function render(data, id, onMouseover, onMouseout) {
  // topic is either "gpd", "unemployment", "m2"
  data = data.filter((d) => !Number.isNaN(d.value));
  console.log(id, "data", data);

  const svgWidth = 600;
  const svgHeight = 600;
  const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const smallDotSize = 0.5
  const normalDotSize = 2.5
  const bigDotSize = 5

  // xScale
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d["date"]))
    .nice()
    .range([0, width]);

  //yScale
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d["value"])])
    .nice()
    .range([height, 0]);

  // console.log(id, "yScale domain", yScale.domain());
  // console.log(
  //   id,
  //   "max value",
  //   d3.max(data, (d) => d["value"])
  // );

  // line function
  const line = d3
    .line()
    .x((d) => xScale(d["date"]))
    .y((d) => yScale(d["value"]));

  const svg = d3
    .select(`#${id}svg`)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg
    .append("path")
    .datum(data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("stroke-array", 5);

  const dotPlot = svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", (d) => xScale(d["date"]))
    .attr("cy", (d) => yScale(d["value"]))
    .attr("r", data.length < 200 ? normalDotSize : smallDotSize)
    .style("fill", "#69b3a2")

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  svg
    .append("text")
    .attr("x", svgWidth / 2 - 50)
    .attr("y", margin.top + height - 10)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .text("Year");

  svg.append("g").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", svgWidth / 2)
    .attr("y", margin.top - 50)
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
  function highlight(di) {
    dotPlot.attr("r", (dj) => (di.date.getMonth() === dj.date.getMonth() && di.date.getYear() === dj.date.getYear()) ? (data.length < 200 ? bigDotSize : bigDotSize - 2.5) : (data.length < 200 ? normalDotSize : smallDotSize))
      .style("fill", (dj) => (di.date.getMonth() === dj.date.getMonth() && di.date.getYear() === dj.date.getYear()) ? "red" : "#69b3a2")
  }

  function unhighlight() {
    dotPlot.attr("r", data.length < 200 ? normalDotSize : smallDotSize)
    .style("fill", "#69b3a2")
  }

  const formatDate = d3.timeFormat("%B %d, %Y");
  const formatValue = d3.format(".0f")
  function calculatePercentageChange(d) {
    var val = (d.value - data[0].value) / data[0].value * 100;
    val =  d3.format(".2f")(val);
    return val;
  }
  
  var tooltip = d3
    .select(`#${id}svgContainer`)
    .attr("class", "Container")
    .select("tooltip")
    .attr("class", "tooltip")
    .style("visibility", "hidden");
  
  function showTooltip(d) {
    tooltip
      .style("visibility", "visible")
      // .html("Date: " + formatDate(d.date) + "<br/>"  + "Value: " + formatValue(d.value))
      .html(formatDate(d.date) + ": " + formatValue(d.value) + "<br /> Change Since Start: " + calculatePercentageChange(d) + "%")
      // .html(`<span class="dateSpan">xxxx</span>`)
      .style("left", `${event.layerX + 10}px`)             
      .style("top", `${event.layerY - 10}px`);
  }

  // ============== public object 
  return {
    dotPlot,
    highlight,
    unhighlight,
    showTooltip,
  }
}


// ============= Call the Functions ===========================

const urlGDP = "./data/gdp.json";
const urlUnemployment = "./data/unemployment.json";
const urlM2 = "./data/m2.json";
const urlSP500 = "./data/sp500.csv";

//// ============= load data
const loaderGDP = new DataLoader(
  urlGDP,
  "gdp",
);

const loaderUnemployment = new DataLoader(
  urlUnemployment,
  "unemployment",
);

const loaderM2 = new DataLoader(urlM2, "m2");

const loaderSP500 = new DataLoaderCSV(
  urlSP500,
  "sp500",
);

// ======= Render all using data
Promise.all([loaderGDP.data, loaderUnemployment.data, loaderM2.data, loaderSP500.data]).then((results) => {
  const [dataGDP, dataUnemployment, dataM2, dataSP500] = results;
  const renderGDP = render(dataGDP, "gdp");
  const renderUnemployment = render(dataUnemployment, "unemployment");
  const renderM2 = render(dataM2, "m2");
  const renderSP500 = render(dataSP500, "sp500");

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
