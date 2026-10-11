import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from "./components/Loading.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Loading />
    </StrictMode>,
)