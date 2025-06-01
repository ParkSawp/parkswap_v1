import React from "react";
import SwapApp from "@/src/app/app/page";


export default async function SwapAppToken({ params }) {
    const data = await params;

    return (
        <SwapApp  params={data} />
    )
}