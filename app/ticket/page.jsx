"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore"; 
import app from "@/utils/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import peg from '@/app/assets/peg.png'
import Image from "next/image";
import PunchCircles from "./component/PunchCircles";


const Ticket = () => {
  const [userDetails, setUserDetails] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const db = getFirestore(app);
  const router = useRouter(); 

 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId)
        if (!userId) {
          router.push("/"); 
          return;
        }

        const docRef = doc(db, "registrations", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data()); 
        } else {
            console.log("No such document in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUserDetails(); 
  }, [db, router]);


  if (isLoading) {
    return (
        <div className="text-center w-screen h-screen flex flex-col justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-gray-800 mx-auto"></div>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">Loading...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#070707] font-pressstart flex justify-center items-center">

    <div className="md:h-[88%] overflow-auto w-full flex flex-grow flex-col justify-center items-center pb-20 md:pb-0 ">
      <div className="shadow-lg md:h-[50%] mt-10 md:mt-0 w-4/5 md:w-3/5 flex-col lg:flex-row flex justify-center items-center bg-white relative">
        
        {/* <div className="md:w-1/2 p-6 flex-col h-full flex justify-center items-center relative">      
          <div className="bg-black rounded-xl w-full h-full relative">
                <div className="m-6"><Image src={peg} alt='pegasus' className="object-contain"/></div>
                <h2 className="absolute right-3 bottom-3 text-white text-md">JAN 10</h2>
          </div>
        </div> */}
        
        <div className="lg:w-1/2 p-6 flex-col h-full flex justify-center items-center relative">      
          <div className="bg-black rounded-xl w-full h-full relative">
                <div className="m-6"><Image src={peg} alt='pegasus' className="object-contain"/></div>
                <h2 className="absolute right-3 bottom-3 text-white text-md">JAN 10</h2>
          </div>
        </div>

        <div className="p-2 md:px-10 w-full h-full relative text-center lg:text-start lg:border-l-2 border-t-2 lg:border-t-0 border-black border-dashed">
          <div className="w-full h-1/5  pt-5 pb-0">
            <p className="text-lg md:text-xl py-2 md:py-0 font-bold text-black outline-text-red" style={{WebkitTextStroke: '0.1px #D71015'}}>
              TICKET DETAILS
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-2 md:pt-4 py-10 justify-center h-4/5">
              <div className="flex md:flex-row flex-col text-center justify-between md:items-center">
               <p className="ticket-text ">NAME</p>
               <p className="ticket-text" >
                 {userDetails.fname} {userDetails.lname}
               </p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="ticket-text">BRANCH & SEM</p>
                <p className="ticket-text">{userDetails.branch}</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="ticket-text">PHONE NO</p>
                <p className="ticket-text">+91 {userDetails.phone}</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="ticket-text">VENUE</p>
                <p className="ticket-text">MITS KOCHI</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="ticket-text">DATES</p>
                <p className="ticket-text">
                  JANUARY 10,11
                </p>
              </div>
              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="ticket-text">TIME</p>
                <p className="ticket-text">9AM-5PM</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center pb-14 md:pb-2">
                <p className="ticket-text">FOOD PREFERENCE</p>
                <p className="ticket-text">{userDetails.foodPref}</p>
              </div>


              <div className="w-full absolute bottom-1 md:pr-16 pr-5 flex flex-col md:flex-row md:justify-between">
              <h2 className="text-lg font-extrabold text-[#D71015] font-mono">No.{userDetails.ticketNumber}</h2>
              <h2 className="text-lg font-extrabold text-[#D71015] font-mono">Status: Confirmed</h2>
              </div>
          </div>
        </div>


        <PunchCircles/>
      </div>
    </div>
  </div>
  );
};

export default Ticket;
