import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebase.json";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
const storage = getStorage();
const storageRef = ref(storage);

export const uploadImage = async (uri, user) => {
  console.log("upload 이미지 동작------------------------------");

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const url = `/profile/${user}_photo.${uri.slice(-3)}`;
  const userProfileRef = ref(storage, url);
  const uploadTask = uploadBytesResumable(userProfileRef, blob);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};

// export const signup = async ({ userName, password, phoneNum, photoUrl }) => {
//   const { user } = await axios.post("https://ppap.loca.lt/clientAuth/login", {
//     userName,
//     password,
//     phoneNum,
//   });
// };
