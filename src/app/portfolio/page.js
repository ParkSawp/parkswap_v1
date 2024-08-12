// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import AppStyles from "../../../public/css/app.module.css";
import styles from "../../../public/css/portfolio.module.css";
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
          className={styles["portfolio-wrapper"]}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles["portfolio-container"]}>
            <div className={styles["portfolio-container-header"]}>
              {/* <div className={styles["header-starknetId"]}>STARKNET.ID</div> */}
              <div className={styles["header-picture"]}>&nbsp;</div>
              <div className={styles["header-title"]}>
                <div className={styles["header-title-title"]}>My Account</div>
                <div className={styles["header-title-address"]}>
                  <span>0xEczMZjMUo5QPCWa9vxZ6me2cjQhqgvFqVU4XBCgx2tSw</span>
                </div>
              </div>
              <div className={styles["header-amount"]}>
                <div className={styles["header-amount-amount"]}>$32,093,90</div>
                <div className={styles["header-amount-percent"]}>-3.98%</div>
              </div>
            </div>
            <div className={styles["portfolio-container-body"]}>
              <div className={styles["body-container"]}>
                <div className={styles["body-container-header"]}>
                  <ul>
                    <li>Portfolio</li>
                    <li>History</li>
                    <li>Settings</li>
                    <li>NFT</li>
                  </ul>
                </div>
              </div>
              <div className={styles["body-container-body"]}>
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
            </div>
          </div>
        </motion.div>
        <div className={AppStyles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
