"use client";

import Image from "next/image";
import Link from "next/link";

import { useParallax } from "react-scroll-parallax";

const About = ({ props }) => {
  const { ref: ref3, style: style3 } = useParallax({ translateY: [0, 20], });
  
  return (
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <div className="thumbnail-wrapper">

            <div className={`thumbnail image-3`} ref={ref3} >
              <Image
                src={props?.img_1}
                width={405}
                height={490}
                alt="Education Images"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="inner pl--50 pl_sm--0 pl_md--0">
            <div className="section-title text-start">
              <span className="subtitle bg-coral-opacity">KNOW ABOUT US</span>
              <h2 className="title">
                {props?.title} <br />
              </h2>
              {props?.body}
            </div>
            <div className="about-btn mt--40">
              <Link
                className="rbt-btn btn-gradient hover-icon-reverse"
                href="#"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">More About Us</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
