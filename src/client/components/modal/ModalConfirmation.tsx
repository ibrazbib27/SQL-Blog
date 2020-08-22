import * as React from "react";
import { ModalObj } from "../blog_maker/NewBlog";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { RouteComponentProps } from "react-router-dom";
import { useState } from "react";


export interface ModalProps extends RouteComponentProps<{ id: string }> {
    invalid: any;
    post_user: any;
    validate_form: any;
    tag_func: any;
    form_element: HTMLFormElement;
    mod_obj: ModalObj[];
    blog_obj: any;
    tag_valid: any;
    tag_obj: { label: string; value: string }[];
}

const ModalConfirmation: React.FC<ModalProps> = (props) => {
    const [option, setOption] = useState<boolean | null>(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let complete = () => props.history.push("/");

    const handleSubmit = () => {
        let tagsValidation: boolean;
        if (props.tag_obj !== null) {
            if (props.tag_obj.length > 0) tagsValidation = true;
            else tagsValidation = false;
        } else tagsValidation = false;

        if (tagsValidation) props.tag_valid(true, true);
        else props.tag_valid(true, false);

        if (props.form_element.checkValidity() === true && tagsValidation) {
            updateBlog();
        } else setTimeout(props.invalid, 200);

        props.validate_form();
        return false;
    };
    let updateTags = async () => {
        props.tag_obj.forEach(async (val) => {
            try {
                let formData: any = {};
                formData.blogid = props.match.params.id;
                formData.tagid = val.value;
                await fetch(`/api/blogtagspost`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(formData),
                });
            } catch (e) {
                console.log(e.message);
            }
        });
    };
    let deleteTags = async () => {
        try {
            await fetch(`/api/${props.match.params.id}/tags`, {
                method: "DELETE",
            });
        } catch (e) {
            console.log(e.message);
        }
    };

    let updateBlog = async () => {
        await deleteTags();
        await updateTags();
        let formData: any = props.blog_obj();
        try {
            await fetch(`/api/${props.match.params.id}/blog`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(formData),
            });
            complete();
        } catch (e) {
            console.log(e.message);
        }
    };
    let deleteBlog = async () => {
        try {
            await deleteTags();
            await fetch(`/api/${props.match.params.id}/blog`, {
                method: "DELETE",
            });
            complete();
        } catch (e) {
            console.log(e.message);
        }
    };
    return (
        <>
            <div
                className={"col-12 col-md-5 col-lg-4 my-md-0 my-1 order-2 order-md-1"}
            >
                <Button
                    onClick={() => {
                        setOption(false);
                        handleShow();
                    }}
                    className="shadow-sm w-100"
                    variant="danger"
                >
                    Delete
                </Button>
            </div>{" "}
            <div
                className={"col-12 col-md-5 col-lg-4 my-1 my-md-0 order-1 order-md-2"}
            >
                <Button
                    onClick={() => {
                        setOption(true);
                        handleShow();
                    }}
                    className="shadow-sm w-100"
                    variant="primary"
                >
                    Save Changes
                </Button>
            </div>
            <Modal
                id={"modalConfirmation"}
                className={"text-center"}
                show={show}
                onHide={handleClose}
            >
                <Modal.Header className={"w-100 px-3 mx-auto text-center"}>
                    <Modal.Title className={"px-0 w-100"}>
                        {option ? props.mod_obj[0].header : props.mod_obj[1].header}
                    </Modal.Title>{" "}
                    <div className={"px-0"}>
            <span
                onClick={handleClose}
                className="close pointer"
                aria-label="Close"
                aria-hidden="true"
            >
              &times;
            </span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {option ? props.mod_obj[0].body : props.mod_obj[1].body}
                </Modal.Body>
                <Modal.Footer className={"row mx-0 w-100 justify-content-between"}>
                    <div className={"col-4"}>
                        <Button
                            className="shadow-sm w-100"
                            variant="danger"
                            onClick={handleClose}
                        >
                            No
                        </Button>
                    </div>
                    <div className={"col-4"}>
                        <Button
                            className="shadow-sm w-100"
                            variant="success"
                            onClick={() => {
                                if (option) {
                                    handleClose();
                                    handleSubmit();
                                } else deleteBlog();
                            }}
                        >
                            Yes
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalConfirmation;
