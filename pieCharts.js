let Rep = [];
let Dem = [];
let Gre = [];
let Lib = [];
let Nlb = [];
let Una = [];

class pieCharts {
    constructor(con, root) {
        console.log("Pie Chart constructor called");

        const div = root.append('div')
            .style('width', '50%')
            .style('height', '100%')
            .append("svg");

        d3.csv('voterStats.csv')
            .then(data => {
                this.readData(data);
                // Colors for displaying M / F / Unknown
                const colors = ["Blue", "Red", "Black"];
                this.createPieChart(Dem);
                this.createPieChart(Rep);
                this.createPieChart(Gre);
                this.createPieChart(Lib);
                this.createPieChart(Nlb);
                this.createPieChart(Una);
            })
    }

    // This function creates the pie chart
    createPieChart(party) {
        // set the dimensions and margins of the graph
        const width = 231;
        const height = 231;
        const margin = 10;
        const radius = Math.min(width, height) / 2 - margin;


        // append the svg object to the div called 'my_dataviz'
        const svg = d3.select("#pieCharts")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const data = { Man: party[0], Woman: party[1], Unknown: party[2] }

        // set the color scale
        const color = d3.scaleOrdinal()
            .range(["#0000FF", "#FF0000", "#00000"])

        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .value(function (d) { return d[1] })
        const data_ready = pie(Object.entries(data))

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
    }

    readData(data) {
        console.log("readData called");

        for (let x = 0; x < 3; x++) {
            Rep[x] = 0;
            Dem[x] = 0;
            Gre[x] = 0;
            Lib[x] = 0;
            Nlb[x] = 0;
            Una[x] = 0;
        }

        data.forEach(row => {
            var party = row['party_cd'];
            var gender = row['sex_code'];
            switch (party) {
                case "REP": //Found
                    if (gender == "M") {
                        Rep[0]++;
                    }
                    else if (gender == "F") {
                        Rep[1]++;
                    }
                    else {
                        Rep[2]++;
                    }
                    break;
                case "DEM": //Found
                    if (gender == "M") {
                        Dem[0]++;
                    }
                    else if (gender == "F") {
                        Dem[1]++;
                    }
                    else {
                        Dem[2]++;
                    }
                    break;
                case "GRE":
                    if (gender == "M") {
                        Gre[0]++;
                    }
                    else if (gender == "F") {
                        Gre[1]++;
                    }
                    else {
                        Gre[2]++;
                    }
                    break;
                case "LIB": //Found
                    if (gender == "M") {
                        Lib[0]++;
                    }
                    else if (gender == "F") {
                        Lib[1]++;
                    }
                    else {
                        Lib[2]++;
                    }
                    break;
                case "NLB":
                    if (gender == "M") {
                        Nlb[0]++;
                    }
                    else if (gender == "F") {
                        Nlb[1]++;
                    }
                    else {
                        Nlb[2]++;
                    }
                    break;
                case "UNA":
                    if (gender == "M") {
                        Una[0]++;
                    }
                    else if (gender == "F") {
                        Una[1]++;
                    }
                    else {
                        Una[2]++;
                    }
                    break;
                default:
                    if (gender == "M") {
                        NOTFOUND[0]++;
                    }
                    else if (gender == "F") {
                        NOTFOUND[1]++;
                    }
                    else {
                        NOTFOUND[2]++;
                    }
            }
        })

        console.log("Rep M : " + Rep[0]);
        console.log("Dem M : " + Dem[0]);
        console.log("Gre M : " + Gre[0]);
        console.log("Lib M : " + Lib[0]);
        console.log("Nl M : " + Nlb[0]);
        console.log("Una M : " + Una[0]);

        console.log("Rep F : " + Rep[1]);
        console.log("Dem F : " + Dem[1]);
        console.log("Gre F : " + Gre[1]);
        console.log("Lib F : " + Lib[1]);
        console.log("Nl F : " + Nlb[1]);
        console.log("Una F : " + Una[1]);

        console.log("Rep U : " + Rep[2]);
        console.log("Dem U : " + Dem[2]);
        console.log("Gre U : " + Gre[2]);
        console.log("Lib U : " + Lib[2]);
        console.log("Nl U : " + Nlb[2]);
        console.log("Una U : " + Una[2]);
    }
}