
'use client'
import React, { useEffect } from 'react';
import styles from "./ModalSwapSettings.module.css"
import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";

const ModalSwapSettings = ({ isOpen, closeModal, modalTitle, modalContent }) => {
   
    return (
      <>
        <div className={styles["SwapSettingsWrapper"]}>
            <div className={styles["SwapSetting"]}>
              <div className={styles["SwapSettingHeader"]}>
                    <svg width="21px" height="21px">
                        <title>Slippage</title>
                        <image width="21px" height="21px" href="/svg/icons/waves.svg" />
                    </svg>
                    <span>Max Slippage</span>
              </div>
              <div className={styles["SwapSettingBody"]}>
                <div className={styles["SlippageButtons"]}>
                  <input type="radio" name="SlippageButtonOption"  id="SlippageButton_1"/>
                  <label for="SlippageButton_1">Auto</label>
                  <input type="radio" name="SlippageButtonOption"  id="SlippageButton_2"/>
                  <label for="SlippageButton_2">0.1%</label>
                  <input type="radio" name="SlippageButtonOption"  id="SlippageButton_3"/>
                  <label for="SlippageButton_3">0.5%</label>
                  <input type="radio" name="SlippageButtonOption"  id="SlippageButton_4"/>
                  <label for="SlippageButton_4">1%</label>
                  <input type="radio" name="SlippageButtonOption"  id="SlippageButton_5"/>
                  <label for="SlippageButton_5">3%</label>
                  <input type="radio" name="SlippageButtonOption"  id="SlippageButton_6"/>
                  <label for="SlippageButton_6">Custom</label>
                </div>
              </div>
            </div>
            <div className={styles["SwapSetting"]}>
              <div className={styles["SwapSettingHeader"]}>
                <svg width="21px" height="21px">
                        <title>Gas Price</title>
                        <image width="21px" height="21px" href="/svg/icons/gas-station.svg" />
                </svg>
                <span>
                  Gas Price
                </span>
              </div>
              <div className={styles["SwapSettingBody"]}>
                <div className={styles["GasButtons"]}>
                    <input type="radio" name="GasButtonOption" id="GasButton_1"/>
                    <label for="GasButton_1">Auto</label>
                    <input type="radio" name="GasButtonOption" id="GasButton_2"/>
                    <label for="GasButton_2">Slow</label>
                    <input type="radio" name="GasButtonOption" id="GasButton_3"/>
                    <label for="GasButton_3">Market</label>
                    <input type="radio" name="GasButtonOption" id="GasButton_4"/>
                    <label for="GasButton_4">Fast</label>
                  </div>
              </div>
            </div>
        </div>
      </>
    );
  }
  
  export default ModalSwapSettings;
  