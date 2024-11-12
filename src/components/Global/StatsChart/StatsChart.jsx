import React from 'react';
import CanvasJSReact from "@canvasjs/react-charts";

export default function StatsChart({ title }) {
    const options = {
        exportEnabled: false,
        animationEnabled: true,
        theme: "",
        height: 280,
        padding: 20,
        title: {
            text: title || '',
            padding: 15,
            horizontalAlign: 'left',
            fontFamily: 'Poppins'
        },
        legend: {
            fontSize: 18,
            cursor: 'pointer',
            itemWidth: 110,
        },
        data: [{
            innerRadius: "75%",
            legendMarkerType: "circle",
            name: "New vs Returning Visitors",
            radius: "100%",
            showInLegend: true,
            type: "doughnut",
            startAngle: 90,
            dataPoints: [
                { name: "Eth", y: 30.7 },
                { name: "Matic", y: 36.4 },
                { name: "Cosmos", y: 3.7 },
                { name: "PureFi", y: 20.1 },
                { name: "Flux", y: 9.1 }
            ]
        }]
    };

    return (
        <CanvasJSReact.CanvasJSChart options={options} />
    );
}