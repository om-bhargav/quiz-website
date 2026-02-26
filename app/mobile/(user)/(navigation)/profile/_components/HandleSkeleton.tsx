import { Skeleton } from "@/components/ui/skeleton";

export function HandleSkeleton({
  children,
  loading,
}: {
  loading: boolean;
  children: any;
}) {
  return loading ? <SkeletonView /> : children;
}

function SkeletonView() {
  return <Skeleton className="h-6 w-25 bg-gray-100/80" />;
}