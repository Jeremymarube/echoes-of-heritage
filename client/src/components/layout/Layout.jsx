

"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from '../common/ErrorBoundary';

const Layout = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;