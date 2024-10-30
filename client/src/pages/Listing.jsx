import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);

        const data = await res.json();
        // if (!data.success) {
        //   setError('hello',true);
        //   return;
        // }

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

  if (error) return console.log("errer from", error);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !loading && !error && (
        <Swiper navigation={true}  modules={[Navigation]}>
          {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-[550px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </main>
  );
}
