import "@/styles/animations.css";

interface Props {
  size?: number;
  alternative?: "whiteBg" | "primaryBg";
  thickness?: number;
}

const Loading = ({ alternative, size, thickness }: Props) => {
  return (
    <div
      style={{
        height: size ? `${size}px` : "16px",
        width: size ? `${size}px` : "16px",
        borderWidth: thickness ? `${thickness}px` : "2px",
      }}
      className={`spin rounded-full ${
        alternative === "primaryBg"
          ? "border-primary-500 border-t-white"
          : "border-zinc-200 border-t-primary-500"
      } ${!alternative && "border-white border-t-zinc-400/60"}`}
    ></div>
  );
};

export default Loading;
