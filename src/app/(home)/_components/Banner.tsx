import Image from "next/image";

const Banner = ({ image, title, subtitle, buttonLabel, buttonLink }) => {
  return (
    <div className="relative h-64 lg:h-96 rounded-lg mx-4">
      <Image
        src="https://cdn-endpoint-website.azureedge.net/uploads/UBImageUploadModel/5/mobileImage/bphoto-153-campaign-summer-kickoff_mob.original.jpg?t=1716214744"
        alt="Banner Image"
        fill
        sizes="100vw"
        className="object-cover -z-50 rounded-lg"
        priority
      />
      <div className="bg-black/50 flex flex-col justify-center items-center text-center p-4 h-full z-0 rounded-lg">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="text-xl text-white mt-2">{subtitle}</p>
        <a
          href={buttonLink}
          className="mt-4 bg-coral text-white py-2 px-4 rounded hover:bg-blue-900"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
};

export default Banner;
