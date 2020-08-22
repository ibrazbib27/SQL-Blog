import * as React from "react";

import MyNavbar from "./navbar/MyNavbar";
import Footer from "./footer/Footer";
import NewBlog from "./blog_maker/NewBlog";
import AllBlogs from "./blog_maker/AllBlogs";
import MyJumbotron from "./jumbotron/MyJumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export interface AppProps {}

export interface Blog {
    id: string;
    title: string;
    img_src: string;
    content: string;
    authorid: string;
    name: string;
    tags: [{ label: string; value: string }];
    _created: string;
}
export interface JumbotronText {
    header: string;
    body: string[];
    button: boolean;
}

const App: React.FC<AppProps> = (props) => {
    const jumbotronText: JumbotronText = {
        header: "Who Are We?",
        body: [
            `2020 has been a crazy year, in every single way. If you wanna share your perspective and insight to the 
            world on current events, books, games, sports, or anything, then Blog Away is the place you wanna be to do it.
             Plenty of things are going on around the world, so feel free to express yourself to your fullest at Blog Away!`,
        ],
        button: false,
    };

    return (
        <>
            <Router>
                <Switch>
                    <Route
                        exact
                        path={"/"}
                        key={"/"}
                        render={(props) => (
                            <>
                                <MyNavbar />
                                <Container
                                    className={"d-flex justify-content-center align-items-center min-vh-100"}
                                    fluid
                                >
                                    <Row
                                        xs={1}
                                        sm={2}
                                        md={3}
                                        lg={3}
                                        xl={3}
                                        id={"blog"}
                                        className={
                                            "justify-content-center justify-content-md-around align-items-center mt-5 row-size"
                                        }
                                    >
                                        <AllBlogs
                                            history={props.history}
                                            location={props.location}
                                            match={props.match}
                                        />
                                    </Row>
                                </Container>
                                <Footer />
                            </>
                        )}
                    />
                    {["/blog/about", "/blog/:id/view"].map((path: string) => (
                        <Route
                            exact
                            path={path}
                            key={path}
                            render={(props) => (
                                <>
                                    <MyNavbar />
                                    <Container
                                        className={"d-flex justify-content-center mt-5 min-vh-100"}
                                        fluid
                                    >
                                        <MyJumbotron
                                            key={path}
                                            text_info={jumbotronText}
                                            history={props.history}
                                            location={props.location}
                                            match={props.match}
                                        />
                                    </Container>
                                    <Footer />
                                </>
                            )}
                        />
                    ))}
                    {["/blog/add", "/blog/:id/edit"].map((path) => (
                        <Route
                            exact
                            path={path}
                            key={path}
                            render={(props) => (
                                <>
                                    <MyNavbar />
                                    <Container
                                        className={"d-flex justify-content-center min-vh-100"}
                                        fluid
                                    >
                                        <Row
                                            className={
                                                "justify-content-center align-self-center w-100 align-items-stretch py-5 mt-5"
                                            }
                                        >
                                            <NewBlog
                                                history={props.history}
                                                location={props.location}
                                                match={props.match}
                                            />
                                        </Row>
                                    </Container>
                                    <Footer />
                                </>
                            )}
                        />
                    ))}
                </Switch>
            </Router>
        </>
    );
};

export default App;
