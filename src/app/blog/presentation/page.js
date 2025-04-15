'use client'
import React from 'react'
import BlogLayout from "@/src/components/BlogLayout/BlogLayout";


export default function PresentationPage() {
    return (
        <BlogLayout title='ParkSwap Presentation'>
            <section className="blog-text-container">
                <div className='blog-paragraph-container'>
                    <p>
                        In this paper, I will discuss the Purpose, Value, and Vision of ParkSwap.
                    </p>
                </div>
                <h2>Principle of Least Effort - ParkSwap</h2>
                <div className='blog-paragraph-container'>
                    <p>Our idea is based on the principle of least action.</p>
                    <p>
                        Just as a particle naturally follows the path that minimizes action, users will gravitate toward
                        platforms that allow them to accomplish their tasks with the minimum number of steps.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        Our goal is to bring maximum efficiency with minimal effort by centralizing various DeFi
                        functionalities into a single interface with minimal actions and friction - creating beneficial
                        centralization while preserving the advantages of DeFi: control of assets and transparency.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        We will release new features very frequently, hence the purpose of our seasons - not to farm
                        users, but to bring a certain regularity in adding features so users can see what's coming in
                        the upcoming months. We also aim to maintain consistency while accepting seasonality - I've
                        never seen an ecosystem without it.
                    </p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>
                        There are intrinsic and extrinsic seasonalities. For extrinsic ones, it will be a bull run where
                        prices appreciate, resulting in more activity and new narratives like NFTs, Memecoins, etc. In
                        crypto, narratives are much shorter, so you need to ride them without marrying them. Having an
                        aggregator is protection because it's one of the core reactors of DeFi. For example, we're
                        starting on Base because there's a certain hype and metrics behind it with regular activity, and
                        Coinbase has one of the most diversified ecosystems. As for intrinsic seasonality, it's simply a
                        new feature, a token, or an event like an AirDrop.
                    </p>
                </div>
                <h2>Our Added Value</h2>
                <div className='blog-paragraph-container'>
                    <p>
                        We create margin by creating value. A table top that costs 2 euros and table legs that cost 1
                        euro - when you put them together, it's worth 6 euros, for example. So you pay for the assembly.
                        Users only have the raw materials, which are tokens in our case. Therefore, the goal is to make
                        several different parts work together - that's ParkSwap. It's like with the table: people pay
                        for the assembly of the various pages (swap, portfolio, market, bridge) and features like the
                        paymaster, aggregation, etc.
                    </p>
                    <p>The added value comes from the intelligent assembly of components.</p>
                </div>
                <div className='blog-paragraph-container'>
                    <p>In our case:</p>
                    <ul class='blog-list' >
                        <li>The "raw materials" are the tokens</li>
                        <li>The "assembly" is our unified interface, aggregation, and features like the paymaster</li>
                        <li>The "margin" is the value created by this harmonious integration</li>
                    </ul>
                    <br/>
                    <p>Users are willing to pay this premium (via fees) because we save them:</p>
                    <ul class='blog-list' >
                        <li>Time (everything in one place)</li>
                        <li>Cognitive effort (simplified interface)</li>
                        <li>Transaction costs (swap optimization)</li>
                    </ul>
                </div>
                <h2>Vision</h2>
                <div className='blog-paragraph-container'>
                    <p>
                        Having a vision and objectives - the vision is what we build for the long term, and the objectives are what we must accomplish to get there. For example, we want to be one of the best protocols, so we need users, TVL, and a certain attractiveness. The goal is to do reverse engineering: we start from the vision and work down to very concrete objectives, juggling between Micro and Macro.
                    </p>
                    <p>At ParkSwap, we readjust it all the time. Initially, we wanted to be a DEX, then this, then that, and that's okay because you have to have a vision to start with. It's like a scientific experiment - you can't start without hypotheses, otherwise you don't know what you're looking for. Have a strongly held belief with lightness.</p>
                    <p>I hope you enjoyed reading this. If it sometimes bugs out, it's normal - we're 5 people and we haven't raised funds XD. Let's catch up at the end of the year for V2.</p>
                </div>
                <br/>
                <div>
                    <strong>EnzoPark, PARIS</strong>
                </div>
            </section>
        </BlogLayout>
    );
}