import axios from "axios";
import { useState } from "react";

const useRequest = () => {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sendRequest = async (initialSetup) => {
    
    try {
      const response = await axios(initialSetup);
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
    }catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }

  };

  return { sendRequest, responseData, isLoading, setIsLoading };
};

export default useRequest;
