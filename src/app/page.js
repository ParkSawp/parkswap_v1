// pages/index.js
"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../public/css/index.module.css";
import { motion } from "framer-motion";
import HomeFeature from "@/src/components/Home/HomeFeature";

export default function Home() {

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


  return (
    <>
      {/*<Head>*/}
      {/*</Head>*/}
      <body>
      <div className={styles["site-wrapper"]}>
        <nav className={styles["main-navigation"]}>
          <div className={styles["main-navigation-container-btn"]}>
            <div className={styles["navigation-btn"]}>
              <svg width="32" height="33">
                <title>Open Menu</title>
                <image
                    width="32"
                    height="33"
                    href="/svg/icons/menu.svg"
                ></image>
              </svg>
            </div>
            <div className={styles["navigation-bar"]}>
              <ul>
                <li>Ecosystem</li>
                <li>Community</li>
                <li>A Propos</li>
                <li>Blog</li>
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
                          Multifunctionnal aggregator
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
              features.map((feature) => <HomeFeature feature={feature}/>)
            }
          </div>
        </section>
        <footer className={styles["main-footer"]}>
          <div className={styles["main-footer-logo"]}>
            <img
                width="67"
                height="93"
                src="/img/main_logo.png"
                alt="Parkswap logo white"
            />
          </div>
          <div className={styles["main-footer-medias"]}>
            <a href="">
              <svg width="28" height="24">
                <image
                    width="28"
                    height="24"
                    href="/svg/icons/twitter.svg"
                ></image>
              </svg>
            </a>
            <a href="">
              <svg width="31" height="32">
                <image
                    width="31"
                    height="32"
                    href="/svg/icons/discord.svg"
                ></image>
              </svg>
            </a>
            <a href="">
              <svg width="30" height="29">
                <image
                    width="30"
                    height="29"
                    href="/svg/icons/github.svg"
                ></image>
              </svg>
            </a>
          </div>
          <div className={styles["main-footer-contact"]}>
            <svg width="28" height="27">
              <image
                  width="28"
                  height="27"
                  href="/svg/icons/letter.svg"
              ></image>
            </svg>
            parkswap@parkswap.com
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
            © 2024 ParkSwap All Rights Reserved
          </div>
        </footer>
      </div>
      </body>
    </>
  );
}
