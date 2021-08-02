import axios from "axios";
import { verify } from "jsonwebtoken";
import { useDispatch } from "react-redux";
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
      const userId = decoded.id;
      getUser(userId)
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

const getUser = (id: string) =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .get(`/api/users/${id}`)
      .then(async (res) => {
        const data = await res;

        resolve(data.data.data);
      })
      .catch((e) => reject(e));
  });

export const GetUserThoughts = () => {
  loadingDispatch("START");
  const dispatch = useDispatch();
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
