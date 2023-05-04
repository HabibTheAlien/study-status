import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { Context } from "../contextApi/context";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { useState } from "react";
import { baseURL } from "../App";
import axios from "axios";

const Container = styled.div`
	/* border: 1px solid silver; */
	width: 400px;
	height: 500px;
	background: white;
	border-radius: 10px;
	padding: 10px;
	margin-top: 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* ${mobile({ width: "90%", height: "70%", border: "none" })} */
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
	width: 65%;
	${mobile({ width: "85%" })}
`;

const Input = styled.input`
	padding: 10px;
	border: none;
	font-size: 15px;
	background: rgb(255, 255, 255);
	width: 80%;
	outline: "none";
	border: "none";
	/* border-radius: "5px 0px 0px 5px"; */
	border-radius: 5px;
`;

const Inputs = styled.input`
	padding: 10px;
	width: 100%;
	margin: 5px 0px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	border: 1px solid silver;
	&:focus {
		border: 2px solid #703be7;
		transition: all 0.01s linear;
	}
`;
const Btn = styled.button`
	padding: 10px 0px;
	margin: 15px 0px;
	width: 100%;
	border-radius: 5px;
	border: 1px solid silver;
	color: white;
	background-color: ${(props) =>
		props.isFetching ? "lightgray" : "#703be7"};
	cursor: ${(props) => (props.isFetching ? "not-allowed" : "pointer")};

	&:hover {
		background-color: ${(props) =>
			props.isFetching ? "lightgray" : "purple"};
		transition: all 0.5s ease;
	}
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
const Div = styled.div`
	width: 100%;
	border-radius: 7px;
	border: 1px solid silver;
	margin: 5px 0px;

	&:focus {
		border: 2px solid #703be7;
		transition: all 0.01s linear;
	}
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
					<Inputs
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Div>
						<Input
							type={!passShow ? "password" : "text"}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Enter Your password"
						/>
						<Show onClick={() => setPassShow(!passShow)}>
							{!passShow ? (
								<i className="fa fa-eye" aria-hidden="true" />
							) : (
								<i
									className="fa fa-eye-slash"
									aria-hidden="true"
								/>
							)}
						</Show>
					</Div>

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
