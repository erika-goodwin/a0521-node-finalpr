import React, { useContext } from "react";
import { Navbar, NavItem, NavLink } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import styled from "styled-components";

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

function Nav() {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  console.log(state, "nav");
  return (
    <Navbar>
      {state.data ? (
        <>
          <NavItem>
            <Link to="/" className="nav-link">
              HOME
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/tables" className="nav-link">
              Table
            </Link>
          </NavItem>
          <LeftNavContainer>
            <NavItem>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          </LeftNavContainer>
        </>
      ) : (
        <>
          <NavItem>
            <Link to="/" className="nav-link">
              HOME
            </Link>
          </NavItem>
          <LeftNavContainer>
            <NavItem>
              <NavLink>
                <LoginModal text="Sign up" variant="info" isSignupFlow={true} />
                <LoginModal
                  text="Log in"
                  variant="light"
                  isSignupFlow={false}
                />
              </NavLink>
            </NavItem>
          </LeftNavContainer>
        </>
      )}
    </Navbar>
  );
}

export default Nav;
