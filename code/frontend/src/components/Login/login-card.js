import { Card, Input, Stack, Center } from "@chakra-ui/react";
import BlueButton from "../buttons/blueButton";
import GreenButton from "../buttons/greenButton";
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function LoginCard() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:8080/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/postLoad');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <Card p={10}>
      <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input type="email" placeholder="Email or Phone Number"  onChange={(event) => setEmail(event.target.value)}/>
        <Input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        <BlueButton  type="submit">Log In</BlueButton>
        </Stack>
      </form>
       
          Forget Password ?
     
        <Center>
          <GreenButton>Create new account</GreenButton>
        </Center>
    
    </Card>
  );
}

export default LoginCard;
