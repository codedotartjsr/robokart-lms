import "./assets/scss/globals.scss";
import "./assets/scss/theme.scss";
import { Inter } from "next/font/google";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import DirectionProvider from "@/provider/direction.provider";
import AuthWrapper from "@/provider/AuthWrapper";
// import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Robokart - LMS",
    template: `Robokart - LMS`,
  },
  description: "Robokart - LMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthWrapper>
            {/* <AuthProvider> */}
              <DirectionProvider>{children}</DirectionProvider>
            {/* </AuthProvider> */}
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
