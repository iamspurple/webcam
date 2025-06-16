import Parameters from "../Parameters/Parameters";
import styles from "./controls.module.css";

const Controls = ({
  mode,
  isRecording,
  isTimer,
  takePhoto,
  toggleMode,
  startRecording,
  stopRecording,
  parameters,
  setParameters,
  openGallery,
  setTimer,
  setFilter,
  client,
  toggleFacingMode,
}: {
  mode: string;
  isRecording: boolean;
  isTimer: boolean;
  client: string;
  takePhoto: () => void;
  toggleMode: () => void;
  toggleFacingMode: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  setParameters: (parameters: string) => void;
  parameters: string;
  openGallery: () => void;
  setTimer: (arg0: number) => void;
  setFilter: (arg0: string) => void;
}) => {
  return (
    <>
      <ul className={styles.controls}>
        <li>
          <button onClick={toggleMode} title="switch mode">
            <img
              src={mode === "photo" ? "./videocamera.svg" : "./photocamera.svg"}
              alt={mode}
            />
          </button>
        </li>
        <li>
          {mode === "photo" ? (
            <button onClick={takePhoto} title="take photo">
              <img src="./start-recording.svg" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
              title={isRecording ? "stop recording" : "start recording"}
            >
              <img
                src={isRecording ? "./recording.svg" : "./start-recording.svg"}
                alt="record"
              />
            </button>
          )}
        </li>
        <li>
          <button onClick={openGallery} disabled={isTimer} title="open gallery">
            <img src="./picture.svg" alt="gallery" />
          </button>
        </li>
      </ul>
      <ul className={styles.settings}>
        <li>
          <button
            title="filters"
            onClick={() => {
              if (parameters === "filters") {
                setParameters("");
              } else {
                setParameters("filters");
              }
            }}
          >
            <img src="./filters.svg" alt="filters" />
          </button>
        </li>
        <li>
          <button
            title="timer"
            onClick={() => {
              if (parameters === "timer") {
                setParameters("");
              } else {
                setParameters("timer");
              }
            }}
          >
            <img src="./timer.svg" alt="timer" />
          </button>
        </li>
        <li>
          <button
            disabled={client === "desktop"}
            onClick={toggleFacingMode}
            title="flip camera"
          >
            <img src="./flip-camera.svg" alt="flip camera" />
          </button>
        </li>
        {parameters && (
          <Parameters
            parameters={parameters}
            setTimer={setTimer}
            setFilter={setFilter}
            setParameters={setParameters}
          />
        )}
      </ul>
    </>
  );
};

export default Controls;
