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
                    <Badge key={index} className="h7" variant="secondary">{genre}</Badge>{' '}
                </React.Fragment>
            );
        }
    );

    return (
        <Card style={{paddingTop:'15px',paddingLeft: '10px', paddingBottom:'15px'}} className={className}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 center" >
                        <img src={logo} className="rounded"
                            alt={name}
                            style={/**Satanic IIFE */
                                ((value) => ({
                                    height: `${value}px`,
                                    width: `${value}px`
                                }))(150)
                            } />
                    </div>
                    <div className="col">
                        <span className="h5"><strong>{name}</strong></span>
                        <div className="spacer-sm" />
                        <p className="text-muted">{description}</p>
                        <div>
                            {generateGenreTags}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
const mapStateToProps = createStructuredSelector({
    selectedBand: selectSelectedBand
});

export default connect(
    mapStateToProps
)(BandTitle);