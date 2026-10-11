import "react"
import {useEffect, useState} from "react";
import ApiCaller from "../apiCall/ApiCaller.ts";

export default function PencilCard()
{
    const [countBooks, setCountBooks] = useState<number>(0);

    useEffect(() => {

        async function getBooksCount() : Promise<void>
        {
            const books: number = await ApiCaller.getCountOfBooks();
            setCountBooks(books);
        }
        getBooksCount();
    },[])

    // <i className="icon-pencil primary font-large-2 float-left"></i>
    return (
        <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                    <div className="card-content">
                        <div className="card-body">
                            <div className="media d-flex">
                                <div className="align-self-center">
                                    <img src="src/assets/book_stack.png" alt="" className="float-left" style={{width: 50}}></img>
                                </div>
                                <div className="media-body text-right">
                                    <h3>{countBooks}</h3>
                                    <span>Total books</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}