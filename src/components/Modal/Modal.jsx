'use client'

import styles from "./Modal.module.css";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, className, closeModal, modalTitle, modalContent, children, modalWidth=375, modalHeight=500 }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.8 });
    }
  }, [isOpen, controls]);

  const handleCloseModal = () => {
    controls.start({ opacity: 0, scale: 0.8 }).then(() => closeModal());
  };

  if(typeof document !== 'object') {
    return null;
  }

  return createPortal(
    <>
      {isOpen && (
        <motion.div
          className={styles["app-modal-wrapper"] + ' '+className}
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, delay: 0.05 }}
            className={styles["app-modal"]}
            style={{
              ...(modalWidth !== false && { maxWidth: modalWidth }),
              ...(modalHeight !== false && { maxHeight: modalHeight })
            }}          
            onClick={(e) => e.stopPropagation()}
            >
            {
              modalTitle &&
                (
                  <div className={styles["app-modal-header"]}>
                    <div className={styles["app-modal-header-title"]}>{modalTitle}</div>
                    <div className={styles["app-modal-header-icon-container"]}>
                      <svg width="30" height="30" onClick={handleCloseModal} style={{cursor: 'pointer'}}>
                        <image width="28" height="28" href="/svg/icons/cross.svg"/>
                      </svg>
                    </div>
                  </div>
                )
            }
            <div className={styles["app-modal-content"]}>
              {modalContent || children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>, document.body);
}

export default Modal;
