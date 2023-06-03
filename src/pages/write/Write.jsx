import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import postImg from "../../assets/postImage.jpeg";
import { Context } from "../../contextApi/context";
import { baseURL } from "../../App";

export default function Write() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState(null);
	const [picURL, setPicURL] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const { user } = useContext(Context);

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

	console.log(picURL);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsFetching(true);
		const newPost = {
			userId: user._id,
			username: user.username,
			title,
			desc,
			photo: picURL,
		};
		try {
			const res = await axios.post(`${baseURL}/posts`, newPost);
			setIsFetching(false);
			res && window.location.replace("/");
		} catch (err) {
			console.log(err);
		}
	};

	let Img = postImg;
	if (file) {
		Img = URL.createObjectURL(file);
	} else {
		Img = postImg;
	}
	return (
		<div className="write">
			<img className="writeImg" src={Img} alt="" />
			<form className="writeForm">
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						{isLoading ? (
							<i className="fas fa-spinner fa-pulse" />
						) : (
							<span className="writeIconDiv ">
								<i className="writeIcon fas fa-plus"></i>
								Add Picture
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
						className="writeInput"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						placeholder="Tell your story..."
						type="text"
						className="writeInput writeText"
						onChange={(e) => setDesc(e.target.value)}></textarea>
				</div>

				{isFetching ? (
					<i className="fas fa-spinner fa-pulse" />
				) : (
					<button className="writeSubmit" onClick={handleSubmit}>
						Publish
					</button>
				)}
			</form>
		</div>
	);
}
