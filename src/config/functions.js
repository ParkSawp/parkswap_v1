import {formatUnits, parseUnits} from "ethers";
import {Bounce, toast} from "react-toastify";
import i18n from '../config/i18n';
import {MINIMUM_VALUE_TO_DISPLAY} from "@/src/config/constants";

const Sounds = {
    NotificationAudio: null,
    SwipeAudio: null,
    notification: () => {
        if(!Sounds.NotificationAudio) {
            Sounds.NotificationAudio =  new Audio('/audio/notification.mp3');
        }
        Sounds.NotificationAudio.play();
    },
    swipe: () => {
        if(!Sounds.SwipeAudio) {
            Sounds.SwipeAudio =  new Audio('/audio/swipe.mp3');
        }
        Sounds.SwipeAudio.play();
    }
}


export const truncateDecimal = (num, digit = 4, checkMinimum = false) => {
    if(checkMinimum && num < MINIMUM_VALUE_TO_DISPLAY) {
        return ' < '+MINIMUM_VALUE_TO_DISPLAY;
    }
    const calcDec = Math.pow(10, digit);
    return (Math.trunc(num * calcDec) / calcDec).toString();
}

export const formatFromUnits = (value, decimals) => {
    return truncateDecimal(parseFloat(formatUnits(value, decimals)), 6);
}

export const fullFormatFromBalance = (balance) => {
    return formatUnits(balance.value, balance.decimals);
}

export const formatFromBalance = (balance) => {
    return formatFromUnits(balance.value, balance.decimals);
}
export const customParseUnits= (amount, decimals) => {
    const nDecimals = Number(decimals);
    try {
        return parseUnits(amount, nDecimals);
    } catch (e) {
        const fixedAmount = Number(amount).toFixed(nDecimals);
        return parseUnits(fixedAmount, nDecimals);
    }
}


export const Toast = {
    error: (message, sound) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        sound && Sounds.notification();
    },
    success: (message, sound) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        sound && Sounds.notification();
    }
}