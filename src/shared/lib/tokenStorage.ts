const ACCESS_TOKEN_KEY = "cv_access_token";
const REFRESH_TOKEN_KEY = "cv_refresh_token";

const getStorage = () => {
    if (typeof window === "undefined") {
        return null;
    }
    return window.localStorage;
};

const readValue = (key: string) => getStorage()?.getItem(key) ?? "";

const writeValue = (key: string, token: string) => {
    getStorage()?.setItem(key, token);
};

const removeValue = (key: string) => {
    getStorage()?.removeItem(key);
};

const clearTokens = () => {
    removeValue(ACCESS_TOKEN_KEY);
    removeValue(REFRESH_TOKEN_KEY);
};

const setTokens = (accessToken: string, refreshToken: string) => {
    writeValue(ACCESS_TOKEN_KEY, accessToken);
    writeValue(REFRESH_TOKEN_KEY, refreshToken);
};

export const tokenStorage = {
    getAccessToken: () => readValue(ACCESS_TOKEN_KEY),
    getRefreshToken: () => readValue(REFRESH_TOKEN_KEY),
    setTokens,
    clearTokens,
};

