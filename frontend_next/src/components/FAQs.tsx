"use client"
import { useState } from "react";
import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";
import clsx from "clsx";
import {motion , AnimatePresence} from 'framer-motion';
const items = [
  {
    question: "How is my personal information protected?",
    answer:
      "We prioritize your security by using industry-standard encryption protocols for data storage and transmission. Our blockchain-based system ensures that your data is immutable and tamper-proof. Additionally, we comply with data protection regulations to safeguard your privacy.",
  },
  {
    question: "How can I verify the authenticity of my certificate?",
    answer:
      "Each certificate issued is stored on the blockchain, providing a permanent and unalterable record. You can verify the authenticity of your certificate by checking it against our blockchain ledger, ensuring it is genuine and has not been altered.",
  },
  {
    question: "Is the interface user-friendly for both organizations and participants?",
    answer:
      "Yes, we have designed an intuitive interface that is easy to navigate for both organizations and participants. We also provide tutorials and support to help users make the most of our platform.",
  },
  {
    question: "How secure are the payment options?",
    answer:
      "Our payment processing is handled by reputable third-party services that comply with PCI DSS standards, ensuring that your payment information is securely processed. We never store sensitive payment details on our servers.",
  },
];

const AccordinationItem = ({question, answer}:{question:string, answer: string}) => {
  const[isOpen, setIsOpen] = useState(false);
  return(
   
    <div className=" py-7 border-b border-white/30" onClick={() => setIsOpen(!isOpen)}>
    <div className="flex items-center ">
      <span className="flex-1 text-lg font-bold">{question}</span>
      {isOpen ? <MinusIcon /> :<PlusIcon />}
      
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.div 
        initial={{opacity: 0, height: 0, marginTop: 0}}
        animate={{opacity: 1, height: "auto" , marginTop:'16px'}}
        exit={{opacity: 0, height: 0, marginTop: 0}}
          >{answer}</motion.div>

      )}
      </AnimatePresence>
    
  </div>
  
    
  )
}

export const FAQs = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24 bg-gradient-to-b from-[#113366] to-black ">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter">
          Common Queries
        </h2>
        <div className='max-w-xl mx-auto'>
          <p className="text-xl text-white/70 text-center mt-5">Find quick answers to the most frequently asked questions about our certification verification system.</p>
        </div>
        <div className="mt-12 max-w-[648px] mx-auto">
         {items.map(({question, answer}) => (
            <AccordinationItem question={question} answer={answer} key={question}/>
         ))}
        </div>
      </div>
    </div>
  )
};
