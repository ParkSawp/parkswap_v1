import React from 'react';

export default function BlogSessionCover({ backdrop, coverMode = true, children, text, style, buttonText, buttonClassName }) {

    let className = "blog-section-options-container"
        if(coverMode) {
           className += ' as-cover';
        }
        className += ' '+(style ?? 'white');
        if(backdrop) {
            className += ' backdrop-'+backdrop;
        }

    return (
        <div className={className}>
            <div className="blog-session-cover-text-container" >
                {children || text}
            </div>
            <button class={"blog-discover-btn "+(buttonClassName ?? '')}>{buttonText || 'Discover'}</button>
        </div>
    )
}