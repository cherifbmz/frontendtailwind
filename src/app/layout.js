import './globals.css';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'HomePursuit',
  description: 'Your house renting and buying solution',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          {children} {/* Injects page content */}
          <footer className="bg-gray-900 text-white py-4 text-center">
            <p className="text-sm">
              HomePursuit &copy; {new Date().getFullYear()}
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://www.facebook.com/" className="text-blue-500">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.twitter.com/" className="text-blue-400">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/" className="text-pink-500">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/" className="text-red-500">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
