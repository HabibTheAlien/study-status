import React, { useState } from "react";

const Test = () => {
	const [image, setImage] = useState(null);

	const handleImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				setImage(e.target.result);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};

	const handleImageRemove = () => {
		setImage(null);
	};

	return (
		<div>
			{!image ? (
				<div>
					<label htmlFor="upload-image">
						<i className="fas fa-camera"></i>
						<span>Upload a photo</span>
					</label>
					<input
						type="file"
						id="upload-image"
						accept=".jpg, .jpeg, .png"
						onChange={handleImageChange}
					/>
				</div>
			) : (
				<div>
					<img src={image} alt="uploaded" />
					<button onClick={handleImageRemove}>Remove</button>
				</div>
			)}
		</div>
	);
};

export default Test;
