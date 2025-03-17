"use client";
import React from 'react';
import "../../../public/css/blog.css";
import {SOCIALS_NETWORKS} from "@/src/config/constants";


export default function BlogPage() {

    return (
        <>
            <body>
                Here is the blog page.
                <img src="/blogs/dev.svg" alt="Dev" height={200} />
                <main className="blog-main-container">
                    <section className="blog-section blog-header" >
                        <div className="blog-container">

                        </div>
                    </section>
                    <section className="blog-section blog-dev-token">
                        <div className="blog-dev-container blog-container">

                        </div>
                        <div className="blog-token-container blog-container">

                        </div>
                    </section>
                    <section className="blog-section blog-collection" >
                        <div className="blog-container">

                        </div>
                    </section>
                    <section className="blog-section blog-roadmap-gouvernanace" >
                        <div className="blog-roadmap-container">

                        </div>
                        <div className="blog-gouvernanace-container">

                        </div>
                    </section>
                    <section className="blog-section blog-galerie-collection" >
                        <div className="blog-container">
                            <div className="blog-container-title">

                            </div>
                            <div className="blog-galerie-collection-body">
                                <div className="blog-galerie-collection-gouvernanace" >

                                </div>
                                <div className="blog-galerie-collection-apr" >

                                </div>
                                <div className="blog-galerie-collection-galerie" >

                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <section className="footer-header">
                            <div className="footer-menu-container" >
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item" >
                                        <a href="#">Support</a>
                                    </li>
                                    <li className="footer-menu-item" >
                                        <a href="#">Help Center</a>
                                    </li>
                                    <li className="footer-menu-item" >
                                        <a href="#" >Press room</a>
                                    </li>
                                </ul>
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item" >
                                        <a href="#" >Contact</a>
                                    </li>
                                </ul>
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item" >
                                        <a href="#" >Partner</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-socials-container" >
                                {
                                    SOCIALS_NETWORKS.map((socialNetwork) => (
                                        <a href="#" key={socialNetwork.name} className="blog-social-network">
                                            <socialNetwork.icon/>
                                        </a>
                                    ))
                                }
                            </div>
                        </section>
                        <section className="footer-copyright">

                        </section>
                    </footer>
                </main>
            </body>
        </>
    )
}