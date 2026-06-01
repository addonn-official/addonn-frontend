import Image from "next/image";
import Link from "next/link";

import img from "../../public/images/blog/blog-card-01.jpg";
import bgImg from "../../public/images/bg/bg-image-10.jpg";
import { useSettings } from "@/context/SettingsContext";

const TermsOfUse = () => {
  const { settings, loading } = useSettings();

  return (
    <>
      <div className="rbt-overlay-page-wrapper">
        <div className="breadcrumb-image-container breadcrumb-style-max-width">
          {/* <div className="breadcrumb-image-wrapper">
            <div className="breadcrumb-dark">
              <Image src={bgImg} alt="Education Images" />
            </div>
          </div> */}
          <div className="breadcrumb-content-top text-center">
            <h1 className="title">Terms of service</h1>
            {/* <p className="mb--20">Histudy Course Privacy Policy Here.</p> */}
            <ul className="page-list">
              <li className="rbt-breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li>
                <div className="icon-right">
                  <i className="feather-chevron-right"></i>
                </div>
              </li>
              <li className="rbt-breadcrumb-item active">Terms Of Service</li>
            </ul>
          </div>
        </div>



        <div className="rbt-putchase-guide-area breadcrumb-style-max-width rbt-section-gapBottom">
          <div className="rbt-article-content-wrapper">
            <div className="content">
              <div
                dangerouslySetInnerHTML={{ __html: settings?.terms_of_use?.scalar }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUse;
