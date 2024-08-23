import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useConnect, useRegister } from "../lib/hooks";
import styles from "../styles/Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import toast from "react-hot-toast";
import { removeAllBookmarks } from "../reducers/bookmarks";

function Header() {
  const dispatch = useDispatch();
  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.user.value); // valeur de l'état user dans le store

  // REGISTER
  const {
    signUpUsername,
    setSignUpUsername,
    signUpPassword,
    setSignUpPassword,
    handleRegister,
  } = useRegister();

  // CONNECT
  const {
    signInUsername,
    setSignInUsername,
    signInPassword,
    setSignInPassword,
    handleConnect,
  } = useConnect();

  useEffect(() => {
    setDate(new Date());
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  function handleLogout() {
    dispatch(removeAllBookmarks());
    dispatch(logout());
    toast("You are disconnected");
    setIsModalVisible(false);
  }

  let modalContent;

  if (!user.token) {
    modalContent = (
      <div className={styles.registerContainer}>
        <div className={styles.registerSection}>
          <p>Sign-up</p>
          <input
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            type="password"
            placeholder="Password"
          />

          <button onClick={handleRegister}>Register</button>
        </div>

        <div className={styles.registerSection}>
          <p>Sign-in</p>
          <input
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
            type="password"
            placeholder="Password"
          />
          <button onClick={handleConnect}>Connect</button>
        </div>
      </div>
    );
  }

  let userSection;
  if (user.token) {
    userSection = (
      <div className={styles.welcomeSection}>
        <p>Welcome {user.username} /</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => showModal()}
          className={styles.userSection}
        />
      );
    } else {
      userSection = (
        <FontAwesomeIcon
          icon={faUser}
          onClick={() => showModal()}
          className={styles.userSection}
        />
      );
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Moment className={styles.date} date={date} format="MMM Do YYYY" />
        <h1 className={styles.title}>Tech News</h1>
        {userSection}
      </div>

      <div className={styles.linkContainer}>
        <Link href="/" className={styles.link}>
          Articles
        </Link>
        <Link href="/bookmarks" className={styles.link}>
          Bookmarks
        </Link>
      </div>

      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            open={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
