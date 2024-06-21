import Button from "@/app/components/Button";
import Link from "next/link";

export default function OrderDetailsPage_NotFound() {
  return (
    <div className="mx-auto flex flex-col items-center text-center my-40 gap-20 max-w-screen-lg">
      <h1 className="font-2xl font-bold">
        Order does not exist or you are not authorized.
      </h1>
      <Link href="/">
        <Button content="Continue Shopping" variant="primary" />
      </Link>
    </div>
  );
}
