// components/ui/loader.tsx
import { LoaderProps } from "./types";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export function Loader({
  variant = "bars",
  size = 24,
  className = "",
}: LoaderProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Spinner variant={variant} className={className} size={size} />
    </div>
  );
}

export default Loader;
