class pieCharts {
    constructor(con, root) {
        this.con = con;

        var div = root.append('div')
            .style('width', '100%')
            .style('height', '100%')
            .append('svg');
    }

    createCharts(data) {
        var svg = d3.select("svg");

        let g = svg.append("g")
            .attr("transform", "translate(100,100)");

        var pie = d3.pie();

        //Create arc
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(100);

        //Grouping different arcs
        var arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g");

        arcs.append("path")
            .attr("fill", (data, i)=>{
                let value = data.data;
                return d3.schemeSet3[i];
            })
            .attr("d", arc);
    }
}