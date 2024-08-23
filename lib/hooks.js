import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { login } from "../reducers/user";

const BACKEND_URL = "https://technews-backend.vercel.app/"
export function useBookmark(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleClick = () => {
    if (!user.token) {
      toast.error("You need to be connected to bookmark an article");
      return;
    }

    fetch(`${BACKEND_URL}users/canBookmark/${user.token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props.title));
          } else {
            dispatch(addBookmark(props));
          }
        } else {
          toast.error("You are not allowed to bookmark an article");
        }
      });
  };

  let iconColor;
  if (props.isBookmarked) {
    iconColor = {
      color: "#E9B959",
    };
  }

  return { handleClick, iconColor };
}

export function useFetchArticles() {
  const [topArticle, setTopArticle] = useState({});
  const [articlesData, setArticlesData] = useState([]);
  //nom état    //fonction pour modifier l'état  //valeur initiale de l'état

  useEffect(() => {
    fetch(`${BACKEND_URL}articles`)
      // on fetch le backend pour récupérer les articles
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          // top article doit contenir le premier article de la liste
          setTopArticle(data.articles[0]);
          // articlesData doit contenir le reste des articles
          setArticlesData(data.articles.slice(1));
        }
      });
  }, []);

  return { topArticle, articlesData };
}

export function useRegister() {
  const dispatch = useDispatch();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  function handleRegister() {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(signUpPassword)) {
      toast.error(
        "Password must contain 8 characters, 1 uppercase, 1 number and 1 special character"
      );
      return;
    }

    fetch(`${BACKEND_URL}users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          toast.success("Account created successfully ");
        }
      });
  }

  return {
    signUpUsername,
    setSignUpUsername,
    signUpPassword,
    setSignUpPassword,
    handleRegister,
  };
}

export function useConnect() {
  const dispatch = useDispatch();
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  //useConnect
  function handleConnect() {
    fetch(`${BACKEND_URL}users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          toast.success("You are connected successfully");
          setSignInUsername("");
          setSignInPassword("");
        } else {
          toast.error("Username or password is incorrect");
        }
      });
  }

  return {
    signInUsername,
    setSignInUsername,
    signInPassword,
    setSignInPassword,
    handleConnect,
  };
}
