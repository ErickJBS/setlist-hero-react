import React from 'react';
import logo from '../assets/only_logo.svg';

const MiniLogo = () => {
    return (
        <div className="center image-centerd">
            <img src={logo} alt="logo"
                style={/**Satanic IIFE */
                    ((value) => ({
                        height: `${value}px`,
                        width: `${value}px`
                    }))(100)
                } />
        </div>
    )
}

export default MiniLogo;