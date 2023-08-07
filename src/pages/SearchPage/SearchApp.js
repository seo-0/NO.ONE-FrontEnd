import { useRecoilState } from "recoil";
import { educationListState } from "../../Data/EducationContent";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/SearchPage/SearchApp.scss";

const SearchApp = () => {
  const [educationList] = useRecoilState(educationListState);
  const [selectedEducationList, setSelectedEducationList] =
    useState(educationList);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("q");

  useEffect(() => {
    if (searchKeyword && searchKeyword.trim() !== "") {
      const filteredData = educationList.filter(
        (edu) =>
          edu.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          edu.company.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setSelectedEducationList(filteredData);
    } else {
      setSelectedEducationList(educationList);
    }
  }, [searchKeyword, educationList]);

  // 마감 시간이 있는 컨텐츠를 가장 먼저 출력하기 위해 정렬
  useEffect(() => {
    setSelectedEducationList((prevList) => {
      const shortTermEvents = prevList.filter((item) => !!item.deadline);
      const longTermEvents = prevList.filter((item) => !item.deadline);
      return [...shortTermEvents, ...longTermEvents];
    });
  }, []);

  // 마감 시간까지 남은 시간을 계산하는 함수
  const getTimeRemaining = (deadline) => {
    const timeLeft = new Date(deadline) - new Date();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    return { days, hours };
  };

  return (
    <div className="search-page-container">
      <div className="search-info">
        <p>검색 결과 약 {selectedEducationList.length}개</p>
        <div>
          <h1>" {searchKeyword} " 검색 결과</h1>
          <form>
            <select>
              <option value="관련도 높은순">관련도 높은순</option>
              <option value="조회수 높은순">조회수 높은순</option>
            </select>
          </form>
        </div>
      </div>
      <div className="search-items">
        {selectedEducationList.map((content) => (
          <div
            key={content.id}
            className={`search-edu-content ${
              !!content.deadline ? "event" : ""
            }`}
          >
            <img src={content.logo} alt="logo" />
            <div>
              {!!content.deadline && <span className="event">단기 이벤트</span>}
              <p className="content-company">[ {content.company} ]</p>
              <p className="content-title">{content.title}</p>
              {!!content.deadline && (
                <span className="content-time">
                  마감까지 약 {getTimeRemaining(content.deadline).days}일{" "}
                  {getTimeRemaining(content.deadline).hours}시간 남음
                </span>
              )}
              <span className="content-link">
                바로가기
                <img src="icon/arrow-right.svg" alt="arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchApp;
