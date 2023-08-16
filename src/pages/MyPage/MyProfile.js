// 나의 프로필
import { useRecoilValue } from "recoil";
import { userInfoState, postsState, asksState } from "../../Data/User";
import "../../styles/MyPage/MyProfile.scss";
import { userState1 } from "../../pages/LoginPage/state";

const MyProfile = () => {
  const user = useRecoilValue(userState1); //실제 유저 데이터

  const userInfo = useRecoilValue(userInfoState); //임시 데이터
  const posts = useRecoilValue(postsState);
  const asks = useRecoilValue(asksState);

  return (
    <div className="profile-container">
      <div className="profile-top">
        <img src="/icon/user.svg" alt="user" />
        <div className="profile-top-info">
          <h1>{user.username}님</h1>
          <div className="profile-top-info-email">
            <img src="/icon/email.svg" alt="email-icon" />
            <p>{user.email}</p>
          </div>
          <div className="profile-top-info-point">
            <img src="/icon/point.svg" alt="point-icon" />
            <p>{userInfo.points}P</p>
            <div className="point-usage">
              <p>포인트 사용내역</p>
              <img src="/icon/arrow-grey.svg" alt="arrow" />
            </div>
          </div>
        </div>
      </div>
      <p className="profile-bottom">
        작성한 게시글 <span>{posts.length}</span>
      </p>
      <p className="profile-bottom">
        작성한 문의글 <span>{asks.length}</span>
      </p>
      <p className="profile-bottom">
        스크랩 <span>24</span>
      </p>
    </div>
  );
};

export default MyProfile;
