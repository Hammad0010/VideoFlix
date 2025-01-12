import React, { useState, useEffect } from "react";
import { Row, Col, Card, Alert, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./watchlist-view.scss";

export const WatchlistView = ({ user }) => {
    const [watchlistVideos, setWatchlistVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removingVideo, setRemovingVideo] = useState(null);

    const fetchWatchlist = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("Fetching watchlist for user:", user);

            if (!user || !user.userId) {
                throw new Error("User ID is not available");
            }

            const watchlistResponse = await fetch(
                `https://7y9l5k0dh1.execute-api.us-east-1.amazonaws.com/getWatchlist?userId=${user.userId}`
            );
            
            console.log("Watchlist response status:", watchlistResponse.status);
            
            const watchlistData = await watchlistResponse.json();
            console.log("Watchlist data:", watchlistData);

            if (!watchlistResponse.ok) {
                throw new Error(watchlistData.message || "Failed to fetch watchlist");
            }

            if (!watchlistData.watchlist || !watchlistData.watchlist.VideoIds) {
                setWatchlistVideos([]);
                return;
            }

            const videoIds = Array.from(new Set(watchlistData.watchlist.VideoIds));
            console.log("Fetching videos for IDs:", videoIds);

            const videos = [];
            for (const videoId of videoIds) {
                try {
                    const videoResponse = await fetch(
                        `https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev/search?videoId=${videoId}`
                    );
                    const videoData = await videoResponse.json();
                    console.log(`Video data for ${videoId}:`, videoData);
                    
                    if (videoData.video) {
                        videos.push(videoData.video);
                    }
                } catch (err) {
                    console.error(`Error fetching video ${videoId}:`, err);
                }
            }

            setWatchlistVideos(videos);
        } catch (error) {
            console.error("Error in fetchWatchlist:", error);
            setError(error.message || "Unable to load watchlist. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.userId) {
            console.log("User detected, fetching watchlist");
            fetchWatchlist();
        } else {
            console.log("No user found");
            setError("Please log in to view your watchlist");
        }
    }, [user]);

    const handleRemoveFromWatchlist = async (videoId) => {
        try {
            setRemovingVideo(videoId);
            console.log("Removing from watchlist:", { userId: user.userId, videoId, action: "remove" });

            const response = await fetch("https://ri01paszu9.execute-api.us-east-1.amazonaws.com/updateWatchlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.userId,
                    videoId: videoId,
                    action: "remove"
                })
            });

            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to remove from watchlist");
            }

            setWatchlistVideos(prev => prev.filter(video =>video.VideoId !== videoId));
        } catch (error) {
            console.error("Error removing from watchlist:", error);
            alert(error.message || "Failed to remove from watchlist");
        } finally {
            setRemovingVideo(null);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading your watchlist...</p>
            </div>
        );
    }

    return (
        <div className="watchlist-container">
            <h2 className="mb-4">My Watchlist</h2>
            {error ? (
                <Alert variant="danger">
                    <Alert.Heading>Error Loading Watchlist</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={fetchWatchlist}>
                        Try Again
                    </Button>
                </Alert>
            ) : watchlistVideos.length === 0 ? (
                <Alert variant="info">
                    <Alert.Heading>No Videos in Watchlist</Alert.Heading>
                    <p>
                        You haven't added any videos to your watchlist yet. 
                        Browse our videos and click "Add to Watchlist" to save them for later!
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Browse Videos
                    </Link>
                </Alert>
            ) : (
                <Row>
                    {watchlistVideos.map((video) => (
                        <Col key={video.VideoId} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100 video-card">
                                <Link to={`/video/${video.VideoId}`}>
                                    <Card.Img 
                                        variant="top" 
                                        src={video.ThumbnailURL} 
                                        alt={video.Title}
                                        style={{ height: '180px', objectFit: 'cover' }}
                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{video.Title}</Card.Title>
                                    <Card.Text>
                                        {video.Description?.length > 100 
                                            ? `${video.Description.substring(0, 100)}...` 
                                            : video.Description}
                                    </Card.Text>
                                    <div className="video-metadata mb-2">
                                        <small className="text-muted">
                                            Duration: {video.Duration}
                                        </small>
                                        <small className="text-muted">
                                            Category: {video.Category}
                                        </small>
                                    </div>
                                    <Button 
                                        variant="danger"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => handleRemoveFromWatchlist(video.VideoId)}
                                        disabled={removingVideo === video.VideoId}
                                    >
                                        {removingVideo === video.VideoId ? (
                                            <Spinner 
                                                as="span" 
                                                animation="border" 
                                                size="sm" 
                                                role="status" 
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            "Remove from Watchlist"
                                        )}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}; 