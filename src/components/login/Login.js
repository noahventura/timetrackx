import React, {Component } from 'react';
import { useNavigate } from 'react-router-dom';
class Login extends Component {
    render() {
        return (
            <div>
                <div>Hello, {this.props.name}!</div>
                <button onClick={() => this.props.navigate('/')}>Go to Home</button>
            </div>
        );
    }
}

function LoginWithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigate;