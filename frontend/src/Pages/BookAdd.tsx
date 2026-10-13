import PencilCard from "../components/PencilCard.tsx";
import BookTable from "../components/BookTable.tsx";
import SearchBarButton from "../components/SearchBarButton.tsx";
import type Book from "../data/Book.ts";
import ApiCaller from "../apiCall/ApiCaller.ts";
import {useEffect, useState} from "react";

export default function BookAdd()
{
    return(
        <>
            <h4 className="mb-4">Add book</h4>
        </>
    )
}