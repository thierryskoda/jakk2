// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import HelloHome from "./HelloHome";
import Home from "./Home";
import RidePage from "./RidePage";
import RiderRegistration from "./RiderRegistration";
import HostRegistration from "./HostRegistration";
import PostConfirmation from "./PostConfirmation";
import Profile from "./Profile";
import About from "./About";
import ContactUs from "./ContactUs";
import AuthContext from "./context/AuthContext";
import Login from "./Login";
import Footer from "./Footer";
import HostProfile from "./HostProfile";

const App = () => {
    const { currentUserLoaded, currentUser } = useContext(AuthContext);

    if (!currentUserLoaded) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Container>
                <Header />
                <Content>
                    <Switch>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route path="/riderRegistration">
                            <RiderRegistration />
                        </Route>
                        <Route path="/hostRegistration">
                            <HostRegistration />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact-us">
                            <ContactUs />
                        </Route>
                        {/* AUTHENTICATED ROUTES */}
                        <Route exact path="/">
                            {!currentUser ? <HelloHome /> : <Home />}
                        </Route>
                        <Route path="/host/:id">
                            {!currentUser ? (
                                <Redirect to="/riderRegistration" />
                            ) : (
                                <RidePage />
                            )}
                        </Route>
                        <Route path="/confirmed">
                            {!currentUser ? (
                                <Redirect to="/riderRegistration" />
                            ) : (
                                <PostConfirmation />
                            )}
                        </Route>
                        <Route exact path="/profile">
                            {!currentUser ? (
                                <Redirect to="/riderRegistration" />
                            ) : (
                                <Profile />
                            )}
                        </Route>

                        <Route exact path="/profile/:id">
                            {!currentUser ? (
                                <Redirect to="/riderRegistration" />
                            ) : (
                                <HostProfile />
                            )}
                        </Route>
                    </Switch>
                </Content>
                <Footer />
            </Container>
        </BrowserRouter>
    );
};

export default App;

const Content = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
`;

const spin = keyframes`
  from {transform:rotate(0deg)};
    to {transform:rotate(360deg)};
`;

const Loading = styled(FiLoader)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1500ms linear infinite;
    color: var(--primary-color);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;
