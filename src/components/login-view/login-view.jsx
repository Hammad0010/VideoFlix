import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (data.user) {
                const userData = {
                    userId: data.user.UserId,
                    email: data.user.Email,
                    name: data.user.Name
                };
                localStorage.setItem("user", JSON.stringify(userData));
                onLoggedIn(userData);
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <Card className="p-4 login-card">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted">Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted">Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </div>

                    <div className="text-center mt-3">
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};