"use client";
import { Raleway, Open_Sans } from "next/font/google";
import "/public/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { metadata } from "./MetaData";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

export default function AdminLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en" className={`${raleway.variable} ${openSans.variable}`}>
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body>{children}</body>
      </html>
    </Provider>
  );
}
