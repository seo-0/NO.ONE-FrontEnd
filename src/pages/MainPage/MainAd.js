// 메인 페이지 상단에 이벤트 광고 출력하는 컴포넌트
import { useState, useEffect } from "react";
import "../../styles/MainPage/MainAd.scss";

const ads = [
  "https://blog.rocketpunch.com/wp-content/uploads/2020/04/%EA%B8%B0%EC%97%85%EA%B4%91%EA%B3%A0%EB%B0%B0%EB%84%88-scaled.jpg",
  "https://yozm.wishket.com/media/news/1823/%EC%9C%84%EC%8B%9C%EC%BC%93_%EC%A0%84%ED%99%98_%EB%B0%B0%EB%84%88.png",
  "https://blog.rocketpunch.com/wp-content/uploads/2020/04/%EA%B8%B0%EC%97%85%EA%B4%91%EA%B3%A0%EB%B0%B0%EB%84%88-scaled.jpg",
  "https://yozm.wishket.com/media/news/1823/%EC%9C%84%EC%8B%9C%EC%BC%93_%EC%A0%84%ED%99%98_%EB%B0%B0%EB%84%88.png",
  "https://blog.rocketpunch.com/wp-content/uploads/2020/04/%EA%B8%B0%EC%97%85%EA%B4%91%EA%B3%A0%EB%B0%B0%EB%84%88-scaled.jpg",
  "https://yozm.wishket.com/media/news/1823/%EC%9C%84%EC%8B%9C%EC%BC%93_%EC%A0%84%ED%99%98_%EB%B0%B0%EB%84%88.png",
];

const MainAd = () => {
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-ad-container">
      <div className="main-ad-slider">
        {ads.map((ad, index) => (
          <img
            key={index}
            src={ad}
            alt={`Ad ${index + 1}`}
            style={{
              left: `${100 * (index - currentAd)}%`,
            }}
          />
        ))}
      </div>
      <div className="main-ad-dots">
        {ads.map((_, index) => (
          <span
            key={index}
            className={currentAd === index ? "active" : ""}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MainAd;
