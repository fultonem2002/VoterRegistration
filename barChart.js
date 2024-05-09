class barChart {
    constructor(control, root) {
        this.control = control;
        this.svg = root.append('div')
            .style('width', '600px')
            .style('height', '600px')
            .append('svg')
            .attr('width', '600px')
            .attr('height', '600px');
        this.width = 600;
        this.height = 600;
        this.margin = { top: 50, right: 20, bottom: 30, left: 40 }; 
        this.g = this.svg.append('g').attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        this.svg.append("text")
            .attr("x", this.width / 2)
            .attr("y", 30) 
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .style("font-family", "Arial, sans-serif")
            .text("Voter Demographics by County");

        this.x = d3.scaleBand().rangeRound([0, this.width - this.margin.left - this.margin.right]).padding(0.05);
        this.y = d3.scaleLinear().rangeRound([this.height - this.margin.top - this.margin.bottom, 0]);
        this.z = d3.scaleOrdinal().domain(['DEM', 'REP', 'LIB', 'NLB', 'UNA']).range(['#F1DBDC', '#EBBCBA', '#CD7C84', '#9193AB', '#678AB4']);
        this.keys = ['DEM', 'REP', 'LIB', 'NLB', 'UNA'];

        d3.csv('county_processed_voterStats.csv').then(data => {
            this.data = data.map(d => {
                let total = this.keys.reduce((acc, key) => acc + +d[key], 0);
                this.keys.forEach(key => {
                    d[key] = (total ? (d[key] / total) * 100 : 0).toFixed(2);
                });
                return d;
            });
            this.updateChart(this.data[0].county_desc);
        });
    }


    updateChart(county) {
        const filteredData = this.data.filter(d => d.county_desc === county);
        if (filteredData.length === 0) {
            console.log("No data for selected county:", county);
            return;
        }

        this.x.domain(filteredData.map(d => d.race_code));
        this.y.domain([0, 100]); 

        this.g.selectAll('*').remove();

        filteredData.forEach(d => {
            let y0 = 0;
            this.keys.forEach(key => {
                const y1 = y0 + +d[key];
                this.g.append('rect')
                    .attr('x', this.x(d.race_code) + 10)
                    .attr('y', this.y(y1))
                    .attr('width', this.x.bandwidth() - 20)
                    .attr('height', this.y(y0) - this.y(y1))
                    .attr('fill', this.z(key));

                if (d[key] > 5) { 
                    this.g.append('text')
                        .attr('x', this.x(d.race_code) + this.x.bandwidth() / 2)
                        .attr('y', this.y(y0 + (+d[key] / 2)))
                        .attr('dy', '0.35em')
                        .attr('text-anchor', 'middle')
                        .text(`${d[key]}%`)
                        .style('fill', 'black')
                        .style('font-size', '18px')
                        .style('font-weight', 'bold')
                }
                y0 = y1; 
            });
        });

        this.g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .call(d3.axisBottom(this.x));

    }
}