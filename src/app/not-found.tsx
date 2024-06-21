import Button from "@/app/components/Button";
import Link from "next/link";

export default function App_NotFound() {
  return (
    <div className="mx-auto flex flex-col items-center text-center my-40 gap-20 max-w-screen-lg">
      <h1 className="font-2xl font-bold">
        The page you are looking for does not exist
      </h1>
      <Link href="/">
        <Button variant="primary">Continue Shopping</Button>
      </Link>
    </div>
  );
}
