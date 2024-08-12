import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "./Menu.module.css";

const Menu = ({openSettings,settingsButtonVal}) => {
    return(
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
                  <Link href="/home">
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
                    Marché
                    <svg width="21px" height="21px">
                      <title>Marché</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg>
                  </a>
                </li>
                <li className={styles["nav-market-btn"]}>
                  <Link href="/app">
                    Trade
                    <svg width="21px" height="21px">
                      <title>Trade</title>
                      <image
                        width="21px"
                        height="21px"
                        href="/svg/icons/down_arrow.svg"
                      />
                    </svg>
                  </Link>
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
            <div className={styles["starknet-btn"]}>
              <svg width="24px" height="24px">
                <title>STRK</title>
                <image
                  width="22px"
                  height="22px"
                  href="/svg/icons/strk-logo.svg"
                />
              </svg>
              StarkNet
            </div>
            <div className={styles["connect-wallet-btn"]}>Mainnet</div>
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
    )
}

export default Menu