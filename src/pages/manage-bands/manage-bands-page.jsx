import React from 'react'
import { Switch, withRouter } from 'react-router-dom';
import PrivateRoute from '../../routing/PrivateRoute';
import BandsOverview from './bands-overview';
import ViewBand from './view-band';

const ManageBandsPage = () => {
    return (
        <Switch>
            
            <PrivateRoute path="/home/bands/:name" component={ViewBand}/>
            <PrivateRoute component={BandsOverview}/>
        </Switch>
    )
};

export default withRouter(ManageBandsPage);