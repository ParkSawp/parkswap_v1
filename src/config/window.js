'use client'

export const getLocalStorage = () => {
    try {
        if (typeof window !== 'undefined') {
            return localStorage;
        }
    }catch (e){}
    return {
        getItem(key) {return undefined; },
        setItem(key, value) { }
    }
}