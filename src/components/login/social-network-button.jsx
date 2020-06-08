import environment from 'environment';
import React from 'react';

const baseUrl = environment.api;

const SocialNetworkButton = ({ logo, text, action, btnClass }) => {
    return (
        <button className={`btn btn-block ${btnClass}`} 
        onClick={() => window.location.href = `${baseUrl}/auth/${action}`}>
            <span className="content-horizontal">
                <img src={logo} alt="logo"
                    style={/**Satanic IIFE */
                        ((value) => ({
                            height: `${value}px`,
                            width: `${value}px`,
                            marginRight: "12px"
                        }))(20)
                    } />
                {text}
            </span>
        </button>
    )
}

export default SocialNetworkButton;