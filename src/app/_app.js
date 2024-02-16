
  // src/app/_app.js 

  import routes from './api/routes'

function Layout({ children }) {
    return (
      <>
        <Sidebar />  
        {children}
      </>
    )
  }
  

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      {routes.map((route) => (
        <Route 
          path={route.path}
          component={route.component}
        />  
      ))}

      <Component {...pageProps} />
    </Layout>
  )
}
