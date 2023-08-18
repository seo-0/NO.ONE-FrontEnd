import QaPage from "./QaPage";
import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState1, loginModalState } from "../../Data/state";

const QaPageContainer = styled.div`
  width: 100%;
  max-width: 1064px;
  padding: 20px 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 20px 0 0 0;
`;

const SubTitle = styled.p`
  color: #898989;
  font-size: 16px;
  margin: 10px 0 40px 0;
`;

const QaApp = () => {
  const user = useRecoilValue(userState1); // Recoil로부터 user 값을 가져옴// user 객체에서 token 값을 가져옴
  const [showLoginModal, setShowLoginModal] = useRecoilState(loginModalState);

  useEffect(() => {
    if (!user.token) {
      // token이 없으면 로그인 상태가 아닌 것으로 판단
      alert("로그인이 필요한 서비스입니다. 로그인 후 다시 시도하세요. "); // 사용자에게 알림
      // 로그인 페이지로 리다이렉션 (예: /login이 로그인 페이지라고 가정)
      setShowLoginModal(true);
    }
  }, []);

  return (
    <QaPageContainer>
      <Title>문의글 등록하기</Title>
      <SubTitle>
        작성하고자 하는 문의글을 해당 폼에 맞추어 입력해주세요.
      </SubTitle>
      <QaPage />
    </QaPageContainer>
  );
};

export default QaApp;
