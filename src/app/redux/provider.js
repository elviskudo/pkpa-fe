"use client";

import { Provider } from "react-redux";
import store from "./store";
import Topbar from "@/components/User/Topbar";

export default function ForumProvider({ children }) {
  return (
    <Provider store={store}>
      <Topbar />
      <div>
        <main>{children}</main>
      </div>
    </Provider>
  );
}   