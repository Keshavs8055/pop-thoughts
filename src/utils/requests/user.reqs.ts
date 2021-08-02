import axios from "axios";
import { verify } from "jsonwebtoken";
import { UserReduxAction } from "../../redux/actions.dispatch";
import { loadingDispatch } from "../../redux/loading/loading.config";
import { store } from "../../redux/store";
import { IUserState } from "../../redux/user/user.config";
import { IUserData } from "../interfaces";
import { RequestErrorHandler } from "./errorHandler";

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
        console.log("ERR", { err });
        RequestErrorHandler(err.response.data.message);
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
      const decoded: any = verify(
        res.data.token,
        process.env.REACT_APP_JWT_SECRET as string
      );
      if (loginData.rememberMe) {
        localStorage.setItem("jwt", res.data.token);
      }
      const userId = decoded.id;
      getUser(userId, res.data.token)
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
        })
        .catch((e) => {
          console.log(e);
          RequestErrorHandler(e.response.data.message);
        });
    })
    .catch((e) => {
      console.log(e);

      RequestErrorHandler(e.response.data.message);
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
      .catch((e) => reject(e));
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
    .catch((e) => console.log(e));
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
