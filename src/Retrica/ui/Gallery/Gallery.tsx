import type { MediaElement } from "../../types/retrica";
import styles from "./gallery.module.css";

const Gallery = ({
  gallery,
  closeGallery,
}: {
  gallery: MediaElement[];
  closeGallery: () => void;
}) => {
  return (
    <div className={styles.modal} onClick={closeGallery}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button onClick={closeGallery} className={styles.button}>
            X
          </button>
        </div>
        {!gallery.length && (
          <span>Gallery is empty. Go take some pictures!</span>
        )}

        <ul className={styles.gallery}>
          {gallery.map((el) => (
            <li key={el.id}>
              {el.type === "video" ? (
                <video src={el.data} controls></video>
              ) : (
                <img src={el.data} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
