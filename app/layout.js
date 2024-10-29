import { Provider } from "./provider/provider";
import "./ui/globals.css";
import { inter } from "./ui/fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#191919]`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
