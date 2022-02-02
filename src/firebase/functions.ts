import { firestore } from "./firebase";
import { DocumentData } from "firebase/firestore";
import { store } from "../redux/store";
import { IThought } from "../utils/interfaces";

const dispatch = store.dispatch;

export const getFirestoreDoc = (path: string) =>
  new Promise((resolve: (data: DocumentData) => void, reject) => {
    firestore
      .doc(path)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (!doc || !data) {
          reject("Document Not Found");
          return;
        }
        resolve(data);
      })
      .catch((e) => {
        dispatch({
          type: "SET_NEW_ALERT",
          payload: {
            display: true,
            message: "Error In Fetching Data.",
            type: 0,
          },
        });
        reject(e);
      });
  });

export const getFirestoreCollection = (name: string, page: number) =>
  new Promise((resolve: (val: IThought[]) => any, reject) => {
    const lastDoc = store
      .getState()
      .ThoughtsReducer.displayThoughts.slice(-1)[0];

    console.log(page);

    firestore
      .collection(name)
      .orderBy("content")
      .startAfter(lastDoc ? lastDoc.content : 0)
      .limit(15)
      .get()
      .then((docs) => {
        let finalData: Array<IThought> = [];
        docs.docs.forEach((doc) => {
          const data = doc.data();
          finalData.push({
            content: data.content,
            trimmed: data.trimmed,
            author: data.author,
            createdAt: data.createdAt,
          });
        });
        return finalData;
      })
      .then((dt) => {
        if (!dt || dt.length < 1) reject("No More Thoughts Available");
        resolve(dt);
      })
      .catch((e) => reject);
  });
