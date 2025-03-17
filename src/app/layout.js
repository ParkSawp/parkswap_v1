import React from 'react';
import "../../public/css/style.css";

export const metadata = {
  // title: "ParkSwap",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <link rel="icon" href="/img/main_logo_white.png" sizes="any" />
      {children}
    </html>
  );
}