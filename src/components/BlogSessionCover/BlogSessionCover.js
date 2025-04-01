import React from 'react';
import BlogReveal from "@/src/components/BlogReveal/BlogReveal";

export default function BlogSessionCover({ backdrop, link, soon = false, coverMode = true, children, text, style, buttonText, buttonClassName }) {

    let className = "blog-section-options-container"
        if(coverMode) {
           className += ' as-cover';
        }
        className += ' '+(style ?? 'white');
        if(backdrop) {
            className += ' backdrop-'+backdrop;
        }

    return (
        <BlogReveal className={className}>
            <div className="blog-session-cover-text-container">
                {children || text}
            </div>
            {
                soon
                    ? <div className="blog-section-soon-mode" >Soon</div>
                    : <a href={link} className={"blog-discover-btn " + (buttonClassName ?? '')}>{buttonText || 'Discover'}</a>
            }
        </BlogReveal>
    )
}