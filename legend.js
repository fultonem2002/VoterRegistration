class legend {
    constructor(con, root) {
        this.con = con;
        this.svg = root.append('svg')
            .attr('width', '400px') 
            .attr('height', '450px')
            .style('background', '#f9f9f9')
            .style('position', 'absolute')
            .style('margin-left', '-500px')
            .style('margin-top', '600px');

        this.drawLegend();
    }

    drawLegend() {
        const partyColors = {
            "DEM": "#F1DBDC",
            "REP": "#EBBCBA",
            "LIB": "#CD7C84",
            "NLB": "#9193AB",
            "UNA": "#678AB4"
        };

        const genderColors = {
            "Male": "#43A6C6",
            "Female": "#FF5C5C",
            "Unknown": "#737373"
        };

        const raceCodes = {
            "B": "Black",
            "U": "Unknown",
            "A": "Asian",
            "M": "Mixed",
            "W": "White",
            "O": "Other",
            "I": "Indigenous",
            "P": "Pacific Islander"
        };

        const legend = this.svg.append('g')
            .attr('transform', 'translate(10, 10)'); 

        legend.append('text')
            .attr('x', 0)
            .attr('y', 5)
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .text('Legend');

        let offsetY = 30; 
        Object.entries(partyColors).concat(Object.entries(genderColors)).forEach(([label, color], index) => {
            const legendEntry = legend.append('g')
                .attr('transform', `translate(0, ${offsetY})`);

            legendEntry.append('rect')
                .attr('width', 20)
                .attr('height', 20)
                .style('fill', color);

            legendEntry.append('text')
                .attr('x', 30)
                .attr('y', 15)
                .text(label);

            offsetY += 30; 
        });

        const voterSizes = [5, 10, 15]; 
        const voterLabel = ['Less Voters', 'Moderate Voters', 'More Voters'];
        voterSizes.forEach((size, index) => {
            const circleEntry = legend.append('g')
                .attr('transform', `translate(0, ${offsetY})`);

            circleEntry.append('circle')
                .attr('cx', 10)
                .attr('cy', 10)
                .attr('r', size)
                .style('fill', '#000000');

            circleEntry.append('text')
                .attr('x', 30)
                .attr('y', 15)
                .text(voterLabel[index]);

            offsetY += 30 + size * 2;
        });

        // Add race codes to the right of the existing items
        offsetY = 30; // Reset to start at the same vertical start
        Object.entries(raceCodes).forEach(([code, desc], index) => {
            const raceEntry = legend.append('g')
                .attr('transform', `translate(180, ${offsetY})`); // Offset to the right

            raceEntry.append('text')
                .attr('x', 0)
                .attr('y', 15)
                .text(`${code} - ${desc}`);

            offsetY += 30;
        });
    }
}