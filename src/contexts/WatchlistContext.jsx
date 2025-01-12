import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/api';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user?.userId) {
            api.getWatchlist(user.userId)
                .then(data => {
                    if (data.watchlist?.VideoIds) {
                        setWatchlist(data.watchlist.VideoIds);
                    }
                })
                .catch(error => console.error('Error fetching watchlist:', error));
        }
    }, [user]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext); 