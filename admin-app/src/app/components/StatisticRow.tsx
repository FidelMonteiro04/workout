import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  statistics: Array<{ title: string; value: string }>;
}

const StatisticRow = ({ icon: Icon, statistics }: Props) => {
  return (
    <div className="flex justify-between lg:justify-center pb-2 mb-4 lg:mb-0 gap-2 w-full whitespace-nowrap overflow-x-auto items-center">
      <Icon size={20} className=" text-zinc-500 mr-1 shrink-0" />
      {statistics.map(({ title, value }, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-sm mr-4"
        >
          <span className="font-semibold text-zinc-500 text-center">
            {title}
          </span>
          <span className="font-semibold text-primary-500">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default StatisticRow;
