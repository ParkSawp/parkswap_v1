// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import AppStyles from "../../../public/css/app.module.css";
import styles from "../../../public/css/market.module.css";
import AppSettingsModal from "../../components/AppSettingsModal/AppSettingsModal";
import Menu from "../../components/Menu/Menu";
// import { Howl, Howler } from "howler";

// import Modal from "../../components/app/Modal";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Home() {
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [settingsButtonVal, setSettingsButtonVal] = useState("...");
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const openSettings = () => {
    setIsSettingOpen(true);
    setSettingsButtonVal("");
  };
  const closeSettings = () => {
    setIsSettingOpen(false);
    setSettingsButtonVal("...");
  };

  return (
    <>
      <Head>
        <title>Parkswap | App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={AppStyles["site-wrapper"]}>
        <AppSettingsModal isOpen={isSettingsOpen} closeModal={closeSettings} />
        <Menu
          openSettings={openSettings}
          settingsButtonVal={settingsButtonVal}
        />
        <motion.div
          className={styles["market-wrapper"]}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles["market-container"]}>
            <div className={styles["market-container-header"]}>
              <h1>Marché</h1>
              <span>Token Name</span>
            </div>
            <div className={styles["market-container-content"]}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Asset</th>
                    <th scope="col">Price</th>
                    <th scope="col">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">ETH</th>
                    <td>$667</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <th scope="row">USDT</th>
                    <td>$667</td>
                    <td>9.2</td>
                  </tr>
                  <tr>
                    <th scope="row">USDC</th>
                    <td>$667</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th scope="row">UNI</th>
                    <td>$667</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles["market-container-insight"]}>
              Crypto Insight Day
            </div>
            <div className={styles["market-container-footer"]}>
              <div
                className={styles["footer-item"]}
                onClick={() => {
                  window.outerHeight = 500;
                  window.outerWidth = 400;
                  window.open("https://www.dlnews.com/", "", "popup=true");
                }}
              >
                <span>News Flash</span>
                <img
                  width="70px"
                  height="80px"
                  src="/img/dlnews.webp"
                  alt="ParkSwap logo"
                />
                <span>DL News</span>
              </div>
              <div className={styles["footer-item"]}>
                <span>DeFi Radar</span>
                <img
                  width="70px"
                  height="80px"
                  src="/svg/icons/defillama.svg"
                  alt=""
                />
                <span>DefiLama</span>
              </div>
              <div className={styles["footer-item"]}>
                <span>Price Watch</span>
                <img
                  width="70px"
                  height="80px"
                  src="/svg/icons/coingecko.svg"
                  alt="ParkSwap logo"
                />
                <span>Coingecko</span>
              </div>
              <div className={styles["footer-item"]}>
                <span>DataHub</span>
                <img
                  width="70px"
                  height="80px"
                  src="/svg/icons/dune.svg"
                  alt="ParkSwap logo"
                />
                <span>Dune</span>
              </div>
              <div className={styles["footer-item"]}>
                <span>EIP Watch</span>
                <img
                  width="70px"
                  height="80px"
                  src="/img/x23.jpg"
                  alt="ParkSwap logo"
                />
                <span>X23.AI</span>
              </div>
            </div>
          </div>
        </motion.div>
        <div className={AppStyles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
