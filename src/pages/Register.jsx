import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import avatar from "../assets/user.png";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { baseURL } from "../App";
import axios from "axios";

const Container = styled.div`
	border: 1px solid silver;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	height: 500px;
	background: white;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 20px;
	${mobile({ width: "90%", height: "70%", border: "none" })}
`;
const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 65%;
	${mobile({ width: "85%" })}
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
	margin: 5px 0px;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	border: 1px solid silver;
`;
const Input = styled.input`
	padding: 10px;
	border: none;
	font-size: 15px;
	background: rgb(255, 255, 255);
	width: 80%;
	outline: "none";
	border: "none";
	border-radius: "5px 0px 0px 5px";
`;
const Btn = styled.button`
	padding: 10px;
	margin: 15px 0px;
	width: 100%;
	border: none;
	border-radius: 5px;
	font-size: 14px;
	color: white;
	background-color: ${(props) => (props.isLoading ? "lightgray" : "#442fd1")};
	cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};

	&:hover {
		background-color: ${(props) =>
			props.isLoading ? "lightgray" : "purple"};
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
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
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
			setIsLoading(false);
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
						width: "100%",
						borderRadius: "7px",
						border: "1px solid silver",
						margin: "5px 0px",
					}}>
					<Input
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

				<Btn type="submit" isLoading={isLoading} disabled={isLoading}>
					Resister
				</Btn>
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
