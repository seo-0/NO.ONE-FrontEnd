import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  loginModalState,
  signUpModalState,
  userState1,
} from "../../Data/state";
import "../../styles/LoginPage/LoginModal.scss";
import apiInstance from "../../utils/api"; // 위에서 생성한 axios 인스턴스 가져오기

function LoginModal() {
  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);
  const [showSignUpModal, setShowSignUpModal] =
    useRecoilState(signUpModalState);

  const [user, setUser] = useRecoilState(userState1);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    
    if (user.access_token) {
      setUser({
        isLoggedIn: true,
        token: user.access_token,
        refresh_token: user.refresh_token,
      });
      // 인스턴스에 토큰을 기본 헤더로 설정
      apiInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${user.access_token}`;
    }
  }, []);

  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiInstance.post("/user/login", credentials);
      
      setUser({
        isLoggedIn: true,
        token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        username: response.data.name,
        email: response.data.email,
        userId: response.data.userId,
      });

      // 토큰들을 localStorage에 저장
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("username", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("userId", response.data.userId.toString()); // userId가 숫자라면 toString()으로 문자열로 변환
      
      
      alert("성공적으로 로그인이 완료되었습니다.");

      setShowLoginModal(false);
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message || "로그인에 실패했습니다. 다시 시도하세요."
        );
      } else if (error.request) {
        alert("서버로부터 응답이 없습니다. 다시 시도하세요.");
      } else {
        alert("요청을 보내는 중에 오류가 발생했습니다.");
      }
    }
  };

  if (!showLoginModal) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-top">
          <button
            className="modal-close-button"
            onClick={() => setShowLoginModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 51 51"
              fill="none"
            >
              <path
                d="M25.5 3.1875C13.0687 3.1875 3.1875 13.0687 3.1875 25.5C3.1875 37.9313 13.0687 47.8125 25.5 47.8125C37.9313 47.8125 47.8125 37.9313 47.8125 25.5C47.8125 13.0687 37.9313 3.1875 25.5 3.1875ZM25.5 44.625C14.9812 44.625 6.375 36.0187 6.375 25.5C6.375 14.9812 14.9812 6.375 25.5 6.375C36.0187 6.375 44.625 14.9812 44.625 25.5C44.625 36.0187 36.0187 44.625 25.5 44.625Z"
                fill="#D0D0D0"
              />
              <path
                d="M34.1062 36.6562L25.5 28.05L16.8938 36.6562L14.3438 34.1062L22.95 25.5L14.3438 16.8938L16.8938 14.3438L25.5 22.95L34.1062 14.3438L36.6562 16.8938L28.05 25.5L36.6562 34.1062L34.1062 36.6562Z"
                fill="#D0D0D0"
              />
            </svg>
          </button>
          <h2>로그인 및 회원가입</h2>
        </div>
        <form className="modal-login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <button type="submit">계속</button>
          <p>
            아직 회원이 아니라면?{" "}
            <span
              onClick={() => {
                setShowLoginModal(false);
                setShowSignUpModal(true);
              }}
            >
              회원가입
            </span>
          </p>
        </form>

        <div className="or-separator">
          <span>또는</span>
        </div>

        <div className="social-login">
          <div>
            <button className="social-login naver">네이버로 로그인</button>
          </div>
          <div>
            <button className="social-login google">구글로 로그인</button>
          </div>
          <div>
            <button className="social-login kakao">카카오로 로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
