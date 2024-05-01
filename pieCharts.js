let Dem = [];
let Rep = [];
let Gre = [];
let Lib = [];
let Nlb = [];
let Una = [];

class pieCharts {
    constructor(con, root) {
        this.div = root.append('div')
            .style('width', '50%')
            .style('height', '100%');

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

    createPieChart(party, title) {
        const width = 230;
        const height = 250;
        const margin = 15;
        const radius = Math.min(width, height) / 2 - margin;

        const svg = this.div
            .append("svg")
            .attr("class", "pie-chart")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        svg.append("text")
            .attr("x", -50)
            .attr("y", -110)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(title);

        const data = { Male: party[0], Female: party[1], Unknown: party[2] }

        const color = d3.scaleOrdinal()
            .range(["#43A6C6", "#FF5C5C", "#737373"])

        const pie = d3.pie()
            .value(function (d) { return d[1] })
        const data_ready = pie(Object.entries(data))

        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        svg.selectAll('whatever')
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

        svg.selectAll('mySlices')
            .data(data_ready)
            .join('text')
            .text(function (d) {
                const percent = (d.data[1] / d3.sum(party) * 100);
                return percent.toFixed(1) + "%" + "\n" +  "(" + d.data[0].charAt(0) + ")";
            })
            .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", 17)
    }

    clickMethod(county) {
        this.div.selectAll(".pie-chart").remove();

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

    readData(data, county) {
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
            var curCounty = row['county_desc'];

            if (county == null || county == curCounty) {
                switch (party) {
                    case "REP":
                        if (gender == "M") Rep[0]++;
                        else if (gender == "F") Rep[1]++;
                        else Rep[2]++;
                        break;
                    case "DEM":
                        if (gender == "M") Dem[0]++;
                        else if (gender == "F") Dem[1]++;
                        else Dem[2]++;
                        break;
                    case "GRE":
                        if (gender == "M") Gre[0]++;
                        else if (gender == "F") Gre[1]++;
                        else Gre[2]++;
                        break;
                    case "LIB":
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
            }
        })
    }
}