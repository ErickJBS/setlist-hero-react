import { Growl } from 'primereact/growl';
import React, { useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import PrivateRoute from '../routing/PrivateRoute';
import ManageBandsPage from './manage-bands/manage-bands-page';
import SetlistsRouter from './setlists/setlists-router';

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
                        <PrivateRoute path='/setlists' component={SetlistsRouter} />
                        <Redirect from="/" to="/bands" />
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