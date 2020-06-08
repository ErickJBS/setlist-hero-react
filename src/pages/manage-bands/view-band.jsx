import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { Redirect, Switch, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import BandTitle from '../../components/manage-bands/band-title';
import BandEvents from '../../components/manage-bands/band/band-events';
import BandMembers from '../../components/manage-bands/band/band-members';
import BandSongsRouter from '../../components/manage-bands/band/band-songs-router';
import EditBand from '../../components/manage-bands/band/edit-band';
import BandTopBar from '../../components/manage-bands/topbar/band-topbar';
import { selectBand } from '../../redux/band/band.actions';
import { selectSelectedBand } from '../../redux/band/band.selector';
import PrivateRoute from '../../routing/PrivateRoute';

const ViewBand = ({ selectedBand, selectBand }) => {
    const { id } = useParams();

    if (id !== selectedBand.id) return <Redirect to="/bands" />

    return (
        <div className="container-fluid animated faster fadeIn" style={{ padding: '20px' }}>
            <Card className="shadowed" style={{ padding: '20px' }}>
                <Card.Body>
                    <BandTitle />
                    <hr />
                    <div className="row">
                        <div className="col">
                            <BandTopBar />
                        </div>
                    </div>
                    <div className="spacer-mini" />
                    <div className="row">
                        <div className="col">
                            <Switch>
                                <PrivateRoute path="/bands/:id/members" component={BandMembers} />
                                <PrivateRoute path="/bands/:id/songs" component={BandSongsRouter} />
                                <PrivateRoute path="/bands/:id/events" component={BandEvents} />
                                <PrivateRoute path="/bands/:id/edit" component={EditBand} />
                                <Redirect from="/bands/:id" to="/bands/:id/members" />
                            </Switch>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    selectedBand: selectSelectedBand
});

const mapDispatchToProps = dispatch => ({
    selectBand: band => dispatch(selectBand(band))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewBand);