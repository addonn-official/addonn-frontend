"use client";

import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import BreadCrumb from "@/components/Common/BreadCrumb";
import CartPage from "@/components/Cart/CartPage";
import Separator from "@/components/Common/Separator";
import FooterThree from "@/components/Footer/Footer-Three";

const CartPageLayout = () => {
  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />
          <BreadCrumb title="Cart" text="Cart" />
          <div className="rbt-cart-area bg-color-white rbt-section-gap">
            <CartPage />
          </div>

          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default CartPageLayout;
