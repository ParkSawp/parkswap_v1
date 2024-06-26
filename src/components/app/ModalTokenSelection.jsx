
import React, { useEffect } from 'react';
import styles from "./ModalTokenSelection.module.css"

const ModalTokenSelection = ({ isOpen, closeModal, modalTitle, modalContent }) => {
   
    return (
      <>
        <div className={styles["modalTokenContainer"]}>
            <div className={styles["modalTokenContainerHeader"]}>
                <div className={styles["ContainerHeaderSearchContainer"]}>
                    <svg width="21px" height="21px">
                        <title>Search</title>
                        <image width="21px" height="21px" href="/svg/icons/search.svg" />
                    </svg>
                    <input type="text" placeholder="Search name or address"></input>
                </div>
            </div>
            <div className={styles["modalTokenContainerTokens"]}>
                &nbsp;
            </div>
        </div>
      </>
    );
  }
  
  export default ModalTokenSelection;
  