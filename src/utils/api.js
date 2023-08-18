//api 인스턴스 구현- 로그인모달.js에서 사용
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://www.techconnection.store:8080/api/v1",
});

export default apiInstance;
