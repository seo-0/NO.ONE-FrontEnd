import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import categories from "../../Data/Category";
import "../../styles/ContentPage/ContentForm.scss";

const MyPostEdit = () => {
  const [educationContent, setEducationContent] = useState([]);
  const { contentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // 사용자가 작성한 게시글 불러오는 걸로 api 경로 수정
          `http://13.209.49.229:8080/api/v1/content/${contentId}`
        );
        setEducationContent(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contentId]);

  return (
    <div className="content-form-container">
      <h1>등록된 교육 컨텐츠</h1>
      <form>
        <div className="content-basic-info">
          <div className="info">
            <label>
              제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="text" name="title" value={educationContent.title} />
            </label>
            <label>
              교육내용
              <input
                type="text"
                name="description"
                value={educationContent.description}
              />
            </label>
            <label>
              기업명 &nbsp;
              <input
                type="text"
                name="company"
                value={educationContent.companyName}
              />
            </label>
            <label>
              카테고리{" "}
              <select name="category" value={educationContent.category}>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* <div className="company-logo">
            {!selectedImage && (
              <label htmlFor="company-logo">
                <img src="/icon/file.svg" alt="file" />
                <span>기업 이미지 첨부</span>
              </label>
            )}
            <input
              type="file"
              id="company-logo"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {selectedImage && (
              <img src={URL.createObjectURL(selectedImage)} alt="기업 이미지" />
            )}
          </div>
        </div>
        <div className="content-step-info">
          <div className="sub-title">
            <h2>컨텐츠의 내용을 단계별로 작성해주세요.</h2>
            <p>
              단계별 정보 외에 추가적인 정보가 필요하다면 간단한 카테고리를
              넣어주세요.
            </p>
          </div>
          {Array.from({ length: steps }).map((_, index) => (
            <div key={index} className="content-step">
              <h3>Step {index + 1}</h3>
              <div className="content-info">
                <label>
                  <span>내용</span>
                  <input
                    type="text"
                    placeholder={`Step ${index + 1} 내용`}
                    value={steps[index].content}
                    onChange={(e) =>
                      handleStepContentChange(index, "content", e.target.value)
                    }
                  />
                </label>
                <label>
                  <span>첨부 파일</span>
                  <input
                    className="upload-name"
                    value={
                      stepFiles[index] ? stepFiles[index].name : "첨부파일"
                    }
                    placeholder="첨부파일"
                    readOnly
                  />
                  <label htmlFor={`file-${index}`} className="file-choice">
                    파일 선택
                  </label>
                  <input
                    type="file"
                    id={`file-${index}`}
                    className="hidden-input"
                    onChange={(e) =>
                      handleStepFileChange(index, e.target.files[0])
                    }
                  />
                </label>
                <label>
                  <p>
                    추가적으로 교육이 필요한 정보의 간단한 해시태그를
                    입력해주세요. <span>(선택)</span>
                  </p>
                  <div className="hashWraps">
                    <div className="hashWrapOuter">
                      {hashTags[index].length > 0 &&
                        hashTags[index].map((hashTag) => {
                          return (
                            <div key={hashTag} className="hashtag-item">
                              #{hashTag}
                            </div>
                          );
                        })}
                    </div>
                    <input
                      type="text"
                      // value={inputHashTag}
                      value={inputHashTag[index] || ""}
                      onChange={(e) => changeHashTagInput(e, index)}
                      onKeyUp={(e) => addHashTag(e, index)}
                      onKeyDown={keyDownHandler}
                      placeholder="#해시태그를 등록해보세요. (최대 10개)"
                      className="hashTagInput"
                    />
                  </div>
                </label>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddStep}>
            +{" "}
          </button>
        </div>
        <div className="content-deadline">
          <div className="sub-title">
            <h2>마감시간</h2>
            <p>단기성 이벤트인 경우 마감 시간을 설정해주세요</p>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={!isShortEvent}
                onChange={() => setIsShortEvent(false)}
              />
              일반
            </label>
            <label>
              <input
                type="checkbox"
                checked={isShortEvent}
                onChange={() => setIsShortEvent(true)}
              />
              단기성 이벤트
            </label>
            {/* {isShortEvent && <input type="date" name="deadline" />} */}
          {/* {isShortEvent && (
              <div>
                <input
                  type="date"
                  name="deadlineDate"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                />
                <input
                  type="time"
                  name="deadlineTime"
                  value={deadlineTime}
                  onChange={(e) => setDeadlineTime(e.target.value)}
                />
              </div>
            )}
          </div> */}
        </div>
        <div className="content-privacy">
          <p>
            컨텐츠 기능 설명 글 작성시 제공 받는 회원님의 개인 정보에 동의
            여부를 눌러주세요.
          </p>
          <label>
            <input type="checkbox" />
            동의
          </label>
        </div>
        <div className="content-form-bottom">
          <p>
            검토 후 콘텐츠 메인페이지에 등록 시 회원님의{" "}
            <span>포인트 120P</span>가 지급될 예정입니다.
          </p>
          <p>적립된 포인트는 마이페이지에서 확인하세요!</p>
          <button>게시글 삭제</button>
          <button>수정</button>
        </div>
      </form>
    </div>
  );
};

export default MyPostEdit;
