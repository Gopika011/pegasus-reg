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
    <div className="h-screen w-full bg-[#070707] font-pressstart">
    {/* <div className="bg-primary/5 w-full h-10 top-0 left-0 p-10 flex justify-between bg-black"></div> */}

    <div className="md:h-[88%] overflow-auto w-full flex flex-grow flex-col justify-center items-center pb-20 md:pb-0 bg-primary/5">
      <div className="shadow-lg md:h-[50%] mt-10 md:mt-0 w-3/5 bg-primary/10 flex-col md:flex-row rounded-lg flex justify-center items-center bg-white">
        
        <div className="md:w-1/2 md:border-r-2 border-b-2 md:border-b-0 p-6 border-dashed border-black flex-col h-full flex justify-center items-center relative">
          <div className="bg-black rounded-xl w-full h-full relative">
                <div className="m-6"><Image src={peg} alt='pegasus' className="object-contain"/></div>
                <h2 className="absolute right-3 bottom-3 text-white text-md">JAN 10</h2>
            </div>
          {/* <div className="rounded-tl-full h-10 w-10 bg-white right-0 bottom-0 md:block absolute hidden"></div>
          <div className="rounded-bl-full h-10 w-10 bg-white right-0 top-0 md:block absolute hidden"></div> */}
          
        </div>


        <div className="w-full h-full relative">
          {/* <div className="rounded-tl-full h-10 w-10 bg-white right-0 bottom-0 md:block absolute hidden"></div>
          <div className="rounded-bl-full h-10 w-10 bg-white right-0 top-0 md:block absolute hidden"></div>
          <div className="rounded-tr-full h-10 w-10 bg-white left-0 bottom-0 md:block absolute hidden"></div>
          <div className="rounded-br-full h-10 w-10 bg-white left-0 top-0 md:block absolute hidden"></div> */}
          <div className="w-full h-1/5 p-10 pb-0">
            <p className="text-xl py-2 md:py-0 font-bold text-black outline-text-red">
              TICKET DETAILS
            </p>
          </div>

          <div className="flex flex-col p-10 justify-center h-4/5">
          <div className="flex md:flex-row flex-col text-center justify-between md:items-center">
               <p className="text-md ">NAME</p>
               <p className="text-md">
                 {userDetails.fname} {userDetails.lname}
               </p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-md">BRANCH & SEM</p>
                <p className="text-md">{userDetails.branch}</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-md">PHONE</p>
                <p className="text-md">+91 {userDetails.phone}</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-md">DATES</p>
                <p className="text-md">
                  JANUARY 10,11
                </p>
              </div>
              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-md">TIME</p>
                <p className="text-md">9AM-5PM</p>
              </div>

              <div className="flex md:flex-row flex-col text-center justify-between items-center">
                <p className="text-md">FOOD PREFERENCE</p>
                <p className="text-md">{userDetails.foodPref}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    // <div className="w-full h-screen bg-[#070707] flex justify-center items-center">
    //     <div className="bg-[#D9D9D9] flex flex-col md:flex-row p-2 md:p-6 justify-center items-center">
    //         <div className="w-[200px] h-full pr-6 bg-gray-700">
              // <div className="bg-black rounded-xl w-full h-full ">
              //   {/* <Image src={peg} className="object-contain"/> */}
              // </div>
    //         </div>

    //         <div className="w-[600px] flex flex-col gap-3 md:gap-1  justify-between ">
    //           <h2 className="text-xl">TICKET DETAILS</h2>
              // <div className="flex md:flex-row flex-col text-center justify-between md:items-center">
              //  <p className="font-grifter text-lg ">NAME</p>
              //  <p className="font-mono text-lg">
              //    {userDetails.fname} {userDetails.lname}
              //  </p>
              // </div>

              // <div className="flex md:flex-row flex-col text-center justify-between items-center">
              //   <p className="font-grifter text-lg">BRANCH & SEM</p>
              //   <p className="font-mono text-lg">{userDetails.branch}</p>
              // </div>

              // <div className="flex md:flex-row flex-col text-center justify-between items-center">
              //   <p className="font-grifter text-lg">PHONE</p>
              //   <p className="font-mono text-lg">+91 {userDetails.phone}</p>
              // </div>

              // <div className="flex md:flex-row flex-col text-center justify-between items-center">
              //   <p className="font-grifter text-lg">DATES</p>
              //   <p className="font-mono text-lg">
              //     JANUARY 10,11
              //   </p>
              // </div>
              // <div className="flex md:flex-row flex-col text-center justify-between items-center">
              //   <p className="font-grifter text-lg">TIME</p>
              //   <p className="font-mono text-lg">9AM-5PM</p>
              // </div>

              // <div className="flex md:flex-row flex-col text-center justify-between items-center">
              //   <p className="font-grifter text-lg">FOOD PREFERENCE</p>
              //   <p className="font-mono text-lg">{userDetails.foodPref}</p>
              // </div>

    //         </div>
    //   </div>
    // </div>
  );
};

export default Ticket;
