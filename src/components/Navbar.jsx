import { Context } from "../contextApi/context";
import { Link } from "react-router-dom";
import avtar from "../assets/user.png";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useContext } from "react";

const Container = styled.div`
	z-index: 1000;
	height: 70px;
	background: white;
	border-bottom: 2px solid silver;
	display: flex;
	align-items: center;
	color: #1d1d1d;
	justify-content: space-between;
	padding: 5px 20px;
	position: sticky;
	top: 0;
`;

const Left = styled.div`
	cursor: pointer;
`;
const Logo = styled.h1`
	font-size: 2.4rem;
	color: #703be7;
	${mobile({ fontSize: "2rem" })}
`;
const Right = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Avtar = styled.img`
	cursor: pointer;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: white;
	object-fit: cover;

	${mobile({ width: "45px", height: "45px" })}
`;
const Btn = styled.button`
	cursor: pointer;
	background: inherit;
	padding: 5px 10px;
	color: #1d1d1d;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	border: 1px solid silver;
	${mobile({ padding: "5px" })}
`;
const Name = styled.span`
	cursor: pointer;
	color: #1d1d1d;
	padding: 10px;
	font-size: 18px;
	${mobile({ display: "none" })}
`;
const Navbar = () => {
	const { user, dispatch } = useContext(Context);
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		window.location.replace("/");
	};
	return (
		<Container>
			<Left>
				<Link className="link" to="/">
					<Logo>Sweet 16th</Logo>
				</Link>
			</Left>
			<Right>
				{user ? (
					<>
						<Link className="link" to="/profile">
							{user.profilePic ? (
								<Avtar src={user.profilePic} alt="" />
							) : (
								<Avtar src={avtar} alt="" />
							)}
						</Link>
						<Link className="link" to="/profile">
							<Name>{user.username}</Name>
						</Link>
						<Btn onClick={handleLogout}>Logout</Btn>
					</>
				) : (
					<Link className="link" to="/login">
						<Btn>Login</Btn>
					</Link>
				)}
			</Right>
		</Container>
	);
};

export default Navbar;
