var dataPath = "data/percentChangeGDP.json";

drawGDPGraph = function(svg, data, avgGDPChange, minY, maxY){

    console.log();
    var svgHeight = 500;
    var svgWidth = 1200;

    var xMargin = 70;
    var yMargin = 5;
    var height = 400;
    var width = 850;

    svg.attr("height", svgHeight)
        .attr("width", svgWidth);

    svg.append("rect")
        .attr("width",width)
        .attr("height",height)
        .attr("x",xMargin)
        .attr("y",yMargin)
        .style("fill", "none")
        .style("stroke", "Black")
        .style("stroke-width", "1px");

    var dates = [];
    var changeValues = [];
    var startDate = new Date();
    var endDate = new Date();
    for (let index = 0; index < data.length; index++) {
        var currentElement = data[index];
        dates.push(currentElement["date"]);
        changeValues.push(currentElement["gdpChange"]);

        /*
        if(index == 0)
        {
            startDate = currentElement["date"];
        }
        else if(index == data.length - 1)
        {
            endDate = currentElement["date"];
        }
        */
    }

    //console.log(dates);
    //console.log(changeValues);
    /*
    var xScale = d3.scaleTime() //scale time
        .domain([startDate, endDate])
        .range([0, width]);
    */
   var xScale = d3.scaleBand()
        .domain(dates)
        .range([0, width]);

    var minVal = Math.min(Math.min.apply(Math, changeValues) - 2, 0);
    var maxVal = Math.max.apply(Math, changeValues) + 2;
    var yScale = d3.scaleLinear()
        .domain([minY, maxY])
        .range([height, 0]);

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(" + xMargin + ", " + (height + yMargin) + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")")
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d + "%"));

    var xCorrection = 0;
    var xAxis = svg.select(".xAxis");
    var tick = xAxis.select(".tick");
    var firstSplit = tick.attr("transform").substring(10);
    var final = firstSplit.substring(0,firstSplit.length -3);
    xCorrection = parseFloat(final);

    var id = svg.attr("id");
    var recessionStartColor = "#EE82EE";
    var recoveryStartColor = "#3CB371";
    if(id == "vShapeSVG")
    {
        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recessionStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("1953 Q3"))
            .attr("x2", xScale("1953 Q3"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");

        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recoveryStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("1954 Q3"))
            .attr("x2", xScale("1954 Q3"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");
    }
    else if(id == "uShapeSVG")
    {
        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recessionStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("1974 Q3"))
            .attr("x2", xScale("1974 Q3"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");

        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recoveryStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("1975 Q2"))
            .attr("x2", xScale("1975 Q2"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");
    }
    else if(id == "wShapeSVG")
    {
        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recessionStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("1980 Q2"))
            .attr("x2", xScale("1980 Q2"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");

        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recoveryStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("1983 Q1"))
            .attr("x2", xScale("1983 Q1"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");
    }
    else if (id == "lShapeSVG")
    {
        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recessionStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("2008 Q3"))
            .attr("x2", xScale("2008 Q3"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");

        svg.append("g")
            .append("line")
            .attr("class", "xAxisMarker")
            .attr("fill", "none")
            .attr("stroke", recoveryStartColor)
            .attr("stroke-width", "2px")
            .attr("x1", xScale("2009 Q4"))
            .attr("x2", xScale("2009 Q4"))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("transform", "translate(" + (xMargin + xCorrection) + ", " + yMargin + ")");
    }

    var points = svg.append("g")
        .attr("class", "points")
        .selectAll("path.pt")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "pt")
        .attr("fill", "Steelblue")
        .attr("d", d3.symbol().type(d3.symbolCircle))
        .attr("transform", function(d) {
            return "translate(" +(xScale(d["date"]) + xMargin + xCorrection)+ "," + (yScale(d["gdpChange"]) + yMargin) + ")";
  });

    svg.append("g")
        .append("path")
        .attr("class", "dataLine")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "Steelblue")
        .attr("stroke-width", "3px")
        .attr("stroke-dasharray", "9 9")
        .attr("d", d3.line()
            .x(function(d, i){ return xScale(d["date"]) + xCorrection;})
            .y(function(d, i){ return yScale(d["gdpChange"]); }))
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");
    
    svg.append("g")
        .append("line")
        .attr("class", "avgLine")
        .attr("fill", "none")
        .attr("stroke", "Firebrick")
        .attr("stroke-width", "1px")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale(avgGDPChange))
        .attr("y2", yScale(avgGDPChange))
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");

    for (let yVal = -8; yVal < 18; yVal+=2) {
        if (yVal != 0)
        {
            svg.append("g")
                .append("line")
                .attr("class", "yAxisGuideLine")
                .attr("fill", "none")
                .attr("stroke", "#888888")
                .attr("stroke-width", "1px")
                .attr("opacity", ".3")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", yScale(yVal))
                .attr("y2", yScale(yVal))
                .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");
        }
        else
        {
            svg.append("g")
                .append("line")
                .attr("class", "yAxisGuideLine")
                .attr("fill", "none")
                .attr("stroke", "#000000")
                .attr("stroke-width", "1px")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", yScale(yVal))
                .attr("y2", yScale(yVal))
                .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");
        }
    }

    svg.selectAll(".xAxis")
        .selectAll(".tick")
        .select("text")
        .attr("transform", "rotate(45)")
        .attr("text-anchor", "start");

    svg.selectAll(".xAxis")
        .append("g")
        .attr("class", "xAxisLabel")
        .append("text")
        .attr("transform", "translate(" + ((width + xMargin)/2) + ", " + (60) + ")")
        .attr("text-anchor", "middle")
        .attr("fill", "Black")
        .attr("font-size", "15px")
        .text("Quarter");

    svg.selectAll(".yAxis")
        .append("g")
        .attr("class", "yAxisLabel")
        .append("text")
        .attr("transform", "translate(" + (-40) + ", " + ((height+yMargin)/2) + "), rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("fill", "Black")
        .attr("font-size", "15px")
        .text("Percent Change from Previous Quarter");

    //var points = svg.selectAll(".points")
    var hoverGroup = svg.append("g").style("visibility","hidden");

    var hoverBoxWidth = 135;
    var hoverBoxHeight = 60;
    hoverGroup.append("rect")
        .attr("x",0)
        .attr("y",0)
        .attr("width",hoverBoxWidth)
        .attr("height",hoverBoxHeight)
        .attr("class", "hoverBox");

    lineIDs = [];
    points.on("mouseover", function(d, i){
        //Tooltip Section
        var currentDate = dates[i];
        var currentValue = changeValues[i];

        hoverGroup.append("text")
            .attr("x",5)
            .attr("y",20)
            .attr("id", "hoverText1")
            .attr("class", "hoverText")
            .text("Date: " + currentDate);
            lineIDs.push("hoverText1");

        hoverGroup.append("text")
            .attr("x",5)
            .attr("y",40)
            .attr("id", "hoverText2")
            .attr("class", "hoverText")
            .text("Value: " + currentValue + "%");
            lineIDs.push("hoverText2");
        
        hoverGroup.style("visibility","visible");

    })
    .on("mouseout",function(d, i) {
        for(var id of lineIDs)
        {
            d3.select("#" + id).remove();
        }

        lineIDs = [];
        hoverGroup.style("visibility","hidden");
    })
    .on("mousemove",function(d, i) { 
        var that = this;
        
        hoverGroup.attr("transform",function() {
            return "translate("+(xScale(d["date"]) + d3.mouse(that)[0] + (.8 * hoverBoxWidth))+","+(yScale(d["gdpChange"]) + d3.mouse(that)[1])+")";
        });
    });

    var ordinal = d3.scaleOrdinal()
        .domain(["% Change in GDP", "Average Change in GDP (since 1947)", "Start of Recession", "Start of Recovery"])
        .range([ "Steelblue", "Firebrick", recessionStartColor, recoveryStartColor]);

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(930,20)");

    var legendOrdinal = d3.legendColor()
        .shape("line")
        .orient("vertical")
        .labelWrap(200)
        .shapeWidth(40)
        .labelAlign("start")
        .shapePadding(10)
        .scale(ordinal);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);
}

setupCompareSVG = function(xVals, yMin, yMax, avgVal){

    var svg = d3.select("#compareSVG");
    var svgHeight = 500;
    var svgWidth = 1200;

    var xMargin = 70;
    var yMargin = 5;
    var height = 400;
    var width = 900;

    svg.attr("height", svgHeight)
        .attr("width", svgWidth);

    svg.append("rect")
        .attr("class", "border")
        .attr("width",width)
        .attr("height",height)
        .attr("x",xMargin)
        .attr("y",yMargin)
        .style("fill", "none")
        .style("stroke", "Black")
        .style("stroke-width", "1px");

    var xScale = d3.scaleBand()
        .domain(xVals)
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);

    svg.append("g")
        .append("line")
        .attr("class", "avgLine")
        .attr("fill", "none")
        .attr("stroke", "Firebrick")
        .attr("stroke-width", "1px")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale(avgVal))
        .attr("y2", yScale(avgVal))
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");

        for (let yVal = -8; yVal < 18; yVal+=2) {
            if (yVal != 0)
            {
                svg.append("g")
                    .append("line")
                    .attr("class", "yAxisGuideLine")
                    .attr("fill", "none")
                    .attr("stroke", "#888888")
                    .attr("stroke-width", "1px")
                    .attr("opacity", ".3")
                    .attr("x1", 0)
                    .attr("x2", width)
                    .attr("y1", yScale(yVal))
                    .attr("y2", yScale(yVal))
                    .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");
            }
            else
            {
                svg.append("g")
                    .append("line")
                    .attr("class", "yAxisGuideLine")
                    .attr("fill", "none")
                    .attr("stroke", "#000000")
                    .attr("stroke-width", "1px")
                    .attr("x1", 0)
                    .attr("x2", width)
                    .attr("y1", yScale(yVal))
                    .attr("y2", yScale(yVal))
                    .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");
            }
        }

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(" + xMargin + ", " + (height + yMargin) + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")")
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d + "%"));

    svg.selectAll(".xAxis")
        .selectAll(".tick")
        .select("text")
        .attr("transform", "rotate(45)")
        .attr("text-anchor", "start");

    svg.selectAll(".xAxis")
        .append("g")
        .attr("class", "xAxisLabel")
        .append("text")
        .attr("transform", "translate(" + ((width + xMargin)/2) + ", " + (60) + ")")
        .attr("text-anchor", "middle")
        .attr("fill", "Black")
        .attr("font-size", "15px")
        .text("Quarter");

    svg.selectAll(".yAxis")
        .append("g")
        .attr("class", "yAxisLabel")
        .append("text")
        .attr("transform", "translate(" + (-40) + ", " + ((height+yMargin)/2) + "), rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("fill", "Black")
        .attr("font-size", "15px")
        .text("Percent Change from Previous Quarter");

    var legendTitles = ["Current Data", "V Shape", "U Shape", "W Shape", "L Shape", "Average Change", "Zero Line"];
    var ordinal = d3.scaleOrdinal()
        .domain(legendTitles)
        .range([ "#1F77B4FF", "#FF7F0EFF", "#2CA02CFF", "#D62728FF", "#9467BDFF", "Firebrick", "#888888"]);

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(975,20)");

    var legendOrdinal = d3.legendColor()
        .shape("line")
        .orient("vertical")
        .labelWrap(200)
        .shapeWidth(40)
        .labelAlign("start")
        .shapePadding(5)
        .scale(ordinal);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);

    return svg;

}

