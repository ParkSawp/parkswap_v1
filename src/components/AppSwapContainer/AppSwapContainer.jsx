'use client'

import styles from "../../../public/css/app.module.css";
import Modal from "../Modal/Modal";
import ModalTokenSelection from "../Modal/ModalTokenSelection/ModalTokenSelection"
import ModalSwapSettings from "../Modal/ModalSwapSettings/ModalSwapSettings"
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";


export default function SwapContainer({setIsGraphOpen,isGraphOpen}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle,setModalTitle] = useState("");
  const [modalContent,setModalContent] = useState("");
  const [firstTokenSelected,setFirstTokenSelected] = useState(
    {
      name:"Ethereum",
      symbol:"ETH",
      logo:"/svg/icons/eth_icon.svg",
      address:""
    }
  );
  const [secondTokenSelected,setSecondTokenSelected] = useState(
    {
      name:"",
      symbol:"Select a Token",
      logo:"",
      address:""
    }
  );
  const openModal = () => {setIsModalOpen(true)};
  const closeModal = () => {setIsModalOpen(false)}

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={closeModal} modalTitle={modalTitle} modalContent={modalContent}></Modal>
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
              </svg>
            </li>
            <li>
              <svg>
                <title>Reset</title>
                <image width="21px" height="21px" href="/svg/icons/reset.svg" />
              </svg>
            </li>
            <li>
              <svg>
                <title>Add currency</title>
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
              </svg>
            </li>
          </ul>
        </div>
        <div className={styles["app-container-firstBox"]}>
          <p className={styles["firstBox-title"]}>You Pay</p>
          <span className={styles["firstBox-token"]}>
            <button
              className={`${styles["box-button"]} ${styles["firstBox-btn"]}`}
              onClick={() => {
                setModalTitle("Select a Token")
                setModalContent(<ModalTokenSelection callbacks={[closeModal,setFirstTokenSelected]}/>)
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
            </span>
          </span>
        </div>
        <i className={styles["app-container-swapBtn"]}>
          <svg height="25px" width="25px">
            <title>Swap cryptocurrencies</title>
            <image href="/svg/icons/swp.svg" height="25px" width="25px" />
          </svg>
        </i>
        <div className={styles["app-container-secondBox"]}>
          <p className={styles["secondBox-title"]}>You receive</p>
          <span className={styles["secondBox-token"]}>
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
          </span>
          <span className={styles["secondBox-amount"]}>
            <span className={styles["amount-container"]}>
              <input placeholder="0.00" type="text" dir="rtl" />
              <span className={styles["eqAmount"]}>~$0.00</span>
            </span>
          </span>
        </div>
        <div className={styles["app-container-button"]}>
          <svg>
            <title>Connect Wallet</title>
            <image href="/svg/icons/wallet.svg" height="100%" width="100%" />
          </svg>
          <span>Connect Wallet</span>
        </div>
      </motion.div>
    </>
  );
}
