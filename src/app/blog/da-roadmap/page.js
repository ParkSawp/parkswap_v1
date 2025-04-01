'use client';
import React from 'react';
import BlogLayout from "@/src/components/BlogLayout/BlogLayout";

export default function DaAndRoadmapPage() {

    return (
        <>
            <BlogLayout title='DA & Roadmap' >
                <section className="blog-text-container" >
                    <h2>Creating an amusement park for DeFi</h2>
                    <div className='blog-paragraph-container'>
                        <p>
                            Initially, we have SS25 (Spring/Summer 2025) where we gradually add features, which differs
                            from other projects where they release major versions each year.
                        </p>
                        <p>
                            Here, we'll add things progressively with some events, maintaining continuous evolution. Of
                            course, after September there will be another season with V2 to consolidate the app, but the
                            biggest developments will certainly be in V3, which isn't coming soon, but we're planning
                            something substantial.
                        </p>
                    </div>
                    <div className='blog-paragraph-container'>
                        <p>
                            And after that: implementing fees to audit contracts, launching a V2, a token, and other
                            features as soon as possible. Later, we'll expand to other EVM chains and platforms like
                            Telegram, creating an integration with the app and diversifying our offerings. Developing a
                            good mobile format and constantly pursuing innovation - I think the mistake once you have a
                            company generating passive income is to protect that income, but in tech it's the opposite.
                        </p>
                        <p>
                            To create anti-fragility, you must constantly innovate. We also have other app ideas.
                        </p>
                    </div>
                    <div className='blog-paragraph-container'>
                        <p>
                            Especially since there are new hypes in crypto every day - yesterday it was NFTs, today it's
                            agents, this afternoon it's memes.
                        </p>
                        <p>
                            To say that there's a lot of noise and it's hard to stay focused and maintain a clear
                            direction with real innovation is complex. You need to move fast, but not too fast.
                        </p>
                    </div>
                    <br/>
                    <div className='blog-paragraph-container'>
                        <p>Creating an amusement park for DeFi</p>
                    </div>
                </section>
            </BlogLayout>
        </>
    );
}