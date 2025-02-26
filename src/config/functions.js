import {formatUnits} from "ethers";
import {Bounce, toast} from "react-toastify";
import i18n from '../config/i18n';

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



export const formatFromUnits = (value, decimals) => {
    return parseFloat(formatUnits(value, decimals)).toFixed(4);
}

export const fullFormatFromBalance = (balance) => {
    return formatUnits(balance.value, balance.decimals);
}

export const formatFromBalance = (balance) => {
    return formatFromUnits(balance.value, balance.decimals);
}


export const Toast = {
    error: (message, sound) => {
        toast.error(i18n.t(message), {
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
        toast.success(i18n.t(message), {
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