import "../../public/css/style.css";

export const metadata = {
  title: "ParkSwap",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
