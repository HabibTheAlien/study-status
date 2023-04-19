import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import avatar from "../assets/profile.png";
import { baseURL } from "../App";
import { mobile } from "../responsive";

const Container = styled.div`
	box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: 400px;
	height: 500px;
	background: white;

	border-radius: 10px;
	border: 2px solid white;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 20px;
	${mobile({ width: "90%", height: "70%", boxShadow: "none" })}
`;
const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 65%;
`;

const Title = styled.h2`
	margin-bottom: 0px;
	margin-top: 0px;
	font-size: 35px;
	font-weight: 300px;
`;
const Greet = styled.p`
	margin-top: 5px;
	font-size: 14px;
	color: gray;
`;
const P = styled.p`
	color: gray;
	font-size: 14px;
	margin-top: 5px;
`;
const Image = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 50%;
	margin: 10px 0px;
	cursor: pointer;
`;
const Inputs = styled.input`
	padding: 10px;
	width: 100%;

	margin: 10px 0px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	border: 1px solid silver;
`;
const Input = styled.input`
	padding: 10px;
	margin: 5px 0px;
	width: 220px;
	border: none;
	border-radius: 7px;
	font-size: 15px;
	background: white;
`;
const Btn = styled.button`
	padding: 10px;
	margin: 15px 0px;
	width: 100%;
	border: none;
	border-radius: 5px;
	font-size: 14px;
	background: #442fd1;
	cursor: pointer;
	color: white;

	&:hover {
		background: #fd5335;
		transition: all 0.5s ease;
	}
`;
const Login = styled.span`
	color: #dc3214;
	cursor: pointer;
`;

const Show = styled.span`
	cursor: pointer;
	padding: 10px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
`;

const Register = () => {
	const [passShow, setPassShow] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = {
			username,
			email,
			password,
		};

		try {
			const res = await axios.post(`${baseURL}/auth/register`, user);
			console.log(res);
			toast.success("Registration successfull ");
			toast.success("You can login now");
		} catch (error) {
			console.log(error.response.status);
			if (error.response.status) {
				toast.error(error.response.data);
			} else {
				toast.error("Something went wrong try again,,,");
			}
		}
	};

	return (
		<Container>
			<Title>Register</Title>
			<Greet>Happy to join you! </Greet>
			<Form onSubmit={handleSubmit}>
				<ToastContainer style={{ fontSize: "16px" }} />
				<Image src={avatar} alt=""></Image>
				<Inputs
					type="text"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<Inputs
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<div
					style={{
						// width: "300px",
						borderRadius: "7px",
						border: "1px solid silver",
					}}>
					<Input
						style={{
							width: "80%",
							outline: "none",
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
							<i className="fa fa-eye-slash" aria-hidden="true" />
						)}
					</Show>
				</div>

				<Btn type="submit">Resister</Btn>
			</Form>
			<P>
				Already Register?
				<Link className="link" to="/login">
					<Login> Login Now</Login>
				</Link>
			</P>
		</Container>
	);
};

export default Register;
