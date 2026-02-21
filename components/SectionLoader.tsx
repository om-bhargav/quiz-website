import { Loader2 } from "lucide-react";
import React from "react";

export default function SectionLoader() {
  return (
    <div className="my-5 self-center w-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
