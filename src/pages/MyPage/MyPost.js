// 내가 작성한 게시글
import { useRecoilValue } from "recoil";
import { postsState } from "../../Data/User";
import "../../styles/MyPage/MyPost.scss";

const MyPost = () => {
  const posts = useRecoilValue(postsState);

  return (
    <div className="mypost-container">
      <div className="mypost-top">
        <h1>작성한 게시글</h1>
        <button>게시글 작성하기</button>
      </div>
      <div className="post-items">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <img className="logo" src={post.logo} alt="logo" />
            <div>
              <p>[ {post.company} ]</p>
              <p>{post.title}</p>
              <span className="link">
                바로가기
                <img src="/icon/arrow-right.svg" alt="arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
