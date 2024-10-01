import { Feature } from './Feature';

const features = [
  {
    title: 'Certificate Authentication',
    description:
      'Securely verifies and validates certificates using blockchain technology, ensuring authenticity and preventing fraud.',
  },
  {
    title: 'Event Management',
    description:
      'Allows organizations to list and manage events, upload relevant details, and issue certificates for participants upon completion.',
  },
  {
    title: 'Secure User Data',
    description:
      'Protects sensitive information with advanced encryption and security protocols, ensuring the privacy and security of user and organizational data.',
  },
];

export const Features = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
        All the features you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
          A streamlined solution offering all the essential features you need for seamless performance.
          </p>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          {features.map(({ title, description }) => (
            <Feature title={title} description={description} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};