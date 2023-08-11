import { useRecoilState } from "recoil";
import { educationListState } from "../../Data/EducationContent";
import { useState, useEffect } from "react";
import "../../styles/MainPage/MainEduList.scss";
import { useNavigate } from "react-router-dom";

const MainEduList = ({ selectedCategory }) => {
  const [educationList] = useRecoilState(educationListState);
  const [selectedEducationList, setSelectedEducationList] =
    useState(educationList);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === "전체보기") {
      setSelectedEducationList(educationList);
    } else {
      const filteredData = educationList.filter(
        (edu) => edu.category === selectedCategory
      );
      setSelectedEducationList(filteredData);
    }
  }, [selectedCategory, educationList]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    const filteredData = educationList.filter(
      (edu) => edu.title.toLowerCase().includes(searchText.toLowerCase()) // 검색어로 필터링
    );
    setSelectedEducationList(filteredData);
  };

  const goEduContent = (contentId) => {
    navigate(`/education-content-page/${contentId}`);
  };

  return (
    <div>
      <div className="main-edu-list-top">
        <p>총 {selectedEducationList.length}건</p>
        <div>
          <form>
            <select>
              <option value="등록순">등록순</option>
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
            </select>
          </form>
          <form onSubmit={searchSubmit}>
            <input
              type="text"
              placeholder="텍스트를 입력하세요."
              onChange={handleSearchChange}
            />
            <button type="submit">
              <img src={"/icon/material-symbols_search.svg"} alt="search" />
            </button>
          </form>
        </div>
      </div>
      <div className="main-edu-list-container">
        {selectedEducationList.map((content) => (
          <div
            className="main-edu-content"
            onClick={() => goEduContent(content.id)}
            key={content.id}
          >
            <img src={content.logo} alt="logo" />
            <p>[ {content.company} ]</p>
            <p>{content.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainEduList;
