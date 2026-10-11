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
    CButton,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
    cilAccountLogout,
    cilCloudDownload,
    cilCreditCard,
    cilMinus,
    cilOptions,
    cilPlus,
    cilPuzzle,
    cilSettings,
    cilSidebarClose,
    cilSidebarOpen,
    cilSpeedometer,
    cilUser,
} from '@coreui/icons'

import ApiCaller from "../apiCall/ApiCaller.ts";
import UserInfo from "../data classes/UserInfo.ts";
import {logout} from "../authentication/logout.ts"

export const SideBar = () => {
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect((): void =>
    {
        async function loadUser()
        {
            const userInfo: UserInfo | null = await ApiCaller.getEmailNameSurname();
            setUser(userInfo);
        }
        loadUser()
    },[]);

    return (
        <CSidebar className="border-end min-vh-100" unfoldable={false}>
            <CSidebarHeader className="position-relative">
                <CSidebarBrand>
                    <img
                        alt="Libseek logo"
                        height="50"
                        width="50"
                        src="src/assets/libseek.svg">
                    </img>
                </CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav variant="tree">
                <CNavTitle>Nav Title</CNavTitle>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item
                </CNavItem>
                <CNavItem disabled href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item
                </CNavItem>
                <CNavItem href="#">
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With badge{' '}
                    <CBadge color="primary ms-auto">NEW</CBadge>
                </CNavItem>
                <CNavGroup
                    toggler={({ visible }) => (
                        <>
                            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Items group
                            <span className="nav-group-toggle-indicator">
                <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
              </span>
                        </>
                    )}
                    compact
                    visible
                >
                    <CNavItem href="#">Item</CNavItem>
                    <CNavItem href="#">Item</CNavItem>
                    <CNavGroup
                        toggler={({ visible }) => (
                            <>
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{' '}
                                Items group 2
                                <span className="nav-group-toggle-indicator">
                  <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
                </span>
                            </>
                        )}
                        visible
                    >
                        <CNavItem href="#">Item</CNavItem>
                        <CNavItem href="#">Item</CNavItem>
                        <CNavGroup
                            toggler={({ visible }) => (
                                <>
                  <span className="nav-icon">
                    <span className="nav-icon-bullet"></span>
                  </span>{' '}
                                    Items group 3
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
                </CNavGroup>
                <CNavGroup
                    toggler={({ visible }) => (
                        <>
                            <CIcon customClassName="nav-icon" icon={cilSettings} /> Settings group
                            <span className="nav-group-toggle-indicator">
                <CIcon className="icon icon-sm" icon={visible ? cilMinus : cilPlus} />
              </span>
                        </>
                    )}
                >
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
                <CNavItem href="https://coreui.io">
                    <CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI
                </CNavItem>
            </CSidebarNav>
            <CSidebarFooter className={"mt-auto"}>
                <CDropdown className="w-100" direction="dropup">
                    <CDropdownToggle
                        caret={false}
                        className="w-100 d-flex gap-2 p-1 align-items-center"
                        variant="ghost"
                    >
                        <CAvatar shape="rounded" size="md" src="src/assets/GitHub_logo.png" />
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