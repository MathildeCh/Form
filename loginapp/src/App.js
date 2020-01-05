import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  constructor(){
    super();
    this.state= {
      username: "",
      password: "",
      first_name: "",
      last_name:"",
      email:"",
      message: "",
    }
  }

  onSignIn = () => {
    // console.log(this.state.username);
    // console.log(this.state.password);
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('http://localhost:3035/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }


  onChangeData = (event, type) => {
    // console.log(event.target.value, type);
    switch (type){
      case "Username sign in":
        this.state.username = event.target.value;
        break;
      case "password":
        this.state.password = event.target.value;
        break;
      case "firstName":
        this.state.first_name = event.target.value;
        break;
      case "lastName":
        this.state.last_name = event.target.value;
        break;
      case "email":
        this.state.email = event.target.value;
        break;
      default:
        this.state.username =  "";
        this.state.password = "";
        this.state.first_name= "";
        this.state.last_name="";
        this.state.email="";
    }
  }

  onRegister = () => {
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    fetch('http://localhost:3035/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }


  render(){

    const {message} = this.state;

    return(
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <h2>Login</h2>
            <SignIn onSignIn={this.onSignIn} onChangeData={this.onChangeData} message= {message}  /> <br />
          </Col>
          <Col sm={12} md={6}>
            <h2>Register</h2>
            <Register onChangeData={this.onChangeData}
            onRegister={this.onRegister} />
          </Col>
        </Row>
      </Container>
    )
  };
}

export default App;
