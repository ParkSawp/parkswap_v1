'use client'

import styles from "../../../public/css/app.module.css";
import { motion } from "framer-motion";
import React, {useCallback, useEffect, useState} from "react";
import SwapFormView from "@/src/components/AppSwapContainer/SwapFormView";
import SendFormView from "@/src/components/AppSwapContainer/SendFormView";
import {ChartIcon, ReloadIcon, SendIcon, SettingsIcon, SwapIcon} from "@/src/components/Icon/Icon";
import Translate from "@/src/components/Translate/Translate";
import {useTranslation} from "react-i18next";

const SWAP_VIEW = 'SWAP_VIEW';
const SEND_VIEW = 'SEND_VIEW';


export default function SwapContainer({setIsGraphOpen,isGraphOpen,setIsWalletConnected,isWalletConnected, onTokensSelect}) {
  const [displaySettings,setDisplaySettings] = useState(false);
  const [shouldResetPrice, setShouldResetPrice] = useState(false);

  const [view, setView] = useState(SWAP_VIEW);
  const { t } = useTranslation();


  const showSwapView = () => setView(SWAP_VIEW);
  const showSendView = () => setView(SEND_VIEW);

  const toggleDisplaySettings = () => {
    setDisplaySettings(!displaySettings);
  };
  const handleResetQuote = () => {
    setShouldResetPrice(true);
  };
  const toggleIsGraphOpen = () => {
    setIsGraphOpen(!isGraphOpen);
  };

  return (
      <>
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className={styles["app-container-wrapper"]}>
          <div className={styles["app-container-menu"]}>
            <ul className={styles["container-menu-firstMenu"]}>
              <li onClick={showSwapView} className={(view === SWAP_VIEW) ? styles['app-menu-active'] : ''} >
                <SwapIcon className={styles["container-menu-icon"]} />
                <span>{t('Swap')}</span>
              </li>
              <li onClick={showSendView} className={(view !== SWAP_VIEW) ? styles['app-menu-active'] : ''}  >
                <SendIcon className={styles["container-menu-icon"]} />
                <span>{t('Send')}</span>
              </li>
            </ul>
            {
                (view === SWAP_VIEW)
                &&
                (
                    <ul className={styles["container-menu-secondMenu"]}>
                      <li className={styles["graph-btn"]} onClick={toggleIsGraphOpen}>
                        <ChartIcon className={styles["container-menu-icon"]} />
                      </li>
                      <li onClick={handleResetQuote}>
                        <ReloadIcon className={styles["container-menu-icon"]} />
                      </li>
                      <li onClick={toggleDisplaySettings}>
                        <SettingsIcon className={styles["container-menu-icon"]}  />
                      </li>
                    </ul>
                )
            }
          </div>
          {
            (view === SWAP_VIEW)
                ? <SwapFormView
                    reset={{shouldResetPrice, setShouldResetPrice}}
                    setIsWalletConnected={setIsWalletConnected}
                    isWalletConnected={isWalletConnected}
                    displaySettings={displaySettings}
                    onTokensSelect={onTokensSelect} />
                : <SendFormView/>
          }
        </motion.div>
      </>
  );
}
