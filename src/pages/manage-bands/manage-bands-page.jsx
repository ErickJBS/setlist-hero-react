import React, {useEffect} from 'react'
import { Switch, withRouter } from 'react-router-dom';
import PrivateRoute from '../../routing/PrivateRoute';
import BandsOverview from './bands-overview';
import ViewBand from './view-band';
import {connect} from 'react-redux';
import {fetchBandsSuccess, fetchBandsFailure} from '../../redux/band/band.actions';
import {selectBands} from '../../redux/band/band.selector';
import {selectUser} from '../../redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import bandService from '../../services/BandService';

const ManageBandsPage = ({fetchBandsFailure, fetchBandsSuccess, user}) => {
    useEffect(() => {
        bandService.getAll(user.id)
        .then(result => {
            const bands = result.map(
                element => ({...element, genres: element.genres.map((genre, index) => index === 0 ? genre : ` ${genre}`).join()})
            );
            fetchBandsSuccess(bands);
        })
        .catch(error => fetchBandsFailure(error));
    },[fetchBandsFailure,fetchBandsSuccess]);

    return (
        <Switch>
            <PrivateRoute path="/bands/:id" component={ViewBand}/>
            <PrivateRoute component={BandsOverview}/>
        </Switch>
    )
};

const mapStateToProps = createStructuredSelector({
    bands: selectBands,
    user: selectUser
});

const mapDispatchToProps = dispatch => ({
    fetchBandsSuccess: bands => dispatch(fetchBandsSuccess(bands)),
    fetchBandsFailure: error => dispatch(fetchBandsFailure(error))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageBandsPage);