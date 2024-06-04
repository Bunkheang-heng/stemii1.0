import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-white">Stemii Learning STEM</h2>
            <p className="text-gray-400 leading-relaxed">
              Stemii is a platform to learn and explore Science, Technology, Engineering, and Mathematics (STEM) with a focus on coding. We provide interactive tutorials, project ideas, and engaging content to make your learning journey fun and effective.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-white">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a href="/aboutus" className="hover:text-white transition duration-300">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/services" className="hover:text-white transition duration-300">Services</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:text-white transition duration-300">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61554863848731" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.735 0-1.325.59-1.325 1.325v21.351c0 .734.59 1.324 1.325 1.324h11.491v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.787 4.656-4.787 1.324 0 2.463.098 2.795.143v3.237l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.314h3.587l-.467 3.622h-3.12v9.294h6.116c.735 0 1.325-.59 1.325-1.325v-21.35c0-.735-.59-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-2.168-.12-4.363-.12-6.531-.12h-.171c-2.168 0-4.363 0-6.531.12-2.354.131-3.9 1.708-4.052 4.052-.12 2.168-.12 4.363-.12 6.531v.171c0 2.168 0 4.363.12 6.531.131 2.354 1.708 3.9 4.052 4.052 2.168.12 4.363.12 6.531.12h.171c2.168 0 4.363 0 6.531-.12 2.354-.131 3.9-1.708 4.052-4.052.12-2.168.12-4.363.12-6.531v-.171c0-2.168 0-4.363-.12-6.531-.131-2.354-1.708-3.9-4.052-4.052zm-11.615 13.734v-9.875l8.392 4.937-8.392 4.938z"/>
                </svg>
              </a>
              <a href="https://t.me/STEMiiiii" className="hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm4.991 8.671l-1.604 7.543c-.121.527-.438.656-.886.41l-2.435-1.799-1.175 1.131c-.129.129-.238.238-.487.238l.174-2.489 4.52-4.075c.199-.174-.044-.271-.309-.097l-5.594 3.522-2.412-.754c-.525-.174-.538-.527.109-.775l9.44-3.643c.438-.174.82.097.669.753z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 STEMII. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
