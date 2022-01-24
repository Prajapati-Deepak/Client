import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import StylingInterestedProduct from "./stylingInterestedProduct";

function InterestedProduct(props) {
  const [arr, setarr] = useState([]);
  const token = useSelector((state) => state.loginlogoutReducer.token);
  const interestedList=useSelector((state)=>state.InterestedReducer?.interestedData)
  useEffect(() => {
    async function call() {
      const response = await axios.get(
        "http://localhost:5000/send_interested_products",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setarr(response.data);
      console.log(response.data);
    }

    call();
  }, [interestedList,token]);

      // const arrlength=arr?arr.length:0;
  // ====================================================================================================================================
  return (
    <StylingInterestedProduct length={arr.length} arr={arr}></StylingInterestedProduct>
  );
}
export default InterestedProduct;
