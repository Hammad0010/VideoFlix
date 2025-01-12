const API_ENDPOINT = "https://cjem0xljv1.execute-api.us-east-1.amazonaws.com/dev";

export const api = {
    login: async (credentials) => {
        const response = await fetch(`${API_ENDPOINT}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    signup: async (userData) => {
        const response = await fetch(`${API_ENDPOINT}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    getVideos: async () => {
        const response = await fetch(`${API_ENDPOINT}/search`);
        return response.json();
    },

    getWatchlist: async (userId) => {
        const response = await fetch(`${API_ENDPOINT}/watchlist?UserId=${userId}`);
        return response.json();
    },

    updateWatchlist: async (userId, videoId) => {
        const response = await fetch(`${API_ENDPOINT}/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, videoId })
        });
        return response.json();
    }
}; 