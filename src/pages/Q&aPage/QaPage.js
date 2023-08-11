import React, { useState } from "react";
import "../../styles/Q&aPage/QaPage.scss";
import "../MyPage/MyAsk.js";
import MyAsk from "../MyPage/MyAsk.js";
function QaPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    password: "",
  });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([newPost, ...posts]);
    setNewPost({ title: "", content: "", password: "" });
  };

  return (
    <div className="qa-page-container">
      <h1>문의글 남기기</h1>
      <div className="qanda-container">
        <form onSubmit={handleSubmit}>
          <label>
            <span>
              제목
              <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
              />
            </span>
          </label>
          <br></br>
          <label>
            <span>
              1. 해당 서비스 사용 시 어떤 어려움을 느끼셨는 지 아래에 간략히
              입력해주세요.
            </span>{" "}
            <br></br>
            <textarea
              name="content"
              id="content"
              value={newPost.content}
              onChange={handleChange}
            />
          </label>
          <br></br>

          <label className="qa">
            <span>
              2. 문의글 작성 시 제공되는 회원님의 개인정보 동의여부를
              눌러주세요.
            </span>
            <div>
              <input type="checkbox" id="agree" name="agree" />
              동의
            </div>
          </label>
          <br></br>
          <label className="qa">
            <span>3. 문의글 수정 및 확인을 위해 비밀번호를 입력해주세요.</span>
            <input
              type="password"
              id="pwd"
              name="password"
              value={newPost.password}
              onChange={handleChange}
            />
          </label>
          <br></br>

          <h5>
            해당 문의글은 NO:ONE이 검토 후 빠르게 안내드릴 수 있도록 할게요!
          </h5>
          <div>
            <button type="submit">작성 완료</button>
            <br></br>
          </div>
        </form>
      </div>

      <div className="myask">
        <MyAsk />
      </div>
    </div>
  );
}

export default QaPage;
