"use client";

import Head from "next/head";
import AppStyles from "../../../public/css/app.module.css";
import styles from "../../../public/css/trad-market.module.css";
import AppSettingsModal from "../../components/AppSettingsModal/AppSettingsModal";
import Menu from "../../components/Menu/Menu";

import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import axios from "axios";
import TradFinanceWidgetWrapper from "@/src/components/Global/TradFinanceWidgetWrapper/TradFinanceWidgetWrapper";
import TradFiRawMaterial from "@/src/components/TradFiRawMaterial/TradFiRawMaterial";
import TradFiActions from "@/src/components/TradFiActions/TradFiActions";
import TradFiObligations from "@/src/components/TradFiObligations/TradFiObligations";

export default function Home() {
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [settingsButtonVal, setSettingsButtonVal] = useState("...");
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [searchKey, setSearchKey] = useState('');


  useEffect(() => {
    axios.get('/api/market/tokens')
        .then(response => {
          setTokens(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the tokens!", error);
        });
  }, []);

  useEffect(() => {
    setFilteredTokens(tokens.filter((token) => {
      return token.token.address.toLowerCase().includes(searchKey)
          || token.token.name.toLowerCase().includes(searchKey);
    }));
  }, [tokens, searchKey]);

  const handleSearchInput = (event) => {
    setSearchKey(event.target.value)
  };

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
          <div className={styles["trad-market-container"]} >
            <div className={styles['trad-market-infos-container']}>
              <div className={styles['trad-market-info']} >
                <div className={styles['trad-market-info-label']} >Devise</div>
                <div className={styles['trad-market-info-value']} >€</div>
              </div>
              <div className={styles['trad-market-info']} >
                <div className={styles['trad-market-info-label']} >Time Frame</div>
                <div className={styles['trad-market-info-value']} >7D</div>
              </div>
              <div className={styles['trad-market-info']} >
                <div className={styles['trad-market-info-label']} >Filtre</div>
                <div className={styles['trad-market-info-value']} >Course</div>
              </div>
            </div>

            <div className={styles['widgets-container']} >
              <TradFiRawMaterial  />
              <TradFiActions  />
              <TradFiObligations  />
            </div>

            <div className={styles['trad-market-applications-container']}>
              <div className={styles['trad-market-applications-title']}>
                Analyse Macro du jour
              </div>
              <div className={styles['trad-market-applications']}>
                <div className={styles['trad-market-application']}>
                  <div className={styles['trad-market-application-title']}>
                    Marché
                  </div>
                  <div className={styles['trad-market-application-picture']}>
                    <img src="/img/blomberg.png" alt=""/>
                  </div>
                </div>
                <div className={styles['trad-market-application']}>
                  <div className={styles['trad-market-application-title']}>
                    Analyse technique
                  </div>
                  <div className={styles['trad-market-application-picture']}>
                    <img src="/img/trading-view.png" alt=""/>
                  </div>
                </div>
                <div className={styles['trad-market-application']}>
                  <div className={styles['trad-market-application-title']}>
                    Analyse et Opinions
                  </div>
                  <div className={styles['trad-market-application-picture']}>
                    <img src="/img/alpha.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className={AppStyles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
