"use client";
import React from 'react';
import BlogSessionCover from "@/src/components/BlogSessionCover/BlogSessionCover";
import BlogReveal from "@/src/components/BlogReveal/BlogReveal";
import BlogContainer from "@/src/components/BlogReveal/BlogContainer";
import BlogLayout from "@/src/components/BlogLayout/BlogLayout";


export default function BlogPage() {

    return (
        <>
            <BlogLayout>
                <section className="blog-section blog-dev-token">
                    <BlogContainer className="blog-dev-container">
                        <img src="/blogs/dev.svg" alt=""/>
                        <BlogSessionCover text="DEV" style="black" soon={true} coverMode={false}/>
                    </BlogContainer>
                    <BlogContainer className="blog-token-container">
                        <img src="/blogs/token.png" alt=""/>
                        <BlogSessionCover text="TOKEN" backdrop={true} style='token'/>
                    </BlogContainer>
                </section>
                <section className="blog-section blog-collection">
                    <BlogContainer className="blog-simple-collection not-available">
                        <img src="/blogs/blank-parkswap.png" alt="Collection"/>
                        <BlogSessionCover text="COLLECTION" style="black" soon={true}/>
                    </BlogContainer>
                </section>
                <section className="blog-section blog-roadmap-gouvernanace">
                    <BlogContainer className="blog-roadmap-container">
                        <img src="/blogs/roadmap.png" alt=""/>
                        <BlogSessionCover text="DA & ROADMAP" style="black" link='/blog/da-roadmap'/>
                    </BlogContainer>
                    <BlogContainer className="blog-governance-container">
                        <BlogSessionCover text="DAO" link='/blog/governance'/>
                    </BlogContainer>
                </section>
                <section className="blog-section blog-galerie-collection">
                    <BlogContainer className="blog-galerie-conllection-container">
                        <div className="blog-galerie-title">
                            Collection
                        </div>
                        <div className="blog-galerie-container">
                            <div className="blog-galerie-collection-body">
                                <BlogReveal delay={.1}
                                            className="blog-galerie-collection-item blog-galerie-collection-gouvernanace not-available">
                                    <img src="/blogs/newsletter.png" alt="Newsletter"/>
                                    <BlogSessionCover text="Newsletter" soon={true}/>
                                </BlogReveal>
                                <BlogReveal delay={.17}
                                            className="blog-galerie-collection-item blog-galerie-collection-apr not-available">
                                    <img src="/blogs/app.png" alt="App"/>
                                    <BlogSessionCover text="APP" style="green" soon={true}/>
                                </BlogReveal>
                                <BlogReveal delay={.25}
                                            className="blog-galerie-collection-item blog-galerie-collection-galerie not-available">
                                    <img src="/blogs/gallerie.png" alt="Galerie"/>
                                    <BlogSessionCover text="Galerie" soon={true }/>
                                </BlogReveal>
                            </div>
                        </div>
                    </BlogContainer>
                </section>
            </BlogLayout>
        </>
    )
}