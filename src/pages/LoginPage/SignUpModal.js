import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { signUpModalState } from "./state";
import "../../styles/LoginPage/SignUpModal.scss";
import axios from "axios";

function SignUpModal() {
  const [showModal, setShowModal] = useRecoilState(signUpModalState);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
    phone: "",
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

  // useEffect(() => {
  //   // Axios를 사용하여 GET 요청 보내기
  //   axios.get('http://13.209.49.229:8080/user/signup')
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);

  //     });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //비밀번호 일치 여부 검사
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } //인증번호 일치 여부 검사(임의)
    if (!verificationCodeMatch) {
      alert("인증번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await axios.post(
        "http://13.209.49.229:8080/user/signup",
        credentials
      );
      // 응답을 처리하는 코드
      console.log("성공적으로 회원가입이 완료되었습니다.:", response.data);
      alert("성공적으로 회원가입이 완료되었습니다.:", response.data);
    } catch (error) {
      if (error.response) {
        // 서버에서 응답을 받았으나, 2xx의 상태 코드를 받지 못한 경우
        alert(
          error.response.data.message ||
            "회원가입에 실패했습니다. 다시 시도하세요."
        );
        console.log(error);
        console.log(credentials);
      } else if (error.request) {
        // 요청을 보냈지만, 응답을 받지 못한 경우
        alert("서버로부터 응답이 없습니다. 다시 시도하세요.");
        console.log(credentials);
        console.error(error);
      } else {
        // 요청 설정 중 오류 발생 혹은 기타 어떠한 이유로 요청이 설정되지 않은 경우
        alert("요청을 보내는 중에 오류가 발생했습니다.");
      }
    }
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
              <div style={{ color: "green", marginBottom: "10px" }}>
                ✓ 비밀번호가 일치합니다.
              </div>
            ) : (
              <div style={{ color: "red", marginBottom: "10px" }}>
                ✓ 비밀번호가 일치하지 않습니다.
              </div>
            )
          ) : null}

          <div className="phone-verification">
            <input
              type="tel"
              name="phone"
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
