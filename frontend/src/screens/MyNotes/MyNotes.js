import React, { useEffect, useState } from "react";
import Mainscreen from "../../components/Mainscreen";
// import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
// import notes from "../../components/data/notes";
// import notes from '../../components/data/notes';
import { deleteNoteAction, listNotes } from "../../actions/noteAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const history = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  // console.log(notes);
  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history("/");
    }
  }, [dispatch.successCreate, history, userInfo, successUpdate, successDelete]);
  return (
    <Mainscreen title={`Welcome Back ${userInfo && userInfo.name}...`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}

      {notes &&
        notes

          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            // <Accordion key={note._id}> original one
            <Accordion defaultActiveKey={["0"]}>
              <Accordion.Item>
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Button
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >
                        {note.title}
                      </Accordion.Button>
                    </span>

                    <div>
                      <Button
                        onClick={() => {
                          history(`/note/${note._id}`);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>

                  <Accordion.Collapse>
                    <Card.Body>
                      <h4>
                        <Badge bg="success" text="light">
                          Category - {note.category}
                        </Badge>
                      </h4>

                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          ))}
    </Mainscreen>
  );
};

export default MyNotes;
