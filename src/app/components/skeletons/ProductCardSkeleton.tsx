export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-deep-blue p-4 rounded-lg shadow-lg flex flex-col">
      <div className="h-44 rounded"></div>
      <div className="h-3 w-20 rounded bg-light-gray mb-2"></div>
      <div className="h-5 w-full rounded bg-light-gray mb-2"></div>
      <div className="grid grid-cols-3 gap-2 items-end mb-10">
        <div className="rounded bg-light-gray h-5"></div>
        <div className="rounded bg-light-gray h-4"></div>
      </div>
      <div className="h-10 w-full rounded bg-light-gray"></div>
    </div>
  );
}
