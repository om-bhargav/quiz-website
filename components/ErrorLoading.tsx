import React from "react";
import SectionLoader from "./SectionLoader";
interface Props extends React.PropsWithChildren {
  loading: boolean;
  error: string;
  emptyMessage: string;
  dataLength: number;
}

export default function ErrorLoading({
  children,
  loading,
  error,
  emptyMessage,
  dataLength,
}: Props) {
  return (
    <div>
      {loading ? (
        <SectionLoader />
      ) : error ? (
        <ErrorSection text={error} />
      ) : (
        <>
          {children}
          {!dataLength && (
            <div className="text-center my-4 font-semibold">{emptyMessage}</div>
          )}
        </>
      )}
    </div>
  );
}

function ErrorSection({ text }: { text: string }) {
  return (
    <h3 className="text-center text-red-500 text-sm font-medium">{text}</h3>
  );
}
