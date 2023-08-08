// 마이 페이지의 메뉴바
import { Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import "../../styles/MyPage/MyPageMenu.scss";

const StyledLink = styled(Link)`
  text-decoration-line: none;
`;

const MyPageMenu = () => {
  return (
    <div className="mypage-container">
      <div className="mypage-menubar">
        <h1>장현정님 안녕하세요!</h1>
        <ul className="mypage-menu-top">
          <StyledLink to="">
            <li>전체보기</li>
          </StyledLink>
          <li className="mypage-menu-title">
            <p>내정보</p>
            <ul>
              <StyledLink to="profile">
                <li>프로필</li>
              </StyledLink>
              <li>포인트 사용내역</li>
              <li>개인 정보 수정</li>
            </ul>
          </li>
          <li className="mypage-menu-title">
            <p>게시글 관리</p>
            <ul>
              <StyledLink to="post">
                <li>작성한 게시글</li>
              </StyledLink>
              <StyledLink to="ask">
                <li>작성한 문의글</li>
              </StyledLink>
            </ul>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageMenu;
