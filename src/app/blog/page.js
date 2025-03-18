"use client";
import React from 'react';
import "../../../public/css/blog.css";
import {SOCIALS_NETWORKS} from "@/src/config/constants";
import {MessageIcon} from "@/src/components/Icon/Icon";
import BlogSessionCover from "@/src/components/BlogSessionCover/BlogSessionCover";


export default function BlogPage() {

    return (
        <>
            <body class="light" >
                <main className="blog-main-container">
                    <section className="blog-section blog-header" >
                        <div className="blog-container blog-header-container">
                            <div className="blog-title-container">
                                <div className="blog-title">
                                    <h1>Park.klub</h1>
                                </div>
                                <div className="blog-sub-title">
                                    <h3>Saison SS 2025</h3>
                                </div>
                            </div>
                            <BlogSessionCover coverMode={false} backdrop='green'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing...
                            </BlogSessionCover>
                        </div>
                    </section>
                    <section className="blog-section blog-dev-token">
                        <div className="blog-dev-container blog-container">
                            <img src="/blogs/dev.svg" alt="" />
                            <BlogSessionCover text="DEV" style="black" coverMode={false} ></BlogSessionCover>
                        </div>
                        <div className="blog-token-container blog-container">
                            <img src="/blogs/token.png" alt=""/>
                            <BlogSessionCover text="TOKEN" />
                        </div>
                    </section>
                    <section className="blog-section blog-collection" >
                        <div className="blog-container">
                            <img src="/blogs/blank-parkswap.png" alt="Collection"/>
                            <BlogSessionCover text="COLLECTION" style="black"/>
                        </div>
                    </section>
                    <section className="blog-section blog-roadmap-gouvernanace" >
                        <div className="blog-roadmap-container blog-container">
                            <img src="/blogs/roadmap.png" alt="" />
                            <BlogSessionCover text="DA & ROADMAP" style="black" />
                        </div>
                        <div className="blog-gouvernance-container blog-container">
                            <BlogSessionCover text="GOUVERNACE" />
                        </div>
                    </section>
                    <section className="blog-section blog-galerie-collection">
                        <div className="blog-container">
                            <div className="blog-galerie-title">
                                Collection
                            </div>
                            <div className="blog-galerie-container">
                                <div className="blog-galerie-collection-body">
                                    <div className="blog-galerie-collection-item blog-galerie-collection-gouvernanace">
                                        <img src="/blogs/gouvernance.png" alt="Gouvernance"/>
                                        <BlogSessionCover text="Gouvernance"/>
                                    </div>
                                    <div className="blog-galerie-collection-item blog-galerie-collection-apr ">
                                        <img src="/blogs/app.png" alt="App"/>
                                        <BlogSessionCover text="APP" style="green"/>
                                    </div>
                                    <div className="blog-galerie-collection-item blog-galerie-collection-galerie">
                                        <img src="/blogs/gallerie.png" alt="Galerie"/>
                                        <BlogSessionCover text="Galerie"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <section className="footer-header">
                            <div className="footer-logo-container mobile-only">
                                <img src="/svg/parkswap_logo_silver_big.svg" alt=""/>
                            </div>
                            <div className="footer-menu-container pc-only">
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item">
                                        <a href="#">Support</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="#">Help Center</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="#">Press room</a>
                                    </li>
                                </ul>
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item">
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item">
                                        <a href="#">Partner</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-socials-container">
                                {
                                    SOCIALS_NETWORKS.map((socialNetwork) => (
                                        <a href="#" key={socialNetwork.name} className="blog-social-network">
                                            <socialNetwork.icon/>
                                        </a>
                                    ))
                                }
                            </div>
                            <div className="footer-email-container mobile-only" >
                                <MessageIcon /> <span>info@info.com</span>
                            </div>
                        </section>
                        <div className="footer-separator"></div>
                        <section className="footer-copyright">
                            <div>© 2024 ParkSwap All Rights Reserved</div>
                            <div class="footer-copyright-links pc-only">
                                <a href="#">Terms of Service</a>
                                <a href="#">Privacy policy</a>
                            </div>
                        </section>
                    </footer>
                </main>
            </body>
        </>
    )
}