import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Navigation } from './Navigation';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navigation />
      <main className="container mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};