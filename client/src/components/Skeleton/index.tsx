import { CSSProperties, FunctionComponent } from "react";

type SkeletonProps = CSSProperties & {
  className?: string;
};

const Skeleton: FunctionComponent<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`inline-block relative overflow-hidden after:absolute after:top-0 after:left-0 after:h-full 
      after:bg-gradient-to-r after:w-full after:scale-x-[2] bg-[#34373c] after:from-[#34373c] after:via-[#444547]
      after:to-[#34373c] rounded-md after:animate-skeleton ${className}`}
      style={props}
    />
  );
};

export { Skeleton };
