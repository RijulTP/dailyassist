/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
"use client"
import Link from "next/link"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faHome,
  faLock,
  faTable,
  faWrench,
} from "@fortawesome/free-solid-svg-icons"
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  MenuItemStyles,
} from "react-pro-sidebar"

export default function LibraryHomePage() {
  //const searchParams = useSearchParams()
  //const branchname = searchParams.get('branch')
  const [isOpen, setIsOpen] = React.useState(true)
  const [collapsed, setCollapsed] = React.useState(false)
  const [toggled, setToggled] = React.useState(false)
  const [broken, setBroken] = React.useState(false)
  const [rtl, setRtl] = React.useState(false)
  const [hasImage, setHasImage] = React.useState(false)
  const [theme, setTheme] = React.useState("dark")
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const darkTheme = {
    backgroundColor: "#212121",
    color: "#ffffff",
  }
  const themes = {
    light: {
      sidebar: {
        backgroundColor: "#ffffff",
        color: "#607489",
      },
      menu: {
        menuContent: "#fbfcfd",
        icon: "#0098e5",
        hover: {
          backgroundColor: "#c5e4ff",
          color: "#44596e",
        },
        disabled: {
          color: "#9fb6cf",
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: "#0b2948",
        color: "#8ba1b7",
      },
      menu: {
        menuContent: "#082440",
        icon: "#59d0ff",
        hover: {
          backgroundColor: "#00458b",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
  }

  return (
    <div className="min-h-screen flex w-full">
      <div className="min-h-screen flex items-center justify-center bg-white-100 w-full">
        {/* {Page component} */}
        <div className="w-full max-w-3xl p-6 rounded-lg ">
          <div className="college-container flex flex-wrap justify-center mt-8">
            <Link
              className="flex flex-col items-center justify-center mx-2 my-4 w-48 md:w-64 lg:w-80 p-4 bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg hover:scale-105 hover:bg-opacity-95"
              href={{
                pathname: "/BookView",
              }}
            >
              <img
                src="/BookView.png"
                alt="College 1"
                className="college-image w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 object-cover rounded-10"
              />
              <p className="element-name mt-4 text-lg text-center text-black font-bold">
                View Books
              </p>
            </Link>
            <Link
              className="flex flex-col items-center justify-center mx-2 my-4 w-48 md:w-64 lg:w-80 p-4 bg-white rounded-lg shadow-md transform transition-transform hover:-translate-y-2 hover:shadow-lg hover:scale-105 hover:bg-opacity-95"
              href={{
                pathname: "/LibraryTools",
              }}
            >
              <img
                src="/BookManage.png"
                alt="College 2"
                className="college-image w-32 md:w-48 lg:w-64 h-32 md:h-48 lg:h-64 object-cover rounded-10"
              />
              <p className="element-name mt-4 text-lg text-center text-black font-bold">
                Manage Library
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
