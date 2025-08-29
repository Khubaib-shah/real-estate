import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../component/Contact";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contactLandlord, setContactLandlord] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        setListing(data);
        setError(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) return <p className="text-center my-7 text-2xl">Loading...</p>;
  if (error)
    return <p className="text-center my-7 text-2xl">Something went wrong</p>;

  const {
    name,
    imageUrls,
    offer,
    discountPrice,
    regularPrice,
    type,
    address,
    description,
    bedrooms,
    bathroom,
    parking,
    furnished,
  } = listing;

  // console.log(listing);
  return (
    <main>
      <Swiper navigation={true} modules={[Navigation]} loop={true}>
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[300px] sm:h-[400px] md:h-[550px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
              alt={`Image of ${name} - ${index + 1}`}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-slate-500 opacity-45"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className="text-xl sm:text-2xl font-semibold">
          {name} - ${" "}
          {offer
            ? discountPrice.toLocaleString("en-US")
            : regularPrice.toLocaleString("en-US")}
          {type === "rent" && " / month"}
        </p>

        <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm sm:text-base">
          <FaMapMarkerAlt className="text-green-700" />
          <span className="truncate">{address}</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <p className="bg-red-900 w-full sm:max-w-[200px] text-white text-center p-2 rounded-md">
            {type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {offer && (
            <p className="bg-green-900 w-full sm:max-w-[200px] text-white text-center p-2 rounded-md">
              ${+regularPrice - +discountPrice}
            </p>
          )}
        </div>

        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          <span className="block text-sm sm:text-base  max-w-full text-justify indent-[100px]">
            {description}
          </span>
        </p>
        <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
          <li className="flex items-center gap-1 whitespace-nowrap text-sm sm:text-base">
            <FaBed className="text-sm sm:text-lg" />
            {bedrooms > 1 ? `${bedrooms} beds` : `${bedrooms} bed`}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap text-sm sm:text-base">
            <FaBath className="text-sm sm:text-lg" />
            {bathroom > 1 ? `${bathroom} baths` : `${bathroom} bath`}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap text-sm sm:text-base">
            <FaParking className="text-sm sm:text-lg" />
            {parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex items-center gap-1 whitespace-nowrap text-sm sm:text-base">
            <FaChair className="text-sm sm:text-lg" />
            {furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
        {currentUser &&
          listing.userRef !== currentUser._id &&
          !contactLandlord && (
            <button
              onClick={() => setContactLandlord(true)}
              className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
            >
              Contact Landlord
            </button>
          )}
        {contactLandlord && <Contact listing={listing} />}
      </div>
    </main>
  );
}
