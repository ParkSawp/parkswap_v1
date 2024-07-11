
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
                  <motion.input type="radio" name="demo2" class="demo1" id="demo1-d"/>
                  <label for="demo1-c">Auto</label>
                  <input type="radio" name="demo2" class="demo1" id="demo1-a"/>
                  <label for="demo1-a">0.1%</label>
                  <input type="radio" name="demo2" class="demo1" id="demo1-b"/>
                  <label for="demo1-b">0.5%</label>
                  <input type="radio" name="demo2" class="demo1" id="demo1-c" checked/>
                  <label for="demo1-c">1%</label>
                  <input type="radio" name="demo2" class="demo1" id="demo1-f"/>
                  <label for="demo1-f">3%</label>
                  <input type="radio" name="demo2" class="demo1" id="demo1-e"/>
                  <label for="demo1-e">Custom</label>
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
                <div className={styles["SlippageButtons"]}>
                    <input type="radio" name="demo1" class="demo1" id="demo1-d"/>
                    <label for="demo1-c">Auto</label>
                    <input type="radio" name="demo1" class="demo1" id="demo1-a"/>
                    <label for="demo1-a">Slow</label>
                    <input type="radio" name="demo1" class="demo1" id="demo1-b"/>
                    <label for="demo1-b">Market</label>
                    <input type="radio" name="demo1" class="demo1" id="demo1-c" checked/>
                    <label for="demo1-c">Fast</label>
                  </div>
              </div>
            </div>
        </div>
      </>
    );
  }
  
  export default ModalSwapSettings;
  