import {useEffect, useState} from "react";


const MAX_RECENT_TOKEN_LENGTH = 6;
const RECENT_TOKENS = "RECENT_TOKENS";

const getStoredTokens = () => {
    try {
        const storedTokens = localStorage.getItem(RECENT_TOKENS);
        if(storedTokens) {
            return JSON.parse(storedTokens);
        }
    } catch (e) {}
    return [];
}

const saveNewRecentTokenList = (tokens) => {
    localStorage.setItem(RECENT_TOKENS, JSON.stringify(tokens));
}

export default function useRecentToken() {
    const [tokens, setTokens] = useState(getStoredTokens());

    const addToRecent = (token) => {
        const isTokenExist = tokens.find((item) => item.address === token.address);
        const currentTokens = isTokenExist ? tokens.filter((item) => item.address !== token.address) : tokens;
        const newRecentTokens = [token, ...currentTokens].splice(0, MAX_RECENT_TOKEN_LENGTH);
        setTokens(newRecentTokens);
        saveNewRecentTokenList(newRecentTokens);
    }

    return {
        addToRecent,
        tokens
    };
}