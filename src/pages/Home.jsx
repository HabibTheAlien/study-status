import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { baseURL } from "../App";
import Post from "../components/post/Post";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 15px;
`;

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getAllPosts = async () => {
			try {
				const res = await axios.get(`${baseURL}/posts`);
				setPosts(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getAllPosts();
	}, []);

	return (
		<Container className="home">
			{posts.map((item) => (
				<Post key={item._id} item={item} />
			))}
		</Container>
	);
}
