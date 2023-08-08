import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpModalState } from "./state";
import "../../styles/LoginPage/SignUpModal.scss";

function SignUpModal() {
  const [showModal, setShowModal] = useRecoilState(signUpModalState);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    verificationCode: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [verificationCodeMatch, setVerificationCodeMatch] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    setPasswordMatch(credentials.password === credentials.passwordConfirm);
  }, [credentials]);

  // 인증번호 일치 여부 확인 (임시로 '1234'라고 가정)
  useEffect(() => {
    setVerificationCodeMatch(credentials.verificationCode === "1234");
  }, [credentials]);

  const handlePhoneVerification = (e) => {
    e.preventDefault();
    // 여기서 전화번호로 인증번호를 보내는 API 호출을 수행합니다.
    console.log("인증번호가 전송되었습니다.");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 회원가입 로직을 여기에 추가하세요.
  };

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-top">
          <button
            className="modal-close-button"
            onClick={() => setShowModal(false)}
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
          <h2>회원가입</h2>
        </div>
        <form className="modal-signup-form" onSubmit={handleSubmit}>
          <input
            type="name"
            name="name"
            placeholder="이름"
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={handleChange}
          />
          {credentials.password && credentials.passwordConfirm ? (
            passwordMatch ? (
              <div style={{ color: "green" }}>✓ 비밀번호가 일치합니다.</div>
            ) : (
              <div style={{ color: "red" }}>
                ✓ 비밀번호가 일치하지 않습니다.
              </div>
            )
          ) : null}

          <div className="phone-verification">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="전화번호"
              onChange={handleChange}
            />
            <button onClick={handlePhoneVerification}>인증번호 받기</button>
          </div>
          <input
            type="text"
            name="verificationCode"
            placeholder="인증번호"
            onChange={handleChange}
          />
          {verificationCodeMatch ? (
            <div style={{ color: "green" }}>인증이 완료되었습니다.</div>
          ) : (
            <div style={{ color: "red" }}>인증번호가 일치하지 않습니다.</div>
          )}
          <button className="signup-btn" type="submit">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
