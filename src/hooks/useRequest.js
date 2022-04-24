import axios from "axios";
import { useState } from "react";

const useRequest = () => {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const sendRequest = async (initialSetup) => {
    try {
      const response = await axios(initialSetup);
      if (initialSetup.method === "get") {
        const responseData = await response.data;
        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setResponseData(loadedMeals);
        setIsLoading(false);
      } else if (initialSetup.method === "post") {
        setIsSubmitting(true);
        // await axios(initialSetup);
        // await axios.post(initialSetup.url, initialSetup.data)
        setTimeout(() => {
          setIsLoading(false);
          setIsSubmitting(false);
          setDidSubmit(true);
        }, 3000);
        console.log("Send Order");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  return {
    sendRequest,
    responseData,
    isLoading,
    setIsLoading,
    isSubmitting,
    didSubmit,
  };
};

export default useRequest;
