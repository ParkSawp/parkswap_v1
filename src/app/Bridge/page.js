"use client";


import Head from "next/head";
import AppStyles from "../../../public/css/app.module.css";
import styles from "../../../public/css/bridge.module.css";
import AppSettingsModal from "../../components/AppSettingsModal/AppSettingsModal";
import Menu from "../../components/Menu/Menu";

import { motion } from "framer-motion";
import React, { useState } from "react";
import TokenSelector from "@/src/components/Global/TokenSelector/TokenSelector";
import TokenAmountInput from "@/src/components/Global/TokenAmountInput/TokenAmountInput";
import WalletAddressInput from "@/src/components/Global/WalletAddressInput/WalletAddressInput";
import BridgePathDescriptor from "@/src/components/Global/BrigePathDescriptor/BridgePathDescriptor";

export default function Home() {
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [settingsButtonVal, setSettingsButtonVal] = useState("...");
  const [isExchangeView, setIsExchangeView] = useState(true);
  const [tokenFrom, setTokenFrom] = useState({ token: null, network: null });
  const [tokenTo, setTokenTo] = useState({ token: null, network: null });
  const [networkTo, setNetworkTo] = useState(null);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [amount, setAmount] = useState(0);

  const routes = [
    { isTheBest: true },
    { },
    { },
    { },
  ];


  const openSettings = () => {
    setIsSettingOpen(true);
    setSettingsButtonVal("");
  };
  const closeSettings = () => {
    setIsSettingOpen(false);
    setSettingsButtonVal("...");
  };
  const saveAmount = (amount) => {
    setAmount(amount);
    setShowAll(false);
  }
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const showExchangeView = () => setIsExchangeView(true);
  const showGasView = () => setIsExchangeView(false);

  const onSelectFromToken = (token, network) => {
    setTokenFrom({ token, network });
  };
  const onSelectToNetwork = (network) => {
    setNetworkTo(network);
  };
  const onSelectToToken = (token, network) => {
    setTokenTo({ token, network });
  };
  const toggleShowAddressInput = () => {
    setShowAddressInput(!showAddressInput);
  }

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
          className={styles["bridge-wrapper"]}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles["bridge-container"]}>
            <div className={styles['bridge-views-container']} >
              <div className={styles['bridge-view-handlers-container']} >
                <button className={styles['bridge-view-handler'] +' '+ (isExchangeView && styles['active'])} onClick={showExchangeView} >
                  <img src="/img/exchange.png" alt="Exchange" />
                </button>
                <button className={styles['bridge-view-handler'] +' '+ (!isExchangeView && styles['active'])} onClick={showGasView} >
                  <img src="/img/gas.png" alt="Gas calculator" />
                </button>
              </div>
              <div className={styles['bridge-view-form-container']} >
                <div className={styles['bridge-view-form-header']} >
                  <div className={styles['bridge-view-title']}>
                    { isExchangeView ? 'Exchange' : 'Gas' }
                  </div>
                  <div className={styles['bridge-view-setting']}>
                    <img src="/svg/icons/settings.svg" alt="Setting" />
                  </div>
                </div>
                <>
                  {
                    isExchangeView
                        ? <div className={styles['bridge-tokens-block-container'] +' '+ ((tokenFrom.token && tokenTo.token) && styles['tokens-selected']) }>
                          <TokenSelector title='From' placeholder='Select chain and token' onTokenSelected={onSelectFromToken} />
                          <div className={styles['exchange-icon-wrapper']} >
                            <div className={styles['exchange-icon-container']}>
                              <img src="/svg/icons/exchange-down.svg" alt="Exchange direction" />
                            </div>
                          </div>
                          <TokenSelector title='To' placeholder='Select chain and token' onTokenSelected={onSelectToToken} />
                        </div>
                        : <div className={styles['bridge-tokens-block-container'] +' '+ ((tokenFrom.token && networkTo) && styles['tokens-selected']) }>
                          <TokenSelector title='From' placeholder='Select chain and token' onTokenSelected={onSelectFromToken} />
                          <TokenSelector title='To' placeholder='Select chain' networkOnly={true} onNetworkSelected={onSelectToNetwork} />
                        </div>
                  }
                </>
                <TokenAmountInput title ='Send' token={tokenFrom.token} network={tokenFrom.network} onInput={saveAmount} />
                {
                  (!isExchangeView && (tokenFrom.token && networkTo) && amount > 0 ) &&
                  <BridgePathDescriptor fromToken={tokenFrom.token} token={tokenFrom.token} network={networkTo} isTheBest={false} />
                }
                {
                  (isExchangeView && (tokenFrom.token && tokenTo.token) && amount > 0 ) &&
                    <div className={styles['bridge-view-paths-wrapper']} >
                      <div className={styles['bridge-view-paths-title']} >Receive</div>
                      <div className={styles['bridge-view-paths-container']} >
                        {
                          showAll
                          ? routes.map(({ isTheBest }) => (
                                <BridgePathDescriptor showTitle={false} fromToken={tokenFrom.token} token={tokenTo.token} network={tokenTo.network} isTheBest={isTheBest} />
                            ))
                          : (
                              <>
                                <BridgePathDescriptor showTitle={false} fromToken={tokenFrom.token} token={tokenTo.token} network={tokenTo.network} isTheBest={true} />
                                <button className={styles['bridge-routes-show-all-button']} onClick={toggleShowAll}>Show all</button>
                              </>
                            )
                        }
                      </div>
                    </div>
                }
                {
                  showAddressInput && <WalletAddressInput title ='Send to wallet' />
                }

                <div className={styles['bridge-view-connect-wallet-container']}>
                  <button className={styles['bridge-view-connect-button']}>
                    Connect Wallet
                  </button>
                  <button className={styles['bridge-view-connect-receiver-view-handler']} onClick={toggleShowAddressInput}>
                    <img src="/img/wallet.png" alt="Show Receiver Input" />
                  </button>
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
