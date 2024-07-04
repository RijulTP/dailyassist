import "./globals.css"
import React, { useEffect } from "react"
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
  faMagnifyingGlass,
  faPersonWalking,
  faPoll,
  faRobot,
  faTable,
  faUser,
  faWrench,
  faLock,
} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setLoginStatus } from "@/redux/authSlice"

export default function MainSidebar({ children }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const loggedInUser = useSelector((state) => state.auth.loggedInUser)
  const user_id = useSelector((state) => state.auth.userId)
  useEffect(() => {
    console.log("The loggedin user value at sidebar is", loggedInUser)
  }, [loggedInUser])
  const dispatch = useDispatch()

  function logoutUser() {
    console.log("User logged out")
    dispatch(setLoginStatus(false))
    router.push("/login")
  }

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
            onClick={() => router.push("/DAHomePage")}
          >
            {" "}
            Home
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faPoll} />}
            onClick={() => router.push("/SurveyStart")}
          >
            {" "}
            Survey
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            onClick={() => router.push("/Analysis")}
          >
            {" "}
            Your Analysis
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faPersonWalking} />}
            onClick={() => router.push("/HabitBuilder")}
          >
            {" "}
            Habit Builder
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faRobot} />}
            onClick={() => router.push("/DailyAssistBot")}
          >
            {" "}
            Life Navigator Bot
          </MenuItem>
          {user_id === 1 && (
            <MenuItem
              icon={<FontAwesomeIcon icon={faLock} />}
              onClick={() => router.push("/AdminPage")}
            >
              {" "}
              Admin Page
            </MenuItem>
          )}
        </Menu>
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
          <SubMenu
            label={loggedInUser}
            icon={<FontAwesomeIcon icon={faUser} />}
            menuItemStyles={{
              button: {
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#181129",
                },
              },
            }}
          >
            <MenuItem style={{ backgroundColor: "brown" }} onClick={logoutUser}>
              Logout
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  )
}
