import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { signUpModalState } from './state';
import "../../styles/LoginPage/SignUpModal.scss"; 

function SignUpModal() {
  const [showModal, setShowModal] = useRecoilState(signUpModalState);
  const [credentials, setCredentials] = useState({ email: '', password: '', passwordConfirm: '', phoneNumber: '', verificationCode: '' });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [verificationCodeMatch, setVerificationCodeMatch] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // 비밀번호 일치 여부 확인
  useEffect(() => {
    setPasswordMatch(credentials.password === credentials.passwordConfirm);
  }, [credentials]);

  // 인증번호 일치 여부 확인 (임시로 '1234'라고 가정)
  useEffect(() => {
    setVerificationCodeMatch(credentials.verificationCode === '1234');
  }, [credentials]);

  const handlePhoneVerification = (e) => {
    e.preventDefault();
    // 여기서 전화번호로 인증번호를 보내는 API 호출을 수행합니다.
    console.log('인증번호가 전송되었습니다.');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 회원가입 로직을 여기에 추가하세요.
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
    <button className="modal-close-button" onClick={() => setShowModal(false)}>닫기</button>
    <h2>회원가입</h2>
    <form onSubmit={handleSubmit}>
      <input type="name" name="name" placeholder="이름" onChange={handleChange} />
      <input type="email" name="email" placeholder="이메일" onChange={handleChange} />
      <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
      <input type="password" name="passwordConfirm" placeholder="비밀번호 확인" onChange={handleChange} />
      {credentials.password && credentials.passwordConfirm ? (passwordMatch ? <div style={{color: 'green'}}>✓ 비밀번호가 일치합니다.</div> : <div style={{color: 'red'}}>✓ 비밀번호가 일치하지 않습니다.</div>) : null}

      <div className="phone-verification">
        <input type="tel" name="phoneNumber" placeholder="전화번호" onChange={handleChange} />
        <button onClick={handlePhoneVerification}>인증번호 받기</button>
      </div>
      <input type="text" name="verificationCode" placeholder="인증번호" onChange={handleChange} />

      {verificationCodeMatch ? <div style={{color: 'green'}}>인증이 완료되었습니다.</div> : <div style={{color: 'red'}}>인증번호가 일치하지 않습니다.</div>}
      <button type="submit">회원가입</button>


    </form>
  </div>
  
  );
}

export default SignUpModal;
