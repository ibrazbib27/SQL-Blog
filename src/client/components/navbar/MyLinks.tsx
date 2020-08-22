import * as React from "react";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

interface LinksProps {}

const MyLinks: React.FC<LinksProps> = (props) => {
    return (
        <>
            <Nav.Link as={Link}  to={"/"} eventKey="1" className="nav-color">
                Home
            </Nav.Link>

            <Nav.Link
                as={Link}
                to={"/blog/about"}
                eventKey="2"
                className="nav-color"
            >
                About
            </Nav.Link>

            <Nav.Link as={Link} className="nav-color" to={"/blog/add"} eventKey="3">
                Add New Blog
            </Nav.Link>
        </>
    );
};

export default MyLinks;
