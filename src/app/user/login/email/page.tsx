import Link from "next/link";
import LoginEmailForm from "./LoginEmailForm";
import UseProviderButton from "./UseProviderButton";

export default function LoginEmailPage() {
  return (
    <div className="flex flex-col items-center px-4 lg:p-28 max-w-screen-sm mx-auto lg:border-2 lg:my-10">
      <h5 className="text-center font-bold text-xl mb-6">Welcome!</h5>
      <LoginEmailForm containerClassName="mb-4 w-full" />
      <UseProviderButton />
      <p className="text-center">
        Don&apos;t have an account yet?{" "}
        <Link href="/user/register" className="text-blue-900 font-bold">
          Register and start shopping!
        </Link>
      </p>
    </div>
  );
}
