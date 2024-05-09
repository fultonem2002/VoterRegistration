new (class Control {
    constructor() {
        const root = d3.select('body').append('div')
            .style('width', '120vw')
            .style('height', '60vw')

        this.barChart = new barChart(this, root);
        this.mapView = new mapView(this, root);
        this.pieCharts = new pieCharts(this, root);
        this.legend = new legend(this, root);
    }

    Test(str) {
        console.log(str);
    }

    clickMethod(County){
        console.log(County);
        this.pieCharts.clickMethod(County);
        this.barChart.updateChart(County);
    }
})()
