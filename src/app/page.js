// pages/index.js
"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../public/css/index.module.css";
import { motion } from "framer-motion";
import HomeFeature from "@/src/components/Home/HomeFeature";
import Translate from "@/src/components/Translate/Translate";
import PageLayout from "@/src/app/PageLayout";
import {useState} from "react";
import {CloseIcon, DiscordIcon, XTwitterIcon} from "@/src/components/Icon/Icon";
import {ContactMails, SOCIALS_NETWORKS} from "@/src/config/constants";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false)

  const features = [
    {
      icon: '/svg/icons/liquidity_exchange.svg',
      title: 'Multi-Services DeFi',
      description: 'Features multiServiceDefi'
    },
    {
      icon: '/svg/icons/security_autonomy.svg',
      title: 'Design & Experience',
      description: 'Features designAndExperience'
    },
    {
      icon: '/svg/icons/inovation_accessibility.svg',
      title: 'Smart Aggregator',
      description: 'Features smartAggregator'
    },
  ];

  const socialNetworks = SOCIALS_NETWORKS;

  const toggleMenuOnMobile = () => {
    setIsOpen(!isOpen);
  };

  return (
      <>
        {/*<Head>*/}
        {/*</Head>*/}
        <PageLayout>
          <body>
          <div className={styles["site-wrapper"]}>
            <nav className={styles["main-navigation"]}>
              <div className={styles["main-navigation-container-btn"]}>
                <div className={styles["navigation-btn"]} onClick={toggleMenuOnMobile}>
                  <svg width="32" height="33">
                    <title>Open Menu</title>
                    <image
                        width="32"
                        height="33"
                        href="/svg/icons/menu.svg"
                    ></image>
                  </svg>
                </div>
                <div className={styles["navigation-bar"]+' '+ (isOpen ? styles["navigation-bar-mobile"] : '')} >
                  <div className={styles['navigation-bar-close-container']} >
                    <div className={styles['navigation-bar-close']} onClick={toggleMenuOnMobile} >
                      <CloseIcon />
                    </div>
                  </div>
                  <ul>
                    {/*<li>Ecosystem</li>*/}
                    {/*<li>Community</li>*/}
                    <li className={styles["navigation-bar-item"]}>
                      <a href="/blog/presentation" ><Translate>About</Translate></a>
                    </li>
                    <li className={styles["navigation-bar-item"]}>
                      <a href="/blog"><Translate>Blog</Translate></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles["main-navigation-container-logo"]}>
                <img
                    width="44"
                    height="60"
                    src="/img/main_logo.png"
                    alt="ParkSwap logo"
                />
              </div>
              <div className={styles["main-navigation-container-dapp"]}>
                <Link href="/app">
                  <div className={styles["dapp-btn"]}>Start Dapp</div>
                </Link>
              </div>
            </nav>
            <header className={styles["main-header"]}>
              <div className={styles["main-header-container-wrapper"]}>
                <motion.div
                    // animate={{
                    //   backgroundPosition: [
                    //     "2000px bottom",
                    //     "-2000px bottom",
                    //     "2000px bottom",
                    //   ],
                    // }}
                    // transition={{
                    //   duration: 120,
                    //   repeat: Infinity,
                    // }}
                    className={styles["wrapper-background"]}
                >
                  <div className={styles["wrapper-background-second"]}>
                    <div className={styles["wrapper-background-content"]}>
                      <div className={styles["content-logo"]}>
                        <motion.div
                            animate={{y: [-5, 5, -5]}}
                            transition={{repeat: Infinity, duration: 2}}
                            className={styles["content-logo"]}
                        >
                          <Image
                              className={styles["logo"]}
                              width={200}
                              height={200}
                              alt="ParkSwap logo"
                              src="/svg/parkswap_logo_silver_big.svg"
                          />
                        </motion.div>
                        <motion.img
                            animate={{y: [-5, 5, -5]}}
                            transition={{repeat: Infinity, duration: 4}}
                            className={styles["balloon1"]}
                            width="100"
                            height="100"
                            alt="Balloon cyan"
                            src="/svg/balloon_cyan.svg"
                        />
                        <motion.img
                            animate={{y: [-5, 5, -5]}}
                            transition={{repeat: Infinity, duration: 4}}
                            className={styles["balloon2"]}
                            width="200"
                            height="200"
                            alt="Balloon red"
                            src="/img/balloon_red.png"
                        />
                      </div>
                      <div className={styles["content-text"]}>
                        <div className={styles["container-title"]}>
                          <span style={{color: "white"}}>
                            DeFi HUB
                            {/*<i style={{ color: "white", fontStyle: "normal" }}>*/}
                            {/*  Au coeur*/}
                            {/*</i>*/}
                          </span>
                          {/*<span style={{ color: "white" }}>de la finance </span>*/}
                          {/*<span style={{ color: "#33C653" }}>décentralisée</span>*/}
                        </div>
                      </div>
                      <div className={styles["content-button"]}>
                        <div className={styles["container-button"]}>
                          <Link href="/app">
                            <div className={styles["container-button-btn"]}>
                              Start Trading
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </header>
            {/* <svg
              className={styles["top-arrondis grey2-arrondis"]}
              fill="#FFF"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1440 48"
              style={{
                background: "#02a323",
              }}
              xmlSpace="preserve"
              aria-hidden="true"
            >
              <path d="M1440,48H0V0c0,0,205,47,720,47s720-46.9,720-46.9V48z"></path>
            </svg> */}
            <section className={styles["main-content"]}>
              <h1 className={styles["main-content-title"]}>FEATURES</h1>
              <div className={styles["main-content-features"]}>
                {
                  features.map((feature) => <HomeFeature key={feature.title} feature={feature}/>)
                }
              </div>
            </section>
            <footer className={styles["main-footer"]}>
              <div className={styles["main-footer-body"]}  >
                <div className={styles["main-footer-logo"]} >
                  <img
                      width="67"
                      height="93"
                      src="/img/main_logo.png"
                      alt="Parkswap logo white"
                  />
                </div>
                <div className={styles["main-footer-links"]}  >
                  <ul>
                    <li>
                      <h3 className={styles['footer-links-title']}>
                        <Translate >Support</Translate>
                      </h3>
                    </li>
                    <li>
                      <a href="/docs/parkswap-terms-of-use.pdf">
                        <Translate>Terms of use</Translate>
                      </a>
                    </li>
                    <li>
                      <a href="/docs/parkswap_privacy_policy.pdf">
                        <Translate>Privacy policy</Translate>
                      </a>
                    </li>
                  </ul>
                </div>
                <div  className={styles["main-footer-contacts-follows"]} >
                  <div className={styles["main-footer-medias"]}>
                    {
                      socialNetworks.map((socialNetwork) => (
                          <a href={socialNetwork.href} className={styles["main-footer-medias-link"]} target="_blank">
                            <socialNetwork.icon/>
                          </a>
                      ))
                    }
                  </div>
                  <div className={styles["main-footer-contact"]}>
                    <svg width="28" height="27">
                      <image
                          width="28"
                          height="27"
                          href="/svg/icons/letter.svg"
                      ></image>
                    </svg>
                    <a href={'mailto:' + ContactMails.contact}>{ContactMails.contact}</a>
                  </div>
                </div>
              </div>
              <div className={styles["main-footer-hr"]}>
                <svg
                    width="365"
                    height="2"
                    viewBox="0 0 365 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M0.0678711 1.28259H364.644"
                      stroke="white"
                      strokeOpacity="0.19"
                  />
                </svg>
              </div>
              <div className={styles["main-footer-copyright"]}>
                © 2025 ParkSwap All Rights Reserved
              </div>
            </footer>
          </div>
          </body>
        </PageLayout>
      </>
  );
}
