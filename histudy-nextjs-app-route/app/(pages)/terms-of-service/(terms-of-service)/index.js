"use client";

import Context from "@/context/Context";
import Store from "@/redux/store";
import { Provider } from "react-redux";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Instagram from "@/components/Instagram/Instagram";
import FooterThree from "@/components/Footer/Footer-Three";
import TermsOfUse from "@/components/Terms-of-use/TermsOfUse";

const TermsOfServicePage = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />

          <TermsOfUse />
          {/* <Instagram /> */}

          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default TermsOfServicePage;
