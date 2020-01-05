import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const SignIn = ({onSignIn, onChangeData}) => {

    return (message.length) ? (
      <Alert variant ={message[0].variant}> {message[0].message}
      </Alert>)
      :
      (
    <Form>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username :</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={(event)=>onChangeData(event, "Username sign in")}/>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password :</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(event)=>onChangeData(event, "password")}/>
      </Form.Group>

      <Button variant="primary"  onClick={onSignIn}>
        Login In
      </Button>

    </Form>
  );
}

export default SignIn;
