import Button from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  image: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
};

const Banner = ({ image, title, subtitle, buttonLabel, buttonLink }: Props) => {
  return (
    <div className="relative h-64 lg:h-96 rounded-lg mx-4">
      <Image
        src={image}
        alt="Banner Image"
        fill
        sizes="100vw"
        className="object-cover -z-50 rounded-lg"
        priority
      />
      <div className="bg-black/50 flex flex-col justify-center items-center text-center p-4 h-full z-0 rounded-lg">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="hidden lg:block text-xl text-white mt-2">{subtitle}</p>
        <Link href={buttonLink} className="mt-6">
          <Button variant="secondary">{buttonLabel}</Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
