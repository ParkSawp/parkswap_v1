
import Canvas from "@canvasjs/react-charts";

export default function PortfolioPerformanceChart({ }) {
    const options = {
        theme: "light",
        animationEnabled: true,
        exportEnabled: false,
        backgroundColor: "transparent",
        axisX: {
            lineDashType: "dot",
            lineThickness: 2
        },
        axisY: {
            gridThickness: 0
        },
        data: [
            {
                type: "area",
                xValueFormatString: "YYYY",
                yValueFormatString: "#,##0.## Million",
                dataPoints: [
                    { x: new Date(2017, 0), y: 7.6},
                    { x: new Date(2016, 0), y: 7.3},
                    { x: new Date(2015, 0), y: 6.4},
                    { x: new Date(2014, 0), y: 5.3},
                    { x: new Date(2013, 0), y: 4.5},
                    { x: new Date(2012, 0), y: 3.8},
                    { x: new Date(2011, 0), y: 3.2}
                ]
            }
        ]
    }
    return (
        <div>
            <Canvas.CanvasJSChart options = {options}
                /* onRef={ref => this.chart = ref} */
            />
        </div>
    );
}