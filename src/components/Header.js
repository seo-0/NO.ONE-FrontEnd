import { Outlet, useLocation } from 'react-router-dom';
import "../styles/components/Header.scss";

const Header = () => {
    const location = useLocation();
  const showInputBox = location.pathname !== "/";

    return(
        <div className="header">
            <div className="header-menu">
                <div className="header-menu-top">
                    <h1>NO:ONE</h1>
                    {showInputBox && (
                        <form>
                    <input type="text" placeholder="도움이 필요하면 무엇이든 검색하세요!" />
                    <button type="submit">
                        <img src={process.env.PUBLIC_URL + "/icon/material-symbols_search.svg"}alt="search" />
                    </button>
                    </form>
                    )}
                </div>
                <div className="header-menu-bottom">
                    <ul>
                        <li>전체보기</li>
                        <li>문의글 작성</li>
                        <li>컨텐츠 작성</li>
                        <li>포인트</li>
                    </ul>
                    <ul>
                        <li>사용자님</li> {/* 로그인 api 연동시 삭제 예정 */}
                        <li>로그인</li>
                    </ul>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Header;