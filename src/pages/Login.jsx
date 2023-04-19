import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { Context } from "../contextApi/context";
import { baseURL } from "../App";
import { mobile } from "../responsive";

const Container = styled.div`
	box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);

	width: 400px;
	height: 500px;
	background: rgba(248, 248, 255, 0.89);
	border-radius: 15px;
	padding: 10px;
	margin-top: 20px;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	${mobile({ width: "90%", height: "70%", boxShadow: "none" })}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 60px;
`;
const Header = styled.h1`
	text-align: center;
	font-size: 40px;
	margin-top: 60px;
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	${mobile({ width: "90%" })}
`;

const Input = styled.input`
	padding: 10px;
	width: 220px;
	border: none;
	border-radius: 7px;
	font-size: 15px;
	background: white;
	border: 1px solid silver;
`;
const Btn = styled.button`
	padding: 10px 0px;
	margin: 5px 0px;
	width: 120px;
	border-radius: 5px;
	border: 1px solid silver;
	color: white;
	background-color: ${(props) => (props.isFetching ? "lightgray" : "purple")};
	cursor: ${(props) => (props.isFetching ? "not-allowed" : "pointer")};
`;
const Log = styled.span`
	color: #dc3214;
	cursor: pointer;
`;
const P = styled.p`
	text-align: center;
	color: gray;
	font-size: 14px;
	margin-top: 5px;
`;

const Show = styled.span`
	cursor: pointer;
	background-color: #e8f0fe;
	padding: 9px;
	font-size: 15px;
`;

const Login = () => {
	const [passShow, setPassShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post(`${baseURL}/auth/login`, {
				email,
				password,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
			toast.success("Login successful,,,");
			res.data && window.location.replace("/");
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
			toast.error("Something went wrong try again,,,");
		}
	};
	return (
		<Container>
			<Header>Login</Header>
			<Wrapper>
				<ToastContainer style={{ fontSize: "16px" }} />
				<Form onSubmit={handleSubmit}>
					<Input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<div
						style={{
							width: "220px",
							borderRadius: "7px",
							border: "1px solid silver",
							margin: "15px 0px",
						}}>
						<Input
							style={{
								width: "80%",
								outline: "none",
								border: "none",
								borderRadius: "7px 0px 0px 7px",
							}}
							type={!passShow ? "password" : "text"}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Enter Your password"
						/>
						<Show
							style={{
								padding: "11px 12px",
								outline: "none",
								borderRadius: "0px 7px 7px 0px",
							}}
							onClick={() => setPassShow(!passShow)}>
							{!passShow ? (
								<i className="fa fa-eye" aria-hidden="true" />
							) : (
								<i
									className="fa fa-eye-slash"
									aria-hidden="true"
								/>
							)}
						</Show>
					</div>

					<Btn
						type="submit"
						isFetching={isFetching}
						disabled={isFetching}>
						Login
					</Btn>
				</Form>

				<P>
					Don't have account?
					<Link to="/register" className="link">
						<Log> Register Now</Log>
					</Link>
				</P>
			</Wrapper>
		</Container>
	);
};

export default Login;
