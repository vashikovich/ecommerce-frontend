import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import GoogleSvg from "@/../public/svg/google.svg";
import AppleSvg from "@/../public/svg/apple.svg";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center px-4 lg:p-28 max-w-screen-sm mx-auto lg:border-2 lg:my-10">
      <h5 className="text-center font-bold text-xl mb-6 lg:mb-12">Welcome!</h5>
      <p className="text-center mb-4">Sign in using:</p>
      <div className="flex flex-col lg:flex-row gap-4 w-full mb-4">
        <Button
          content="Google"
          variant="ghost-primary"
          className="bg-white border-gray-900 text-gray-900 hover:bg-light-gray hover:border-gray-900"
          iconStart={
            <div className="w-6 h-6">
              <GoogleSvg />
            </div>
          }
          fullWidth
        />
        <Button
          content="Apple"
          className="bg-gray-900 border-gray-900 text-white hover:bg-medium-gray hover:border-medium-gray"
          iconStart={
            <div className="w-6 h-6">
              <AppleSvg fill="white" />
            </div>
          }
          fullWidth
        />
      </div>
      <Link href="/user/login/email">
        <p className="mb-8 text-blue-900 font-bold">
          Sign in using email instead
        </p>
      </Link>
    </div>
  );
}
