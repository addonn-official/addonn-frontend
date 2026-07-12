import Image from "next/image";
import Link from "next/link";

import SingleFooter from "./FooterProps/SingleFooter";
import CopyRight from "./CopyRight";
import { useAppContext } from "@/context/Context";
import { useSettings } from "@/context/SettingsContext";

const FooterThree = () => {
  const { isLightTheme } = useAppContext();
  const { settings } = useSettings();

  const footerSetting = settings?.footer || {};
  const footerSocial = settings?.social_links || {};
  const site = settings?.site

  const icons = {
    // facebook: "feather-facebook",
    instagram: "feather-instagram",
    linkedin: "feather-linkedin",
    whatsapp: "feather-message-circle",
    youtube: "feather-youtube",
    // github: "feather-github",
  };

  return (
    <>
      <footer className="rbt-footer footer-style-1">
        <div className="footer-top">
          <div className="container">
            <div className="row row--15">
              {/* Logo + Description */}
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 mt--30">
                <div className="footer-widget">
                  <div className="logo">
                    <Link href="/">
                      {isLightTheme ? (
                        <Image
                          src={site?.logo || "/images/logo/logo.png"}
                          width={152}
                          height={50}
                          priority
                          alt="Logo"
                        />
                      ) : (
                        <Image
                          src={site?.logo || '/images/logo/logo.png'}
                          width={152}
                          height={50}
                          priority
                          alt="Logo"
                        />
                      )}
                    </Link>
                  </div>

                  <p className="description mt--20">
                    {footerSetting?.description}
                  </p>

                  <div className="contact-btn mt--30">
                    <Link
                      className="rbt-btn hover-icon-reverse btn-border-gradient radius-round"
                      href="/contact"
                    >
                      <div className="icon-reverse-wrapper">
                        <span className="btn-text">
                          Contact With Us
                        </span>

                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>

                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dynamic Footer Menus */}
              {footerSetting?.menus?.map((menu, index) => (
                <SingleFooter
                  key={index}
                  classOne={
                    menu.heading === "Courses"
                      ? "col-lg-2 col-md-6 col-sm-6 col-12 mt--30"
                      : "col-lg-2 col-md-6 col-sm-6 col-12 mt--30"
                  }
                  title={menu.heading}
                  footerType={menu}
                  footerSocial={
                    menu.heading === "Contact" ? footerSocial : null
                  }
                  icons={icons}
                />
              ))}

              {/* Social Links Row */}
              <div className="col-12">
                <ul className="social-icon social-default icon-naked d-flex justify-content-end">
                  {Object.entries(footerSocial || {}).map(
                    ([platform, url]) => (
                      <li key={platform}>
                        <Link
                          href={url?.startsWith("http") ? url : `https://${url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className={icons[platform]}></i>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CopyRight />
    </>
  );
};

export default FooterThree;