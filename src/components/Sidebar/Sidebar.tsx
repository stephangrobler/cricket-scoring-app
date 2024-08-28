import React, { FC, useState } from 'react';
import styles from './Sidebar.module.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoutes';
import AppTabsComponent from '../AppTabsComponent';
import { BiCricketBall } from "react-icons/bi";
import { Session } from '@supabase/supabase-js';
import { useAuth } from '../../contexts/AuthProvider';
import Home from '../Home/Home';

interface SidebarProps {
  session?: Session | null;
}

const Sidebar: FC<SidebarProps> = () => {
  const {session} = useAuth();

  return (
  
  <div className={styles.Sidebar}> 

    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <a href="/">
            <div><BiCricketBall />&nbsp;Crickety</div>
            </a>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li><a>Matches</a></li>
              <li><a>Teams</a></li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            
              <Route path="/app" element={
                <ProtectedRoute >
                  <AppTabsComponent />
                </ProtectedRoute>} />
            <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  </div>
);
}

export default Sidebar;
