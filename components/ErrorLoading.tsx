import React from "react";
import SectionLoader from "./SectionLoader";
interface Props extends React.PropsWithChildren {
  loading: boolean;
  error: string;
}

export default function ErrorLoading({ children, loading, error }: Props) {
  return (
    <div>
      {loading ? (
        <SectionLoader />
      ) : error ? (
        <ErrorSection text={error} />
      ) : (
        children
      )}
    </div>
  );
}

function ErrorSection({ text }: { text: string }) {
  return (
    <h3 className="text-center text-red-500 text-sm font-medium">{text}</h3>
  );
}
