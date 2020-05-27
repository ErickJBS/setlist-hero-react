import React,{useEffect} from 'react'
import { useParams, Switch, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectSelectedBand } from '../../redux/band/band.selector';
import { selectBand } from '../../redux/band/band.actions';
import { createStructuredSelector } from 'reselect';
import GenericBodyCard from '../../components/generic-body-card';
import BandTitle from '../../components/manage-bands/band-title';
import PrivateRoute from '../../routing/PrivateRoute';
import BandTopBar from '../../components/manage-bands/topbar/band-topbar';

const ViewBand = ({ selectedBand, selectBand }) => {
    const { id } = useParams();
    const history = useHistory();
    console.log(id);

    

    return (
        <div className="container-fluid" style={{ padding: '20px' }}>
            <BandTitle className="shadowed animated faster bounceInRight" />
            <div className="spacer-sm" />
            <GenericBodyCard className="container-fluid shadowed animated faster bounceInRight delayed">
                <div className="row">
                    <div className="col">
                        <BandTopBar />
                        <div className="spacer-mini"/>
                    </div>
                </div>
                <div className="spacer-sm"/>
                <div className="row">
                    <div className="col">
                        <Switch>
                            <PrivateRoute path="/bands/:id/members" component={() => <>members</>} />
                            <PrivateRoute path="/bands/:id/songs" component={() => <>songs</>} />
                            <PrivateRoute path="/bands/:id/events" component={() => <>events</>} />
                            <PrivateRoute path="/bands/:id/edit" component={() => <>edit</>} />
                            <Redirect from="/bands/:id" to="/bands/:id/members"/>
                        </Switch>
                    </div>
                </div>
            </GenericBodyCard>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    selectedBand: selectSelectedBand
});

const mapDispatchToProps = dispatch => ({
    selectBand: band => dispatch(selectBand(band))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewBand);