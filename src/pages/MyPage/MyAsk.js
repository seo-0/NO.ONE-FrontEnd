// 내가 작성한 문의글 보기
import { useRecoilValue } from "recoil";
import { asksState } from "../../Data/User";
import { useState } from "react";
import "../../styles/MyPage/MyAsk.scss";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>진행 상황</th>
      </tr>
    </thead>
  );
};

const TableRow = ({ id, title, content, status }) => {
  const statusColor = status === "진행 중" ? "#F24E1E" : "#699BF7";
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td style={{ color: statusColor }}>{status}</td>
    </tr>
  );
};

const MyAsk = () => {
  const asks = useRecoilValue(asksState);
  const [showAll, setShowAll] = useState(false);
  const displayedAsks = showAll ? asks : asks.slice(0, 5);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="myask-container">
      <h1>작성한 문의글</h1>
      <table>
        <TableHeader />
        <tbody>
          {displayedAsks.map((ask) => (
            <TableRow
              key={ask.id}
              id={ask.id}
              title={ask.title}
              content={ask.content}
              status={ask.status}
            />
          ))}
        </tbody>
      </table>
      {asks.length > 5 && (
        <button onClick={handleToggleShowAll}>
          {showAll ? "간략히 보기" : "전체보기"}
        </button>
      )}
    </div>
  );
};

export default MyAsk;