drawCompareLine = function(name, svg, data, possibleQuarters, yMin, yMax, color){
    var svgHeight = 500;
    var svgWidth = 1000;

    var xMargin = 70;
    var yMargin = 5;
    var height = 400;
    var width = 900;

    var dates = [];
    var changeValues = [];
    for (let index = 0; index < data.length; index++) {
        var currentElement = data[index];
        dates.push(currentElement["date"]);
        changeValues.push(currentElement["gdpChange"]);
    }
   var xScale = d3.scaleBand()
        .domain(possibleQuarters)
        .range([0, width]);

    var minVal = Math.min(Math.min.apply(Math, changeValues) - 2, 0);
    var maxVal = Math.max.apply(Math, changeValues) + 2;
    var yScale = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);

    var xCorrection = 0;
    var xAxis = svg.select(".xAxis");
    var tick = xAxis.select(".tick");
    var firstSplit = tick.attr("transform").substring(10);
    var final = firstSplit.substring(0,firstSplit.length -3);
    xCorrection = parseFloat(final);

    svg.append("g")
        .attr("class", "points")
        .attr("id", name + "Points")
        .selectAll("path.pt")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "pt")
        .attr("fill", color)
        .attr("d", d3.symbol().type(d3.symbolCircle))
        .attr("transform", function(d) {
            return "translate(" +(xScale(d["date"]) + xMargin + xCorrection)+ "," + (yScale(d["gdpChange"]) + yMargin) + ")";
  });

    svg.append("g")
        .append("path")
        .attr("class", "dataLine")
        .attr("id", name + "Line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", "3px")
        .attr("stroke-dasharray", "9 9")
        .attr("d", d3.line()
            .x(function(d, i){ return xScale(d["date"]) + xCorrection;})
            .y(function(d, i){ return yScale(d["gdpChange"]); }))
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");

    updateMouseEvents();
}

