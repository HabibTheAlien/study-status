import "./post.css";
import { Link } from "react-router-dom";
import postImg from "../../assets/postImage.jpeg";

export default function Post({ item }) {
	let Img = postImg;
	if (item.photo) {
		Img = item.photo;
	} else {
		Img = postImg;
	}
	return (
		<div className="post">
			<img className="postImg" src={Img} alt="" />
			<Link to={`/post/${item._id}`} className="link">
				<div className="postInfo">
					{/* <div className="postCats">
						{post.categories.map((c) => (
						<span className="postCat"> Habib</span>
						<span className="postCat"> Habib</span>
						<span className="postCat">{c.name} Habib</span>
						 ))}
					</div> */}
					<span className="postTitle">{item.title}</span>
					<hr />
					<span className="postDate">
						{new Date(item.createdAt).toDateString()}
					</span>
				</div>
				<p className="postDesc">{item.desc}</p>
			</Link>
		</div>
	);
}
