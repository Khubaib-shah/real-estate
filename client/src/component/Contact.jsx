import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null); // Changed to lowercase for consistency
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(false); // Added error state
  const [message, setMessage] = useState(""); // Added error state

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error("Error fetching landlord:", error);
        setError(true);
      } finally {
        setLoading(false); // Set loading to false in finally block
      }
    };

    if (listing.userRef) {
      fetchLandlord();
    }
  }, [listing.userRef]); // Correct dependency to listing.userRef

  if (loading) return <p>Loading...</p>; // Handle loading state
  if (error) return <p>Something went wrong.</p>; // Handle error state
  const OnChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            rows={2}
            placeholder="Enter your message here"
            className="w-full border p-3 rounded-lg"
            onChange={OnChange}
          ></textarea>
          <Link
            to={`https://mail.google.com/mail/?view=cm&fs=1&to=${landlord.email}&su=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg border-slate-900 hover:opacity-95 "
          >
            send message
          </Link>
        </div>
      )}
    </>
  );
}
