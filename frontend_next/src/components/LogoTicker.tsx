import plunkLogo from "../assets/images/plunk.png";
import expressLogo from "../assets/images/express.png";
import nextLogo from "../assets/images/Nextjs.png";
import tailLogo from "../assets/images/Tailwind.png";
import diaLogo from "../assets/images/diamante.png";
import nodeLogo from "../assets/images/nodejs.png";
import aceLogo from "../assets/images/acertinity.png";
import typeLogo from "../assets/images/typescript.png";

import Image from 'next/image';
import LogoCarousel from "./companylogos";


const images = [
  { src: plunkLogo, alt: "Plunk Logo" },
  { src: expressLogo, alt: "express Logo" },
  { src: nextLogo, alt: "nextjs Logo" },
  { src: tailLogo, alt: "tailwind css Logo" },
  { src: diaLogo, alt: "diamante Logo" },
  { src: nodeLogo, alt: "nodejs Logo" },
  { src: aceLogo, alt: "acertinity Logo" },
  { src: typeLogo, alt: "typescript Logo" },
];

export const LogoTicker = () => {
  return(
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-lg text-center text-white/70 mb-16">Technologies implemented in our processes</h2>
        <LogoCarousel/>
        
        
      </div>

    </div>
  )
};
