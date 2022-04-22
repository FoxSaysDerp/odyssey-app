import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();

   const activeHttpRequests = useRef([]);

   const sendRequest = useCallback(
      async (url, method = "GET", headers = {}, body = null) => {
         setIsLoading(true);

         const httpAbortCtrl = new AbortController();
         activeHttpRequests.current.push(httpAbortCtrl);

         try {
            const response = await fetch(url, {
               method,
               body,
               headers,
               signal: httpAbortCtrl.signal,
            });
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
               (reqCtrl) => reqCtrl !== httpAbortCtrl
            );

            if (!response.ok) {
               setError(responseData.message);
               throw new Error(responseData.messsage);
            }
            setIsLoading(false);
            return responseData;
         } catch (err) {
            setIsLoading(false);
            throw err;
         }
      },
      []
   );

   useEffect(() => {
      return () => {
         activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
      };
   }, []);

   return { isLoading, error, sendRequest };
};
