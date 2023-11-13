import { Card, Input, Stack, Center } from "@chakra-ui/react";
import BlueButton from "../buttons/blueButton";
import GreenButton from "../buttons/greenButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
  
    event.preventDefault();
    console.log("Form Submitted");
  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Email:", email);
  console.log("Password:", password);

    axios
      .post("http://localhost:8080/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };



  return (
    <Card p={10}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Input
            type="text"
            placeholder="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <Input
            type="email"
            placeholder="Email or Phone Number"
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <BlueButton  type="submit">Sign In</BlueButton>
        </Stack>
      </form>
      Already have an account ?
      <Center>
        <GreenButton>Log in</GreenButton>
      </Center>
    </Card>
  );
}

export default SignupCard;
