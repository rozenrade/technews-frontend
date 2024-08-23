import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBookmark } from "../lib/hooks";
import styles from "../styles/Toparticle.module.css";

function TopArticle(props) {
  const { handleClick, iconColor } = useBookmark(props);

  return (
    <div className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon
          onClick={handleClick}
          icon={faBookmark}
          className={styles.bookmarkIcon}
          style={iconColor}
        />
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TopArticle;
