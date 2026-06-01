"use client";

import Context from "@/context/Context";
import Link from "next/link";
import { Provider } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import Store from "@/redux/store";

import Banner from "@/components/About-Us-01/Banner";
import About from "@/components/Abouts/About";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";

import FooterThree from "@/components/Footer/Footer-Three";
import { useSettings } from "@/context/SettingsContext";

import ServiceSplash from "@/components/Services/ServiceSplash";
import Counter from "@/components/Counters/Counter";
import EventCarouse from "@/components/Events/EventCarouse";
import ReviewSection from "@/components/Reviews/ReviewSection";
import ComparisonTable from "@/components/Addon/ComparisonTable";
import TeamTwo from "@/components/Team/TeamTwo";
import ContactForm from "@/components/Contacts/Contact-Form";

const AboutUsPage = () => {

  // Use centralized settings from SettingsContext — avoids duplicate API call
  const { settings: homeSettings, loading } = useSettings();

  console.log('homeSettings>>>>', homeSettings?.aboutus_section);


  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="rbt-sticky" headerType="" />
          <MobileMenu />
          <Cart />

          <div
            className="slider-area rbt-banner-10 height-750 bg_image bg_image--11"
            data-black-overlay="5"
            style={{
              backgroundImage: `url(${homeSettings?.aboutus_section?.bg_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "600px",
              width: "100%"
            }}
          >
            <Banner props={homeSettings?.aboutus_section} />
          </div>
          <div id="about" className="rbt-about-area about-style-1 bg-color-white rbt-section-gapTop">
            <ParallaxProvider>
              <About props={homeSettings?.aboutus_section} />
            </ParallaxProvider>
          </div>


          {/* Why Us */}
          {homeSettings.whyus_section ? (
            <div className="rbt-splash-service-area rbt-section-gapBottom">
              <div className="container">
                <ServiceSplash settings={{ ...homeSettings.whyus_section, subTitle: "Why Choose Us" }} />
              </div>
            </div>
          ) : (
            !loading && <div className="container my-5"><p className="text-center">whyus_section I didn't find</p></div>
          )}



          {/* AddOnn In Numbers (Counter) */}
          <div className="rbt-counterup-area bg-color-extra2 rbt-section-gapBottom default-callto-action-overlap" style={{ paddingTop: '60px' }}>
            <div className="container">
              {homeSettings.counters ? (
                <Counter isDesc={false} settings={{ ...homeSettings.counters, subTitle: "Our Achievement" }} />
              ) : !loading ? (
                <p className="text-center">counters I didn't find</p>
              ) : null}
            </div>
          </div>


          {/* <AddonAdvantage /> */}
          {homeSettings.comparison ? (
            <ComparisonTable settings={{ ...homeSettings.comparison, subTitle: "Why We Are Best", site: homeSettings.site }} />
          ) : !loading ? (
            <div className="container mt-5 mb-5"><p className="text-center">comparison I didn't find</p></div>
          ) : null}

          {/* Reviews */}
          <div className="rbt-testimonial-area rbt-section-gap overflow-hidden">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-3 left-content">
                  <div className="section-title">
                    <span className="subtitle bg-primary-opacity">
                      EDUCATION FOR EVERYONE
                    </span>
                    <h2 className="title">
                      What Our <br /> Learners Say
                    </h2>
                  </div>
                  <p className="mt--20">Learning communicate to global world and build a bright future with our histudy.</p>
                  <div className="mt--30">
                    <Link href="/review" className="rbt-btn btn-gradient">
                      View All Reviews
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="testimonial-cards-wrapper" style={{ width: "100vw" }}>
                    <ReviewSection />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="rbt-event-area rbt-section-gap bg-gradient-3">
            <div className="container">
              <div className="row mb--55">
                <div className="section-title text-center">
                  <span className="subtitle bg-white-opacity">
                    STIMULATED TO TAKE PART IN?
                  </span>
                  <h2 className="title color-white">Testimonials</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <EventCarouse />
                </div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="rbt-team-area bg-color-white rbt-section-gap">
            <div className="container">
              {/* <div className="row mb--60">
							<div className="col-lg-12">
								<div className="section-title text-center">
									<span className="subtitle bg-primary-opacity">
										Our Teacher
									</span>
									<h2 className="title">Whose Inspirations You</h2>
								</div>
							</div>
						</div> */}
              <TeamTwo />
            </div>
          </div>



          {/* Contact Us */}
          <div className="rbt-contact-area bg-color-extra2 rbt-section-gap">
            <ContactForm />
          </div>





          {/* <div className="rbt-video-area rbt-section-gapBottom pt--50 bg-color-white">
            <div className="container">
              <SplitTwo isImg={false} />
            </div>
          </div>
          <div className="rbt-testimonial-area bg-color-white rbt-section-gapBottom overflow-hidden">
            <div className="container-fluid">
              <div className="row g-5 align-items-center">
                <div className="col-xl-3">
                  <div className="section-title pl--100 pl_md--30 pl_sm--0">
                    <span className="subtitle bg-pink-opacity">
                      Learners Feedback
                    </span>
                    <h2 className="title">What Our Learners Say</h2>
                    <p className="description mt--20">
                      Learning communicate to global world and build a bright
                      future with our histudy.
                    </p>
                    <div className="veiw-more-btn mt--20">
                      <Link
                        className="rbt-btn btn-gradient rbt-marquee-btn marquee-text-y"
                        href="#"
                      >
                        <span data-text="Marquee Y">Contact Us</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <TestimonialSix />
              </div>
            </div>
          </div>
          <Teacher />
          <div className="rbt-newsletter-area newsletter-style-2 bg-color-primary rbt-section-gap">
            <NewsletterTwo />
          </div> */}

          {/* <FooterOne /> */}
          <FooterThree />
        </Context>
      </Provider>
    </>
  );
};

export default AboutUsPage;
