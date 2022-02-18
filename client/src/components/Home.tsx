import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const HomeComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-color: pink;
`;

function Home() {
  return (
    <HomeComponent>
      <Container>
        <h1>Welcome to the expense app</h1>
      </Container>
    </HomeComponent>
  );
}

export default Home;
