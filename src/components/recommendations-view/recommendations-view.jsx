import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './recommendations-view.scss';

export const RecommendationsView = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev/videos');
                const data = await response.json();
                setRecommendations(data.recommendations);
            } catch (error) {
                setError('Failed to load recommendations');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="recommendations-container">
            <h2 className="mb-4">Recommended Videos</h2>
            <Row>
                {recommendations.map(video => (
                    <Col key={video.VideoId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Link 
                            to={`/video/${video.VideoId}`} 
                            style={{ textDecoration: 'none' }}
                        >
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={video.ThumbnailURL}
                                    alt={video.Title}
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>{video.Title}</Card.Title>
                                    <Card.Text>
                                        {video.Description.length > 100 
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
        </div>
    );
}; 