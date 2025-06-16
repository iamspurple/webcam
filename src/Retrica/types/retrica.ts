type TMedia = "image" | "video";

export type MediaElement = {
  type: TMedia;
  data: string;
  id: string;
};

type TFacingMode = "user" | "environment";
type TMode = "photo" | "video";

export type CameraOptions = {
  timer: number;
  isTimer: boolean;
  facingMode: TFacingMode;
  mode: TMode;
  isRecording: boolean;
  filter: string;
  parameters: string;
  client: string;
};
