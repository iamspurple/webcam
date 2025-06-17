import { useRef, useState } from "react";
import styles from "./camera.module.css";
import Controls from "../Controls/Controls";
import { useRetrica } from "../../services/useRetrica";
import Gallery from "../Gallery/Gallery";

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const {
    cameraOptions,
    setTimer,
    gallery,
    error,
    takePhoto,
    startRecording,
    stopRecording,
    toggleMode,
    cancelTimer,
    setParameters,
    setFilter,
    toggleFacingMode,
  } = useRetrica({ videoRef, canvasRef });

  console.log(cameraOptions.facingMode);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {error && (
          <div className={styles.error}>
            <span>Отказано в доступе или произошла ошибка</span>
          </div>
        )}
        <video
          className={
            cameraOptions.facingMode === "user"
              ? `${styles.video} ${styles.selfie}`
              : styles.video
          }
          ref={videoRef}
        ></video>
        {!cameraOptions.isTimer && !error && (
          <Controls
            startRecording={startRecording}
            stopRecording={stopRecording}
            isTimer={cameraOptions.isTimer}
            isRecording={cameraOptions.isRecording}
            mode={cameraOptions.mode}
            takePhoto={takePhoto}
            toggleMode={toggleMode}
            parameters={cameraOptions.parameters}
            setParameters={setParameters}
            openGallery={() => setIsGalleryOpen(true)}
            setTimer={setTimer}
            setFilter={setFilter}
            client={cameraOptions.client}
            toggleFacingMode={toggleFacingMode}
          />
        )}
        <canvas
          className={
            cameraOptions.facingMode === "user"
              ? `${styles.canvas} ${styles.selfie}`
              : styles.canvas
          }
          ref={canvasRef}
        ></canvas>
        {cameraOptions.isTimer && (
          <div className={styles.timer}>
            <span>{cameraOptions.timer}</span>
            <button onClick={cancelTimer}>Cancel</button>
          </div>
        )}
      </div>
      {isGalleryOpen && (
        <Gallery
          gallery={gallery}
          closeGallery={() => setIsGalleryOpen(false)}
        />
      )}

      {cameraOptions.devices.map((d) => (
        <div>{d}</div>
      ))}
    </div>
  );
};
