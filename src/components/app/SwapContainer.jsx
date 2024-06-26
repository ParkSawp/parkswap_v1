'use client'

import styles from "../../../public/css/app.module.css";
import Modal from "../../components/app/Modal";
import ModalTokenSelection from "../../components/app/ModalTokenSelection"
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";


export default function SwapContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle,setModalTitle] = useState("");
  const [modalContent,setModalContent] = useState("");
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
            <li>
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
            <li onClick={() => {
              setModalTitle("Séléctionnez un Jeton")
              setModalContent(<ModalTokenSelection/>)
              openModal()
              }}>
              <svg>
                <title>Add currency</title>
                <image width="21px" height="21px" href="/svg/icons/plus.svg" />
              </svg>
            </li>
            <li>
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
            >
              <span>
                <svg width="30px" height="30px">
                  <title>Ether</title>
                  <image
                    width="30px"
                    height="30px"
                    href="/svg/icons/eth_icon.svg"
                  />
                </svg>
                ETH
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
            <span className={styles["firstBox-token-name"]}>Ether</span>
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
            <button className={styles["box-button"]}>
              Select a Token
              <i>
                <svg>
                  <title>Select a Token</title>
                  <image width="10px" height="10px" href="/svg/icons/arrow.svg" />
                </svg>
              </i>
            </button>
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
