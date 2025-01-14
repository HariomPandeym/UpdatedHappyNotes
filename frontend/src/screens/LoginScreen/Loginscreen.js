import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Mainscreen from "../../components/Mainscreen";
import ErrorMessage from "../../components/ErrorMessage";
import "./Loginscreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";
import Loading from "../../components/Loading";

// const LoginScreen = ({history}) => { this is correct
  const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history=useNavigate();

  

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      history("/mynotes");
    }
  }, [ history,userInfo]);

  // const[load,setLoad]=useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // console.log(email);
    // console.log(password);
  };

  return (
    <Mainscreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </Mainscreen>
  );
};

export default LoginScreen;
















