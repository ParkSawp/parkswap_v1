
import React, {useState} from 'react';
import  CanvasJSReact from "@canvasjs/react-charts";


const generateDataPoints = (noOfDps) => { // Todo: remove when real data will be used
    var xVal = 1, yVal = 100;
    var dps = [];
    for(var i = 0; i < noOfDps; i++) {
        yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
        dps.push({x: xVal,y: yVal});
        xVal++;
    }
    return dps;
}

export default function PriceChart({ data, zoom = false, animated= false, title }) {

    const [options] = useState({
        theme: "light2",
        animationEnabled: animated,
        zoomEnabled: zoom,
        width: 100,
        height: 50,
        axisX:{
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            margin: -10,
            valueFormatString: ' ',
            // labelFormatter: function(){
            //     return " ";
            // }
        },
        axisY:{
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
            margin: -10,
            valueFormatString: ' ',
            labelFormatter: function(){
                return " ";
            }
        },
        title: {
            text: title || ''
        },
        data: [{
            type: "area",
            dataPoints: generateDataPoints(500)
        }]
    });

    return (
        <CanvasJSReact.CanvasJSChart options={options} />
    );
}