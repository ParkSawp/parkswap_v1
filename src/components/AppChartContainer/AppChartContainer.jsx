'use client';

import styles from "./AppChartContainer.module.css";
import { motion } from "framer-motion";
import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from "react";

const ChartContainer = ({ isGraphOpen }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);  // Store the chart instance

  useEffect(() => {
    if (isGraphOpen && chartContainerRef.current) {
      // Create the chart
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { color: 'transparent' },
          textColor: '#000000',
        },
        grid: {
          vertLines: { color: 'transparent' },
          horzLines: { color: 'transparent' },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        rightPriceScale: {
          visible: false,
        },
        leftPriceScale: {
          visible: true,
        },
      });

      const chart = chartRef.current;

      chart.timeScale().fitContent();

      const areaSeries = chart.addAreaSeries({
        lineColor: '#088a24',
        topColor: '#bff4cf',
        bottomColor: 'transparent'
      });

      // Sample data
      const data = [
        { value: 3, time: 1642425322 },
        { value: 15, time: 1642511722 },
        { value: 22, time: 1642598122 },
        { value: 48, time: 1642684522 },
        { value: 9, time: 1642770922 },
        { value: 56, time: 1642857322 },
        { value: 33, time: 1642943722 },
        { value: 72, time: 1643030122 },
        { value: 12, time: 1643116522 },
        { value: 88, time: 1643202922 },
        { value: 41, time: 1643289322 },
        { value: 99, time: 1643375722 },
        { value: 61, time: 1643462122 },
        { value: 105, time: 1643548522 },
        { value: 54, time: 1643634922 },
        { value: 70, time: 1643721322 },
        { value: 89, time: 1643807722 },
        { value: 67, time: 1643894122 },
        { value: 115, time: 1643980522 },
        { value: 81, time: 1644066922 },
        { value: 43, time: 1644153322 },
        { value: 91, time: 1644239722 },
        { value: 105, time: 1644326122 },
        { value: 49, time: 1644412522 },
        { value: 113, time: 1644498922 },
        { value: 72, time: 1644585322 },
        { value: 124, time: 1644671722 },
        { value: 96, time: 1644758122 },
        { value: 130, time: 1644844522 },
        { value: 83, time: 1644930922 },
        { value: 142, time: 1645017322 },
        { value: 58, time: 1645103722 },
        { value: 160, time: 1645190122 },
        { value: 102, time: 1645276522 },
        { value: 174, time: 1645362922 },
        { value: 87, time: 1645449322 },
        { value: 123, time: 1645535722 },
        { value: 193, time: 1645622122 },
        { value: 147, time: 1645708522 },
        { value: 205, time: 1645794922 },
        { value: 118, time: 1645881322 },
        { value: 152, time: 1645967722 },
        { value: 200, time: 1646054122 },
        { value: 135, time: 1646140522 },
        { value: 182, time: 1646226922 },
        { value: 160, time: 1646313322 },
        { value: 220, time: 1646399722 },
        { value: 185, time: 1646486122 },
        { value: 175, time: 1646572522 },
        { value: 240, time: 1646658922 },
        { value: 189, time: 1646745322 },
        { value: 253, time: 1646831722 },
        { value: 134, time: 1646918122 },
        { value: 198, time: 1647004522 },
        { value: 212, time: 1647090922 },
        { value: 270, time: 1647177322 },
        { value: 185, time: 1647263722 },
        { value: 290, time: 1647350122 },
        { value: 165, time: 1647436522 },
        { value: 275, time: 1647522922 },
        { value: 290, time: 1647609322 },
        { value: 220, time: 1647695722 },
        { value: 305, time: 1647782122 },
        { value: 250, time: 1647868522 },
        { value: 330, time: 1647954922 },
        { value: 175, time: 1648041322 },
        { value: 320, time: 1648127722 },
        { value: 285, time: 1648214122 },
        { value: 310, time: 1648300522 },
        { value: 340, time: 1648386922 },
        { value: 295, time: 1648473322 },
        { value: 360, time: 1648559722 },
        { value: 325, time: 1648646122 },
        { value: 375, time: 1648732522 },
        { value: 350, time: 1648818922 },
        { value: 370, time: 1648905322 },
        { value: 400, time: 1648991722 },
        { value: 345, time: 1649078122 },
        { value: 420, time: 1649164522 },
        { value: 375, time: 1649250922 },
        { value: 430, time: 1649337322 },
        { value: 365, time: 1649423722 },
        { value: 440, time: 1649510122 },
        { value: 385, time: 1649596522 },
        { value: 455, time: 1649682922 },
        { value: 390, time: 1649769322 },
        { value: 470, time: 1649855722 },
        { value: 405, time: 1649942122 },
        { value: 485, time: 1650028522 },
        { value: 420, time: 1650114922 },
        { value: 500, time: 1650201322 },
        { value: 435, time: 1650287722 }
      ];

      areaSeries.setData(data);

      chart.priceScale("left").applyOptions({
        borderColor: 'transparent',
      });
      chart.timeScale().applyOptions({
        borderColor: 'transparent',
        fixLeftEdge: true,
        fixRightEdge: true,
      });

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        chart.remove();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isGraphOpen]); // Dependency array includes isGraphOpen

  return (
    <>
      {isGraphOpen && (
        <motion.div
          initial={{ opacity: 0, x:-200 }}
          animate={{ opacity: 1, x:0 }}
          transition= {{ type: "spring", stiffness: 300, damping: 24, duration:0.5}}
          className={styles["chart-container-wrapper"]}
        >
          <div className={styles["chart-container"]} ref={chartContainerRef} />
        </motion.div>
      )}
    </>
  );
}

export default ChartContainer;
