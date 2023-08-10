import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import "../styles/components/Header.scss";
import { useSetRecoilState } from "recoil";
import { loginModalState } from "../pages/LoginPage/state";

const StyledLink = styled(Link)`
  text-decoration-line: none;
  color: #000000;
`;

const Header = () => {
  const location = useLocation();
  const showInputBox = location.pathname !== "/";
  const setLoginModalShow = useSetRecoilState(loginModalState);

  const [searchKeyword, SetSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchBoxChange = (e) => {
    SetSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-menu">
        <div className="header-menu-top">
          <h1 onClick={goHome}>NO:ONE</h1>
          {showInputBox && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="도움이 필요하면 무엇이든 검색하세요!"
                onChange={handleSearchBoxChange}
              />
              <button type="submit">
                <img
                  src={
                    process.env.PUBLIC_URL + "/icon/material-symbols_search.svg"
                  }
                  alt="search"
                />
              </button>
            </form>
          )}
        </div>
        <div className="header-menu-bottom">
          <ul>
            <li>전체보기</li>
            <li>
              <StyledLink to="/QaPage">문의글 작성</StyledLink>
            </li>
            <StyledLink to="create-content">
              <li>컨텐츠 작성</li>
            </StyledLink>
            <li>포인트</li>
          </ul>
          <ul>
            <StyledLink to="/mypage">
              <li>사용자님</li> {/* 로그인 api 연동시 삭제 예정 */}
            </StyledLink>
            <li onClick={() => setLoginModalShow(true)}>로그인</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
