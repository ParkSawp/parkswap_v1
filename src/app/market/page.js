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
import React, {useEffect, useState} from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const PriceChart = dynamic(() => import("@/src/components/Global/PriceChart/PriceChart"), { ssr: false });

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
          <div className={styles["market-container"]}>
            <div className={styles["market-container-header"]}>
              <h1 className={styles['market-header-title']}>Marché</h1>
              <div  className={styles["market-container-subheader"]} >
                <div className={styles['market-header-title-container']}>
                  <div className={styles['market-header-subtitle']}>Starknet Market Data all in one place.</div>
                </div>
                <div className={styles['market-header-filter-container']}>
                  <input
                      onInput={handleSearchInput}
                      className={styles['market-header-filter-input']}
                      placeholder='Token name or address'
                  />
                </div>
              </div>
            </div>
            <div className={styles["market-container-content"]}>
              {
                !tokens || !tokens.length
                  ? <div>Loading</div>
                  : (
                        <table>
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col" className={styles['market-table-header-name-column']}>Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">1H</th>
                              <th scope="col">24H</th>
                              <th scope="col">7D</th>
                              <th scope="col">Trading Volume(24)</th>
                              <th scope="col">Market Cap</th>
                              <th scope="col">Parkswap TVL</th>
                              <th scope="col">Last 7 days</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              filteredTokens.map((token, index) => (
                                  <tr key={token.token.address}>
                                    <td>{index + 1}</td>
                                    <td scope="row">
                                      <div className={styles['token-description']}>
                                        <div className={styles['token-logo-container']}>
                                          <img
                                              src={`/svg/tokens/${token.token.currency.toLowerCase()}.svg`}
                                              height="30"
                                              width="30"
                                              alt=""/>
                                        </div>
                                        <div className={styles['token-details']}>
                                          <div className={styles['token-name']}>{token.token.name}</div>
                                          <div className={styles['token-currency']}>{token.token.currency}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>${token.price.toLocaleString('hi-IN')}</td>
                                    <td>
                                      <div
                                          className={token.durations['1H'].up ? styles['price-direction-up'] : styles['price-direction-down']}>
                                        <svg width="12px" height="12px">
                                          <title>Indicator</title>
                                          <image
                                              width="100%"
                                              height="100%"
                                              href={token.durations['1H'].up ? "/svg/price-up.svg" : "/svg/price-down.svg"}
                                          />
                                        </svg>
                                        <span className={styles['duration-style']}>
                                          ${token.durations['1H'].value}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                          className={token.durations['24H'].up ? styles['price-direction-up'] : styles['price-direction-down']}>
                                        <svg width="12px" height="12px">
                                          <title>Indicator</title>
                                          <image
                                              width="100%"
                                              height="100%"
                                              href={token.durations['24H'].up ? "/svg/price-up.svg" : "/svg/price-down.svg"}
                                          />
                                        </svg>
                                        <span className={styles['duration-style']}>
                                          ${token.durations['24H'].value}
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                          className={token.durations['7D'].up ? styles['price-direction-up'] : styles['price-direction-down']}>
                                        <svg width="12px" height="12px">
                                          <title>Indicator</title>
                                          <image
                                              width="100%"
                                              height="100%"
                                              href={token.durations['7D'].up ? "/svg/price-up.svg" : "/svg/price-down.svg"}
                                          />
                                        </svg>
                                        <span className={styles['duration-style']}>
                                          ${token.durations['7D'].value}
                                        </span>
                                      </div>
                                    </td>
                                    <td>${token.tradingVolume.toLocaleString('hi-IN')}</td>
                                    <td>${token.marketCap.toLocaleString('hi-IN')}</td>
                                    <td>${token.parkswapTvl.toLocaleString('hi-IN')}</td>
                                    <td >
                                      <div className={styles["market-indicator"]} >
                                        <PriceChart />
                                      </div>
                                    </td>
                                  </tr>
                              ))
                            }
                          </tbody>
                        </table>
                    )
              }
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
