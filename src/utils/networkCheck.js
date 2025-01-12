export const checkNetworkStatus = () => {
    return window.navigator.onLine;
};

export const initNetworkListener = (onOffline, onOnline) => {
    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);

    return () => {
        window.removeEventListener('offline', onOffline);
        window.removeEventListener('online', onOnline);
    };
}; 