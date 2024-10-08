"use client"

import React from "react";
import { useState } from "react";
 

 
   export default function Colormood({
     title,
     content,
   }: {
     title: string;
     content: React.ReactNode;
   }) {
     const [isOpen, setIsOpen] = useState(false);

     const toggleAccordion = () => {
       setIsOpen(!isOpen);
     };
     return (
       <div>
         <div
           onClick={toggleAccordion}
           style={{
             cursor: "pointer",
             padding: "10px",
             border: "1px solid #ccc",
             borderRadius: "4px",
             marginBottom: "5px",
           }}
         >
           {title}
         </div>
         {isOpen && (
           <div
             style={{
               padding: "10px",
               border: "1px solid #ccc",
               borderRadius: "4px",
             }}
           >
             {content}
           </div>
         )}
       </div>
     );
   }

