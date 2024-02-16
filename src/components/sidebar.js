import "./globals.css"
import React from "react"
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
} from "react-pro-sidebar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faHome,
  faTable,
  faUser,
  faWrench,
} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

export default function MainSidebar({ children }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const loggedinuser = useSelector((state) => state.loggedinuser.value)
  return (
    <div style={{ display: "flex", width: "250px" }}>
      <Sidebar collapsed={collapsed} backgroundColor="rgba(24, 17, 41, 0.95)">
        <Menu
          menuItemStyles={{
            button: {
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#181129",
              },
            },
          }}
        >
          <MenuItem
            icon={
              <FontAwesomeIcon
                icon={collapsed ? faCircleArrowRight : faCircleArrowLeft}
              />
            }
            onClick={() => setCollapsed(!collapsed)}
          >
            {" "}
            Collapse
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faHome} />}
            onClick={() => router.push("/LibraryHomePage")}
          >
            {" "}
            Home
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faTable} />}
            onClick={() => router.push("/BookView")}
          >
            {" "}
            View Library
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faWrench} />}
            onClick={() => router.push("/LibraryTools")}
          >
            {" "}
            Library tools
          </MenuItem>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            {/* <MenuItem
              icon={<FontAwesomeIcon icon={faUser} />}
            >
              {loggedinuser}
            </MenuItem> */}
        </Menu>
      </Sidebar>
    </div>
  )
}
