"use client"
import { db } from '@/utils/firebaseConfig.js';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import React, {useState} from 'react';
import { useRouter } from "next/navigation";

function generateTC() {
  const ticketNumber = Math.floor(100000 + Math.random() * 900000); 
  return ticketNumber.toString();
}

async function isTCUnique(ticketNumber) {
  const q = query(collection(db, "registrations"), where("ticketNumber", "==", ticketNumber));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // Returns true if the ticket number is not used
}

async function addData(formData) {
    try {
      const docRef = await addDoc(collection(db, "registrations"), formData);
      console.log("Document written: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.log("Error adding document: ", error);
      return null;
    }
  }

const RegisterForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        branch: "",
        clg: "",
        foodPref: "veg",
        phone: "",
        email: "",
        ieeeMember: "",
        ieeeID: "",
        ticketNumber: "",
      });
      

      const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        let ticketNumber = generateTC();
        let isUnique = await isTCUnique(ticketNumber);

        while (!isUnique) {
          ticketNumber = generateTC();
          isUnique = await isTC(ticketNumber);
        }
        const updatedFormData = { ...formData, ticketNumber };
        console.log(updatedFormData);
        const userId = await addData(updatedFormData);
        if (userId) {
          localStorage.setItem("userId", userId); 
          alert("Success!");
          router.push("/ticket");
          // setFormData({
          //   fname: "",
          //   lname: "",
          //   branch: "",
          //   clg: "",
          //   foodPref: "veg",
          //   phone: "",
          //   email: "",
          //   password: "",
          //   ieeeMember: "",
          //   ieeeID: "",
          // });
        } else {
          alert("Failed to register. Please try again.");
        }
      };
      

    return (
    <div className='min-h-screen w-2/3 flex justify-center items-center flex-col p-8 bg-[#070707]'>
        <h2 className="text-4xl font-semibold text-[#D71015] mb-6 ">Event Registration Form</h2>
        <form className="w-full max-w-3xl md:grid grid-cols-1 md:grid-cols-2 flex flex-col gap-4  text-[#E2DCD0]" onSubmit={handleSubmit}>

       <>
        <div className="col-span-1">
           <label className="block">
             First Name<span className="text-red-600">*</span>
           </label>
           <input
             type="text"
             name="fname"
             value={formData.fname}
             onChange={handleChange}
             className="w-full p-1 border bg-transparent border-[#666262] rounded mt-2"
             required
           />
         </div>
         <div className="col-span-1">
           <label className="block">
             Last Name<span className="text-red-600">*</span>
           </label>
           <input
             type="text"
             name="lname"
             value={formData.lname}
             onChange={handleChange}
             className="w-full p-1 bg-transparent border border-[#666262] rounded mt-2"
             required
           />
         </div>
       </>
    
      <div className="col-span-1">
        <label className="block">
          Phone No.<span className="text-red-600">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-1 bg-transparent border border-[#666262] rounded mt-2"
          pattern="^\d{10}$"
          title="Phone number must be exactly 10 digits."
          required
        />
      </div>

      <div className="col-span-1">
        <label className="block">
          Email Address<span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-1 bg-transparent border border-[#666262] rounded mt-2"
          required
        />
      </div>
    
      <div className="col-span-1">
        <label className="block">
          College Name<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="clg"
          value={formData.clg}
          onChange={handleChange}
          className="w-full p-1 bg-transparent border border-[#666262] rounded mt-2"
          required
        />
      </div>
      <div className="col-span-1">
        <label className="block">
          Branch and Semester<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full p-1 bg-transparent border border-[#666262] rounded mt-2"
          required
        />
      </div>
      {/* <div className="col-span-1">
        <label className="block text-gray-700">
          Semester<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="sem"
          value={formData.sem}
          onChange={handleChange}
          className="w-full p-1 border border-gray-300 rounded mt-2"
          required
        />
      </div> */}
      <div className="col-span-1">
        <label className="block">
          Food Preference<span className="text-red-600">*</span>
        </label>
        <div className="flex items-center mt-2">
          <input
            type="radio"
            name="foodPref"
            value="veg"
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label className="mr-4">Veg</label>
          <input
            type="radio"
            name="foodPref"
            value="nonveg"
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label>Non-veg</label>
        </div>
      </div>

      <div className="col-span-1">
        <label className="block">
          Are you an IEEE member?<span className="text-red-600">*</span>
        </label>
        <div className="flex items-center mt-2">
          <input
            type="radio"
            name="ieeeMember"
            value="yes"
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label className="mr-4">Yes</label>
          <input
            type="radio"
            name="ieeeMember"
            value="no"
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label>No</label>
        </div>
      </div>
      {formData.ieeeMember === "yes" && (
      <>
      <div className="col-span-1">
        <label className="block">
          IEEE Membership ID<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="ieeeID"
          value={formData.ieeeID}
          onChange={handleChange}
          className="w-full p-1 bg-transparent border border-[#666262] rounded mt-2"
          required
          />
      </div>
    </>
     )}

     {/* <div className='flex justify-center p-2 col-span-2'>
         <button type="submit" className="relative px-6 py-3 font-bold text-black group">
           <span className="absolute z-10 inset-0 rounded-xl w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-primary group-hover:translate-x-0 group-hover:translate-y-0"></span>
           <span className="absolute inset-0 w-full h-full rounded-xl border-2 border-black"></span>
           <span className="relative">Submit</span>
         </button>
      </div> */}

      <div className='flex py-4 p-2 col-span-2'>
         <button type="submit" className="relative px-14 py-3 font-bold text-[#E2DCD0] group bg-[#D71015] rounded-xl hover:bg-[#B40E13] transition-all duration-300 ease-in-out"   style={{
        boxShadow: "2px 2px 0px rgba(255, 255, 255, 0.7)", // Bottom-right shadow with no blur
      }}>
           <span className="relative text-2xl">Register</span>
         </button>
      </div>

   </form>
    </div>
  )
}

export default RegisterForm