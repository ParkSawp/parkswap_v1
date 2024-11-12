'use client'

import styles from "../../../public/css/app.module.css";
import Modal from "../Modal/Modal";
import ModalTokenSelection from "../Modal/ModalTokenSelection/ModalTokenSelection"
import ModalSwapSettings from "../Modal/ModalSwapSettings/ModalSwapSettings"
import ModalAddToken from "../Modal/ModalAddToken/ModalAddToken"
import ModalConnectWallet from "../Modal/ModalConnectWallet/ModalConnectWallet"
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AppSwapTokenSelectionBlockHeader
  from "@/src/components/AppSwapTokenSelectionBlockHeader/AppSwapTokenSelectionBlockHeader";
import AppSwapSlipage from "@/src/components/AppSwapSlipage/AppSwapSlipage";


export default function SwapContainer({setIsGraphOpen,isGraphOpen,setIsWalletConnected,isWalletConnected}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle,setModalTitle] = useState("");
  const [modalContent,setModalContent] = useState("");
  const [modalWidth,setModalWidth] = useState(false);
  const [modalHeight,setModalHeight] = useState(false);
  const [firstTokenSelected,setFirstTokenSelected] = useState(
    {
      name:"Ethereum",
      symbol:"ETH",
      logo:"/svg/icons/eth_icon.svg",
      address:"0xc9999929999",
      amount:"0.00" // ToDo : amount management by inputs
    }
  );
  const [secondTokenSelected,setSecondTokenSelected] = useState(
    {
      name:"Dai Stablecoin",
      symbol:"DAI",
      logo:"/svg/icons/dai-logo.svg",
      address:"0xb839382",
      amount:"0.00"
    }
  );
  const openModal = () => {setIsModalOpen(true)};
  const closeModal = () => {
    setModalWidth(false);
    setModalHeight(false);
    setIsModalOpen(false);
  }

  let getTokens = () => {
    return [firstTokenSelected,secondTokenSelected]
  }

  let switchTokens = () => {
    let tempToken =  firstTokenSelected;
    setFirstTokenSelected(secondTokenSelected);
    setSecondTokenSelected(tempToken);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal} modalTitle={modalTitle} modalContent={modalContent} modalWidth={modalWidth} modalHeight={modalHeight}></Modal>
      <motion.div     
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["app-container-wrapper"]}>
        <div className={styles["app-container-menu"]}>
          <ul className={styles["container-menu-firstMenu"]}>
            <li>
              <b>Swap</b>
            </li>
            <li>Limit</li>
          </ul>
          <ul className={styles["container-menu-secondMenu"]}>
            <li className={styles["graph-btn"]} onClick={() => {setIsGraphOpen(!isGraphOpen)}}>
              <svg>
                <title>Graph</title>
                <image width="21px" height="21px" href="/svg/icons/graph.svg" />
                {/* <image width="21px" height="21px" href="/svg/icons/solar_graph.svg" /> */}
              </svg>
            </li>
            <li>
              <svg>
                <title>Reset</title>
                <image width="21px" height="21px" href="/svg/icons/reset.svg" />
                {/* <image width="21px" height="21px" href="/svg/icons/solar_reset.svg" /> */}

              </svg>
            </li>
            <li onClick={() => {
                setModalTitle("Add a Token")
                setModalContent(<ModalAddToken/>)
                openModal()
                }}>
              <svg>
                <title>Add currency</title>
                {/* <image width="30px" height="30px" href="/svg/icons/solar_plus.svg" /> */}
                <image width="21px" height="21px" href="/svg/icons/plus.svg" />
              </svg>
            </li>
            <li onClick={() => {
              setModalTitle("Swap settings")
              setModalContent(<ModalSwapSettings/>)
              openModal()
              }}>
              <svg>
                <title>Settings</title>
                <image
                  width="21px"
                  height="21px"
                  href="/svg/icons/settings.svg"
                />
                {/* <image
                  width="21px"
                  height="21px"
                  href="/svg/icons/solar_settings.svg"
                /> */}
              </svg>
            </li>
          </ul>
        </div>
        <div className={styles["app-container-firstBox"]}>
          <AppSwapTokenSelectionBlockHeader title="You Pay" />
          <span className={styles["firstBox-token"]}>
            <button
              className={`${styles["box-button"]} ${styles["firstBox-btn"]}`}
              onClick={() => {
                setModalTitle("Select a Token")
                setModalContent(<ModalTokenSelection callbacks={[closeModal,setFirstTokenSelected,switchTokens,getTokens]}/>)
                openModal()
                }}
            >
              <span>
                <svg width="30px" height="30px">
                  <title>{firstTokenSelected.name}</title>
                  <image
                    width="30px"
                    height="30px"
                    href={firstTokenSelected.logo}
                  />
                </svg>
                {firstTokenSelected.symbol}
              </span>
              <i>
                <svg>
                  <title>Select Currency</title>
                  <image
                    width="10px"
                    height="10px"
                    href="/svg/icons/arrowgreynew.svg"
                  />
                </svg>
              </i>
            </button>
            <span className={styles["firstBox-token-name"]}>{firstTokenSelected.name}</span>
          </span>
          <span className={styles["secondBox-amount"]}>
            <span className={styles["amount-container"]}>
              <input placeholder="0.00" type="text" dir="rtl" />
              <span className={styles["eqAmount"]}>~$0.00</span>
            </span>
          </span>
          <AppSwapSlipage />
        </div>
        <i className={styles["app-container-swapBtn"]} onClick={switchTokens}>
          <svg height="25px" width="25px">
            <title>Swap cryptocurrencies</title>
            <image href="/svg/icons/swp.svg" height="25px" width="25px" />
          </svg>
        </i>
        <div className={styles["app-container-secondBox"]}>
          {/* <div className={styles["app-container-secondBox-background"]}></div> */}
          <AppSwapTokenSelectionBlockHeader title="You receive" />
          {/* <span className={styles["secondBox-token"]}>
            <motion.button className={styles["box-button"]}
              onClick={() => {
              setModalTitle("Select a Token")
              setModalContent(<ModalTokenSelection callbacks={[closeModal,setSecondTokenSelected]}/>)
              openModal()
              }}
              >
              
              {secondTokenSelected.symbol}
              <i>
                <svg>
                  <title>Select a Token</title>
                  <image width="10px" height="10px" href="/svg/icons/arrow.svg" />
                </svg>
              </i>
            </motion.button>
          </span> */}
          <span className={styles["firstBox-token"]}>
            <button
              className={`${styles["box-button"]} ${styles["firstBox-btn"]}`}
              onClick={() => {
                setModalTitle("Select a Token")
                setModalContent(<ModalTokenSelection callbacks={[closeModal,setSecondTokenSelected,switchTokens,getTokens]}/>)
                openModal()
                }}
            >
              <span>
                <svg width="30px" height="30px">
                  <title>{secondTokenSelected.name}</title>
                  <image
                    width="30px"
                    height="30px"
                    href={secondTokenSelected.logo}
                  />
                </svg>
                {secondTokenSelected.symbol}
              </span>
              <i>
                <svg>
                  <title>Select Currency</title>
                  <image
                    width="10px"
                    height="10px"
                    href="/svg/icons/arrowgreynew.svg"
                  />
                </svg>
              </i>
            </button>
            <span className={styles["firstBox-token-name"]}>{secondTokenSelected.name}</span>
          </span>
          <span className={styles["secondBox-amount"]}>
            <span className={styles["amount-container"]}>
              <input placeholder="0.00" type="text" dir="rtl" />
              <span className={styles["eqAmount"]}>~$0.00</span>
            </span>
          </span>
        </div>  
        {
          /* If wallet connected do : */
          isWalletConnected && (
            <div className={styles["app-container-button"]} onClick={(() => {
            })}>
              <svg>
                <title>Swap currency</title>
                <image href="/svg/icons/wallet.svg" height="100%" width="100%" />
              </svg>
              <span>Swap currency</span>
            </div>
          )
        }
      
        {/* If wallet not connected do :*/
        !isWalletConnected && (
          <div className={styles["app-container-button"]} onClick={(() => {
            setModalTitle("Connect your wallet")
            setModalContent(<ModalConnectWallet callbacks={{closeModal:closeModal,setIsWalletConnected:setIsWalletConnected}}/>)
            setModalWidth(800);
            openModal()
          })}>
            <svg>
              <title>Connect Wallet</title>
              <image href="/svg/icons/wallet.svg" height="100%" width="100%" />
            </svg>
            <span>Connect Wallet</span>
          </div>
        )}
      </motion.div>
    </>
  );
}
