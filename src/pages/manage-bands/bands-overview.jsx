import React from 'react';
import { withRouter} from 'react-router-dom';
import PageTitle from '../../components/page-title';
import GenericBodyCard from '../../components/generic-body-card';
import ManageBandsBody from '../../components/manage-bands/manage-bands-body';

const BandsOverview = () => {
    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <PageTitle className="shadowed animated faster bounceInRight" title="Your Bands">
                Here you can organize, create, delete, edit and search your bands
            </PageTitle>
            <div className="spacer-sm" />
            <GenericBodyCard className="shadowed animated faster bounceInRight delayed">
                <ManageBandsBody />
            </GenericBodyCard>
        </div>
    )
};
export default withRouter(BandsOverview);