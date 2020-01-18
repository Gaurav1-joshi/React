import React, {Suspense} from 'react';
import {
    AppAside,
    AppFooter,
    AppHeader,
    // AppSidebar,
    // AppSidebarFooter,
    // AppSidebarForm,
    // AppSidebarHeader,
    // AppSidebarMinimizer,
    // AppBreadcrumb2 as AppBreadcrumb,
    // AppSidebarNav2 as AppSidebarNav,
  } from '@coreui/react';
  import LoginHeader from './LoginHeader';
  import DefaultAside from './DefaultAside';
  import { Redirect, Route, Switch } from 'react-router-dom';
  import { Container } from 'reactstrap';
  

class LoginDefaultLayout extends React.Component {
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Suspense>
                        <LoginHeader />
                    </Suspense>
                </AppHeader>

                <div className="app-body">
        
         
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid>
              <Suspense>
                <Switch>
                  {/* {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })} */}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense >
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>

                <AppFooter>
                    <Suspense>
                        {/* <DefaultFooter /> */}
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}
export default LoginDefaultLayout;