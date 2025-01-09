import '@/styles/globals.css';
import Navbar from '@components/navbar';
import Provider from '@components/provider';
export const metadata = {
  title: "Fit Manage",
  description: "Generated by create next app",
  icons: {
    icon: "/logo/logo.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  );
}
