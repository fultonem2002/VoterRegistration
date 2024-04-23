new (class Control {
    constructor() {
        const root = d3.select('body').append('div')
            .style('width', '120vw')
            .style('height', '60vw');

        // Change the file names below to fit:
        // this.pieChart = new PieChart(this, root);
        // this.barChart = new BarChart(this, root);
        // this.mapView = new MapView(this, root);
    }

    Test(str) {
        console.log(str);
    }

    // For the interaction part
    clickMethod(Message,Color){
        this.viewA.receiveInfo(Message,Color);
        this.viewB.receiveInfo(Message,Color);
        this.viewC.receiveInfo(Message,Color);
    }
})()
