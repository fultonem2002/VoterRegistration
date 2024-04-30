class mapView {
    constructor(con, root) {
        this.con = con;
        this.svg = root.append('div')
            .style('width', '1200')
            .style('height', '850')
            .append('svg')
            .attr('width', 1000)
            .attr('height', 800);
        this.width = 1100;
        this.height = 400;
        this.lastClickedCounty = null;
        this.initMap(con);
    }

    initMap(con) {
        const projection = d3.geoMercator()
            .center([-80, 35.5])
            .scale(7000)
            .translate([this.width / 2, this.height / 2]);
        this.projection = projection;

        const path = d3.geoPath().projection(projection);
        d3.json("./voter_data_by_county_and_party.json").then(voterData => {
            const radiusScale = d3.scaleSqrt().domain([0, 3000000]).range([4, 50]);

            d3.json("./NCCountiesComplete.geo.json").then(ncCounties => {
                this.ncCounties = ncCounties;
                const counties = this.svg.selectAll("path")
                    .data(ncCounties.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .style("fill", "lightgray")
                    .style("stroke", "white")
                    .on("click", (event, d) => this.onClickCounty(event, d, con));

                this.plotCircles(ncCounties, voterData, radiusScale, projection);
            });
        });
    }

    onClickCounty(event, d, con) {
        const currentCountyName = d.properties.NAME.toUpperCase();
        this.svg.selectAll("path")
            .style("fill", "lightgray");
        this.svg.selectAll("circle")
            .transition()
            .duration(300)
            .style("opacity", 0.05);

        if (this.lastClickedCounty && this.lastClickedCounty !== currentCountyName) {
            this.svg.selectAll(`circle[data-county="${this.lastClickedCounty}"]`)
                .transition()
                .duration(300)
                .style("opacity", 0.3)
                .attr("cy", circleData => {
                    const county = this.ncCounties.features.find(f => f.properties.NAME.toUpperCase() === this.lastClickedCounty);
                    const center = this.projection(d3.geoCentroid(county));
                    return center[1];
                });
        }

        d3.select(event.target)
            .style("fill", "lightblue");
        this.svg.selectAll(`circle[data-county="${currentCountyName}"]`)
            .transition()
            .duration(300)
            .style("opacity", 1)
            .attr("cy", (circleData, i) => {
                const county = this.ncCounties.features.find(f => f.properties.NAME.toUpperCase() === currentCountyName);
                const center = this.projection(d3.geoCentroid(county));
                return center[1] + (i * 30) - 10;
            });

        this.lastClickedCounty = currentCountyName;

        this.con.clickMethod(currentCountyName);
    }

    plotCircles(ncCounties, voterData, radiusScale, projection) {
        const partyColors = {
            "DEM": "blue",
            "REP": "red",
            "LIB": "yellow",
            "NLB": "green",
            "UNA": "black"
        };

        ncCounties.features.forEach(county => {
            const center = projection(d3.geoCentroid(county));
            const countyName = county.properties.NAME.toUpperCase();
            const parties = voterData[countyName] || {};
            const sortedParties = Object.keys(parties).sort();

            sortedParties.forEach((party, index) => {
                const radius = radiusScale(parties[party]);
                this.svg.append("circle")
                    .attr("cx", center[0])
                    .attr("cy", center[1])
                    .attr("r", radius)
                    .attr("data-county", countyName)
                    .attr("data-party", party)
                    .style("fill", partyColors[party])
                    .style("opacity", 0.7);
            });
        });
    }
}