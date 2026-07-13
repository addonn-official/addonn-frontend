"use client";

import React from "react";
import Link from "next/link";
import "./comparison.css";
import { useAppContext } from "@/context/Context";

const ComparisonTable = ({ settings }) => {
  if (!settings) return null;
  const { isLightTheme } = useAppContext();

  const { heading, features = [], providers = [], site } = settings;

  const logoSrc = site?.logo?.url || site?.logo || null;


  const scrollToCourses = (e) => {
    e.preventDefault();

    const section = document.getElementById("top-popular-course");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // const normalizeKey = (text) =>
  //   text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "") || "";

  const featureKeyMap = {
    "Know Your Tutor Before Joining": "know_tutor",
    "Curriculum": "curriculum",
    "Course Updates": "updates",
    "Resume Help": "resume_help",
    "Community": "community",
    "Pricing": "pricing",
    "Refund Policy": "refund",
  };

  // const getProviderValue = (provider, feature) => {
  //   const key = featureKeyMap[feature];

  //   return provider?.data?.[key] ?? "—";
  // };

  const getProviderValue = (provider, feature, featureIndex) => {
    const data = provider?.data || {};

    const values = Object.values(data);

    return values[featureIndex] ?? "—";
  };

  return (
    <section className="comparison-section bg-color-extra2 ">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="section-title text-center">
          {settings?.subTitle && (
            <span className="subtitle bg-secondry-opacity" style={{ color: '#f5f5f5fc', backgroundColor: "#eb9d4bfc" }}>
              {settings?.subTitle}
            </span>
          )}
          <h2 className={`comparison-title${isLightTheme && 'text-dark'}`}>{heading}</h2>
        </div>

        {/* COMPARISON GRID */}
        <div className="comparison-wrapper">

          {/* FEATURE COLUMN */}
          <div className="feature-column">

            <div className="feature-header"></div>

            {features.map((feature, index) => (
              <div className="feature-item" key={index}>
                {/* {getDisplayFeature(feature)} */}
                {feature}
              </div>
            ))}

            <div className="feature-footer"></div>
          </div>

          {/* PROVIDER CARDS */}
          {providers.map((provider, providerIndex) => (
            <div
              key={providerIndex}
              className={`pricing-card ${provider.highlight === "1" ? "active-card" : ""}`}
            >
              {provider.highlight === "1" && (
                <div className="popular-badge">
                  <span>BEST CHOICE</span>
                </div>
              )}

              {/* CARD HEADER */}
              <div className="card-header-custom">
                {providerIndex === 0 && logoSrc ? (
                  <div className="comparison-provider-logo">
                    <img
                      src={logoSrc}
                      alt={provider.name}
                    />
                  </div>
                ) : (
                  <h3>{provider.name}</h3>
                )}
              </div>

              {/* FEATURES */}
              <div className="card-body-custom">
                {features.map((feature, featureIndex) => {
                  // const value = getProviderValue(provider, feature);
                  const value = getProviderValue(
                    provider,
                    feature,
                    featureIndex
                  );

                  const isCheck =
                    typeof value === "string" &&
                    value.includes("✅");

                  const isCross =
                    typeof value === "string" &&
                    value.includes("❌");

                  return (
                    <div
                      className="card-feature"
                      key={featureIndex}
                    >
                      {isCheck ? (
                        <span className="success-text">
                          {value}
                        </span>
                      ) : isCross ? (
                        <span className="danger-text">
                          {value}
                        </span>
                      ) : (
                        <span>{value}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FOOTER */}
              <div className="card-footer-custom">
                {provider.highlight === "1" && <button
                  // href="#live-courses"
                  className={`choose-btn ${provider.highlight === "1" ? "active-btn" : ""}`}
                  onClick={scrollToCourses}
                >
                  Explore
                </button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;