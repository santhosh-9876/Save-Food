import { useEffect, useState } from "react";
import axiosInstance from "../Api/axiosInstance";

function useFetch(url) {
  let [Products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let response = await axiosInstance.get(url);
        const data = response.data;

        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.results)) {
          setProducts(data.results);
        } else if (data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [url])

    return { Products, error, isLoading,setProducts }
}

export default useFetch;