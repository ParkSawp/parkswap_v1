import {formatUnits} from "ethers";
import {Bounce, toast} from "react-toastify";


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
    error: (message) => {
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
    },
    success: (message) => {
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
    }
}