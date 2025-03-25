"use client";
import React from 'react';
import "../../../public/css/blog.css";
import {SOCIALS_NETWORKS} from "@/src/config/constants";
import {MessageIcon} from "@/src/components/Icon/Icon";
import BlogSessionCover from "@/src/components/BlogSessionCover/BlogSessionCover";
import BlogReveal from "@/src/components/BlogReveal/BlogReveal";
import BlogContainer from "@/src/components/BlogReveal/BlogContainer";


export default function BlogPage() {

    return (
        <>
            <body className="light" >
                <main className="blog-main-container">
                    <section className="blog-section blog-header" >
                        <div className="blog-container blog-header-container" delay={0} >
                            <div className="blog-header-menu-container">
                                <div className="blog-header-logo">
                                    <a href="/">
                                        <img src="/svg/parkswap_logo_silver_big.svg" alt="Logo Parkswap" height={80} />
                                    </a>
                                </div>
                                <ul className="blog-header-left-menu">
                                    <li className="blog-header-left-menu-item" >
                                        <a href="/home"  className="blog-header-left-menu-item-link" >Home</a>
                                    </li>
                                </ul>
                            </div>
                            <BlogReveal className="blog-title-container">
                                <div className="blog-title">
                                    <h1 className="blog-header-title">Park.klub</h1>
                                </div>
                                <div className="blog-sub-title">
                                    <h3>Saison SS 2025</h3>
                                </div>
                            </BlogReveal>
                            <BlogSessionCover coverMode={false} backdrop='green'>
                                <BlogReveal delay={.32}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing...
                                </BlogReveal>
                            </BlogSessionCover>
                        </div>
                    </section>
                    <section className="blog-section blog-dev-token">
                        <BlogContainer className="blog-dev-container">
                            <img src="/blogs/dev.svg" alt=""/>
                            <BlogSessionCover text="DEV" style="black" coverMode={false} />
                        </BlogContainer>
                        <BlogContainer className="blog-token-container">
                            <img src="/blogs/token.png" alt=""/>
                            <BlogSessionCover text="TOKEN" backdrop={true} style='token'/>
                        </BlogContainer>
                    </section>
                    <section className="blog-section blog-collection" >
                        <BlogContainer className="blog-simple-collection">
                            <img src="/blogs/blank-parkswap.png" alt="Collection"/>
                            <BlogSessionCover text="COLLECTION" style="black"/>
                        </BlogContainer>
                    </section>
                    <section className="blog-section blog-roadmap-gouvernanace" >
                        <BlogContainer className="blog-roadmap-container">
                            <img src="/blogs/roadmap.png" alt="" />
                            <BlogSessionCover text="DA & ROADMAP" style="black" />
                        </BlogContainer>
                        <BlogContainer className="blog-gouvernance-container">
                            <BlogSessionCover text="GOUVERNACE" />
                        </BlogContainer>
                    </section>
                    <section className="blog-section blog-galerie-collection" >
                        <BlogContainer className="blog-galerie-conllection-container">
                            <div className="blog-galerie-title">
                                Collection
                            </div>
                            <div className="blog-galerie-container">
                                <div className="blog-galerie-collection-body">
                                    <BlogReveal delay={.1} className="blog-galerie-collection-item blog-galerie-collection-gouvernanace">
                                        <img src="/blogs/gouvernance.png" alt="Gouvernance"/>
                                        <BlogSessionCover text="Gouvernance"/>
                                    </BlogReveal>
                                    <BlogReveal delay={.17} className="blog-galerie-collection-item blog-galerie-collection-apr ">
                                        <img src="/blogs/app.png" alt="App"/>
                                        <BlogSessionCover text="APP" style="green"/>
                                    </BlogReveal>
                                    <BlogReveal delay={.25} className="blog-galerie-collection-item blog-galerie-collection-galerie">
                                        <img src="/blogs/gallerie.png" alt="Galerie"/>
                                        <BlogSessionCover text="Galerie"/>
                                    </BlogReveal>
                                </div>
                            </div>
                        </BlogContainer>
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
                            <div className="footer-copyright-links pc-only">
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