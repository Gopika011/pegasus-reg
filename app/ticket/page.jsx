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
    {/* <div className="bg-primary/5 w-full h-10 top-0 left-0 p-10 flex justify-between bg-black"></div> */}

    <div className="md:h-[88%] overflow-auto w-full flex flex-grow flex-col justify-center items-center pb-20 md:pb-0 ">
      <div className="shadow-lg md:h-[50%] mt-10 md:mt-0 w-4/5 md:w-3/5  flex-col md:flex-row flex justify-center items-center bg-white">
        
        <div className="md:w-1/2 md:border-r-2 border-b-2 md:border-b-0 p-6 border-dashed border-black flex-col h-full flex justify-center items-center relative">
          <div className="bg-black rounded-xl w-full h-full relative">
                <div className="m-6"><Image src={peg} alt='pegasus' className="object-contain"/></div>
                <h2 className="absolute right-3 bottom-3 text-white text-md">JAN 10</h2>
          </div>
          <div className=" py-2 -left-5 absolute hidden h-full w-8 md:flex md:flex-col gap-5">
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          </div>

          
        </div>


        <div className="w-full h-full relative text-center">
          <div className="w-full h-1/5 p-10 pb-0">
            <p className="text-xl py-2 md:py-0 font-bold text-black outline-text-red">
              TICKET DETAILS
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-0 md:p-10 py-10 justify-center h-4/5">
              <div className="flex md:flex-row flex-col text-center justify-between md:items-center">
               <p className="text-sm md:text-md ">NAME</p>
               <p className="text-sm md:text-md">
                 {userDetails.fname} {userDetails.lname}
               </p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-sm md:text-md">BRANCH & SEM</p>
                <p className="text-sm md:text-md">{userDetails.branch}</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-sm md:text-md">PHONE NO</p>
                <p className="text-sm md:text-md">+91 {userDetails.phone}</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-sm md:text-md">VENUE</p>
                <p className="text-sm md:text-md">MITS KOCHI</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-sm md:text-md">DATES</p>
                <p className="text-sm md:text-md">
                  JANUARY 10,11
                </p>
              </div>
              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-sm md:text-md">TIME</p>
                <p className="text-sm md:text-md">9AM-5PM</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-sm md:text-md">FOOD PREFERENCE</p>
                <p className="text-sm md:text-md">{userDetails.foodPref}</p>
              </div>

              <div className="flex justify-end absolute bottom-1 right-6">
              <h2 className="text-sm text-[#D71015]">No.{userDetails.ticketNumber}</h2>
              </div>
          </div>

          <div className=" py-2 -right-5 top-0 absolute hidden h-full w-8 md:flex md:flex-col gap-5">
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          <div className="rounded-full h-8 w-8 bg-[#070707]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Ticket;
