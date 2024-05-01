let Dem = [];
let Rep = [];
let Gre = [];
let Lib = [];
let Nlb = [];
let Una = [];

class pieCharts {
    constructor(con, root) {
        const div = root.append('div')
            .style('width', '50%')
            .style('height', '100%')
            .append("svg");

        d3.csv('voterStats.csv')
            .then(data => {
                this.readData(data, null);
                this.createPieChart(Dem, "Democratic");
                this.createPieChart(Rep, "Republican");
                this.createPieChart(Gre, "Green");
                this.createPieChart(Lib, "Libertarian");
                this.createPieChart(Nlb, "No Label");
                this.createPieChart(Una, "Unaffiliated");
            })
    }

    // This function creates the pie chart
    createPieChart(party, title) {
        // set the dimensions and margins of the graph
        const width = 240;
        const height = 250;
        const margin = 15;
        const radius = Math.min(width, height) / 2 - margin;


        // append the svg object to the div called 'my_dataviz'
        const svg = d3.select("#pieCharts")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        svg.append("text")
            .attr("x", -50)
            .attr("y", -110)
            .attr("text-anchro", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(title);

        const data = { Male: party[0], Female: party[1], Unknown: party[2] }

        // set the color scale
        const color = d3.scaleOrdinal()
            .range(["#43A6C6", "#FF5C5C", "#737373"])

        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .value(function (d) { return d[1] })
        const data_ready = pie(Object.entries(data))

        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
            .selectAll('whatever')
            .data(data_ready)
            .join('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr('fill', function (d) { return (color(d.data[1])) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

        
        // Now add the annotation. Use the centroid method to get the best coordinates
        svg
            .selectAll('mySlices')
            .data(data_ready)
            .join('text')
            .text(function (d) {
                // Calculate percentage
                const percent = (d.data[1] / d3.sum(party) * 100);
                return percent.toFixed(1) + "%" + "\n" +  "(" + d.data[0].charAt(0) + ")";
            })
            .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", 17)
        
    }

    clickMethod(county) {
        //To implement after merging with map code
        // Essentially just need to make sure: 
        //      - current pie charts are erased...
        //      - data is adjusted (implemented i think)
        //      - recreate all of the pie charts

        //Clear current Pie Charts
        this.removePieCharts();
        d3.csv('voterStats.csv')
            .then(data => {
                this.readData(data, county);
                this.createPieChart(Dem, "Democratic");
                this.createPieChart(Rep, "Republican");
                this.createPieChart(Gre, "Green");
                this.createPieChart(Lib, "Libertarian");
                this.createPieChart(Nlb, "No Label");
                this.createPieChart(Una, "Unaffiliated");
            })
    }

    removePieCharts() {
        d3.select("#pieCharts").selectAll("*").remove();
    }

    readData(data, county) {
        for (let x = 0; x < 3; x++) {
            Rep[x] = 0;
            Dem[x] = 0;
            Gre[x] = 0;
            Lib[x] = 0;
            Nlb[x] = 0;
            Una[x] = 0;
        }

        if (county == null) {
            data.forEach(row => {
                var party = row['party_cd'];
                var gender = row['sex_code'];
                switch (party) {
                    case "REP": //Found
                        if (gender == "M") Rep[0]++;
                        else if (gender == "F") Rep[1]++;
                        else Rep[2]++;
                        break;
                    case "DEM": //Found
                        if (gender == "M") Dem[0]++;
                        else if (gender == "F") Dem[1]++;
                        else Dem[2]++;
                        break;
                    case "GRE":
                        if (gender == "M") Gre[0]++;
                        else if (gender == "F") Gre[1]++;
                        else Gre[2]++;
                        break;
                    case "LIB": //Found
                        if (gender == "M") Lib[0]++;
                        else if (gender == "F") Lib[1]++;
                        else Lib[2]++;
                        break;
                    case "NLB":
                        if (gender == "M") Nlb[0]++;
                        else if (gender == "F") Nlb[1]++;
                        else Nlb[2]++;
                        break;
                    case "UNA":
                        if (gender == "M") Una[0]++;
                        else if (gender == "F") Una[1]++;
                        else Una[2]++;
                        break;
                    default:
                        return;
                }
            })
        }
        else {
            data.forEach(row => {
                var party = row['party_cd'];
                var gender = row['sex_code'];
                var curCounty = row['county_desc'];
                switch (party) {
                    case "REP":
                        if (gender == "M" && county == curCounty) Rep[0]++;
                        else if (gender == "F" && county == curCounty) Rep[1]++;
                        else if (county == curCounty) Rep[2]++;
                        break;
                    case "DEM":
                        if (gender == "M" && county == curCounty) Dem[0]++;
                        else if (gender == "F" && county == curCounty) Dem[1]++;
                        else if (county == curCounty) Dem[2]++;
                        break;
                    case "GRE":
                        if (gender == "M" && county == curCounty) Gre[0]++;
                        else if (gender == "F" && county == curCounty) Gre[1]++;
                        else if (county == curCounty) Gre[2]++;
                        break;
                    case "LIB": //Found
                        if (gender == "M" && county == curCounty) Lib[0]++;
                        else if (gender == "F" && county == curCounty) Lib[1]++;
                        else if (county == curCounty) Lib[2]++;
                        break;
                    case "NLB":
                        if (gender == "M" && county == curCounty) Nlb[0]++;
                        else if (gender == "F" && county == curCounty) Nlb[1]++;
                        else if (county == curCounty) Nlb[2]++;
                        break;
                    case "UNA":
                        if (gender == "M" && county == curCounty) Una[0]++;
                        else if (gender == "F" && county == curCounty) Una[1]++;
                        else if (county == curCounty) Una[2]++;
                        break;
                    default:
                        return;
                }
            })
        }
    }
}