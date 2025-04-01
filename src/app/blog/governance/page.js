'use client'

import BlogLayout from "@/src/components/BlogLayout/BlogLayout";
import React from "react";

export default function GovernancePage() {

    return (
        <BlogLayout title='Governance'>
            <section className="blog-text-container" >
                <div className="blog-paragraph-container">
                    <p>
                        Extreme fractal governance aims to maximize participation and engagement within a DAO while
                        reflecting the initial spirit. This concept is based on a non-hierarchical structure, on the
                        principle of one user = one voice on an unlisted governance token, where the DAO is divided into
                        specialized groups called PODs (points of development).
                    </p>
                </div>

                <div className="blog-paragraph-container">
                    <p>
                        Opting for an unlisted governance token system primarily aims to strengthen internal engagement
                        and align members with the DAO's objectives. This encourages authentic participation focused on
                        adding value to the community and maintains the focus on governance and real contributions
                        rather than market fluctuations.
                    </p>
                </div>

                <div className="blog-paragraph-container">
                    <p>
                        Each POD is autonomous and focuses on specific areas, ranging from technical development to
                        marketing strategy to community management. Implementing this model, however, requires rigorous
                        coordination and communication between different PODs, with a "lead" without hierarchical power
                        for each POD serving as a liaison with the DAO as a whole.
                    </p>
                </div>

                <div className="blog-paragraph-container">
                    <p>
                        The idea is to decentralize decision-making as much as possible, allowing each POD to function
                        independently while remaining aligned with the overall vision of the DAO. Crucial decisions or
                        those that exceed the scope of a single POD are presented to the entire community during plenary
                        meetings, ensuring that each member, regardless of their role, has a voice in the major
                        directions of the DAO. Credit:
                        <a className="article-link"
                           href="https://fr.linkedin.com/in/st%C3%A9phane-c-a67609158 Article link: https://fr.linkedin.com/pulse/proposition-dun-nouveau-mod%C3%A8le-de-gouvernance-dao-st%C3%A9phane-chometton-x61hf">
                            https://fr.linkedin.com/in/st%C3%A9phane-c-a67609158
                        </a>
                        <a className="article-link"
                           href="https://fr.linkedin.com/pulse/proposition-dun-nouveau-mod%C3%A8le-de-gouvernance-dao-st%C3%A9phane-chometton-x61hf">
                            https://fr.linkedin.com/pulse/proposition-dun-nouveau-mod%C3%A8le-de-gouvernance-dao-st%C3%A9phane-chometton-x61hf
                        </a>
                    </p>
                </div>

                <div className='blog-paragraph-container disclaimer'>
                    <p>
                        <strong>Disclaimer</strong>: <span>This remains an idea; we may pivot because we find this person's idea interesting, even though they're not part of the team.</span>
                    </p>
                </div>
            </section>

        </BlogLayout>
    )
}