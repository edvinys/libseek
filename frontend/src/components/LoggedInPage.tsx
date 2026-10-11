import {SideBar} from "./SideBar.tsx";
import PencilCard from "./PencilCard.tsx";

export default function LoggedInPage()
{
    return(
        <div className="d-flex min-vh-100">
        <SideBar></SideBar>
            <main className="flex-grow-1 p-4 bg-body-tertiary" style={{minWidth: 0}}>
                <h4 className="mb-4">Dashboard</h4>
                <PencilCard/>
            </main>
        </div>
    )
}
