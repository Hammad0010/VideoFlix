import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { VideoList } from "../video-list/video-list";
import { VideoPlayer } from "../video-player/video-player";
import { WatchlistView } from "../watchlist-view/watchlist-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { RecommendationsView } from "../recommendations-view/recommendations-view";
import "./main-view.scss";

export const MainView = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const onLoggedOut = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <>
            <NavigationBar user={user} onLoggedOut={onLoggedOut} />
            <Row className="justify-content-md-center main-content">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            !user ? (
                                <Col md={5}>
                                    <LoginView onLoggedIn={(user) => setUser(user)} />
                                </Col>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            !user ? (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/video/:videoId"
                        element={
                            user ? (
                                <Col>
                                    <VideoPlayer user={user} />
                                </Col>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/watchlist"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <WatchlistView user={user} />
                            )
                        }
                    />
                    <Route
                        path="/recommendations"
                        element={
                            <Col>
                                <RecommendationsView />
                            </Col>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Col>
                                    <VideoList user={user} />
                                </Col>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </Row>
        </>
    );
};