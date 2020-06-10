import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { user, loading },
  path,
  ...rest
}) => (
  <Route
    path={path}
    render={
      props => (!user && !loading ? (
          <Redirect to='/login' />
        ) : (
            <Component {...props} {...rest} />
        )
      )
    }    
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);