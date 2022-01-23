import {
  ADD_TO_FAVOURITES,
  ADD_TO_INTERESTED,
  AUTH_USER,
  LOGOUT_USER,
  MODEL_POPUP,
  SELLNOW_CLICKED,
} from "./types";
import axios from "axios";
// import { USER_SERVER } from "../components/Config.js";

export const AuthUser = (data = {}) => {
  return { type: AUTH_USER, payload: data };
};
export const LogoutUser = () => {
  return { type: LOGOUT_USER };
};
export const SellNowclick = (bool) => {
  return { type: SELLNOW_CLICKED, payload: bool };
};

export const modelPopUp = (bool) => {
  return { type: MODEL_POPUP, payload: bool };
};
export const addToFavourites = (data) => {
  // console.log(data);
  return {
    type: ADD_TO_FAVOURITES,
    payload: data,
  };
};
export const addToInterested = (data) => {
  return {
    type: ADD_TO_INTERESTED,
    payload: data,
  };
};


export const fetchDataForATF = (likedata) => {
  // console.log("deepak");
  return async (dispatch) => {
    try {
      const { productId, userToken, isLiked } = likedata;
      const response = await axios.post(
        "http://localhost:5000/favourites_update",
        { productId, isLiked },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch(addToFavourites(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};


  export const fetchDataForInterestedProduct=(interestedData)=>{
    return async(dispatch)=>{
      try{
        const {productId,userToken,isInterested}=interestedData;


        const response = await axios.post(
          "http://localhost:5000/interested_update",
          { productId, isInterested },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
     dispatch(addToInterested(response.data));
      }catch(err){
        console.log(err);
      }
    }
  }