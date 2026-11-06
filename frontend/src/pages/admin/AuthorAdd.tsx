import AddBookForm from "../../forms/admin/AddBookForm.tsx";
import AddAuthorForm from "../../forms/admin/AddAuthorForm.tsx";

export default function AuthorAdd()
{
    return<>
        <h4 className="mb-4">Author add</h4>
        <div style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
            <AddAuthorForm ></AddAuthorForm>
        </div>
    </>
}