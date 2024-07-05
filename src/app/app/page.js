// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "../../../public/css/app.module.css";
import SwapContainer from "../../components/app/SwapContainer";
import AppSettingsModal from "../../components/app/AppSettingsModal";
// import Modal from "../../components/app/Modal";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Home() {
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [settingsButtonVal, setSettingsButtonVal] = useState("...");
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
      <div className={styles["site-wrapper"]}>
        <AppSettingsModal isOpen={isSettingsOpen} closeModal={closeSettings} />
        <nav className={styles["app-navigation"]}>
          <div className={styles["app-navigation-logo"]}>
            <Link href="/">
              <Image
                src="/img/main_logo.png"
                width={44}
                height={60}
                alt="ParkSwap Logo"
              />
            </Link>
          </div>
          <div className={styles["app-navigation-nav"]}>
            <ul>
              <div className={styles["nav-no-dd"]}>
                <li className={styles["nav-home-btn"]}>
                  <Link href="/">
                    Home
                    {/* <svg width="21px" height="21px">
                      <title>Home</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg> */}
                  </Link>
                </li>
                <li className={styles["nav-portfolio-btn"]}>
                  <a href="">
                    Portfolio
                    {/* <svg width="21px" height="21px">
                      <title>Portfolio</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg> */}
                  </a>
                </li>
                <li className={styles["nav-bridge-btn"]}>
                  <a href="">
                    Bridge
                    {/* <svg width="21px" height="21px">
                      <title>Bridge</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/right_arrow.svg"
                      />
                    </svg> */}
                  </a>
                </li>
              </div>
              <div className={styles["nav-dd"]}>
                <li className={styles["nav-trade-btn"]}>
                  <a href="">
                    Trade
                    <svg width="21px" height="21px">
                      <title>Trade</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg>
                  </a>
                </li>
                <li className={styles["nav-market-btn"]}>
                  <a href="">
                    Marché
                    <svg width="21px" height="21px">
                      <title>Market</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg>
                  </a>
                  <div className={styles["nav-submenu-box"]}>
                    <div className={styles["nav-menu-submenu"]}>
                      <ul className={styles["menu-submenu-list"]}>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>Simple Mode</span>
                            <p>The most user-friendly way to trade</p>
                            <span className={styles["icon"]}>
                              <svg width="18px" height="18px">
                                <title>Simple mode</title>
                                <image
                                  width="18px"
                                  height="18px"
                                  href="/svg/icons/simple_mode.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>
                              Advanced Mode
                            </span>
                            <p>Take advantage of all the familiar tools</p>
                            <span className={styles["icon"]}>
                              <svg width="18px" height="18px">
                                <title>Advanced mode</title>
                                <image
                                  width="18px"
                                  height="18px"
                                  href="/svg/icons/advanced_mode.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>Limit Order</span>
                            <p>Schedule a swap to get the best price</p>
                            <span className={styles["icon"]}>
                              <svg width="18px" height="18px">
                                <title>Limit Order</title>
                                <image
                                  width="18px"
                                  height="18px"
                                  href="/svg/icons/limit_order.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className={styles["nav-plus-btn"]}>
                  <a href="">
                    Plus
                    <svg width="21px" height="21px">
                      <title>More</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg>
                  </a>
                  <div className={styles["nav-submenu-box"]}>
                    <div className={styles["nav-menu-submenu"]}>
                      <ul className={styles["menu-submenu-list"]}>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>
                              Documentation
                            </span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>Documentation</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/doc_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>Blog</span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>Blog</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/blog_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>Help</span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>Help</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/help_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>
                              Address Screening
                            </span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>Address Screening</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/screening_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>About</span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>About</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/about_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>
                              Suggest a Feature
                            </span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>Suggest a Feature</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/suggest_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <span className={styles["title"]}>
                              Report a Bug
                            </span>
                            <span className={styles["icon"]}>
                              <svg width="20px" height="20px">
                                <title>Report a Bug</title>
                                <image
                                  width="20px"
                                  height="20px"
                                  href="/svg/icons/bug_icon.svg"
                                />
                              </svg>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </div>
            </ul>
          </div>
          <div className={styles["app-navigation-buttons"]}>
            <div className={styles["starknet-btn"]}>StarkNet</div>
            <div className={styles["connect-wallet-btn"]}>Connect Wallet</div>
          </div>
          <div
            className={styles["app-navigation-btn"]}
            onClick={() => {
              openSettings();
            }}
          >
            {settingsButtonVal}
          </div>
        </nav>
        <div className={styles["app-container"]}>
          <SwapContainer />
        </div>
        <div className={styles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
