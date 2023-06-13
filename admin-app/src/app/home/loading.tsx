import "@/styles/animations.css";

const LoadingPage = () => {
  return (
    <div className="flex gap-4 w-full h-full items-center justify-center">
      <div className="spin w-[40px] h-[40px] rounded-full border-4 border-zinc-200 border-t-primary-500"></div>
      <h3 className="font-semibold">Carregando...</h3>
    </div>
  );
};

export default LoadingPage;
