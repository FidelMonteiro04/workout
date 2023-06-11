import "@/styles/animations.css";

interface Props {
  size?: number;
  alternative?: boolean;
  thickness?: number;
}

const Loading = ({ alternative, size, thickness }: Props) => {
  return (
    <div
      style={{
        height: size ? `${size}px` : "16px",
        width: size ? `${size}px` : "16px",
      }}
      className={`spin rounded-full border-2 ${
        alternative
          ? "border-primary-500 border-t-white"
          : "border-white border-t-zinc-400/60"
      }`}
    ></div>
  );
};

export default Loading;
