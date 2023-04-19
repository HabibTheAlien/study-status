import styled from "styled-components";
import avtar from "../assets/profile.png";
import { mobile } from "../responsive";

const Container = styled.div`
	width: 90%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 130px;
	margin: 15px 30px;
	padding: 20px;

	border-radius: 10px;
	border: 1px solid rgb(209, 209, 209);

	box-shadow: 3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: -3px 7px 46px -14px rgba(0, 0, 0, 0.75);
	${mobile({
		padding: "10px",
		margin: "10px",
		height: "100px",
	})}
`;
const Avtar = styled.img`
	cursor: pointer;
	width: 90px;
	height: 90px;
	object-fit: contain;
	border-radius: 50%;
	${mobile({ height: "60px", width: "60px" })}
`;
const Left = styled.div`
	/* width: 10%; */
	flex: 2;
`;
const Center = styled.div`
	/* width: 80%; */
	flex: 10;
`;

const Text = styled.p`
	color: white;
	font-size: 22px;
	text-align: center;
	/* font-weight: 300; */
	${mobile({ fontSize: "15px" })}
`;

const Name = styled.span`
	color: white;
	font-weight: bold;
`;
const Status = ({ data }) => {
	return (
		<Container style={{ backgroundColor: data.status ? "green" : "red" }}>
			<Left>
				{data.profilePic ? (
					<Avtar src={data.profilePic} alt="" />
				) : (
					<Avtar src={avtar} alt="" />
				)}
			</Left>
			<Center>
				{data.status ? (
					<Text>
						<Name>{data.username}&nbsp;</Name>
						is now studing
					</Text>
				) : (
					<Text>
						<Name>{data.username}&nbsp;</Name> is not studing
					</Text>
				)}
			</Center>
		</Container>
	);
};

export default Status;
