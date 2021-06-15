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
export const getThoughtsNextPage = (page: number) => {
  axios.get(`/api/thoughts?limit=10,page=${page}`).then((res) => {
    console.log(res);
    dispatch({
      type: "FECTH_NEW",
      payload: res.data.data,
    });
    dispatch({
      type: "DISABLE_LOADING",
    });
  });
};
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
    const data = JSON.stringify(thought);
    console.log(data);

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
