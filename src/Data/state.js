// state.js
import { atom } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const signUpModalState = atom({
  key: "signUpModalState",
  default: false,
});

export const userState1 = atom({
  key: "userState1",
  default: {
    isLoggedIn: localStorage.getItem("access_token") !== null, // 토큰이 있다면 로그인 상태로 간주
    token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    username: localStorage.getItem("username"),      // username 가져오기
    email: localStorage.getItem("email"),            // email 가져오기
    userId: localStorage.getItem("userId"),  
  },
});

export const asksState = atom({
  key: "asksState",
  default: [],
});
