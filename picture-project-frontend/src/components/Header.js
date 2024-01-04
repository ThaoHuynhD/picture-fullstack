import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const routes = [
        { path: "/home", label: "Open Album" },
        { path: "/picture", label: "Add Image" },
    ];

    return (
        <div className='header bg-black'>
            {routes.map((route, index) => (
                <NavLink key={index} to={route.path} className="btn-orange w-1/3">
                    {route.label}
                </NavLink>
            ))}
        </div>
    );
}