import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import Card from 'react-bootstrap/Card'
import ManageBandsPage from './manage-bands/manage-bands-page';
import SetlistsPage from './setlists/setlists-page';
import PrivateRoute from '../routing/PrivateRoute';

const HomePage = () => {
    return (
        <div className="bg-light container-fluid fill-height">
            <div className="row">
                <Card className="shadowed fill-height col-2 ">
                    <Sidebar />
                </Card>
                <div className="col-10">
                    <Switch>
                        <PrivateRoute path='/bands' component={ManageBandsPage}/>
                        <PrivateRoute path='/setlists' component={SetlistsPage}/>
                        <PrivateRoute path='/profile' component={() => <>profile</>}/>
                        <PrivateRoute path='/dashboard' component={() => <>dashboard</>}/>
                        <Redirect from="/" to="/dashboard"/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default HomePage;