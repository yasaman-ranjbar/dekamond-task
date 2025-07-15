import localFont from "next/font/local";

export const iranSans = localFont({
    src: [
      {
        path: "../../public/fonts/iransans/IRANSansWeb.woff2",
        weight: "400",
        style: "normal",
      },
    ],
    variable: "--font-iran-sans",
    display: "swap",
  });
