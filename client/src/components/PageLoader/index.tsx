import { FunctionComponent } from "react";

const PageLoader: FunctionComponent = () => {
  return (
    <div className="flex flex-1 justify-center items-center gap-1">
      {new Array(3).fill(0).map((_, index) => (
        <div
          key={`page-loader.dot.${index}`}
          style={{ animationDelay: `${index * 200}ms` }}
          className="animate-grow w-6 h-6 bg-slate-600 rounded-full"
        />
      ))}
    </div>
  );
};

export { PageLoader };
