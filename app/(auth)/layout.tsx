import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
}

export default AuthLayout;
