// 마이 페이지에서 광고 이벤트 배너 출력하는 컴포넌트
import styled from "styled-components";

const AdContainer = styled.div`
  width: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 140px;
  border-radius: 10px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 40px 0;
`;

const MyPageAd = () => {
  return (
    <AdContainer>
      <Img
        src="https://blog.rocketpunch.com/wp-content/uploads/2020/04/%EA%B8%B0%EC%97%85%EA%B4%91%EA%B3%A0%EB%B0%B0%EB%84%88-scaled.jpg"
        alt="광고"
      />
    </AdContainer>
  );
};

export default MyPageAd;
