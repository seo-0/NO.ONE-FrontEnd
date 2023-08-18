import React, { useState, useEffect } from "react";
import "../../styles/QaPage/QaPage.scss";
import "../MyPage/MyAsk.js";
import QaAll from "./QaAll";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState1, loginModalState } from "../../Data/state";

function QaPage() {
  const user = useRecoilValue(userState1); // Recoil로부터 user 값을 가져옴
  const token = user.token; // user 객체에서 token 값을 가져옴
  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
  });


  useEffect(() => {
    if (!user.token) {
      // token이 없으면 로그인 상태가 아닌 것으로 판단
      alert("로그인이 필요한 서비스입니다. 로그인 후 다시 시도하세요. "); // 사용자에게 알림
      // 로그인 페이지로 리다이렉션 (예: /login이 로그인 페이지라고 가정)
      setShowLoginModal(true);
    }
  }, []);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      // axios 요청 설정을 정의
      headers: {
        Authorization: "Bearer " + token, // 토큰을 헤더에 첨부
      },
    };
    console.log(config);
    try {
      const response = await axios.post(
        "https://www.techconnection.store:8080/api/v1/inquiry",
        {
          title: newPost.title,
          description: newPost.description,
        },
        config
      ); //config를 axios 요청에 추가

      if (response.status >= 200 && response.status < 300) {
        alert("문의글이 성공적으로 등록되었습니다.");
        // console.log(response);
      } else {
        alert("문의글 등록에 실패했습니다. 다시 시도해주세요.");
      }
      setPosts([newPost, ...posts]);
      setNewPost({ title: "", description: "" });
    } catch (error) {
      alert("문의글 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error(error);
    }
  };
  
  const isLoggedIn = user && user.userId; // userId 값이 있는지 확인
  if (!isLoggedIn) {
    
    return (
      <div className="warning-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M60.831 9.7499C63.0754 7.50633 66.1191 6.24624 69.2926 6.24683C72.4661 6.24741 75.5093 7.50863 77.7529 9.75302C79.9965 11.9974 81.2565 15.0411 81.256 18.2146C81.2554 21.3881 79.9942 24.4313 77.7498 26.6749L73.1748 31.2499L56.2498 14.3311L60.831 9.75615V9.7499ZM51.831 18.7499L14.6123 55.9686C13.4822 57.0992 12.6306 58.4772 12.1248 59.9937L6.41226 77.1374C6.2282 77.6879 6.20109 78.2787 6.33396 78.8437C6.46682 79.4087 6.75442 79.9256 7.16452 80.3363C7.57462 80.7471 8.09101 81.0355 8.65581 81.1693C9.22061 81.303 9.81151 81.2768 10.3623 81.0937L27.506 75.3749C29.0248 74.8749 30.3998 74.0186 31.531 72.8874L31.9373 72.4874C30.9414 67.5984 31.0219 62.5511 32.1729 57.6963C33.324 52.8414 35.5181 48.2954 38.6029 44.3738C41.6877 40.4523 45.5892 37.2493 50.0364 34.9872C54.4836 32.7252 59.37 31.4585 64.356 31.2749L51.831 18.7499ZM37.4998 65.6249C37.4998 69.3183 38.2272 72.9756 39.6407 76.3879C41.0541 79.8002 43.1257 82.9006 45.7374 85.5123C48.349 88.1239 51.4495 90.1956 54.8618 91.609C58.2741 93.0224 61.9313 93.7499 65.6248 93.7499C69.3182 93.7499 72.9755 93.0224 76.3877 91.609C79.8 90.1956 82.9005 88.1239 85.5121 85.5123C88.1238 82.9006 90.1955 79.8002 91.6089 76.3879C93.0223 72.9756 93.7498 69.3183 93.7498 65.6249C93.7498 58.1657 90.7866 51.012 85.5121 45.7375C80.2377 40.4631 73.084 37.4999 65.6248 37.4999C58.1655 37.4999 51.0118 40.4631 45.7374 45.7375C40.4629 51.012 37.4998 58.1657 37.4998 65.6249ZM43.7498 65.6249C43.7498 61.5651 44.8795 57.5854 47.0127 54.1312C49.1458 50.6769 52.1981 47.8845 55.828 46.0663C59.4579 44.2481 63.5221 43.4759 67.5659 43.8362C71.6097 44.1964 75.4734 45.6749 78.7248 48.1061L48.0998 78.7312C45.2662 74.9501 43.7394 70.3499 43.7498 65.6249ZM65.6248 87.4999C60.7123 87.4999 56.1748 85.8749 52.5248 83.1437L83.1498 52.5186C85.5831 55.7704 87.0632 59.6353 87.4241 63.6806C87.7851 67.7259 87.0128 71.7919 85.1936 75.4231C83.3745 79.0543 80.5803 82.1073 77.1241 84.2403C73.6679 86.3733 69.6861 87.5019 65.6248 87.4999Z"
            fill="#F24E1E"
          />
        </svg>
        <h1 className="warning-message">로그인 후 이용 가능합니다.</h1>
      </div>
    );
  }

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
              name="description"
              id="description"
              value={newPost.description}
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
        <QaAll />
      </div>
    </div>
  );
}

export default QaPage;
