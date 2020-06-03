import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectedBand } from '../../redux/band/band.selector';

const BandTitle = ({ className, selectedBand }) => {
    const { name, logo, description, genres } = selectedBand
    const generateGenreTags = genres.split(',').map(
        (genre, index) => {
            return (
                <React.Fragment key={index}>
                    <span className="h6" key={index}><Badge variant="secondary" style={{ padding: '6px' }}>{genre}</Badge></span>{' '}
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
                        <div className="spacer-mini" />
                        <span className="h3"><strong>{name}</strong></span>
                        <div className="spacer-sm" />
                        <p className="text-white">{description}</p>
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