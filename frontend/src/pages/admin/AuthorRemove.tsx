import RemoveAuthorForm from "../../forms/admin/RemoveAuthorForm.tsx";

export default function AuthorRemove()
{
    return<>
        <h4 className="mb-4">Author remove</h4>
        <div style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}>
            <RemoveAuthorForm ></RemoveAuthorForm>
        </div>
    </>
}