new (class Control {
    constructor() {
        const root = d3.select('body').append('div')
            .style('width', '120vw')
            .style('height', '60vw');

        // Change the file names below to fit:
        //this.pieCharts = new pieCharts(this, root);
        // this.barChart = new BarChart(this, root);
        this.mapView = new mapView(this, root);
        this.pieCharts = new pieCharts(this, root);
        this.barChart = new barChart(this, root);
    }

    Test(str) {
        console.log(str);
    }

    // For the interaction part
    clickMethod(County){
        console.log(County);
        this.pieCharts.clickMethod(County);
        this.barChart.updateChart(County);
        //this.viewA.receiveInfo(Message,Color);
        //this.viewB.receiveInfo(Message,Color);
        //this.viewC.receiveInfo(Message,Color);
    }
})()
