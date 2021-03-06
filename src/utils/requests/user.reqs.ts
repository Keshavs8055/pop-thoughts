import axios from "axios";
import { verify } from "jsonwebtoken";
import { UserReduxAction } from "../../redux/actions.dispatch";
import { loadingDispatch } from "../../redux/loading/loading.config";
import { store } from "../../redux/store";
import { IUserState } from "../../redux/user/user.config";
import { convert } from "../convert";
import { IUserData } from "../interfaces";
import { checkError } from "./errorHandler";

// SET USER
export const setUserStatus = async (token: string | null) => {
  loadingDispatch("START");

  if (!token) {
    loadingDispatch("DISABLE");
    return;
  }
  const decoded:
    | {
        id: string;
        iat: number;
        exp: number;
      }
    | any = await convert(verify)(token, process.env.REACT_APP_JWT_SECRET);

  const userId = decoded.id;
  getUser(userId, token)
    .then((user: IUserState) => {
      UserReduxAction(
        {
          fullName: user.fullName,
          _id: user._id,
          email: user.email,
          exist: true,
        },
        "Login"
      );
      loadingDispatch("DISABLE");
    })
    .catch((e) => {
      loadingDispatch("DISABLE");

      checkError(e);
    });
};

// USER SIGN UP
export const UserSignUp = (signUpData: IUserData) =>
  new Promise((resolve: (val: any) => any, reject) => {
    loadingDispatch("START");
    axios
      .post("/api/users/signup", { ...signUpData })
      .then((res) => {
        const user = res.data.data.user;
        UserReduxAction(
          {
            fullName: user.fullName,
            _id: user._id,
            email: user.email,
            exist: true,
          },
          "Signup"
        );
        resolve(res);
      })
      .catch((err) => {
        checkError(err);
        reject(err);
      });
  });

export const UserLogin = (loginData: IUserData) => {
  axios
    .post("/api/users/login", {
      email: loginData.email,
      password: loginData.password,
    })
    .then((res) => {
      let token = res.data.token;
      setUserStatus(token).then((res) => {
        if (loginData.rememberMe) {
          localStorage.setItem("jwt", token);
        }
      });
    })
    .catch((e) => {
      checkError(e);
    });
};

export const getUser = (id: string, token: string) =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .get(`/api/users/${id}`, {
        headers: {
          Cookie: `jwt=${token};`,
        },
      })
      .then(async (res) => {
        const data = await res;
        resolve(data.data.data);
      })
      .catch((e) => {
        checkError(e);
      });
  });

export const GetUserThoughts = () => {
  loadingDispatch("START");
  const dispatch = store.dispatch;
  const id = store.getState().UserReducer._id;
  axios
    .get(`/api/users/thoughts/${id}`)
    .then((res) => {
      dispatch({
        type: "DISPLAY_USER_THOUGHTS",
        payload: res.data.data.thoughts,
      });
      loadingDispatch("DISABLE");
    })
    .catch((e) => {
      checkError(e);
    });
};

// LOG OUT USER
export const userLogOut = () => {
  const token = localStorage.getItem("jwt");
  const dispatch = store.dispatch;
  dispatch({
    type: "SET_USER",
    payload: {
      _id: "",
      email: "",
      fullName: "",
      exist: false,
    },
  });
  dispatch({
    type: "CLOSE_ALL",
  });
  if (!token) return;
  localStorage.removeItem("jwt");
};

// FORGOT PASSWORD REQUEST
export const forgotPasswordReq = (email: string) =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .post("/api/users/forgotPassword", { email })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        checkError(error);
        reject(error);
      });
  });
//
export const ResetPasswordReq = (token: string, newPwd: string) =>
  new Promise((resolve: (val: any) => any, reject) => {
    loadingDispatch("START");
    axios
      .patch(`/api/users/resetPassword/${token}`, { password: newPwd })
      .then((res) => {
        setUserStatus(res.data.token);
      })
      .catch((e) => {
        checkError(e);
      });
  });
