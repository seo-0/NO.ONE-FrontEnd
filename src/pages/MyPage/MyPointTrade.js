import { useRecoilValue } from "recoil";
import axios from "axios";
import { useState, useEffect } from "react";
import { userState1} from "../../Data/state";
import { userInfoState } from "../../Data/User";
import { Link, useNavigate } from "react-router-dom";
import apiInstance from "../../utils/api";


const MyPointTrade = () => {
    const user = useRecoilValue(userState1); //실제 유저 데이터

    const [pointUsageList, setPointUsageList] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + user.token,
            },
        };
        const fetchPostUsage = async () => {
            try {
                const response = await apiInstance.get(
                    `/point/use`,
                    config
                );
                console.log(response.data); // API 응답 자체를 확인
                setPointUsageList(response.data.result);
            } catch (error) {
                console.error("Error fetching user's posts:", error);
            }
        };

        fetchPostUsage();
    }, [user]);


    return (
        <div className="mypost-container">
            <div className="mypost-top">
                <h1>{user.username}님의 포인트 사용 내역</h1>
            </div>
            <div className="post-items">
                {pointUsageList.map((post) => (
                    <div
                        key={post.id}
                        className="post-item"
                        // onClick={() => goContentEdit(post.contentId)}
                    >
                        <div style={{paddingLeft: '20px'}}>
                            <p>[ {post.price * -1} 포인트 ]  {post.description} </p>
                            {/*<span className="link">*/}
                            {/*    <img src="/icon/arrow-right.svg" alt="arrow" />*/}
                            {/* </span>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default MyPointTrade;