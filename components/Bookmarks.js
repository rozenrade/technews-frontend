import Head from "next/head";
import { useSelector } from "react-redux";
import styles from "../styles/Bookmarks.module.css";
import Article from "./Article";

function Bookmarks() {
  const bookmarks = useSelector((state) => state.bookmarks.value);

  let bookmarkedArticles = <p>No bookmark</p>;

  if (bookmarks.length > 0) {
    bookmarkedArticles = bookmarks.map((bookmark) => (
      <Article key={bookmark.title} {...bookmark} isBookmarked />
    ));
  }

  return (
    <div>
      <Head>
        <title>Tech News - Bookmarks</title>
      </Head>
      <div className={styles.container}>
        <h2>Bookmarks</h2>
        <div className={styles.bookmarksContainer}>{bookmarkedArticles}</div>
      </div>
    </div>
  );
}

export default Bookmarks;
