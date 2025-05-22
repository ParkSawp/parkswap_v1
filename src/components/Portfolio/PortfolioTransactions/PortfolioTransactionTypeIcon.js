import {ApproveIcon, FailedIcon, ReceiveIcon, SendIcon, SwapIcon} from "@/src/components/Icon/Icon";
import React from "react";


export default function PortfolioTransactionTypeIcon({ transaction }) {

    if(transaction.type === 'failed') {
        return (<><FailedIcon/></> );
    }
    if(transaction.type === 'trade') {
        return (<><SwapIcon/></> );
    }
    if(transaction.type === 'receive') {
        return ( <><ReceiveIcon/></> );
    }
    if(transaction.type === 'approve') {
        return ( <><ApproveIcon/></> );
    }

    return ( <><SendIcon/></> );
}