import axios from "axios";
import { store } from "../redux/store";
import { verify } from "jsonwebtoken";
import { IUserState } from "../redux/user/user.config";
import { UserReduxAction } from "../redux/actions.dispatch";
import { IThought, IUserData } from "./interfaces";
import { loadingDispatch } from "../redux/loading/loading.config";

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

  loadingDispatch("DISABLE");
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
    let cancel;
    axios
      .get(`/api/thoughts?limit=${limit}&page=${nextPage}`, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        loadingDispatch("START");
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
        loadingDispatch("DISABLE");
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

export const postNewThought = (thought: IThought) =>
  new Promise((resolve: (val: any) => any, reject) => {
    thought.author = store.getState().UserReducer.fullName;
    let updatedThought = {
      ...thought,
      userId: store.getState().UserReducer._id,
      content: thought.content.replace("\n", "\n "),
      trimmed: thought.trimmed.replace("\n", "\n "),
    };
    axios
      .post(
        "/api/thoughts",
        { ...updatedThought },
        {
          headers: {
            authorization: "bearer col",
          },
        }
      )
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
