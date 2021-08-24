import axios from "axios";
import { loadingDispatch } from "../../redux/loading/loading.config";
import { store } from "../../redux/store";
import { IThought } from "../interfaces";
import { checkError, RequestErrorHandler } from "./errorHandler";

// const url = "https://pop-thoughts.herokuapp.com";
const url = "http://localhost:3001";
export const getAllThoughts = (type: "data" | "response") =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .get(`${url}/api/thoughts`)
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
      .catch((e) => {
        checkError(e);
        reject(e);
      });
  });
// GET THOUGHTS BY PAGE
export const getThoughtsNextPage = (currentPage: number, limit: number) =>
  new Promise((resolve, reject) => {
    const dispatch = store.dispatch;
    const nextPage = currentPage + 1;
    let cancel;
    axios
      .get(`${url}/api/thoughts?limit=${limit}&page=${nextPage}`, {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
        withCredentials: true,
      })
      .then((res) => {
        loadingDispatch("START");
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
      .catch((e) => {
        if (axios.isCancel(e)) return;
        checkError(e);
        reject(e);
      });
  });
// POST NEW THOUGHTS
export const postNewThought = (thought: IThought) =>
  new Promise((resolve: (val: any) => any, reject) => {
    const dispatch = store.dispatch;

    thought.author = store.getState().UserReducer.fullName;
    let updatedThought = {
      ...thought,
      userId: store.getState().UserReducer._id,
      content: thought.content.replace("\n", "\n "),
      trimmed: thought.trimmed.replace("\n", "\n "),
    };
    axios
      .post(
        `${url}/api/thoughts`,
        { ...updatedThought },
        {
          withCredentials: true,
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
      .catch((e) => {
        checkError(e);
        reject(e);
      });
  });
// UPDATE THOUGHT
export const updateThoughtData = (
  id: string = "",
  data: { content: string; trimmed: string }
) =>
  new Promise((resolve: (val: any) => void, reject) => {
    loadingDispatch("START");
    const dispatch = store.dispatch;

    axios
      .patch(
        `${url}/api/thoughts/${id}`,
        {
          ...data,
        },
        { withCredentials: true }
      )
      .then(() => {
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: "Thought Updated!",
            type: 1,
            display: true,
          },
        });
        resolve(true);
        loadingDispatch("DISABLE");
      })
      .catch((e) => {
        checkError(e);
        loadingDispatch("DISABLE");

        reject(e);
      });
  });
