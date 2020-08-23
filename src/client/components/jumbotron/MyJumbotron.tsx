import * as React from "react";
import * as $ from "jquery";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link, RouteComponentProps } from "react-router-dom";
import { JumbotronText } from "../App";
import { Blog } from "../App";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export interface MyJumbotronProps
  extends RouteComponentProps<{ id: null | string }> {
  text_info: JumbotronText;
}

const MyJumbotron: React.FC<MyJumbotronProps> = (props) => {
  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    img_src: "",
    content: "",
    authorid: "",
    name: "",
    tags: [{ label: "", value: "" }],
    _created: "",
  });

  $(document).ready(function () {
    if (props.text_info.button) {
      $(".container-fluid").html($("#blog").html());
      $("#blog").remove();
      $(".container-fluid").removeClass("align-items-center");
      $(".container-fluid").addClass("justify-content-center");
      $(".container-fluid").addClass("px-1");
    }
    if (props.text_info.button === false) {
      $(".container-fluid").removeClass("mt-5");
    }
  });
  let getBlog = async () => {
    try {
      let res1 = await fetch(`/api/${props.match.params.id}/getblog`, {
        method: "GET",
      });
      let blogMore = await res1.json();
      let myBlog = JSON.parse(JSON.stringify(blogMore));

      let res2 = await fetch(`/api/${props.match.params.id}/gettag`, {
        method: "GET",
      });
      let newTags = await res2.json();
      let tags = JSON.parse(JSON.stringify(newTags));
      let tagObj: [{ label: string; value: string }] = [
        { label: "", value: "" },
      ];
      let count: number = 0;
      for (const tag in tags[0]) {
        if (count === 0)
          tagObj.splice(0, 1, {
            label: `${tags[0][tag].name}`,
            value: `${tags[0][tag].id}`,
          });
        else
          tagObj.push({
            label: `${tags[0][tag].name}`,
            value: `${tags[0][tag].id}`,
          });
        count++;
      }

      setBlog({
        id: `${myBlog[0].id}`,
        title: `${myBlog[0].title}`,
        img_src: `${myBlog[0].img_src}`,
        content: `${myBlog[0].content}`,
        authorid: `${myBlog[0].authorid}`,
        name: `${myBlog[0].name}`,
        tags: tagObj,
        _created: `${myBlog[0]._created}`,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    if (props.match.params.id) getBlog();
  }, []);
  return (
    <>
      <Jumbotron
        style={
          props.match.params.id
            ? { wordBreak: "break-word", backgroundColor: "lightgrey" }
            : props.text_info.button
            ? { wordBreak: "break-word", marginTop: "5.5rem" }
            : { wordBreak: "break-word", marginTop: "5.5rem" }
        }
        className={
          props.match.params.id
            ? "text-center shadow-lg border border-dark text-dark align-self-center mt-5 rounded p-0 zoom mb-5 mb-0 pb-0 pt-2"
            : props.text_info.button
            ? "text-center zoom shadow-lg bg-secondary text-white d-flex align-items-stretch px-2 py-0"
            : "text-center zoom shadow-lg bg-secondary text-white d-flex align-items-stretch px-md-5 px-2 py-0"
        }
      >
        {props.match.params.id ? (
          <>
            <Row className={"w-100 mx-0"}>
              <Col
                xs={12}
                className={"text-wrap w-100 my-font-size text-monospace"}
              >
                {blog.title}
              </Col>
              <Col xs={12} className={"mt-3"}>
                <p className={"small font-italic text-dark"}>By: {blog.name}</p>
              </Col>
              <Col xs={12} className={"mt-1"}>
                <p className={"small font-italic text-dark"}>{blog._created}</p>
              </Col>
            </Row>
            <Row xs={3} className={"mb-5 w-100 justify-content-around mx-0"}>
              {blog.tags.map((tg) => (
                <Col className={"my-3"} key={`${tg.value}`}>
                  <Badge
                    pill
                    key={`${tg.value}`}
                    className={"shadow-sm text-dark mx-auto"}
                    style={{
                      backgroundColor:
                        parseInt(tg.value) === 1
                          ? "#ffc0cb"
                          : parseInt(tg.value) === 2
                          ? "#cd5c5c"
                          : parseInt(tg.value) === 3
                          ? "#a1a1e4"
                          : parseInt(tg.value) === 4
                          ? "#00a9fa"
                          : parseInt(tg.value) === 5
                          ? "#face00"
                          : parseInt(tg.value) === 6
                          ? "#ffffff"
                          : parseInt(tg.value) === 7
                          ? "#ffa500"
                          : parseInt(tg.value) === 8
                          ? "#e4e4a1"
                          : null,
                    }}
                  >
                    {tg.label}
                  </Badge>
                </Col>
              ))}
            </Row>
            <Row className={"justify-content-center w-100 m-0"}>
              <Col xs={12} sm={10} md={8} lg={6}>
                <Image
                  className={
                    "border border-dark shadow-sm rounded display-img w-100"
                  }
                  src={blog.img_src}
                />
              </Col>
            </Row>
            <Row
              className={
                "justify-content-center w-100 mx-0 mb-2 mt-5 text-left"
              }
            >
              <Col xs={12} md={10}>
                <p>{blog.content}</p>
              </Col>
            </Row>
            <footer
              className={
                " bg-dark text-white align-self-center rounded-bottom mt-auto "
              }
            >
              <Row className={"m-0 p-0 w-100 justify-content-md-between"}>
                <Col
                  key={`GOINGBACK`}
                  xs={12}
                  md={5}
                  lg={3}
                  className={"mx-1 my-md-3 my-3 order-2 order-md-1"}
                >
                  <Button
                    className={"w-100 shadow-sm"}
                    variant={"info"}
                    onClick={props.history.goBack}
                  >
                    Go Back
                  </Button>
                </Col>

                <Col
                  key={`edit`}
                  xs={12}
                  md={5}
                  lg={3}
                  className={"mx-1 my-md-3 my-3 order-1 order-md-2"}
                >
                  <Link
                    style={{ backgroundColor: "#BA55D3" }}
                    className={"btn  w-100 shadow-sm text-white"}
                    to={`/blog/${props.match.params.id}/edit`}
                  >
                    Edit
                  </Link>
                </Col>
              </Row>
            </footer>
          </>
        ) : (
          <div className={"d-flex flex-column mx-auto"}>
            <div className="flex-fill d-flex flex-column align-items-center">
              <h3 className={"text-monospace my-auto"}>
                {props.text_info.header}
              </h3>
            </div>

            <div className="flex-fill d-flex flex-column align-items-center">
              <p className={props.text_info.button ? "my-auto" : "mb-auto"}>
                {props.text_info.body[0]}
                <b>{props.text_info.button ? props.text_info.body[1] : null}</b>
              </p>
            </div>
            {props.text_info.button ? (
              <div
                className={"flex-fill d-flex flex-column align-items-center"}
              >
                <Link
                  to={"/blog/add"}
                  className={"btn btn-light shadow-sm text-dark my-auto"}
                >
                  Create New Blog!
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </Jumbotron>
    </>
  );
};

export default MyJumbotron;