deleteCompareLine = function(name){
    d3.selectAll("#" + name + "Points").remove();
    d3.selectAll("#" + name + "Line").remove();
}

updateMouseEvents = function(){
    d3.selectAll(".mouse-over-effects").remove();

    var svg = d3.select("#compareSVG");
    var drawArea = svg.select(".border");

    var xMargin = 70;
    var yMargin = 5;

    var width = parseInt(drawArea.attr("width"));
    var height = parseInt(drawArea.attr("height"));

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
        .attr('width', width) // can't catch mouse events on a g element
        .attr('height', height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")")
        .on('mouseout', function() { // on mouse out hide line, circles and text
            d3.select(".mouse-line")
                .style("opacity", "0");
            d3.selectAll(".mouse-per-line circle")
                .style("opacity", "0");
            d3.selectAll(".mouse-per-line text")
                .style("opacity", "0");
        })
        .on('mouseover', function() { // on mouse in show line, circles and text
            d3.select(".mouse-line")
                .style("opacity", "1");
            d3.selectAll(".mouse-per-line circle")
                .style("opacity", "1");
            d3.selectAll(".mouse-per-line text")
                .style("opacity", "1");
        })
        .on('mousemove', function() { // mouse moving over canvas
            var mouse = d3.mouse(this);
            d3.select(".mouse-line")
                .attr("d", function() {
                var d = "M" + (mouse[0] + xMargin) + "," + (height + yMargin);
                console.log(d);
                d += " " + (mouse[0] + xMargin) + "," + yMargin;
                return d;
                })
        });
}

