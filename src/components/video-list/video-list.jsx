import React, { useState, useEffect } from "react";
import { Row, Col, Card, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./video-list.scss";

export const VideoList = ({ user }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            console.log("Fetching videos..."); // Debug log

            const response = await fetch("https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev/search");
            console.log("Response received:", response); // Debug log

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data); // Debug log

            if (data.videos && Array.isArray(data.videos)) {
                setVideos(data.videos);
            } else {
                setError("No videos found in response");
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleRetry = () => {
        fetchVideos();
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch(
                    `https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev/recommendations?userId=${user.userId}`
                );
                const data = await response.json();
                if (data.recommendations) {
                    setRecommendations(data.recommendations);
                }
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        if (user) {
            // fetchRecommendations();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading videos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Error loading videos</Alert.Heading>
                <p>{error}</p>
                <Button onClick={handleRetry} variant="outline-danger">
                    Retry Loading Videos
                </Button>
            </Alert>
        );
    }

    return (
        <div className="video-list-container">
            {recommendations.length > 0 && (
                <>
                    <h2 className="mb-4">Recommended for You</h2>
                    <Row className="mb-5">
                        {recommendations.map((video) => (
                            <Col key={video.VideoId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Link 
                                    to={`/video/${video.VideoId}`} 
                                    className="video-link"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Card className="h-100 video-card">
                                        <Card.Img 
                                            variant="top" 
                                            src={video.ThumbnailURL} 
                                            alt={video.Title}
                                            style={{ height: '180px', objectFit: 'cover' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{video.Title}</Card.Title>
                                            <Card.Text>
                                                {video.Description?.length > 100 
                                                    ? `${video.Description.substring(0, 100)}...` 
                                                    : video.Description}
                                            </Card.Text>
                                            <div className="video-metadata">
                                                <small className="text-muted">
                                                    Duration: {video.Duration}
                                                </small>
                                                <small className="text-muted">
                                                    Category: {video.Category}
                                                </small>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
            <h2 className="mb-4">All Videos</h2>
            {videos.length === 0 ? (
                <Alert variant="info">No videos available.</Alert>
            ) : (
                <Row>
                    {videos.map((video) => (
                        <Col key={video.VideoId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Link 
                                to={`/video/${video.VideoId}`} 
                                className="video-link"
                                style={{ textDecoration: 'none' }}
                            >
                                <Card className="h-100 video-card">
                                    <Card.Img 
                                        variant="top" 
                                        src={video.ThumbnailURL} 
                                        alt={video.Title}
                                        style={{ height: '180px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{video.Title}</Card.Title>
                                        <Card.Text>
                                            {video.Description?.length > 100 
                                                ? `${video.Description.substring(0, 100)}...` 
                                                : video.Description}
                                        </Card.Text>
                                        <div className="video-metadata">
                                            <small className="text-muted">
                                                Duration: {video.Duration}
                                            </small>
                                            <small className="text-muted">
                                                Category: {video.Category}
                                            </small>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};