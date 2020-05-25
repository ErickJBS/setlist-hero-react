import React from 'react';
import { withRouter } from 'react-router-dom';
import PageTitle from '../../components/page-title';
import GenericBodyCard from '../../components/generic-body-card';
import SetlistsBody from '../../components/setlists/setlist-body';
const SetlistsPage = () => {

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <PageTitle className="shadowed animated faster bounceInRight" title="Your Setlists">
                Here you can organize, create, delete, edit and search your setlists were you are live experience designer
            </PageTitle>
            <div className="spacer-sm" />
            <GenericBodyCard
                title="Setlists"
                className="shadowed animated faster bounceInRight delayed"
                searchBar={
                    <form style={{ paddingLeft: '80px' }} className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                }>
                <SetlistsBody />
            </GenericBodyCard>
        </div>
    )
};

export default withRouter(SetlistsPage);