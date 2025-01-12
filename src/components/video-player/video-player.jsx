import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import "./video-player.scss";

export const VideoPlayer = ({ user }) => {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingToWatchlist, setIsAddingToWatchlist] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const { videoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev/search?videoId=${videoId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Video data:", data); // Debug log

                if (data.video) {
                    setVideo(data.video);
                } else {
                    setError("Video not found");
                }
            } catch (error) {
                console.error("Error fetching video:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (videoId) {
            fetchVideo();
        }
    }, [videoId]);

    // const addToWatchlist = async () => {
    //     try {
    //         const response =await fetch("https://ri01paszu9.execute-api.us-east-1.amazonaws.com/updateWatchlist", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 userId: user.userId,
    //                 videoId: videoId
    //             })
    //         });

    //         const data = await response.json();
    //         console.log("Watchlist response:", data);

    //         if (response.ok) {
    //             setIsInWatchlist(true);
    //             alert("Added to watchlist successfully!");
    //         } else {
    //             throw new Error(data.message || "Failed to add to watchlist");
    //         }
    //     } catch (error) {
    //         console.error("Error adding to watchlist:", error);
    //         alert("Failed to add to watchlist: " + error.message);
    //     }
    // };
    
    const addToWatchlist = async () => {
        try {
            setIsAddingToWatchlist(true);
            console.log("Adding to watchlist:", { userId: user.userId, videoId, action: "add" }); // Debug log
            const response = await fetch("https://ri01paszu9.execute-api.us-east-1.amazonaws.com/updateWatchlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.userId,
                    videoId: videoId,
                    action: "add"
                })
            });

            const data = await response.json();
            console.log("Watchlist response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to add to watchlist");
            }

        
            alert("Added to watchlist successfully!");
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            alert(error.message || "Failed to add to watchlist");
        }
        finally {
            setIsAddingToWatchlist(false);
        }
    };
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading video...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Error loading video</Alert.Heading>
                <p>{error}</p>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Back to Videos
                </Button>
            </Alert>
        );
    }

    if (!video) {
        return (
            <Alert variant="warning" className="mt-3">
                <Alert.Heading>Video Not Found</Alert.Heading>
                <p>The requested video could not be found.</p>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Back to Videos
                </Button>
            </Alert>
        );
    }

    return (
        <div className="video-player-container">
            <div className="video-wrapper">
                <video
                    controls
                    autoPlay
                    className="video-player"
                    src={video.VideoURL}
                    poster={video.ThumbnailURL}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
            <Card className="video-info mt-3">
                <Card.Body>
                    <Card.Title>{video.Title}</Card.Title>
                    <Card.Text>{video.Description}</Card.Text>
                    <div className="video-metadata">
                        <span>Duration: {video.Duration}</span>
                        <span>Category: {video.Category}</span>
                    </div>
                    <Button 
                        variant={isInWatchlist ? "success" : "primary"}
                        onClick={addToWatchlist}
                        disabled={isInWatchlist}
                        className="mt-3"
                    >
                        {isInWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
                    </Button>
                </Card.Body>
            </Card>
            <Button 
                variant="secondary" 
                onClick={() => navigate('/')} 
                className="mt-3"
            >
                Back to Videos
            </Button>
        </div>
    );
}; 