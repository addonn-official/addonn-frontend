"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import FooterThree from "@/components/Footer/Footer-Three";
import RefundPolicy from "@/components/Refund-policy/RefundPolicy";

const RefundPolicyPage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />

          <RefundPolicy />

          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default RefundPolicyPage;
