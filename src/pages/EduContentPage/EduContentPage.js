import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/EduContentPage/EduContentPage.scss";

import { useRecoilValue } from "recoil";
import { educationListState } from "../../Data/EducationContent";

import img1 from "../../Data/EduImg/1.jpeg";
import img2 from "../../Data/EduImg/2.jpeg";
import img3 from "../../Data/EduImg/3.jpeg";
import img4 from "../../Data/EduImg/4.jpeg";

function EducationContentPage() {
  const { id } = useParams();
  const educationList = useRecoilValue(educationListState);
  const images = [img1, img2, img3, img4];

  const content = educationList.find((item) => item.id === parseInt(id, 10));
  //api 호출 가능
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

  const imageDescriptions = [
    [
      "원하는 주문을 할 매장을 선택해야 합니다.",
      "아래와 같은 화면에서 배달을 시킬 매장을 선택해주세요!",
    ],
    [
      "매장에 존재하는 메뉴의 옵션들을 모두 선택한 뒤, 장바구니 담기를 클릭하세요!",
    ],
    ["원하시는 메뉴가 맞는지 확인하고, 배달 주문하기를 클릭하세요!"],
    [
      "주문 내역을 확인하였으면 결제 수단을 설정합니다.",
      "아래 화면에서 결제 수단을 정하고 <결제하기> 버튼을 눌러주세요!",
    ],
  ];

  if (!content) {
    return <div>컨텐츠를 읽을 수 없습니다.</div>;
  }

  const prevButtonIcon =
    currentIndex === 0 ? "before.svg" : "before-active.svg";
  const nextButtonIcon =
    currentIndex === images.length - 1 ? "next.svg" : "next-active.svg";

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="edu-container">
      <h1>[{content.company}]</h1>
      <h3>{content.title}</h3>
      <div className="image-count">
        <span>
          {currentIndex + 1} / {images.length}
        </span>
      </div>
      <div className="edu-contents">
        <button
          onClick={currentIndex === 0 ? null : handlePrev}
          className="img-button"
          disabled={currentIndex === 0}
        >
          <img src={`/icon/${prevButtonIcon}`} alt="previous" />
        </button>
        <div className="edu-img">
          <div className="image-description">
            {imageDescriptions[currentIndex].map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
          <img
            src={images[currentIndex]}
            alt={`이미지 ${currentIndex + 1}`}
            className="content-image"
          />
        </div>
        <button
          onClick={currentIndex === images.length - 1 ? null : handleNext}
          className="img-button"
          disabled={currentIndex === images.length - 1}
        >
          <img src={`/icon/${nextButtonIcon}`} alt="next" />
        </button>
      </div>
    </div>
  );
}
export default EducationContentPage;
