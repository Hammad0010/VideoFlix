import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    VideoFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/watchlist" 
                                    className={location.pathname === '/watchlist' ? 'active' : ''}
                                >
                                    Watchlist
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/recommendations" 
                                    className={location.pathname === '/recommendations' ? 'active' : ''}
                                >
                                    Recommendation
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {!user ? (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
