import { useContext, useEffect, useState } from "react";
import "./postEdit.css";
import { useLocation } from "react-router";
import axios from "axios";
import postImg from "../../assets/postImage.jpeg";
import { Context } from "../../contextApi/context";
import { baseURL } from "../../App";

export default function PostEdit() {
	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const [post, setPost] = useState({});
	var [title, setTitle] = useState("");
	var [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const [picURL, setPicURL] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const { user } = useContext(Context);
	console.log(title);

	useEffect(() => {
		const getPost = async () => {
			const res = await axios.get(`${baseURL}/posts/${path}`);
			setPost(res.data);
		};
		getPost();
	}, [path]);

	useEffect(() => {
		if (file) {
			const handlePic = async () => {
				setIsLoading(true);
				const data = new FormData();
				data.append("file", file);
				data.append("upload_preset", "auth-image");
				data.append("cloude_name", "djfnygr4y");
				try {
					const res = await axios.post(
						"https://api.cloudinary.com/v1_1/djfnygr4y/image/upload",
						data
					);
					setPicURL(res.data.url);
					setIsLoading(false);
				} catch (error) {
					console.log(error);
				}
			};
			handlePic();
		}
	}, [file]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsFetching(true);
		const updatedPost = {
			userId: user._id,
			title,
			desc,
			photo: picURL,
		};
		try {
			const res = await axios.put(
				`${baseURL}/posts/${path}`,
				updatedPost
			);
			setIsFetching(false);
			res && window.location.replace("/");
		} catch (err) {
			console.log(err);
		}
	};

	let Img = postImg;
	if (file) {
		Img = URL.createObjectURL(file);
	} else if (post.photo) {
		Img = post.photo;
	} else {
		Img = postImg;
	}
	return (
		<div className="postEdit">
			<img className="postEditImg" src={Img} alt="" />
			<form className="postEditForm" onSubmit={handleSubmit}>
				<div className="postEditFormGroup">
					<label htmlFor="fileInput">
						{isLoading ? (
							<i className="fas fa-spinner fa-pulse" />
						) : (
							<span className="postEditIconDiv ">
								<i className="postEditIcon fas fa-plus"></i>
								Change Picture
							</span>
						)}
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Title"
						className="postEditInput"
						value={title}
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="postEditFormGroup">
					<textarea
						placeholder="Tell your story..."
						type="text"
						value={desc}
						className="postEditInput postEditText"
						onChange={(e) => setDesc(e.target.value)}></textarea>
				</div>

				{isFetching ? (
					<i className="fas fa-spinner fa-pulse" />
				) : (
					<button className="postEditSubmit" type="submit">
						Update
					</button>
				)}
			</form>
		</div>
	);
}