d3.json(dataPath,function(data) {
        data = data["observations"]
        var vShape1952_1955 = [];
        var uShape1973_1975 = [];
        var wShape1978_1983 = [];
        var lShape2007_2009 = [];
        var currentShape2019_2020 = [];
        var yScaleMin = -10;
        var yScaleMax = 18;

        var avgGDPGrowth1947_2009 = 0;
        var count = 0;
        //var prevValue = 243.164;

        for (let index = 0; index < data.length; index++) {
            var currentElement = data[index];
            //var currentGDP = currentElement["value"];
            //var currentGDPChange = ((currentGDP - prevValue) / prevValue) * 100;
            var currentGDPChange = parseFloat(currentElement["value"], 10);
            var currentDate = currentElement["date"];
            var currentYear = currentDate.substring(0,4);
            var currentQuarter = currentDate.substring(5,7);
            var newElement = {};

            if(currentQuarter == "01")
            {
                currentQuarter = "Q1";
            }
            else if(currentQuarter == "04")
            {
                currentQuarter = "Q2";
            }
            else if(currentQuarter == "07")
            {
                currentQuarter = "Q3";
            }
            else if(currentQuarter == "10")
            {
                currentQuarter = "Q4";
            }

            newElement["date"] = currentYear + " " +currentQuarter;
            /*
            var date = currentElement["date"];
            var year = date.substring(0,4);
            var month = date.substring(5,7);
            var day = date.substring(8,10);
            newDate = new Date(year, month, day);
            newElement["date"] = newDate;
            */

            newElement["gdpChange"] = currentGDPChange;

            var yearAsInt = parseInt(currentYear);
            if(currentYear >= 1952 && currentYear <= 1955)
            {
                vShape1952_1955.push(newElement);
            }
            else if(currentYear >= 1973 && currentYear <= 1975)
            {
                uShape1973_1975.push(newElement);
            }
            else if(currentYear >= 1978 && currentYear <= 1983)
            {
                wShape1978_1983.push(newElement);
            }
            else if(currentYear >= 2007 && currentYear <= 2010)
            {
                lShape2007_2009.push(newElement);
            }
            else if(currentYear >= 2019 && currentYear <= 2020)
            {
                currentShape2019_2020.push(newElement);
            }

            if(currentYear >= 1947 && currentYear <= 2020)
            {
                avgGDPGrowth1947_2009 += currentGDPChange;
                count++;
            }

            //if (currentGDP != ".")
            //    prevValue = currentGDP;

        }

        avgGDPGrowth1947_2009 /= count;

        var vShapeSVG = d3.select("#vShapeSVG");
        if (vShapeSVG._groups[0][0] != null)
        {
            drawGDPGraph(vShapeSVG, vShape1952_1955, avgGDPGrowth1947_2009, yScaleMin, yScaleMax);
        }

        var uShapeSVG = d3.select("#uShapeSVG");
        if (uShapeSVG._groups[0][0] != null)
        {
            drawGDPGraph(uShapeSVG, uShape1973_1975, avgGDPGrowth1947_2009, yScaleMin, yScaleMax);
        }

        var wShapeSVG = d3.select("#wShapeSVG");
        if (wShapeSVG._groups[0][0] != null)
        {
            drawGDPGraph(wShapeSVG, wShape1978_1983, avgGDPGrowth1947_2009, yScaleMin, yScaleMax);
        }

        var lShapeSVG = d3.select("#lShapeSVG");
        if (lShapeSVG._groups[0][0] != null)
        {
            drawGDPGraph(lShapeSVG, lShape2007_2009, avgGDPGrowth1947_2009, yScaleMin, yScaleMax);
        }

        var maxLength = vShape1952_1955.length;
        if(uShape1973_1975.length > maxLength)
            maxLength = uShape1973_1975.length;

        if(wShape1978_1983.length > maxLength)
            maxLength = wShape1978_1983.length;

        if(lShape2007_2009.length > maxLength)
            maxLength = lShape2007_2009.length;

        var possibleQuarters = [];
        for (let index = 0; index < maxLength; index++) {
            var yearNum = Math.floor((index / 4)) + 1;
            var quarterNum = (index % 4) + 1;
            
            var val = "Year " + yearNum + " Q" + quarterNum;
            possibleQuarters.push(val);
        }

        var editedCurrentShapeData = [];
        for (let index = 0; index < currentShape2019_2020.length; index++) {
            const currentElement = currentShape2019_2020[index];
            var newElement = {};
            newElement["date"] = possibleQuarters[index];
            newElement["gdpChange"] = currentElement["gdpChange"];
            
            editedCurrentShapeData.push(newElement);
        }

        var editedVShapeData = [];
        for (let index = 0; index < vShape1952_1955.length; index++) {
            const currentElement = vShape1952_1955[index];
            var newElement = {};
            newElement["date"] = possibleQuarters[index];
            newElement["gdpChange"] = currentElement["gdpChange"];
            
            editedVShapeData.push(newElement);
        }

        var editedUShapeData = [];
        for (let index = 0; index < uShape1973_1975.length; index++) {
            const currentElement = uShape1973_1975[index];
            var newElement = {};
            newElement["date"] = possibleQuarters[index];
            newElement["gdpChange"] = currentElement["gdpChange"];
            
            editedUShapeData.push(newElement);
        }

        var editedWShapeData = [];
        for (let index = 0; index < wShape1978_1983.length; index++) {
            const currentElement = wShape1978_1983[index];
            var newElement = {};
            newElement["date"] = possibleQuarters[index];
            newElement["gdpChange"] = currentElement["gdpChange"];
            
            editedWShapeData.push(newElement);
        }

        var editedLShapeData = [];
        for (let index = 0; index < lShape2007_2009.length; index++) {
            const currentElement = lShape2007_2009[index];
            var newElement = {};
            newElement["date"] = possibleQuarters[index];
            newElement["gdpChange"] = currentElement["gdpChange"];
            
            editedLShapeData.push(newElement);
        }

        
        var names = ["currentShape", "vShape", "uShape", "wShape", "lShape"];
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        color.domain(names);

        var compareSVG = d3.select("#compareSVG");
        if (compareSVG._groups[0][0] != null)
        {
            compareSVG = setupCompareSVG(possibleQuarters, yScaleMin, yScaleMax, avgGDPGrowth1947_2009);
            drawCompareLine(names[0], compareSVG, editedCurrentShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[0]));
            drawCompareLine(names[1], compareSVG, editedVShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[1]));

            /*
            var dataBeingUsed = [editedCurrentShapeData, editedVShapeData];
            var currentShapeIndex = 0;
            var vShapeIndex = 1;
            var uShapeIndex = -1;
            var wShapeIndex = -1;
            var lShapeIndex = -1;

            updateError(dataBeingUsed);
            */

            var currentDataCheckbox = document.querySelector('input[id="currentShapeCheck"]');
            currentDataCheckbox.addEventListener('change', () => {
                if(currentDataCheckbox.checked){
                    drawCompareLine(names[0], compareSVG, editedCurrentShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[0]));
                    /*
                    currentShapeIndex = dataBeingUsed.length;
                    dataBeingUsed.push(editedCurrentShapeData);
                    updateError(dataBeingUsed);
                    */
                }
                else{
                    deleteCompareLine(names[0]);
                    /*
                    dataBeingUsed.splice(currentShapeIndex, 1);
                    currentShapeIndex = -1;
                    updateError(dataBeingUsed);
                    */
                }
            })

            var vShapeCheckbox = document.querySelector('input[id="vShapeCheck"]');
            vShapeCheckbox.addEventListener('change', () => {
                if(vShapeCheckbox.checked){
                    drawCompareLine(names[1], compareSVG, editedVShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[1]));
                    /*
                    vShapeIndex = dataBeingUsed.length;
                    dataBeingUsed.push(editedVShapeData);
                    updateError(dataBeingUsed);
                    */
                }
                else{
                    deleteCompareLine(names[1]);
                    /*
                    dataBeingUsed.splice(vShapeIndex, 1);
                    vShapeIndex = -1;
                    updateError(dataBeingUsed);
                    */
                }
            })

            var uShapeCheckbox = document.querySelector('input[id="uShapeCheck"]');
            uShapeCheckbox.addEventListener('change', () => {
                if(uShapeCheckbox.checked){
                    drawCompareLine(names[2], compareSVG, editedUShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[2]));
                    /*
                    uShapeIndex = dataBeingUsed.length;
                    dataBeingUsed.push(editedUShapeData);
                    updateError(dataBeingUsed);
                    */
                }
                else{
                    deleteCompareLine(names[2]);
                    /*
                    dataBeingUsed.splice(uShapeIndex, 1);
                    uShapeIndex = -1;
                    updateError(dataBeingUsed);
                    */
                }
            })

            var wShapeCheckbox = document.querySelector('input[id="wShapeCheck"]');
            wShapeCheckbox.addEventListener('change', () => {
                if(wShapeCheckbox.checked){
                    drawCompareLine(names[3], compareSVG, editedWShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[3]));
                    /*
                    wShapeIndex = dataBeingUsed.length;
                    dataBeingUsed.push(editedWShapeData);
                    updateError(dataBeingUsed);
                    */
                }
                else{
                    deleteCompareLine(names[3]);
                    /*
                    dataBeingUsed.splice(wShapeIndex, 1);
                    wShapeIndex = -1;
                    updateError(dataBeingUsed);
                    */
                }
            })

            var lShapeCheckbox = document.querySelector('input[id="lShapeCheck"]');
            lShapeCheckbox.addEventListener('change', () => {
                if(lShapeCheckbox.checked){
                    drawCompareLine(names[4], compareSVG, editedLShapeData, possibleQuarters, yScaleMin, yScaleMax, color(names[4]));
                    /*
                    lShapeIndex = dataBeingUsed.length;
                    dataBeingUsed.push(editedLShapeData);
                    updateError(dataBeingUsed);
                    */
                }
                else{
                    deleteCompareLine(names[4]);
                    /*
                    dataBeingUsed.splice(lShapeIndex, 1);
                    lShapeIndex = -1;
                    updateError(dataBeingUsed);
                    */
                }
            })
        }

})
;