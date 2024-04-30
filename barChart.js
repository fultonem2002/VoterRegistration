// Todo: Interact with different counties and show individual sets per county
class barGraph {
    constructor(con, root) {

    }

    createBarCharts(data) {
        var svg = d3.select("svg"),
        margin = {top: 40, right: 30, bottom: 20, left: 40},
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

        var xAxis = d3.scaleBand().range ([0, width]).padding(0.5),
        yAxis = d3.scaleLinear().range ([height, 0]);


        var g = svg.append("g")
            .attr("transform", "translate(100, 100)");



        d3.csv('voter_stats.csv', function(error, data) {
            if (error) {
                throw error;
            }

        // X-Axis
        var xAxis = d3.scaleBand()
            .domain()
            .range([0, width])
            .padding([0.3])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xAxis).tickSzeOuter(0));

        // Y-Axis
            var yAxis = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(yAxis));

        // Adds color
        var color = d3.scaleOrdinal()
            .domain()
            .range(['#ff0000', '#0000FF', '#00FF00', '#FFFF00', '#FFC0CB', '#CBC3E3'])

        // Stacking data
        var stackData = d3.stack()
            .keys('party_cd')
            .(data)
        
        // X Axis Label
        svg.append('text')
        .attr('x', width/2)
        .attr('y', height + 30)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Race');

        // Y Axis Label
        svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(-30,' + height/2 + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Party');
        
        // Bars
        var groups = svg.selectAll("g.bars")
            .data()
            .enter().append("g")
            .attr("class", "bars")
            .style("fill", function(d, i) { return colors[i]; })
            .style("stroke", "#000");
        
        var rect = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.x); })
        .attr("y", function(d) { return yScale(d.y0 + d.y); })
        .attr("height", function(d) { return yScale(d.y0) - yScale(d.y0 + d.y); })
        .attr("width", xScale.rangeBand())
        }
    )}
}