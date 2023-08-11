import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/EduContentPage/EduContentPage.scss';

import { useRecoilValue } from 'recoil';
import { educationListState } from '../../Data/EducationContent';

import img1 from '../../Data/EduImg/1.jpeg';
import img2 from '../../Data/EduImg/2.jpeg';
import img3 from '../../Data/EduImg/3.jpeg';
import img4 from '../../Data/EduImg/4.jpeg';

function EducationContentPage() {
    const { id } = useParams();
    const educationList = useRecoilValue(educationListState);
    const images = [img1, img2, img3, img4];

    const content = educationList.find(item => item.id === parseInt(id, 10));
    //api 호출 가능
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

    const imageDescriptions = [
       [ "원하는 주문을 할 매장을 선택해야 합니다.", "아래와 같은 화면에서 배달을 시킬 매장을 선택해주세요!"],  
        ["매장에 존재하는 메뉴의 옵션들을 모두 선택한 뒤, 장바구니 담기를 클릭하세요!"],
        ["원하시는 메뉴가 맞는지 확인하고, 배달 주문하기를 클릭하세요!"],
        ["주문 내역을 확인하였으면 결제 수단을 설정합니다.", "아래 화면에서 결제 수단을 정하고 <결제하기> 버튼을 눌러주세요!"],
    ];
    
    if (!content) {
        return <div>컨텐츠를 읽을 수 없습니다.</div>;
      }

      const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };
    
    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    };
    
    return(
        <div className='edu-container'>
            <h1>[{content.company}]</h1>
            <h3>{content.title}</h3>

            <div className="image-count">
                <span>{currentIndex + 1} / {images.length}</span>
            </div>

        <div className="image-description">
             {imageDescriptions[currentIndex].map((line, idx) => (
            <p key={idx}>{line}</p>
         ))}
        </div>
        
        <div className='edu-img'>

            <button onClick={handlePrev} className="img-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42" fill="none">
                <path d="M0 20.7031C0 32.1366 8.95481 41.4062 20 41.4062C31.0452 41.4062 40 32.1366 40 20.7031C40 9.26963 31.0452 0 20 0C8.95481 0 0 9.26963 0 20.7031ZM20.4471 11.6097C20.5906 11.757 20.7046 11.9321 20.7827 12.125C20.8608 12.3179 20.9014 12.5249 20.9022 12.734C20.903 12.9432 20.864 13.1505 20.7874 13.3441C20.7108 13.5376 20.5981 13.7137 20.4558 13.8621L15.425 19.1106H28.2692C28.6773 19.1106 29.0686 19.2784 29.3571 19.577C29.6456 19.8757 29.8077 20.2808 29.8077 20.7031C29.8077 21.1255 29.6456 21.5306 29.3571 21.8292C29.0686 22.1279 28.6773 22.2957 28.2692 22.2957H15.425L20.4558 27.5441C20.5981 27.6927 20.7107 27.8689 20.7872 28.0626C20.8638 28.2563 20.9027 28.4637 20.9018 28.6729C20.9009 28.8822 20.8602 29.0892 20.782 29.2822C20.7039 29.4751 20.5897 29.6503 20.4462 29.7976C20.3026 29.9449 20.1324 30.0615 19.9453 30.1407C19.7582 30.2199 19.5578 30.2602 19.3557 30.2593C19.1536 30.2584 18.9536 30.2162 18.7671 30.1353C18.5807 30.0544 18.4115 29.9362 18.2692 29.7876L10.6356 21.8249C10.3496 21.5266 10.1892 21.1234 10.1892 20.7031C10.1892 20.2829 10.3496 19.8797 10.6356 19.5814L18.2692 11.6186C18.4116 11.4698 18.5808 11.3515 18.7674 11.2705C18.9539 11.1895 19.1541 11.1474 19.3564 11.1466C19.5587 11.1457 19.7591 11.1862 19.9463 11.2657C20.1335 11.3451 20.3036 11.462 20.4471 11.6097Z" fill="#AAAAAA"/>
                </svg>            
            </button>

            <img 
                src={images[currentIndex]} 
                alt={`이미지 ${currentIndex + 1}`} 
                className="content-image" 
            />

            
            <button onClick={handleNext} className='img-button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42" fill="none">
                <path d="M40 20.7031C40 9.26962 31.0452 0 20 0C8.95481 0 0 9.26962 0 20.7031C0 32.1366 8.95481 41.4062 20 41.4062C31.0452 41.4062 40 32.1366 40 20.7031ZM19.5529 29.7966C19.4094 29.6493 19.2954 29.4742 19.2173 29.2812C19.1392 29.0883 19.0986 28.8814 19.0978 28.6722C19.097 28.463 19.136 28.2557 19.2126 28.0622C19.2892 27.8686 19.4019 27.6926 19.5442 27.5441L24.575 22.2957H11.7308C11.3227 22.2957 10.9314 22.1279 10.6429 21.8292C10.3544 21.5306 10.1923 21.1255 10.1923 20.7031C10.1923 20.2808 10.3544 19.8757 10.6429 19.577C10.9314 19.2784 11.3227 19.1106 11.7308 19.1106H24.575L19.5442 13.8621C19.4019 13.7135 19.2893 13.5373 19.2128 13.3437C19.1362 13.15 19.0973 12.9426 19.0982 12.7333C19.0991 12.5241 19.1398 12.3171 19.218 12.1241C19.2961 11.9311 19.4103 11.756 19.5538 11.6087C19.6974 11.4614 19.8676 11.3448 20.0547 11.2655C20.2418 11.1863 20.4422 11.146 20.6443 11.1469C20.8464 11.1479 21.0464 11.19 21.2329 11.2709C21.4193 11.3519 21.5885 11.47 21.7308 11.6186L29.3644 19.5814C29.6504 19.8797 29.8108 20.2829 29.8108 20.7031C29.8108 21.1234 29.6504 21.5266 29.3644 21.8249L21.7308 29.7876C21.5884 29.9364 21.4192 30.0547 21.2326 30.1357C21.0461 30.2167 20.8459 30.2588 20.6436 30.2597C20.4413 30.2605 20.2409 30.22 20.0537 30.1406C19.8665 30.0611 19.6964 29.9442 19.5529 29.7966Z" fill="#00008B"/>
                </svg>
            </button>

           
        </div>
        </div>

   
    )


}
export default EducationContentPage;



