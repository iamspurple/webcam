import { useState, type RefObject, useMemo, useRef } from "react";
import { type CameraOptions, type MediaElement } from "../types/retrica";

export const useRetrica = ({
  videoRef,
  canvasRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}) => {
  const [cameraOptions, setCameraOptions] = useState<CameraOptions>({
    timer: 1,
    isTimer: false,
    facingMode: "user",
    mode: "photo",
    isRecording: false,
    filter: "",
    parameters: "",
    client: "",
    devices: [],
  });
  const [gallery, setGallery] = useState<MediaElement[]>([]);
  const [error, setError] = useState("");
  const recorder = useRef<MediaRecorder>(null);
  const intervalId = useRef<number>(undefined);

  useMemo(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const d = cameras.map((cam) => JSON.stringify(cam));
      setCameraOptions((prev) => ({
        ...prev,
        devices: d,
      }));
      if (cameras.length > 1) {
        setCameraOptions((prev) => ({ ...prev, client: "mobile" }));
      }
      if (cameras.length === 1) {
        setCameraOptions((prev) => ({ ...prev, client: "desktop" }));
      }
    });
  }, []);

  useMemo(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { exact: cameraOptions.facingMode } },
        audio: true,
      })
      .then((stream) => {
        setError("");
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.autoplay = true;
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener(
            "loadedmetadata",
            videoRef.current.play
          );
          recorder.current = new MediaRecorder(stream);

          let data: BlobPart[] = [];

          recorder.current.ondataavailable = (event) => {
            data.push(event.data);
          };

          recorder.current.onstop = () => {
            const blob = new Blob(data, { type: "video/webm" });
            const url = URL.createObjectURL(blob);

            setGallery((prev) => [
              ...prev,
              { type: "video", data: url, id: url.slice(0, 9) },
            ]);

            data = [];
          };
        }
      })
      .catch((err) => {
        setError("" + err);
      });
  }, [cameraOptions.facingMode]);

  const takePhoto = () => {
    let timer = cameraOptions.timer;

    const foo = () => {
      setCameraOptions((prev) => ({ ...prev, isTimer: false }));
      clearInterval(intervalId.current);
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          const data = canvasRef.current.toDataURL();
          setGallery((prev) => [
            ...prev,
            { type: "image", data: data, id: data.slice(0, 9) },
          ]);
        }
      }
    };

    const countdown = () => {
      if (timer > 1) {
        timer -= 1;
        setCameraOptions((prev) => ({ ...prev, timer, isTimer: true }));
      } else {
        foo();
      }
    };

    if (timer === 1) {
      foo();
    } else {
      intervalId.current = setInterval(countdown, 1000);
    }
  };

  const startRecording = () => {
    let timer = cameraOptions.timer;

    const foo = () => {
      clearInterval(intervalId.current);
      setCameraOptions((prev) => ({
        ...prev,
        isRecording: true,
        isTimer: false,
      }));

      if (recorder.current) {
        recorder.current.start();
      }
    };

    const countdown = () => {
      if (timer > 1) {
        timer -= 1;
        setCameraOptions((prev) => ({ ...prev, timer, isTimer: true }));
      } else {
        foo();
      }
    };

    if (timer === 1) {
      foo();
    } else {
      intervalId.current = setInterval(countdown, 1000);
    }
  };

  const stopRecording = () => {
    setCameraOptions((prev) => ({ ...prev, isRecording: false }));
    if (recorder.current) {
      recorder.current.stop();
    }
  };

  const toggleMode = () => {
    if (cameraOptions.mode === "photo") {
      setCameraOptions((prev) => ({ ...prev, mode: "video" }));
    } else {
      setCameraOptions((prev) => ({ ...prev, mode: "photo" }));
    }
  };

  const setTimer = (num: number) => {
    setCameraOptions((prev) => ({ ...prev, timer: num }));
  };

  const cancelTimer = () => {
    setCameraOptions((prev) => ({ ...prev, timer: 1, isTimer: false }));
    clearInterval(intervalId.current);
  };

  const setFilter = (filter: string) => {
    setCameraOptions((prev) => ({ ...prev, filter }));
  };

  const setParameters = (parameters: string) => {
    setCameraOptions((prev) => ({ ...prev, parameters }));
  };

  const toggleFacingMode = () => {
    if (cameraOptions.facingMode === "user") {
      setCameraOptions((prev) => ({ ...prev, facingMode: "environment" }));
    } else {
      setCameraOptions((prev) => ({ ...prev, facingMode: "user" }));
    }
  };

  return {
    cameraOptions,
    setCameraOptions,
    gallery,
    error,
    takePhoto,
    startRecording,
    stopRecording,
    toggleMode,
    setTimer,
    cancelTimer,
    setFilter,
    setParameters,
    toggleFacingMode,
  };
};
