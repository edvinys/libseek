import {createRoot} from "react-dom/client";
import {StrictMode, useEffect, useState} from "react";
import '@coreui/coreui/dist/css/coreui.min.css'
import Loading from "./components/Loading.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Loading />
    </StrictMode>,
)