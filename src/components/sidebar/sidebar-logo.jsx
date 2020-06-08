import React from 'react'
import logo from '../../assets/only_logo.svg';
const SidebarLogo = () => {
    return (
        <div className="col ">
            <div className="center image-centerd">
                <img className="animated fast sidebar-logo rubberBand"
                    src={logo} alt="logo"
                    style={/**Satanic IIFE */
                        ((value) => ({
                            height: `${value}px`,
                            width: `${value}px`,
                            marginTop: '20px'
                        }))(100)
                    } />
            </div>
            <h5 className="center"><strong>SETLIST HERO</strong></h5>
        </div>
    )
}

export default SidebarLogo;

