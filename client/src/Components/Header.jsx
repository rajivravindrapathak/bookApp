import { Button, Col, Layout, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";

const { Header } = Layout;

const HeaderCom = () => {

  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ signupForm, setSignupForm ] = useState()
  const [ loginForm, setLoginForm ] = useState()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    // Redirect to login page
    navigate("/login");
    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
    }
    // try {
    //   const response = await axios.get("https://notes-taking-app-mern.vercel.app/login", {
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //   }) 
    //   if(response.ok) {
    //     // Login successful
    //     setIsLoggedIn(true);
    //   } else {
    //     // Login failed
    //     setIsLoggedIn(false);
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   setIsLoggedIn(false);
    // }
  }

  return (
    <Header
    // style={{
    //   alignItems: "center",
    //   display: "flex",
    //   position: "sticky",
    //   top: "0",
    //   zIndex: "1",
    // }}
    >
      <Row gutter={[16, 16]} style={{ justifyContent: "space-evenly" }}>
        <Link to='/'> 
          <Col
            className="logo"
            style={{ display: "flex" }}
            xs={8}
            sm={8}
            md={8}
            lg={8}
            xl={8}
          >
            <img
              src="https://img.freepik.com/premium-vector/notepad-logo-design-with-data-paper_446783-1250.jpg"
              alt="logo"
              style={{ height: "50px", width: "120px" }}
            />
          </Col>
        </Link>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <h1 style={{ color: "white" }}>welcome to Notes app</h1>
        </Col>

        {/* <Col className="subDiv" xs={8} sm={8} md={8} lg={8} xl={8}>
          {isLoggedIn ? (
            <Button
              style={{ marginLeft: "2%" }}
              type="primary"
              onClick={handleLogout}
            >
              {" "}
              Logout{" "}
            </Button>
          ) : (
            <Col>
              <Link to="/register">
                <Button type="primary" onClick={onClose} >SignUp</Button>
              </Link>
              <Link to="/login">
                <Button style={{ marginLeft: "2%" }} onClick={onClose} type="primary">
                  SignIn
                </Button>
              </Link>
            </Col>
          )}
        </Col> */}

        <Col className="subDiv" xs={8} sm={8} md={8} lg={8} xl={8}>
          {isLoggedIn ? (
            <Button
              style={{ marginLeft: "2%" }}
              type="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Col>
                <Button 
                  type="primary" 
                  onClick={() => {
                    setSignupForm(true)
                  }}
                >SignUp</Button>
                {
                  signupForm && (
                    <Register 
                      signupForm={true}
                      setSignupForm={setSignupForm}
                    />
                  )
                }
                <Button
                  style={{ marginLeft: "2%" }}
                  onClick={() => {
                    setLoginForm(true)
                  }}
                  type="primary"
                >
                  SignIn
                </Button>
                {
                  loginForm && (
                    <Login 
                      loginForm={true}
                      setLoginForm={setLoginForm}
                    />
                  )
                }
            </Col>
          )}
        </Col>

      </Row>
    </Header>
  );
};

export default HeaderCom;
