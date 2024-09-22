'use client';
import React, { useEffect } from 'react';
import { useLogoutFunction } from "@propelauth/react";

const LogoutComponent = () => {
    const logout = useLogoutFunction(false);

    useEffect(() => {
        logout();
        window.location.href = '/'; // Replace with your target route
    }, [logout]);

    return null; // Optionally, you can return some JSX if needed
};

export default LogoutComponent;