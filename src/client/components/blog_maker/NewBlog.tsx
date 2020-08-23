import * as React from "react";
import { useEffect, useState } from "react";
import * as moment from "moment";

import * as $ from "jquery";
import { RouteComponentProps } from "react-router-dom";
import { Blog } from "../App";
import ModalConfirmation from "../modal/ModalConfirmation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
library.add(faInfoCircle);
import Select from "react-select";

export interface NewBlogProps
    extends RouteComponentProps<{ id: null | string }> {}

export interface ModalObj {
    header: string;
    body: string;
}

const NewBlog: React.FC<NewBlogProps> = (props) => {
    $(document).ready(function () {

        if(blog.content.length > 0  && trueLength) {
            setTextLength(10000 - blog.content.length);
            setTrueLength(false);
        }

        tagsValidationColors("#ced4da");
        if (!props.match.params.id) authorsValidationColors("#ced4da");
        if ($("#tags").hasClass("is-invalid") || $("#tags").hasClass("is-valid")) {
            if ($(".select__multi-value__label").length > 0) selectValid(true, true);
            else selectValid(true, false);
        }
        selectCss();
    });

    const renderTooltipTitle = (props: any) => (
        <Tooltip id="button-tooltip_title" {...props}>
            In order for you to successfully publish your blog post, you must enter
            the blog's title here (cannot be blank and cannot exceed 60 characters).
        </Tooltip>
    );
    const renderTooltipImg = (props: any) => (
        <Tooltip id="button-tooltip_img" {...props}>
            The image url that you enter must end with one of the following: .gif,
            .jpg, .jpeg, and .png. In order to effectively save a new image to your
            blog you must click the "Upload Image" button. Upon a successful image
            upload you should see the image on your screen change to the image located
            at the image url that you have entered. Upon an unsuccessful image upload
            you should get an error message and the image on the screen should not
            update as well. If you wish to save a new image make sure your new image
            is uploaded on the screen prior to creating or saving changes to your
            blog.
        </Tooltip>
    );
    const renderTooltipAuthor = (props: any) => (
        <Tooltip id="button-tooltip_author" {...props}>
            In order for you to successfully publish your blog post, you must select
            an author here.
        </Tooltip>
    );
    const renderTooltipTag = (props: any) => (
        <Tooltip id="button-tooltip_author" {...props}>
            In order for you to successfully publish your blog post, you must select
            at least one tag here.
        </Tooltip>
    );
    const renderTooltipContent = (props: any) => (
        <Tooltip id="tooltip-top" {...props}>
            In order for you to successfully publish your blog post, you must enter
            the blog's content here (cannot be blank and cannot exceed 10000
            characters).
        </Tooltip>
    );

    const modalText: ModalObj[] = [
        {
            header: "Update Confirmation",
            body: "Are you sure you would like to makes changes to this blog?",
        },
        {
            header: "Delete Confirmation",
            body: "Are you sure you would like to delete this blog?",
        },
    ];

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

    const [tagOption, setTagOptions] = useState<
        { value: string; label: string }[]
        >([]);
    const [authorOption, setAuthorOptions] = useState<{
        value: string;
        label: string;
    }>({ value: "", label: "" });
    const [authors, setAuthors] = useState<{ value: string; label: string }[]>(
        []
    );
    const [trueLength, setTrueLength] = useState<boolean>(true);
    const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
    const [validated, setValidated] = useState(false);
    const isValidated = () => setValidated(true);
    const formElement: HTMLFormElement = document.getElementById(
        "blog_form"
    ) as HTMLFormElement;
    const [textLength, setTextLength] = useState(10000);

    const selectCss = () => {
        $(".select__indicators").css("cursor", "pointer");
        $(".select__control").css({
            cursor: "text",
            "box-shadow": "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
            "border-radius": "0.25rem",
            "border-style": "solid",
            "border-width": "1px",
        });
        if (props.match.params.id === undefined) {
            $("#authors .css-1hb7zxy-IndicatorsContainer").css("cursor", "pointer");
            $("#authors div").first().css({
                cursor: "text",
                "box-shadow": "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
                "border-radius": "0.25rem",
                "border-style": "solid",
                "border-width": "1px",
            });
        }
    };
    const tagsValidationColors = (color: string) => {
        if ($("#tags").hasClass("is-valid"))
            $(".select__control").css("border-color", "#28a745");
        else if ($("#tags").hasClass("is-invalid"))
            $(".select__control").css("border-color", "#dc3545");
        else $(".select__control").css("border-color", `${color}`);
    };
    const authorsValidationColors = (color: string) => {
        if ($("#authors").hasClass("is-valid"))
            $("#authors div").first().css("border-color", "#28a745");
        else if ($("#authors").hasClass("is-invalid"))
            $("#authors div").first().css("border-color", "#dc3545");
        else $("#authors div").css("border-color", `${color}`);
    };
    let selectAuthorChange = (newOptions: { value: string; label: string }) => {
        if (
            $("#authors").hasClass("is-invalid") ||
            $("#authors").hasClass("is-valid")
        ) {
            if (newOptions !== null) selectValid(false, true);
            else selectValid(false, false);
        }
        setAuthorOptions(newOptions);
    };
    const selectValid = (selectName: boolean, cssValidation: boolean) => {
        if (
            $(selectName ? "#tags" : "#authors").hasClass(
                cssValidation ? "is-invalid" : "is-valid"
            )
        )
            $(selectName ? "#tags" : "#authors").removeClass(
                cssValidation ? "is-invalid" : "is-valid"
            );
        $(selectName ? "#tags" : "#authors").addClass(
            cssValidation ? "is-valid" : "is-invalid"
        );
        if (selectName)
            $(".select__control").css(
                "border-color",
                cssValidation ? "#28a745" : "#dc3545"
            );
        else
            $("#authors div")
                .first()
                .css("border-color", cssValidation ? "#28a745" : "#dc3545");
    };
    let selectTagsChange = (newOptions: { value: string; label: string }[]) => {
        setTagOptions(newOptions);
    };
    let postTag = async () => {
        tagOption.forEach(async (data) => {
            try {
                let tagData: any = {};
                tagData.tagid = parseInt(data.value);
                await fetch(`/api/createblogtags`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(tagData),
                });
            } catch (e) {
                console.log(e.message);
            }
        });
    };

    let getTags = async () => {
        try {
            let res = await fetch(`/api/tags`, {
                method: "GET",
            });
            let myTags = await res.json();
            let tagsList = JSON.parse(JSON.stringify(myTags));
            let tempList: { value: string; label: string }[] = [];
            tagsList.forEach((val: { id: number; name: string }) => {
                tempList.push({ label: `${val.name}`, value: `${val.id}` });
            });
            setTags(tempList);
        } catch (e) {
            console.log(e.message);
        }
    };
    let getAuthors = async () => {
        try {
            let res = await fetch(`/api/authors`, {
                method: "GET",
            });
            let myAuthors = await res.json();
            let authorList = JSON.parse(JSON.stringify(myAuthors));
            let tempList: { value: string; label: string }[] = [];
            authorList.forEach((val: { id: number; name: string }) => {
                tempList.push({ value: `${val.id}`, label: `${val.name}` });
            });
            setAuthors(tempList);
        } catch (e) {
            console.log(e.message);
        }
    };
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
            setTagOptions(tagObj);
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
        getAuthors();
        getTags();
        if (props.match.params.id) {
            getBlog();
        }
    }, []);

    let handleUpload = () => {
        const img: HTMLImageElement = document.getElementById(
            "img_src"
        ) as HTMLImageElement;
        const imgUrl: HTMLInputElement = document.getElementById(
            "img_upload"
        ) as HTMLInputElement;
        if (
            imgUrl.value.endsWith(".gif") ||
            imgUrl.value.endsWith(".jpg") ||
            imgUrl.value.endsWith(".jpeg") ||
            imgUrl.value.endsWith(".png")
        )
            img.src = imgUrl.value;
        else
            alert(
                "Error: Your image can not be updated until you enter a valid image url."
            );

        return false;
    };
    const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        setTextLength(10000 - e.currentTarget.value.length);
    };

    const findInvalid = () => {
        let tempElement: string;
        let tempBool: boolean =
            $(".form-control:valid").length === 3 ? true : false;

        if (tempBool === false) {
            $(".form-control:invalid").each(function () {
                $(this).addClass("is-invalid");
            });
        }

        tempElement = $(".is-invalid").first().attr("id").toString();

        $(".form-control:invalid").each(function () {
            $(this).removeClass("is-invalid");
        });

        if ($(`#${tempElement}`).hasClass("form-control"))
            $(`#${tempElement}`).focus();
        else $(`#${tempElement} input`).first().focus();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let tagsValidation: boolean;
        if (tagOption !== null) {
            if (tagOption.length > 0) tagsValidation = true;
            else tagsValidation = false;
        } else tagsValidation = false;
        let authorsValidation: boolean =
            authorOption.value.toString().length > 0 ? true : false;
        if (props.match.params.id === undefined) {
            if (authorsValidation) selectValid(false, true);
            else selectValid(false, false);
        }

        if (tagsValidation) selectValid(true, true);
        else selectValid(true, false);

        if (authorsValidation === undefined) authorsValidation = true;

        if (
            e.currentTarget.checkValidity() === true &&
            tagsValidation &&
            authorsValidation
        ) {
            if (props.match.params.id === undefined) postFunc();
        } else findInvalid();

        isValidated();
    };

    let blogForm = () => {
        let form = $(`#blog_form`).serializeArray();
        let formData: any = {};
        formData.title = form[0].value;
        let imgElement: HTMLImageElement = document.getElementById(
            "img_src"
        ) as HTMLImageElement;
        formData.img_src = imgElement.src;
        formData.authorid = authorOption.value;
        formData.content = form[2].value;
        formData._created = moment().format("LL").toString();
        return formData;
    };
    let postFunc = async () => {
        let formData: any = blogForm();
        try {
            await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formData),
            });
            await postTag();
            props.history.push("/");
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <>
            <Card style={{backgroundColor: "lightgrey"}}
                  className="text-center d-flex align-items-stretch shadow-lg zoom p-0 border border-dark text-dark">
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    id={"blog_form"}
                    className={"m-0"}
                >
                    <Form.Text className={"font-italic small text-dark m-0"} >
                        ( <span className={"required"}></span>Indicates required )
                    </Form.Text>

                    <Row className={"w-100 justify-content-center mx-0 mb-0 mt-5"}>
                        <Form.Group className={"my-2 col-12 col-md-10"}>
                            <Form.Label className={"required"}>
                                <b>
                                    {props.match.params.id === undefined ? "Title" : "Edit Title"}
                                </b>
                                <OverlayTrigger
                                    placement="right-end"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipTitle}
                                >
                                    <FontAwesomeIcon
                                        className={"ml-2"}
                                        size={"sm"}
                                        icon={["fas", "info-circle"]}
                                    />
                                </OverlayTrigger>
                            </Form.Label>

                            <Form.Control
                                type="text"
                                name={"title"}
                                className={"shadow-sm"}
                                id={"title"}
                                defaultValue={
                                    props.match.params.id === undefined ? "" : blog.title
                                }
                                maxLength={60}
                                required
                                autoFocus
                            />
                            <Form.Control.Feedback className={"text-left"} type="invalid">
                                Title must not be blank
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                        <Col xs={12} sm={10} md={8} lg={6} className={"my-2 order-1 display-img"}>
                            <Image
                                src={
                                    props.match.params.id === undefined
                                        ? "http://www.pngall.com/wp-content/uploads/2/Question-Mark-PNG-Picture.png"
                                        : blog.img_src
                                }
                                className={"shadow-sm display-img w-100 border border-dark"}
                                id={"img_src"}
                                rounded
                            />
                        </Col>
                        <Col className={" my-4 order-2"} xs={12} md={10}>
                            <Form.Group className={"my-2 w-100"}>
                                <Form.Label>
                                    <b>
                                        {props.match.params.id === undefined
                                            ? "Image Url"
                                            : "Edit Image Url"}
                                    </b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipImg}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>
                                <InputGroup className={"shadow-sm"}>
                                    <Form.Control
                                        defaultValue={
                                            props.match.params.id === undefined
                                                ? "http://www.pngall.com/wp-content/uploads/2/Question-Mark-PNG-Picture.png"
                                                : blog.img_src
                                        }
                                        name={"img_src"}
                                        type="url"
                                        id={"img_upload"}
                                    />
                                    <InputGroup.Append>
                                        <Button
                                            onClick={handleUpload}
                                            variant={"primary"}
                                            size={"sm"}
                                        >
                                            Upload Image
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    {props.match.params.id ? null : (
                        <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                            <Form.Group className={"my-2 col-12 col-md-10"}>
                                <Form.Label className={"required"}>
                                    <b>
                                        {props.match.params.id === undefined
                                            ? "Author"
                                            : "Edit Author"}
                                    </b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipAuthor}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Select
                                    id="authors"
                                    key={"authorz"}
                                    options={authors}
                                    onChange={selectAuthorChange}
                                    className={"text-left border-0"}
                                    onBlur={() => {
                                        authorsValidationColors("#ced4da");
                                    }}
                                    onFocus={() => {
                                        authorsValidationColors("#80bdff");
                                    }}
                                    placeholder={"Please Select an Author"}
                                />
                                <input type={"hidden"} id={"hidden_authors"} />
                                <Form.Control.Feedback className={"text-left"} type="invalid">
                                    An author must be selected
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    )}
                    <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                        <Form.Group className={"my-2 col-12 col-md-10"}>
                            <Form.Label className={"required"}>
                                <b>
                                    {props.match.params.id === undefined ? "Tags" : "Edit Tags"}
                                </b>
                                <OverlayTrigger
                                    placement="right-end"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipTag}
                                >
                                    <FontAwesomeIcon
                                        className={"ml-2"}
                                        size={"sm"}
                                        icon={["fas", "info-circle"]}
                                    />
                                </OverlayTrigger>
                            </Form.Label>
                            <Select
                                id="tags"
                                className={"text-left basic-multi-select"}
                                key={`reactSelect${blog.tags[0].label}`}
                                onBlur={() => {
                                    tagsValidationColors("#ced4da");
                                }}
                                onFocus={() => {
                                    tagsValidationColors("#80bdff");
                                }}
                                defaultValue={props.match.params.id ? blog.tags : null}
                                onChange={selectTagsChange}
                                isMulti
                                options={tags}
                                placeholder={"Please Select a Tag"}
                                classNamePrefix="select"
                                required
                            />

                            <Form.Control.Feedback className={"text-left"} type="invalid">
                                A tag must be selected
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className={"w-100 justify-content-center mb-0 mx-0 mt-5"}>
                        <Col className={"my-2"} xs={12} md={10}>
                            <Form.Group>
                                <Form.Label className={"required"}>
                                    <b>
                                        {props.match.params.id === undefined
                                            ? "Content"
                                            : "Edit Content"}
                                    </b>
                                    <OverlayTrigger
                                        placement="right-end"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipContent}
                                    >
                                        <FontAwesomeIcon
                                            className={"ml-2"}
                                            size={"sm"}
                                            icon={["fas", "info-circle"]}
                                        />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    defaultValue={
                                        props.match.params.id === undefined ? "" : blog.content
                                    }

                                    rows={5}
                                    onInput={handleChange}
                                    name={"content"}
                                    className={"shadow-sm"}
                                    id={"message"}
                                    maxLength={10000}
                                    required
                                />
                                <Form.Text key={textLength} className={"font-italic small text-left text-dark"} >
                                    You have {textLength} characters left.
                                </Form.Text>
                                <Form.Control.Feedback type="invalid" className={"text-left"}>
                                    Message must not be blank
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <footer
                        className={
                            " bg-dark text-white align-self-center rounded-bottom mt-auto"
                        }
                    >
                    <Row
                        className={
                            props.match.params.id === undefined
                                ? "mx-0 p-0 w-100 justify-content-center"
                                : "mx-0 p-0 w-100 justify-content-between"
                        }
                    >
                         {" "}
                        {props.match.params.id === undefined ? (
                            <div className={"mx-1 my-md-3 my-3 d-flex align-self-center col-xl-3  col-lg-4 col-md-5 col-sm-6 col-12"}>
                                <Button
                                    type="submit"
                                    className="shadow-sm w-100"
                                    variant="success"
                                >
                                    Create Blog
                                </Button>
                            </div>
                        ) : (
                            <>
                                <ModalConfirmation
                                    invalid={findInvalid}
                                    post_user={postTag}
                                    validate_form={isValidated}
                                    tag_valid={selectValid}
                                    tag_obj={tagOption}
                                    form_element={formElement}
                                    blog_obj={blogForm}
                                    tag_func={postTag}
                                    mod_obj={modalText}
                                    location={props.location}
                                    match={props.match}
                                    history={props.history}
                                />
                            </>
                        )}{" "}
                    </Row>
                    </footer>
                </Form>
            </Card>
        </>
    );
};
export default NewBlog;
