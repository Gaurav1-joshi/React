import React, { Component } from 'react';
// import { loginAction } from './action/LoginAction';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import {
//   formValueSelector,
// } from 'redux-form';
import { connect } from 'react-redux';
// import './App.css';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import { API_URL } from '../../../actions/utilAction';
import {Redirect} from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Logo from '../../../assets/img/brand/sound.png'
import '../../../../src/App.css';
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends Component {
  constructor(props) {

    super(props);
    this.validator = new SimpleReactValidator({
      element: message => <div className="text-danger" >{message}</div>
    });
    this.state = {
      errorMessage: null,
      type: 'password',
      rememberme: false,
      Username: null,
      Password: null,
      businessCheckMessage: "",
      statusCode: null,
      userId: '',
      token: '',
      redirectToReferrer: false,
      loading: false,
    };
  }

  componentDidMount = () => {
    //localStorage.setItem("userId", '');
    //localStorage.removeItem("userId");
    
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  onSubmit = () => {
    //this.props.history.push('/login')
    if (this.validator.allValid()) {
      // let authData =
      //   {
      //     userName: this.state.Username,
      //     password: this.state.Password,
      //   }
      //this.props.loginAction(authData);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
    //history.push('/dashboard');
    // let authData = {
    //   userName: this.state.Username,
    //   password: this.state.Password
    // }
    if ((this.state.Username !== '' || this.state.Username !== 'support10') || (this.state.Password !== '@Sur#484$' || this.state.Password === '')) {
      this.setState({
        businessCheckMessage: ''
      })
    }
    else if (this.state.Username === '' && this.state.Password === '') {
      this.setState({
        businessCheckMessage: 'Please enter username and  password'
      })
    }
  }

  authentication = (e) => {
    this.setState({
      statusCode: null
    })
    e.preventDefault()

    var self = this;
    var apiBaseUrl = `${API_URL}/api/authentication`;


    if (this.validator.allValid()) {
      // let authData =
      //   {
      //     userName: this.state.Username,
      //     password: this.state.Password,
      //   }
      // this.props.loginAction(authData);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
    //history.push('/dashboard');
    let authData = {
      userName: this.state.Username,
      password: this.state.Password
    }
    var base64 = require('base-64');
    let saveData = new FormData();
    saveData.userName = authData.userName;
    saveData.password = base64.encode(authData.password);

    if ((this.state.Username != null && this.state.Username !== '') && (this.state.Password != null && this.state.Password !=='')) {
      self.setState({ loading: true })
      axios.post(apiBaseUrl, JSON.stringify(saveData), {
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => {
          const statusCode = response.data.statusCode;
          this.setState({ statusCode });
          if (statusCode === 200) {
            var userId = response.data.data.idVendor;
            var token = response.data.access_token;

            localStorage.setItem("userId", userId);
            localStorage.setItem("token", token)
            self.setState({ userId: userId, token: token });
            this.props.history.push('/Uploader')
          }
          self.setState({ loading: false })

         
        })
        .catch(function (error) {
  
          console.log(error);
        });
    }


  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentWillReceiveProps = (nextProps) => {
  }



  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return (
      <div className="flex-row">
        <header className='app-header navbar'>
        <a className="navbar-brand"><img src={Logo} width="150" height="54" alt="CoreUI Logo" className="navbar-brand-full"/></a>
        </header>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <form onSubmit={this.authentication}>
                    <CardBody >
                      {/* <form noValidate onSubmit={ this.onSubmit.bind(this)}> */}
                      {/* <h1 className="text-center">Login</h1> */}
                      <div className="col-sm-12 form-button text-center mt-3">
                      <img src={Logo} width="150" height="54" alt="CoreUI Logo" className="navbar-brand-full text-center" />
                    </div>
                      {this.state.statusCode === 400 ? <div className="alert-danger">Invalid Username or Password </div> : null}
                      <br />
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name="Username" maxLength="20" autoComplete="username" onChange={this.handleChange} />
                      </InputGroup>
                      <div className="textSet">{this.validator.message('username', this.state.Username, 'required')}</div>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name="Password" maxLength="20" autoComplete="current-password" onChange={this.handleChange} />
                      </InputGroup>
                      <div className="textSet">{this.validator.message('password', this.state.Password, 'required')}</div>
                      {/* <Field
                  name="userName"
                  type="text"
                  maxLength="60"
                  normalize={isValidName}
                  label="User Name"
                  component={renderTextField}
                />
                <Field
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  maxLength="30"
                  label="Password"
                  fullWidth={true}
                  component={renderTextField} /> */}

                      <Row>
                        <Col xs="12" >
                          {this.state.loading ?
                            <Button color="primary" size="lg" block className="loginButton" ><Spinner size="sm" style={{ "marginTop": "-8px", "marginLeft": "-5px" }} color="white" className="spinner" /></Button>
                            :
                            <Button color="primary" size="lg" block className="loginButton" type="submit" onClick={this.authentication.bind(this)}>Login</Button>
                          }
                        </Col>
                      </Row>
                      {/* </form> */}
                    </CardBody>
                  </form>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {/* <footer style={{    "marginTop": "130px", "width": "200px",
    "height": "49px"}} className="app-footer"><span> © 2019 ERP Portal</span></footer> */}
    {/* <hr></hr> */}
    <div className=" text-center loginfooter" >
    <footer><span>© 2019 Sound Around</span></footer> 
    </div>
    </div>
    );
  }
}
// export default Login;
// const selector = formValueSelector('loginForm');
function mapStateToProps(state) {
  let initialData = {
    rememberme: true,
  };
  return {
    authenticating: state.login.authenticating,
    errorMessage: state.login.errorMessage,
    initialValues: initialData,
  };
}
// export default connect(mapStateToProps, {
// })(reduxForm({
//   form: 'loginForm',
//   validate,
//   enableReinitialize: true, // this is needed!!
// })(Login));
export default connect(mapStateToProps, {})(Login);

