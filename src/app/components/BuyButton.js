import { useState } from "react";

const BuyButton = ({ houseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:8080/houses/${houseId}/buy`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (for session/token) are sent
      });

      if (!response.ok) {
        const error = await response.json();
        setMessage(error.message || "Failed to buy the house.");
      } else {
        const data = await response.json();
        setMessage("House purchased successfully!");
        console.log("Purchased house:", data);
      }
    } catch (error) {
      setMessage("An error occurred while buying the house.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleBuy}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? "Processing..." : "Buy House"}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default BuyButton;
