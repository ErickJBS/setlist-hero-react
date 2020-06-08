import React from 'react';
import Card from 'react-bootstrap/card';
import { withRouter } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import SetlistsBody from '../../components/setlists/setlist-body';
const SetlistsPage = () => {

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <Card className="shadowed" style={{ padding: '20px' }}>
                <Card.Body>
                    <PageTitle title="Your Setlists">
                        Organize your setlists
                    </PageTitle>
                    <div className="spacer-sm" />
                    <SetlistsBody />
                </Card.Body>
            </Card>
        </div>
    )
};

export default withRouter(SetlistsPage);