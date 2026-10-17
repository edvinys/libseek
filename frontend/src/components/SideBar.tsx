import React, {useEffect, useState} from 'react'
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarNav,
    CNavGroup,
    CNavItem,
    CNavTitle,
    CButton, CNavLink,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
    cilAccountLogout,
    cilBarChart,
    cilBook,
    cilCloudDownload,
    cilCreditCard,
    cilMinus,
    cilOptions,
    cilPlus,
    cilPuzzle,
    cilSettings,
    cilSpeedometer,
    cilUser,
} from '@coreui/icons'

import ApiCaller from "../apiCall/ApiCaller.ts";
import UserInfo from "../data/UserInfo.ts";
import {logout} from "../authentication/logout.ts"
import {useNavigate} from "react-router-dom";
import libseekLogo from "../assets/Libseek.svg"
import githubLogo from "../assets/GitHub_logo.png"

export const SideBar = () =>
{
    const [user, setUser] = useState<UserInfo | null>(null);
    const navigate = useNavigate();

    useEffect((): void =>
    {
        async function loadUser()
        {
            const userInfo: UserInfo | null = await ApiCaller.getEmailNameSurname();
            setUser(userInfo);
        }
        void loadUser()
    },[]);

    return (
        <CSidebar className="border-end min-vh-100" unfoldable={false}>
            {/* Logo */}
            <CSidebarHeader className="position-relative">
                <CSidebarBrand>
                    <img
                        alt="Libseek logo"
                        height="50"
                        width="50"
                        src={libseekLogo}>
                    </img>
                </CSidebarBrand>
            </CSidebarHeader>

            <CSidebarNav variant="tree">
                {/* Dashboard */}
                <CNavItem as="div">
                    <CNavLink
                        onClick={() => navigate("/dashboard")}
                        style={{cursor: "pointer"}}>
                        <CIcon customClassName="nav-icon" icon={cilBarChart}/>Dashboard
                    </CNavLink>
                </CNavItem>

                {/* Books */}
                <CNavGroup
                    toggler={({ visible }) => (
                        <>
                            <CIcon customClassName="nav-icon" icon={cilBook} /> Books
                            <span className="nav-group-toggle-indicator">
                <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
              </span></>)} compact visible>
                    <CNavLink
                        onClick={() => navigate("/book/add")}
                        style={{cursor: "pointer", paddingLeft:"25px"}}>
                        <CNavItem href="#">Add</CNavItem>
                    </CNavLink>
                    <CNavLink
                        onClick={() => navigate("/book/remove")}
                        style={{cursor: "pointer", paddingLeft:"25px"}}>
                        <CNavItem href="#">Remove</CNavItem>
                    </CNavLink>
                </CNavGroup>

                {/* Settings */}
                <CNavGroup
                    toggler={({ visible }) => (
                        <>
                            <CIcon customClassName="nav-icon" icon={cilSettings} /> Settings group
                            <span className="nav-group-toggle-indicator">
                <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
                            </span></>)}>
                    <CNavItem href="#">Item</CNavItem>
                    <CNavItem href="#">Item</CNavItem>
                    <CNavGroup
                        toggler={({ visible }) => (
                            <>
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{' '}
                                Nested group
                                <span className="nav-group-toggle-indicator">
                  <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
                </span>
                            </>
                        )}
                    >
                        <CNavItem href="#">Item</CNavItem>
                        <CNavItem href="#">Item</CNavItem>
                    </CNavGroup>
                </CNavGroup>

                {/* Coreui */}
                <CNavItem href="https://coreui.io">
                    <CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI
                </CNavItem>
            </CSidebarNav>

            {/* Footer */}
            <CSidebarFooter className={"mt-auto"}>
                <CDropdown className="w-100" direction="dropup">
                    <CDropdownToggle
                        caret={false}
                        className="w-100 d-flex gap-2 p-1 align-items-center"
                        variant="ghost"
                    >
                        <CAvatar shape="rounded" size="md" src={githubLogo} />
                        <div className="small text-start d-sidebar-narrow-none">
                            <div className="fw-semibold">{user ? `${user.name} ${user.surname}` : "Loading..."} </div>
                            <div>{user ? `${user.email}` : "Loading..."}</div>
                        </div>
                        <CIcon className="nav-icon ms-auto d-sidebar-narrow-none" icon={cilOptions} />
                    </CDropdownToggle>
                    <CDropdownMenu className="w-100">
                        <CDropdownItem href="#">
                            <div className="d-flex align-items-center gap-2">
                                <CIcon icon={cilUser} />
                                Account
                            </div>
                        </CDropdownItem>
                        <CDropdownItem href="#">
                            <div className="d-flex align-items-center gap-2">
                                <CIcon icon={cilCreditCard} />
                                Billing
                            </div>
                        </CDropdownItem>
                        <CDropdownItem href="#">
                            <div className="d-flex align-items-center gap-2">
                                <CIcon icon={cilSettings} />
                                Settings
                            </div>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem onClick={logout}>
                            <div className="d-flex align-items-center gap-2">
                                <CIcon icon={cilAccountLogout} />
                                Logout
                            </div>
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CSidebarFooter>
        </CSidebar>
    )
}


// <CNavGroup
//     toggler={({ visible }) => (
//         <>
//                 <span className="nav-icon">
//                   <span className="nav-icon-bullet"></span>
//                 </span>{' '}
//             Items group 2
//             <span className="nav-group-toggle-indicator">
//                   <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
//                 </span>
//         </>
//     )}
//     visible
// >
//     <CNavItem href="#">Item</CNavItem>
//     <CNavItem href="#">Item</CNavItem>
//
// </CNavGroup>