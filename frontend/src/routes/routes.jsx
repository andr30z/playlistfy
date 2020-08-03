import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

// import Mock from '../components/mock';

import Home from '../pages/Home/Home.page';
import Footer from '../components/Footer/Footer.component';

import PrivateRoute from './PrivateRoute';
import MenuRoute from './MenuRoute';
import LogRoute from './LogRoute';

import Spinner from '../components/Spinner/Spinner.component';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary.component';
import NotFound from '../pages/NotFound/NotFound.page';
import VerificationRoute from './VerificationRoute';

const Menu = lazy(() => import('../pages/Menu/Menu.page'));
const Header = lazy(() => import('../components/Header/Header.component'));
const PlaylistGeneration = lazy(() => import('../pages/Playlist/PlaylistGeneration.page'));
const PlaylistVerification = lazy(() => import('../pages/PlaylistVerification/PlaylistVerification.page'));


const Routes = () => {

    return (
        <Router>
            <ErrorBoundary>
                <Suspense fallback={
                    <Spinner
                        spinnerSize={'100vh'}
                        spinnerColor={{
                            border: '3px solid #0470DC',
                            borderTop: '#fff'
                        }}
                    />
                }>
                    <Header />
                    <Switch>
                        <Route exact path="/" render={(props) =>
                            <Home {...props} />
                        }
                        />
                        <LogRoute path="/log" />
                        <MenuRoute path="/menu" component={Menu} />
                        <PrivateRoute path="/playlist" exact component={PlaylistGeneration} />
                        <VerificationRoute path="/playlist/verification" component={PlaylistVerification} />
                        <Route path="/404" component={NotFound} />
                        <Redirect to={{ pathname:"/404"}} />
                    </Switch>
                    <Footer />
                </Suspense>
            </ErrorBoundary>
        </Router>
    )
}

export default Routes;
