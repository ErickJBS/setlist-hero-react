import React from 'react';
import {withRouter} from 'react-router-dom';

const BandManagementPage = () =>{
    console.log('rendering bands');
    return(
        <>
            Band Management!
        </>
    )
};

export default withRouter(BandManagementPage);