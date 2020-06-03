import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';
import { fetchBandsFailure, fetchBandsSuccess } from '../../redux/band/band.actions';
import { selectBands } from '../../redux/band/band.selector';
import PrivateRoute from '../../routing/PrivateRoute';
import bandService from '../../services/BandService';
import BandsOverview from './bands-overview';
import ViewBand from './view-band';
import {showMessage} from '../../redux/growl/growl.actions';
const ManageBandsPage = ({ fetchBandsFailure, fetchBandsSuccess, user, showMessage }) => {
    
    useEffect(() => {
        bandService.getAll(user.id)
            .then(bands => {
                fetchBandsSuccess(
                    bands.map(
                        band => ({
                            ...band,
                            active: band.active ? 'Active' : 'Inactive',
                            genres: band.genres.join(', ')
                        })
                    ));
            })
            .catch(error => {
                fetchBandsFailure(error);
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't fetch bands try later" })
            });
    }, []);

    return (
        <Switch>
            <PrivateRoute path="/bands/:id" component={ViewBand} />
            <PrivateRoute component={BandsOverview} />
        </Switch>
    )
};

const mapStateToProps = createStructuredSelector({
    bands: selectBands,
    user: selectUser
});

const mapDispatchToProps = dispatch => ({
    fetchBandsSuccess: bands => dispatch(fetchBandsSuccess(bands)),
    fetchBandsFailure: error => dispatch(fetchBandsFailure(error)),
    showMessage: message => dispatch(showMessage(message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageBandsPage);