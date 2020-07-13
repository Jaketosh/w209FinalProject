var dataPath = "data/historical_gdp_quarterly.json";


drawGDPGraph = function(svg, data, avgGDPChange){
    var svgHeight = 500;
    var svgWidth = 925;

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
    for (let index = 0; index < data.length; index++) {
        var currentElement = data[index];
        dates.push(currentElement["date"]);
        changeValues.push(currentElement["change-current"]);
    }

    console.log(dates);
    console.log(changeValues);
    var xScale = d3.scaleBand()
        .domain(dates)
        .range([0, width]);
    
    var minVal = Math.min(Math.min.apply(Math, changeValues) - 2, 0);
    var maxVal = Math.max.apply(Math, changeValues) + 2;
    var yScale = d3.scaleLinear()
        .domain([minVal, maxVal])
        .range([height, 0]);

    svg.append("g")
        .append("path")
        .attr("class", "dataLine")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "Steelblue")
        .attr("stroke-width", "3px")
        .attr("d", d3.line()
            .x(function(d, i){ return xScale(d["date"]); })
            .y(function(d, i){ return yScale(d["change-current"]); }))
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

    svg.append("g")
        .append("line")
        .attr("class", "zeroLine")
        .attr("fill", "none")
        .attr("stroke", "#888888")
        .attr("stroke-width", "1px")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", yScale(0))
        .attr("y2", yScale(0))
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")");

    //TODO *********************************
    //Fix x axis offset from line
    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(" + xMargin + ", " + (height + yMargin) + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + xMargin + ", " + yMargin + ")")
        .call(d3.axisLeft(yScale)
            .tickFormat(d => d + "%"));

    d3.selectAll(".xAxis")
        .selectAll(".tick")
        .select("text")
        .attr("transform", "rotate(45)")
        .attr("text-anchor", "start");

    d3.selectAll(".xAxis")
        .append("g")
        .attr("class", "xAxisLabel")
        .append("text")
        .attr("transform", "translate(" + ((width + xMargin)/2) + ", " + (60) + ")")
        .attr("text-anchor", "middle")
        .attr("fill", "Black")
        .attr("font-size", "15px")
        .text("Quarter");

    d3.selectAll(".yAxis")
        .append("g")
        .attr("class", "yAxisLabel")
        .append("text")
        .attr("transform", "translate(" + (-40) + ", " + ((height+yMargin)/2) + "), rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("fill", "Black")
        .attr("font-size", "15px")
        .text("Percent Change from Previous Quarter");
        
    console.log(data);
}

d3.json(dataPath,function(data) {
        var vShape1952_1955 = [];
        var uShape1973_1975 = [];
        var wShape1978_1983 = [];
        var lShape2006_2009 = [];

        var avgGDPGrowth1947_2009 = 0;
        var count = 0;

        for (let index = 0; index < data.length; index++) {
            var currentElement = data[index];
            var currentGDPChange = currentElement["change-current"];
            var currentDate = currentElement["date"];
            var currentYear = currentDate.substring(0,4);
            var currentQuarter = currentDate.substring(5,7);

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

            currentElement["date"] = currentYear + " " +currentQuarter;

            var yearAsInt = parseInt(currentYear);
            if(currentYear >= 1952 && currentYear <= 1955)
            {
                vShape1952_1955.push(currentElement);
            }
            else if(currentYear >= 1973 && currentYear <= 1975)
            {
                uShape1973_1975.push(currentElement);
            }
            else if(currentYear >= 1978 && currentYear <= 1983)
            {
                wShape1978_1983.push(currentElement);
            }
            else if(currentYear >= 2006 && currentYear <= 2009)
            {
                lShape2006_2009.push(currentElement);
            }

            if(currentYear >= 1947 && currentYear <= 2009)
            {
                avgGDPGrowth1947_2009 += currentGDPChange;
                count++;
            }

        }

        avgGDPGrowth1947_2009 /= count;

        var vShapeSVG = d3.select("#vShapeSVG");
        drawGDPGraph(vShapeSVG, vShape1952_1955, avgGDPGrowth1947_2009);

        var uShapeSVG = d3.select("#uShapeSVG");
        drawGDPGraph(uShapeSVG, uShape1973_1975, avgGDPGrowth1947_2009);

        var wShapeSVG = d3.select("#wShapeSVG");
        drawGDPGraph(wShapeSVG, wShape1978_1983, avgGDPGrowth1947_2009);

        var lShapeSVG = d3.select("#lShapeSVG");
        drawGDPGraph(lShapeSVG, lShape2006_2009, avgGDPGrowth1947_2009);

});