import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useState, useEffect } from "react";
import * as $ from "jquery";
import { Blog } from "../App";
import { JumbotronText } from "../App";
import MyJumbotron from "../jumbotron/MyJumbotron";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

interface AllBlogsProps extends RouteComponentProps<any> {}

const AllBlogs: React.FC<AllBlogsProps> = (props) => {
    $(document).ready(function () {
        if (blogs.length > 0) {
            if (blogs.length === 1) $("#blog").removeClass("align-items-stretch");
            else $("#blog").addClass("align-items-stretch");
        }
    });

    const [blogs, setBlog] = useState<Blog[]>([]);
    const [blogsBool, setChirpBool] = useState<boolean>(true);

    const jumbotronText: JumbotronText = {
        header: "Well, this is a little awkward...",
        body: [
            "It seems like you have not uploaded any blogs to your timeline, ",
            "click the button below to start blogging!",
        ],
        button: true,
    };
    let setBlogs = (bool: boolean) => {
        setChirpBool(bool);
    };

    let getBlogs = async () => {
        try {
            let res;

            res = await fetch(`/getall/blogs`, {
                method: "GET",
            });
            let blogMore = await res.json();
            let blogObj: Blog[] = [];
            //json returned with username parameter is different compared to returning blogs with no parameters
            for (const blog in blogMore) {
                blogObj.push({
                    id: blogMore[blog].id,
                    title: blogMore[blog].title,
                    img_src: blogMore[blog].img_src,
                    content: blogMore[blog].content,
                    authorid: blogMore[blog].authorid,
                    name: blogMore[blog].name,
                    tags: [{ label: "", value: "" }],
                    _created: blogMore[blog]._created,
                });
            }

            setBlog(blogObj);
            if (blogObj !== undefined) {
                if (blogObj.length > 0) setBlogs(true);
                else setBlogs(false);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);
    return (
        <>
            {blogsBool ? (
                blogs.map((blog) => (
                    <Col
                        className={
                            blogs.length > 1
                                ? "my-3 py-3 d-flex align-items-stretch"
                                : "my-3 py-3 px-0 px-sm-2"
                        }
                        key={blog.id}
                    >
                        <Card
                            bg={"warning"}
                            key={blog.id}
                            id={blog.id}
                            className={"shadow w-100 border border-dark"}
                        >
                            <Card.Img variant="top" className="display-img w-100"
                                      src={`${blog.img_src}`} />
                            <Card.Body>
                                <Card.Title className={"text-monospace"}>
                                    {blog.title}
                                </Card.Title>
                                <Card.Text className={"text-info small"}>{blog.name}</Card.Text>
                                <Link
                                    to={`blog/${blog.id}/view`}
                                    className={"shadow-sm btn btn-primary"}
                                >
                                    View Blog
                                </Link>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted small font-italic">
                                    {blog._created}
                                </small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))
            ) : (
                <MyJumbotron
                    history={props.history}
                    location={props.location}
                    match={props.match}
                    text_info={jumbotronText}
                />
            )}
        </>
    );
};

export default AllBlogs;
