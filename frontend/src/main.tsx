import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Front from './pages/Front'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoadingLayout from "./layouts/LoadingLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import BookAdd from "./pages/BookAdd.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../style.css";
import BookRemove from "./pages/BookRemove.tsx";
import About from "./pages/About.tsx";
import NavBarLayout from "./layouts/NavBarLayout.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<NavBarLayout />} >
                <Route path="" element={<Front />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element ={<Register />} />
            </Route>
            <Route element={<LoadingLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book/add" element={<BookAdd />} />
                <Route path="/book/remove" element={<BookRemove />} />
            </Route>
        </Routes>
    </BrowserRouter>
)