import PencilCard from "../../components/PencilCard.tsx";
import AppTable from "../../components/AppTable.tsx";
import SearchBarButton from "../../components/SearchBarButton.tsx";
import type Book from "../../data/Book.ts";
import ApiCaller from "../../apiCall/ApiCaller.ts";
import {useEffect, useState} from "react";
import AddBookForm from "../../forms/admin/AddBookForm.tsx";

export default function BookAdd()
{

    return(
        <>
            <h4 className="mb-4">Add book</h4>
            <div style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
                <AddBookForm ></AddBookForm>
            </div>
        </>
    )
}