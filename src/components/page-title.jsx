import React from 'react';

const PageTitle = ({ title, children, className }) => {
    return (
        <div className={className}>
            <span className="h2"><strong>{title}</strong></span>
            <div className="spacer-mini" />
            <p className="h4 text-primary"><strong>{children}</strong></p>
        </div>
    )
}

export default PageTitle;