
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DiscussionCard from './DiscussionPage/discussionCard';
export default function SpecificThread() {
  const [discsnData, setDiscsnData] = useState();
  const Navigate = useNavigate();
  const params = useParams();
  const thread_id = params.threadId;
  const userData = useSelector((state) => state.loginlogoutReducer.userData);
  const {email} = userData;

  useEffect(() => {
    window.scrollTo(0, 0);
    let isSubscribed = true;
    const call = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/send_specific_thread",
          { email, thread_id}
        );
        if (isSubscribed) {
          if (response.data === 404) {
            Navigate("/*");
          } else {
            console.log(response.data);
           setDiscsnData(response.data.thread);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    call();
    return () => {
      isSubscribed = false;
    };
  }, [email, thread_id, Navigate]);

  return (
    <>
      {typeof discsnData !== "undefined" && (
        <DiscussionCard
          data={discsnData}
          flag={4}
        />
      )}
    </>
  );
}
