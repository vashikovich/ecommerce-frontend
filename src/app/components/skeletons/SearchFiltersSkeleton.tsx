export default function SearchFiltersSkeleton() {
  return (
    <div className="animate-pulse border-2 rounded px-6 h-fit ">
      <div className="py-6 border-b-2 border-light-gray">
        <div className="space-y-3 font-bold text-lg">
          <div className="w-20 h-5 my-1 rounded bg-light-gray"></div>
          <div className="w-full h-10 rounded bg-light-gray"></div>
        </div>
      </div>
      <div className="py-6 space-y-4">
        <div className="w-20 h-5 my-1 rounded bg-light-gray"></div>
        <div className="space-y-2">
          <div className="w-40 h-8 my-1 rounded bg-light-gray"></div>
          <div className="w-40 h-8 my-1 rounded bg-light-gray"></div>
        </div>
      </div>
    </div>
  );
}
