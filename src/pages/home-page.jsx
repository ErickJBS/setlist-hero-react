import React, { useState, useRef, useEffect } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import Card from 'react-bootstrap/Card'
import ManageBandsPage from './manage-bands/manage-bands-page';
import SetlistsPage from './setlists/setlists-page';
import PrivateRoute from '../routing/PrivateRoute';
import { Growl } from 'primereact/growl';
import { connect } from 'react-redux'

const HomePage = ({ growlMessages }) => {

    const [prevMessages, setPrevMessages] = useState(null);
    const growl = useRef();
    if (growlMessages && growlMessages !== prevMessages) {
        if (growlMessages.length > 0) {
            growl.current.show(growlMessages);
            setPrevMessages(growlMessages);
        }
    }

    return (
        <div className="bg-dark container-fluid fill-height">
            <div className="row">
                <Card className="shadowed fill-height col-2 ">
                    <Sidebar />
                </Card>
                <div className="col-10">
                    <Growl ref={growl} id="my-super-growl" position="topright" />
                    <Switch>
                        <PrivateRoute path='/bands' component={ManageBandsPage} />
                        <PrivateRoute path='/setlists' component={SetlistsPage} />
                        <PrivateRoute path='/profile' component={() => <>profile</>} />
                        <PrivateRoute path='/dashboard' component={() => <>dashboard</>} />
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => (
    { growlMessages: state.growlMessages.messages }
)

export default connect(mapStateToProps)(HomePage);