import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex justify-center pt-10">
      <Loader2 className="w-8 h-8 text-sky-600 z-10 animate-spin" />
    </div>
  );
}
