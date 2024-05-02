// pages/_app.js

import Layout from "../components/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive" // Import useMediaQuery
import { Provider } from "react-redux"
import store from "../redux/store"
import Head from "next/head"

import { createGlobalStyle } from "styled-components"
import { config, dom } from "@fortawesome/fontawesome-svg-core"

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const isMobile = useMediaQuery({ maxWidth: 768 }) // Define a max width for mobile devices

  config.autoAddCss = false
  const GlobalStyles = createGlobalStyle`
      ${dom.css()}
  `

  // Check if the current URL is / or /index.html and hide the sidebar if it's the login route
  useEffect(() => {
    console.log("The router is", router.asPath)
    if (router.asPath === "/" || router.asPath === "/index.html") {
      setSidebarVisible(false)
      router.push("/login")
    } else if (router.asPath === "/login" || isMobile) {
      setSidebarVisible(false)
    } else {
      setSidebarVisible(true)
    }
  }, [router, isMobile])

  

  return (
    <Provider store={store}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <GlobalStyles />
      <Layout sidebarVisible={sidebarVisible}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
