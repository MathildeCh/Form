import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Register = ({onRegister, onChangeData}) => {
  return(
    <Form>

      <Form.Group controlId="RegFirst">
        <Form.Label>First name :</Form.Label>
        <Form.Control type="text" placeholder="Enter fisrt name" onChange={(event)=>onChangeData(event, "firstName")} />
      </Form.Group>

      <Form.Group controlId="RegLast">
        <Form.Label>Last name :</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" onChange={(event)=>onChangeData(event, "lastName")}/>
      </Form.Group>

      <Form.Group controlId="RegEmail">
        <Form.Label>Email :</Form.Label>
        <Form.Control type="email" placeholder="Enter username" onChange={(event)=>onChangeData(event, "email")}/>
      </Form.Group>

      <Form.Group controlId="RegUsername">
        <Form.Label>Username :</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={(event)=>onChangeData(event, "Username sign in")}/>
      </Form.Group>

      <Form.Group controlId="RegPassword">
        <Form.Label>Password :</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(event)=>onChangeData(event, "password")}/>
      </Form.Group>

      <Button variant="primary" onClick={onRegister}>
        Register
      </Button>

    </Form>
  );
}

export default Register;
