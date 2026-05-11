import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import './App.css'

const App = () => (
    <>
        <Toaster
            position="top-right"
            toastOptions={{
                style: { background: '#1f2937', color: '#f9fafb', border: '1px solid #374151' },
            }}
        />
        <Dashboard />
    </>
);

export default App
