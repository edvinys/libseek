import {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";

type SearchBarProps = {
    onSearch: (value: string) => void;
}

export default function SearchBarButton({onSearch}: SearchBarProps)
{
    const [text, setText] = useState("");

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="search-container">
                        <input type="text"
                               className="form-control search-input"
                               placeholder="Search..."
                               onChange={e => setText(e.target.value)}
                               onKeyDown={e =>
                               {
                                   if (e.key == "Enter")
                                   {
                                       onSearch(text);
                                   }
                               }}/>
                        <button type="button" className="btn btn-outline-primary"
                                style={{marginTop: "10px", display:"flex", marginLeft:"auto",marginRight:"auto"}}
                                onClick={(e) =>
                                {
                                    onSearch(text)}}>
                            Primary</button>
                    </div>
                </div>
            </div>
        </div>
    )
}