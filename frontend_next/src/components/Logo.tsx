// components/Logo.tsx
import Image from 'next/image';
import logo from '@/assets/images/pramanit3.png'; // Adjust the path as needed
import Link from 'next/link'; // Import Link from next/link

export const Logo = () => {
  return (
    <Link href="/#">
      <Image src={logo} alt="Logo" className="absolute top-4 left-4  w-12 h-12 mx-auto mb-6" width={48} height={48} />
    </Link>
  );
};
