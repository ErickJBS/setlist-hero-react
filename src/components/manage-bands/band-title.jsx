import React,{useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import { Redirect, useParams } from 'react-router-dom';
import { selectSelectedBand } from '../../redux/band/band.selector';
import { createStructuredSelector } from 'reselect';

const BandTitle = ({ className, selectedBand }) => {
    const { name, logo, description, genres } = selectedBand
    const generateGenreTags = genres.split(',').map(
        (genre, index) => {
            return (
                <React.Fragment key={index}>
                    <span className="h6" key={index}><Badge variant="secondary" style={{padding:'6px'}}>{genre}</Badge></span>{' '}
                </React.Fragment>
            );
        }
    );

    return (
        <div className={className}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2" >
                        <img src={logo} className="rounded"
                            alt={name}
                            style={
                                ((value) => ({
                                    height: `${value}px`,
                                    width: `${value}px`
                                }))(150)
                            } />
                    </div>
                    <div className="col">
                        <div className="spacer-mini"/>
                        <span className="h3"><strong>{name}</strong></span>
                        <div className="spacer-sm" />
                        <p className="text-muted">{description}</p>
                        <div>
                            {generateGenreTags}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    selectedBand: selectSelectedBand
});

export default connect(
    mapStateToProps
)(BandTitle);