import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Front from './Pages/Front'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingLayout from "./components/LoadingLayout.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import BookAdd from "./Pages/BookAdd.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../style.css";
import BookRemove from "./Pages/BookRemove.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Front />} />
            <Route element={<LoadingLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book/add" element={<BookAdd />} />
                <Route path="/book/remove" element={<BookRemove />} />
            </Route>
        </Routes>
    </BrowserRouter>
)