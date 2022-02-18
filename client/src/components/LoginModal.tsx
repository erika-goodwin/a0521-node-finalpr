import React, { useState, useContext } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";

interface ModalProps {
  text: string;
  variant: "info" | "light";
  isSignupFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

function LoginModal({ text, variant, isSignupFlow }: ModalProps) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  const handleClick = async () => {
    setShow(false);
    let response;
    if (isSignupFlow) {
      const { data: signUpData } = await axios.post(
        "http://localhost:8001/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:8001/api/auth/login",
        {
          email,
          password,
        }
      );
      response = loginData;
    }

    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }

    setState({
      data: {
        id:response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email
      },
      loading:false,
      error: null,
    })
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`
    navigate("/tables");

  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        style={{ marginRight: "1rem" }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>{text}</Modal.Header>
        <Modal.Body>
          {isSignupFlow ? (
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <FormControl
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          ) : (
            ""
          )}

          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
