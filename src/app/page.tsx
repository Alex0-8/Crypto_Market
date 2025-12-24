'use client';

import { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import CryptoDetails from "./components/CryptoDetails";

export default function Home() {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <div className="flex h-screen pt-16">
        <SideBar 
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
          searchQuery={searchQuery}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            {selectedCrypto ? (
              <CryptoDetails symbol={selectedCrypto} />
            ) : (
              <div className="text-center py-20">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to Crypto Analyzer
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Select a cryptocurrency from the sidebar to view its details.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}