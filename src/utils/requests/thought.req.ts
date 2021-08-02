import axios from "axios";
import { useDispatch } from "react-redux";
import { loadingDispatch } from "../../redux/loading/loading.config";
import { store } from "../../redux/store";
import { IThought } from "../interfaces";
import { RequestErrorHandler } from "./errorHandler";

export const getAllThoughts = (type: "data" | "response") =>
  new Promise((resolve: (val: any) => any, reject) => {
    axios
      .get("/api/thoughts")
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
    const dispatch = useDispatch();
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
export const postNewThought = (thought: IThought) =>
  new Promise((resolve: (val: any) => any, reject) => {
    const dispatch = useDispatch();

    thought.author = store.getState().UserReducer.fullName;
    let updatedThought = {
      ...thought,
      userId: store.getState().UserReducer._id,
      content: thought.content.replace("\n", "\n "),
      trimmed: thought.trimmed.replace("\n", "\n "),
    };
    axios
      .post("/api/thoughts", { ...updatedThought }, {})
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
// UPDATE THOUGHT
export const updateThoughtData = (id: string = "", data: string) =>
  new Promise((resolve: (val: any) => void, reject) => {
    loadingDispatch("START");
    const dispatch = useDispatch();

    axios
      .patch(`/api/thoughts/${id}`, {
        content: data,
      })
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
      })
      .catch((e) => {
        RequestErrorHandler(e.message);
        reject(e);
      });
  });