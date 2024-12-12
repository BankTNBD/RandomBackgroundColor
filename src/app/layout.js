import "./globals.css";

export const metadata = {
  title: "Random Color",
  description: "Random Background Color",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
