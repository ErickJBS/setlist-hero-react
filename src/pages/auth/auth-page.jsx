import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '../../redux/auth/auth.selector';

const AuthPage = ({image, children}) =>{
    return (
        <div className="p-3 fill-height center" style={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }}>
            <div  className="animated faster fadeIn">
                <Card className="shadowed"
                style={{ width: '20rem', padding:'15px' }}>
                    {children}
                </Card>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    user: selectUser
});



export default connect(
    mapStateToProps
)(AuthPage);