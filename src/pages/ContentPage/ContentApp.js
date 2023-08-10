import ContentForm from "./ContentForm";
import styled from "styled-components";

const ContentPageContainer = styled.div`
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

const ContentApp = () => {
  return (
    <ContentPageContainer>
      <Title>교육 컨텐츠 등록하기</Title>
      <SubTitle>
        작성하고자 하는 컨텐츠 내용을 해당 폼에 맞추어 입력해주세요.
      </SubTitle>
      <ContentForm />
    </ContentPageContainer>
  );
};

export default ContentApp;
