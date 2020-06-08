import React from 'react';
import Card from 'react-bootstrap/Card';
import ManageBandsBody from '../../components/manage-bands/manage-bands-body';
import PageTitle from '../../components/page-title';

const BandsOverview = () => {

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <Card className="shadowed" style={{ padding: '20px' }}>
                <Card.Body>
                    <PageTitle className="animated faster fadeIn" title="Your Bands">
                        Organize your bands
                    </PageTitle>
                    <hr />
                    <div className="spacer-mini" />
                    <ManageBandsBody />
                </Card.Body>
            </Card>
        </div>
    )
};
export default BandsOverview;