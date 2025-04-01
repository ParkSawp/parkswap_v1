'use client'
import React from 'react'
import BlogLayout from "@/src/components/BlogLayout/BlogLayout";


export default function PresentationPage() {
    return (
        <BlogLayout title='Project presentation'>
            <section className="blog-text-container">
                <div className='blog-paragraph-container'>
                    <p>
                        A multifunctional aggregator where we'll try to centralize tasks - a proposition.
                    </p>
                </div>
                <h2>Why Base</h2>
                <div className='blog-paragraph-container'>
                    <p>
                        To be honest, we wanted to go on Starknet but we didn't get the grant, and it's also a good
                        project. We were afraid that competition would hold us back too much - a red ocean vs. blue
                        ocean dilemma: Starknet with little competition versus Base where it's the opposite. But we
                        couldn't find any devs for Cairo.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        Additionally, Coinbase clearly has the most diversified ecosystem, whether through its CEX,
                        Layer 2, stablecoin, and even in terms of innovation, for example with CCTP.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        Our goal initially is to increase our market share in DeFi and in our sector (DEX/aggregator).
                        Generally, in all domains, there's one major player with 80% of the market and competitors
                        fighting for the remaining 20%, like Uniswap in our case, which has about 60% of the market.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>So we went with the chain that has the most fresh TVL, shitcoins, and a Nasdaq-listed company -
                        in short, innovation.</p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        Also, most VC tickets have gone to AI projects, which means less competition for us but also
                        less "innovation" at the core of our ecosystem. However, this might also mean less capture of
                        the external market.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        And guys, if we charge fees, it's not to farm people but to finance what's next and, of course,
                        the team.
                    </p>
                </div>
            </section>
        </BlogLayout>
);
}