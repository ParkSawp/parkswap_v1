// components/ParkSwap.js
"use client";

import Link from "next/link";
import styles from "../../../public/css/home.module.css";

import { motion } from "framer-motion";
import React, { useState } from "react";
import AppLayout from "@/src/app/AppLayout";
import Translate from "@/src/components/Translate/Translate";
import {useTranslation} from "react-i18next";

export default function Home() {

  const { t } = useTranslation();

  const links = [
    {
      title: 'Swap',
      imgSrc: '/svg/icons/swap.svg',
      url: '/app',
      soon: false
    },
    {
      title: 'Blog',
      url: '/blog',
      imgSrc: '/svg/icons/blog.svg',
      soon: false
    },
    {
      title: 'Portfolio',
      url: '/home',
      imgSrc: '/svg/icons/portfolio2.svg',
      soon: true
    },
    {
      title: 'Market',
      url: '/home',
      imgSrc: '/svg/icons/market.svg',
      soon: true
    },
    {
      title: 'Bridge',
      url: '/home',
      imgSrc: '/svg/icons/bridge.svg',
      soon: true
    }
  ];


  return (
      <AppLayout header={{ title: t('ParkSwap | Home') }} >
        <motion.div
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className={styles["home-container"]}
        >
          {
            links.map((link) => (
                <Link key={link.title} disabled={link.soon} href={link.url} className={styles["home-option"] + (link.soon ? ' ' + styles["home-option-soon"] : '')}>
                  <div className={styles["home-option-icon"]}>
                    <svg width="80px" height="80px" className={link.soon ? styles['home-option-soon-svg'] : ''}>
                      <title>{link.title}</title>
                      <image
                          width="80px"
                          height="80px"
                          href={link.imgSrc}
                      />
                    </svg>
                  </div>
                  <div className={styles["home-option-title"]}>
                    <span><Translate>{link.title}</Translate></span>
                    {
                      link.soon
                        &&
                        (
                            <span className={styles["home-option-soon-text"]}>
                              <Translate>Soon</Translate>
                            </span>
                        )
                    }
                  </div>
                </Link>
            ))
          }
        </motion.div>
      </AppLayout>
  );
}
