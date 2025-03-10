"use client";

import AppLayout from "@/src/app/AppLayout"
import styles from "../../../public/css/app.module.css";
import SwapContainer from "../../components/AppSwapContainer/AppSwapContainer";
import ChartContainer from "../../components/AppChartContainer/AppChartContainer";

import React, { useState } from "react";
import AppSwapHistory from "@/src/components/AppSwapHistory/AppSwapHistory";

export default function Home() {
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [tokens, setTokens] = useState({ buyToken: null, sellToken: null });


  return (
      <AppLayout >
          <div className={styles["app-container"]}>
              <SwapContainer
                setIsGraphOpen={setIsGraphOpen}
                isGraphOpen={isGraphOpen}
                isWalletConnected={isWalletConnected}
                setIsWalletConnected={setIsWalletConnected}
                onTokensSelect={setTokens}
              />
              <ChartContainer isGraphOpen={isGraphOpen} {...tokens} />
          </div>
          {/*<AppSwapHistory />*/}
      </AppLayout>
  );
}
