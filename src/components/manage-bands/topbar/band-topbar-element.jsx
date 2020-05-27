import React from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom';
import './top-bar-element.css';

const BandTopBarElement = ({text}) => {
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const selected = location.pathname.match(text.toLowerCase());

    return (
        <div className={`center col tbe-selectable ${selected ? 'tbe-selected' : ''}`}
            onClick={() => history.push(`/bands/${id}/${text.toLowerCase()}`)}>
            <h6><strong>{text}</strong></h6>
        </div >
    )
}

export default BandTopBarElement;