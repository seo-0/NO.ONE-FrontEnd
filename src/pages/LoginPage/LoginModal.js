// LoginModal.js
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginModalState, signUpModalState } from './state';
import "../../styles/LoginPage/LoginModal.scss";

function LoginModal() {
  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);
  const [showSignUpModal, setShowSignUpModal] = useRecoilState(signUpModalState);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직을 여기에 추가하세요.
  }

  if (!showLoginModal) {
    return null;
  }

  return (
    <div className="modal">
      <button className="modal-close-button" onClick={() => setShowLoginModal(false)}>닫기</button>
      <h2>로그인 및 회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="이메일" onChange={handleChange} />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
        <button type="submit">계속</button>
        <p>아직 회원이 아니라면? <span onClick={() => { setShowLoginModal(false); setShowSignUpModal(true); }}>회원가입</span></p>
      </form>

      <div className="or-separator">
        <span>또는</span>
      </div>    

      <div className='social-login'>
        <div><button className='social-login naver'>네이버로 로그인</button></div>
        <div><button className="social-login google">구글로 로그인</button></div>
        <div><button className="social-login kakao">카카오로 로그인</button></div>
      </div>
    
    </div>
  );
}

export default LoginModal;
