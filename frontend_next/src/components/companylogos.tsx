import Image from 'next/image'
import plunkLogo from "../assets/images/plunk.png";
import expressLogo from "../assets/images/express.png";
import nextLogo from "../assets/images/Nextjs.png";
import tailLogo from "../assets/images/Tailwind.png";
import diaLogo from "../assets/images/diamante.png";
import nodeLogo from "../assets/images/nodejs.png";
import aceLogo from "../assets/images/acertinity.png";
import typeLogo from "../assets/images/typescript.png";

export default function LogoCarousel() {

  const logos = [
    { src: plunkLogo, alt: "Plunk Logo" },
    { src: expressLogo, alt: "express Logo" },
    { src: nextLogo, alt: "nextjs Logo" },
    { src: tailLogo, alt: "tailwind css Logo" },
    { src: diaLogo, alt: "diamante Logo" },
    { src: nodeLogo, alt: "nodejs Logo" },
    { src: aceLogo, alt: "acertinity Logo" },
    { src: typeLogo, alt: "typescript Logo" },
  ]

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {logos.map((logo, index) => (
          <li key={index}>
            <Image src={logo.src} alt={logo.alt} />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
        {logos.map((logo, index) => (
          <li key={index}>
            <Image src={logo.src} alt={logo.alt} />
          </li>
        ))}
      </ul>
    </div>
  )
}