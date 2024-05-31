const Banner = ({ image, title, subtitle, buttonLabel, buttonLink }) => {
    const placeholderImage = '/path-to-placeholder-image.jpg';
  
    return (
      <div className="relative w-full h-64 mb-8">
        <img src={image || placeholderImage} alt="Banner Image" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
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
  