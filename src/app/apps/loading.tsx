import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="m-6 rounded bg-white flex flex-grow justify-center">
      <div className="place-items-center">
        <Spinner label="Loading..." color="default" size="lg" />
      </div>
    </div>
  );
};
export default Loading;
