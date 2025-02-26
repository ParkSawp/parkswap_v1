'use client';

import styles from "./AppChartContainer.module.css";
import { motion } from "framer-motion";
import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const PriceChart = dynamic(() => import("@/src/components/Global/PriceChart/PriceChart"), { ssr: false });

const ChartContainer = ({ isGraphOpen, sellToken, buyToken }) => {

  const symbol = (sellToken?.symbol || 'BTC')+'USD';

  return (
    <>
      {isGraphOpen && (
        <motion.div
          initial={{ opacity: 0, x:-200 }}
          animate={{ opacity: 1, x:0 }}
          transition= {{ type: "spring", stiffness: 300, damping: 24, duration:0.2}}
          className={styles["chart-container-wrapper"]}
        >
          <PriceChart symbol={symbol} width={700} height={430} />
        </motion.div>
      )}
    </>
  );
}

export default ChartContainer;
