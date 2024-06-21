import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center px-4 lg:p-28 max-w-screen-sm mx-auto lg:border-2 lg:my-10">
      <h5 className="text-center font-bold text-xl mb-6">
        Become a customer now and start shopping!
      </h5>
      <RegisterForm containerClassName="mb-8 w-full" />
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/user/login" className="text-blue-900 font-bold">
          Sign in to your account
        </Link>
      </p>
    </div>
  );
}
