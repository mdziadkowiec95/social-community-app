import React from 'react'
import { Link, Outlet } from 'react-router-dom';


export const AppRoot = () => {
    return (
        <div>
            <nav>
                <Link to='dashboard'>Dashboard</Link>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
