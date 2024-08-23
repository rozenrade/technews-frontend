import Head from "next/head";
import { useSelector } from "react-redux";
import { useFetchArticles } from "../lib/hooks";
import styles from "../styles/Home.module.css";
import Article from "./Article";
import TopArticle from "./TopArticle";

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const { articlesData, topArticle } = useFetchArticles();

  const articles = articlesData.map((data, i) => {
    const isBookmarked = bookmarks.some(
      (bookmark) => bookmark.title === data.title
    );
    return <Article key={i} {...data} isBookmarked={isBookmarked} />;
  });

  let topArticleIsBookmarked;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticleIsBookmarked = <TopArticle {...topArticle} isBookmarked />;
  } else {
    topArticleIsBookmarked = (
      <TopArticle {...topArticle} isBookmarked={false} />
    );
  }

  return (
    <div>
      <Head>
        <title>Tech News - Home</title>
      </Head>

      {topArticleIsBookmarked}

      <div className={styles.articlesContainer}>{articles}</div>
    </div>
  );
}

export default Home;
