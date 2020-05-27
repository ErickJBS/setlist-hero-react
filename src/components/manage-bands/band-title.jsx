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
        genre => {
            return (
                <>
                    <Badge className="h6" variant="secondary">{genre}</Badge>{' '}
                </>
            );
        }
    );

    return (
        <Card style={{ padding: '30px' }} className={className}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 center" >
                        <img src={logo}
                            alt={name}
                            style={/**Satanic IIFE */
                                ((value) => ({
                                    height: `${value}px`,
                                    width: `${value}px`,
                                    marginTop: '20px'
                                }))(100)
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