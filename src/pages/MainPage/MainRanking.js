// 메인 페이지에 실시간 인기 순위를 출력하는 컴포넌트
import "../../styles/MainPage/MainRanking.scss";
import MainClock from "./MainClock";

const rankingKeyWords = [
  "토스 송금하기",
  "배달의 민족 어플 다운받아 배달 주문하기",
  "백신 예약",
  "쿠팡 특가 이벤트 구매",
  "스타벅스 사이렌 오더 주문",
  "카카오페이로 정산하기 이용해보기",
  "카카오톡 '망그러진곰' 이모티콘 구매 방법",
  "카카오버스에서 자주 이용하는 버스 추가하는 방법",
  "네이버 블로그 작성",
  "인스타그램 계정 생성",
];

const iconImages = ["ranking-same.svg", "ranking-down.svg", "ranking-up.svg"];

const MainRanking = () => {
  const frontKeyWords = rankingKeyWords.slice(0, 5);
  const backKeyWords = rankingKeyWords.slice(5);

  const getRandomIcon = () => {
    return iconImages[Math.floor(Math.random() * iconImages.length)];
  };
  return (
    <div className="main-ranking-container">
      <div>
        <h1>실시간 인기순위</h1>
        <span>현재 시간 기준 사용자가 가장 많이 조회한 키워드입니다.</span>
      </div>
      <MainClock />
      <div className="ranking-container">
        <ul className="ranking-left">
          {frontKeyWords.map((keyword, index) => (
            <li key={index}>
              <div>
                <p>{index + 1}</p>
                <p>{keyword}</p>
              </div>
              <img
                src={`/icon/${getRandomIcon()}`}
                alt="icon"
                className="ranking-icon"
              />
            </li>
          ))}
        </ul>
        <ul className="ranking-right">
          {backKeyWords.map((keyword, index) => (
            <li key={index}>
              <div>
                <p>{index + 6}</p>
                <p>{keyword}</p>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/icon/${getRandomIcon()}`}
                alt="icon"
                className="ranking-icon"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainRanking;
