// components/ParkSwap.js
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "../../../public/css/app.module.css";
import SwapContainer from "../../components/app/SwapContainer";
import Modal from "../../components/app/Modal";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Parkswap | App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles["site-wrapper"]}>
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
              <li>
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
                <motion.div
                  initial={{ display: "none" }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={styles["nav-submenu-box"]}
                  whileHover={{
                    display: "block",
                    transform: "translate(-50%, 0px)",
                  }}
                >
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
                          <span className={styles["title"]}>Advanced Mode</span>
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
                </motion.div>
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
                          <span className={styles["title"]}>Documentation</span>
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
                          <span className={styles["title"]}>Report a Bug</span>
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
            </ul>
          </div>
          <div className={styles["app-navigation-buttons"]}>
            <div className={styles["starknet-btn"]}>StarkNet</div>
            <div className={styles["connect-wallet-btn"]}>Connect Wallet</div>
          </div>
          <div className={styles["app-navigation-btn"]}>...</div>
        </nav>
        <div className={styles["app-container"]}>
          <SwapContainer />
        </div>
        <div className={styles["app-footer"]}>© 2024 ParkSwap</div>
      </div>
    </>
  );
}
