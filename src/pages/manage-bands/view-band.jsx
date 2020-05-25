import React from 'react'
import {useParams, withRouter} from 'react-router-dom';

const ViewBand = () => {
    const {name} = useParams();
    console.log(name);
    return (
        <>
            {name}
        </>
    )
};

export default withRouter(ViewBand);