import axios from "axios";
import { store } from "./redux/store";

const { dispatch } = store;

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
          dispatch({
            type: "SET_NEW_ALERT",
            payload: {
              message: "No More Thoughts Available",
              display: true,
              type: 0,
            },
          });
          dispatch({
            type: "DISABLE_LOADING",
          });
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
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: err.message,
            display: true,
            type: 0,
          },
        });
        dispatch({
          type: "DISABLE_LOADING",
        });
        reject(err);
      });
  });
// POST NEW THOUGHTS
interface Thought {
  content: string;
  trimmed: string;
  dateCreated: Date;
  author: string;
  likes?: number;
}
export const postNewThought = (thought: Thought) =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .post("/api/thoughts", { ...thought })
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
        resolve(res);
      })
      .catch((err) => {
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            message: "Error While Posting Thought",
            type: 0,
            display: true,
          },
        });
        reject(err);
      });
  });
