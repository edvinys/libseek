import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Front from './pages/Front'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import BookAdd from "./pages/admin/BookAdd.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../style.css";
import BookRemove from "./pages/admin/BookRemove.tsx";
import About from "./pages/About.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import Register from "./pages/Register.tsx";
import Reservations from "./pages/admin/Reservations.tsx";
import AuthorAdd from "./pages/admin/AuthorAdd.tsx";
import AuthorRemove from "./pages/admin/AuthorRemove.tsx";


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<UserLayout />} >
                <Route path="" element={<Front />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element ={<Register />} />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book/add" element={<BookAdd />} />
                <Route path="/book/remove" element={<BookRemove />} />
                <Route path="/reservations" element = {<Reservations />} />
                <Route path="/author/add" element={<AuthorAdd />} />
                <Route path="/author/remove" element={<AuthorRemove />} />
            </Route>
        </Routes>
    </BrowserRouter>
)