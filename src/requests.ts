import axios from "axios";
import { store } from "./redux/store";
import { verify } from "jsonwebtoken";
import { IUserState } from "./redux/user/user.config";

const { dispatch } = store;

export const RequestErrorHandler = (msg: string) => {
  dispatch({
    type: "SET_NEW_ALERT",
    payload: {
      message: msg,
      display: true,
      type: 0,
    },
  });
  dispatch({
    type: "DISABLE_LOADING",
  });
};

export const getAllThoughts = (type: "data" | "response") =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .get("/api/thoughts?sort=-likes")
      .then((res) => {
        switch (type) {
          case "data":
            resolve(res.data.data);
            break;
          case "response":
            resolve(res);
            break;
        }
      })
      .catch((err) => reject);
  });
// GET THOUGHTS BY PAGE
export const getThoughtsNextPage = (currentPage: number, limit: number) =>
  new Promise((resolve, reject) => {
    const nextPage = currentPage + 1;
    console.log("NEXT PAGE", nextPage);
    console.log("LIMIT", limit);
    let cancel;
    axios
      .get(`/api/thoughts?limit=${limit}&page=${nextPage}`, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        dispatch({
          type: "SET_LOADING",
        });
        return res;
      })
      .then((res) => {
        if (res.data.data.length === 0) {
          RequestErrorHandler("No More Thoughts Available");

          resolve(false);
          throw Error("No More Thoughts Available");
        }
        dispatch({
          type: "FECTH_NEW",
          payload: res.data.data,
        });
        dispatch({
          type: "DISABLE_LOADING",
        });
        resolve(true);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        RequestErrorHandler(err.message);
        reject(err);
      });
  });
// POST NEW THOUGHTS
export const UpdatePost = () => {
  console.log("LIKED");
};

interface Thought {
  content: string;
  trimmed: string;
  dateCreated: Date;
  author: string;
  likes?: number;
}
export const postNewThought = (thought: Thought) =>
  new Promise((resolve: (val: any) => any, reject) => {
    let updatedThought = {
      ...thought,
      userId: store.getState().UserReducer._id,
      content: thought.content.replace("\n", "\n "),
      trimmed: thought.trimmed.replace("\n", "\n "),
    };
    axios
      .post("/api/thoughts", { ...updatedThought })
      .then((res) => {
        dispatch({
          type: "UPDATE_CONTENT",
          payload: "",
        });
        dispatch({
          type: "CLOSE_ALL",
        });
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: "Thought Posted Successfully",
            type: 1,
            display: true,
          },
        });

        dispatch({ type: "NEW_THOUGHT_ADDED", payload: [res.data.data] });

        resolve(res);
      })
      .catch((err) => {
        RequestErrorHandler("Error While Posting Thought");
        reject(err);
      });
  });
// USER SIGN UP
interface IUserData {
  fullName: string;
  password: string;
  email: string;
}

export const UserSignUp = (signUpData: IUserData) =>
  new Promise((resolve: (val: any) => any, reject) => {
    dispatch({
      type: "SET_LOADING",
    });
    axios
      .post("/api/users/signup", { ...signUpData })
      .then((res) => {
        dispatch({
          type: "DISABLE_LOADING",
        });
        console.log(res.data);

        // dispatch({
        //   type: "SIGNUP_USER",
        //   payload: { ...res.data.data },
        // });
        resolve(res);
      })
      .catch((err) => {
        console.log("ERR", { err });
        RequestErrorHandler(err.response.data.message);
        reject(err);
      });
  });

interface ILoginData {
  email: string;
  password: string;
}
export const UserLogin = (loginData: ILoginData) => {
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
          console.log(user);

          dispatch({
            type: "SET_USER",
            payload: {
              fullName: user.fullName,
              _id: user._id,
              email: user.email,
              exist: true,
            },
          });
          dispatch({
            type: "SET_NEW_ALERT",
            payload: {
              display: true,
              message: "Successfully Signed In",
              type: 1,
            },
          });
          dispatch({
            type: "CLOSE_ALL",
          });
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
