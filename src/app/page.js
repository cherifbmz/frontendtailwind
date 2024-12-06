import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[url('/images/houses.jpg')] bg-cover bg-center text-white py-32">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Buying and <br />
            <span className="text-blue-400">Selling</span> Houses.
            <br />
            Welcome
          </h1>
          <p className="text-lg mb-10 leading-relaxed">
            All people are looking for an easy way to buy or sell their home, and this is what we offer you in{' '}
            <span className="text-blue-400 font-bold">HomePursuit</span>, where you can find what you are looking for by
            various specifications, sizes, and places.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
            <Link href="/signup">JOIN US</Link>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {/* Card 1 */}
          <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transform transition hover:-translate-y-2">
            <div className="text-blue-600 mb-4">
              <i className="fa-solid fa-dollar-sign text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">Buying and Selling Facilitation</h3>
            <p className="text-gray-600">Supports buyers and sellers' transactions efficiently and securely.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-2xl transform transition hover:-translate-y-2">
            <div className="text-blue-600 mb-4">
              <i className="fa-solid fa-camera text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">Property Listing and Marketing</h3>
            <p className="text-gray-600">Attractive property showcases through professional photography.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <h2 className="text-4xl font-extrabold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {/* Phone Card */}
          <div className="bg-gray-800 shadow-xl rounded-lg p-6 hover:shadow-2xl transform transition hover:-translate-y-2">
            <div className="text-blue-400 mb-4">
              <i className="fa-solid fa-phone text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">Phone</h3>
            <p>+213 *** ** ** **</p>
          </div>

          {/* Email Card */}
          <div className="bg-gray-800 shadow-xl rounded-lg p-6 hover:shadow-2xl transform transition hover:-translate-y-2">
            <div className="text-blue-400 mb-4">
              <i className="fa-solid fa-envelope text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p>HomePursuit@gmail.com</p>
          </div>
        </div>
      </section>
    </>
  );
}
