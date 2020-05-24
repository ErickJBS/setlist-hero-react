import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import Card from 'react-bootstrap/Card'
import BandManagementPage from './band-management-page';
import PrivateRoute from '../../routing/PrivateRoute';


const Dashboard = () => {
    return (
        <div className="bg-light container-fluid fill-height">
            <div className="row">
                <Card className="shadowed fill-height col-2 ">
                    <Sidebar />
                </Card>
                <div className="col-10">
                    <Switch>
                        <PrivateRoute path='/dashboard/bands' component={BandManagementPage}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
};

export default withRouter(Dashboard);