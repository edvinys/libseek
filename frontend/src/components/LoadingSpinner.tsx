import React from "react"
import {CSpinner} from "@coreui/react";

export const LoadingSpinner = () =>
{
    return(
    <div className="d-flex justify-content-center align-items-center h-100">
        <CSpinner style={{width: '6rem', height: '6rem'}}></CSpinner>
    </div>)
}