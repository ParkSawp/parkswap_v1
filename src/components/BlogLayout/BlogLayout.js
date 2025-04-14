import BlogReveal from "@/src/components/BlogReveal/BlogReveal";
import BlogSessionCover from "@/src/components/BlogSessionCover/BlogSessionCover";
import "../../../public/css/blog.css";
import {ContactMails, SOCIALS_NETWORKS} from "@/src/config/constants";
import {MessageIcon} from "@/src/components/Icon/Icon";
import React from "react";


export default function BlogLayout({ children, title }) {

    return (
        <body className="light">
            <main className="blog-main-container">
                <section className="blog-section blog-header">
                    <div className="blog-container blog-header-container" delay={0}>
                        <div className="blog-header-menu-container">
                            <div className="blog-header-logo">
                                <a href="/">
                                    <img src="/img/main_logo.png" alt="Logo Parkswap" height={80}/>
                                </a>
                            </div>
                            <ul className="blog-header-left-menu">
                                <li className="blog-header-left-menu-item">
                                    <a href="/blog" className="blog-header-left-menu-item-link">Home</a>
                                </li>
                                <li className="blog-header-left-menu-item">
                                    <a href="/blog/dev" className="blog-header-left-menu-item-link">Dev</a>
                                </li>
                                <li className="blog-header-left-menu-item">
                                    <a href="/blog/token" className="blog-header-left-menu-item-link">Token</a>
                                </li>
                                <li className="blog-header-left-menu-item">
                                    <a href="/blog/da-roadmap" className="blog-header-left-menu-item-link">DA &
                                        Roadmap</a>
                                </li>
                                <li className="blog-header-left-menu-item">
                                    <a href="/blog/governance" className="blog-header-left-menu-item-link">DAO</a>
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
                        <BlogSessionCover coverMode={false} backdrop='green' link='/blog/presentation'>
                            <BlogReveal delay={.32}>
                                POST
                            </BlogReveal>
                        </BlogSessionCover>
                    </div>
                </section>
                {
                    title ? (
                        <section className="blog-section blog-page-title">
                            {title}
                        </section>
                    ): null
                }
                {children}
                <footer>
                    <section className="footer-header">
                        <div className="footer-logo-container mobile-only">
                            <img src="/svg/parkswap_logo_silver_big.svg" alt=""/>
                        </div>
                        <div className="footer-menu-container pc-only">
                            {/*<ul className="footer-menu-list">*/}
                            {/*    <li className="footer-menu-item">*/}
                            {/*        <a href="#">Support</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="footer-menu-item">*/}
                            {/*        <a href="#">Help Center</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="footer-menu-item">*/}
                            {/*        <a href="#">Press room</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                            <ul className="footer-menu-list">
                                <li className="footer-menu-item">
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                            {/*<ul className="footer-menu-list">*/}
                            {/*    <li className="footer-menu-item">*/}
                            {/*        <a href="#">Partner</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
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
                        <div className="footer-email-container mobile-only">
                            <MessageIcon/> <a href={'mailto:'+ContactMails.contact}>{ContactMails.contact}</a>
                        </div>
                    </section>
                    <div className="footer-separator"></div>
                    <section className="footer-copyright">
                        <div>© 2025 ParkSwap All Rights Reserved</div>
                        <div className="footer-copyright-links pc-only">
                            <a href="#">Terms of Service</a>
                            <a href="#">Privacy policy</a>
                        </div>
                    </section>
                </footer>
            </main>
        </body>
    )
}