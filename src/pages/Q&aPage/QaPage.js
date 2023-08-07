//임시로 작성한 것!!!! 수정 예정

import React, { useState } from "react";

function QaPage() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({title: "", content: ""});

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPosts([newPost, ...posts]);
        setNewPost({title: "", content: ""});
    }

    return (
        <div>
            <h1>문의글 작성</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                    <input type="text" name="title" value={newPost.title} onChange={handleChange} />
                </label>
                <label>
                    내용:
                    <textarea name="content" value={newPost.content} onChange={handleChange} />
                </label>
                <button type="submit">작성하기</button>
            </form>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QaPage;
