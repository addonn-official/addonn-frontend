// import React from "react";
// import Link from "next/link";
// import "./comparison.css";

// const ComparisonTable = ({ settings }) => {
//   if (!settings) return null;

//   const { heading, features, providers, site } = settings;

//   const logoSrc = site?.logo?.url || site?.logo || null;

//   const keyMap = {
//     "Know Your Tutor Before Joining": "know_tutor",
//     "Curriculum": "curriculum",
//     "Course Updates": "updates",
//     "Resume Help": "resume_help",
//     "Community": "community",
//     "Pricing": "pricing",
//     "Refund Policy": "refund"
//   };

//   const labelMap = {
//     "Know Your Tutor Before Joining": "Tutor Before Joining"
//   };

//   const normalizeKey = (text) => text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "") || "";

//   const getProviderValue = (provider, feature) => {
//     const data = provider.data || {};
//     const dataKey = keyMap[feature] || Object.keys(data).find((key) => normalizeKey(key) === normalizeKey(feature));
//     if (dataKey && data[dataKey] !== undefined) {
//       return data[dataKey];
//     }

//     const fallbackKey = Object.keys(data).find((key) => normalizeKey(feature).includes(normalizeKey(key)) || normalizeKey(key).includes(normalizeKey(feature)));
//     return fallbackKey ? data[fallbackKey] : provider.data?.[feature] ?? "—";
//   };

//   const getDisplayFeature = (feature) => labelMap[feature] || feature;

//   return (
//     <div className="comparison-section container my-5">
//       <div className="section-title text-center mb-3">
//         {settings?.subTitle && (
//           <span className="subtitle bg-primary-opacity">
//             {settings.subTitle}
//           </span>
//         )}
//         <h2 className="title fw-bold">
//           {heading}
//         </h2>
//       </div>

//       <div className="row justify-content-center">
//         <div className="col-md-10">

//           <div className="table-responsive">
//             <table className="table align-middle text-center comparison-table">
//               <thead>
//                 <tr>
//                   <th className="non-highlight-column"></th>
//                   {providers.map((provider, index) => (
//                     <th key={index} className={provider.highlight === "1" ? "highlight-column" : "non-highlight-column"}>
//                       {index === 0 && logoSrc ? (
//                         <div className="comparison-provider-logo">
//                           <img src={logoSrc} alt={provider.name} />
//                         </div>
//                       ) : (
//                         <h5 className="fw-bold">{provider.name}</h5>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {features.map((feature, featureIndex) => {
//                   const displayFeature = getDisplayFeature(feature);
//                   return (
//                     <tr key={featureIndex}>
//                       <td className="text-start">{displayFeature}</td>
//                       {providers.map((provider, providerIndex) => {
//                         const value = getProviderValue(provider, feature);
//                         const isCheck = value.includes("✅");
//                         const isCross = value.includes("❌");

//                         return (
//                           <td key={providerIndex} className={provider.highlight === "1" ? "highlight-column" : "non-highlight-column"}>
//                             {isCheck ? <span className="text-success">{value}</span> :
//                               isCross ? <span className="text-danger">{value}</span> :
//                                 value}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//                 <tr>
//                   <td className="non-highlight-column"></td>
//                   {providers.map((provider, index) => (
//                     <td key={index} className={provider.highlight === "1" ? "highlight-column" : "non-highlight-column"}>
//                       {provider.highlight === "1" && (
//                         <Link href="#live-courses" className="btn btn-primary px-4 rounded-pill">
//                           Explore
//                         </Link>
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default ComparisonTable;



"use client";

import React from "react";
import Link from "next/link";
import "./comparison.css";

const ComparisonTable = ({ settings }) => {
  if (!settings) return null;

  const { heading, features = [], providers = [], site } = settings;

  const logoSrc = site?.logo?.url || site?.logo || null;

  // const keyMap = {
  //   "Know Your Tutor Before Joining": "know_tutor",
  //   Curriculum: "curriculum",
  //   "Course Updates": "updates",
  //   "Resume Help": "resume_help",
  //   Community: "community",
  //   Pricing: "pricing",
  //   "Refund Policy": "refund",
  // };

  const labelMap = {
    "Know Your Tutor Before Joining": "Know Your Tutor Before Joining",
  };

  const normalizeKey = (text) =>
    text?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "") || "";

  const getProviderValue = (provider, feature) => {
    const data = provider.data || {};

    // const dataKey =
    //   keyMap[feature] ||
    //   Object.keys(data).find(
    //     (key) => normalizeKey(key) === normalizeKey(feature)
    //   );

    // if (dataKey && data[dataKey] !== undefined) {
    //   return data[dataKey];
    // }

    const fallbackKey = Object.keys(data).find(
      (key) =>
        normalizeKey(feature).includes(normalizeKey(key)) ||
        normalizeKey(key).includes(normalizeKey(feature))
    );

    return fallbackKey
      ? data[fallbackKey]
      : provider.data?.[feature] ?? "—";
  };

  // const getDisplayFeature = (feature) =>
  //   labelMap[feature] || feature;

  return (
    <section className="comparison-section bg-color-extra2 ">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="comparison-title-wrapper">
          {settings?.subTitle && (
            <span className="comparison-subtitle">
              {settings?.subTitle}
            </span>
          )}
          <h2 className="comparison-title">{heading}</h2>
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
                    <span>MOST POPULAR</span>
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
                  const value = getProviderValue(provider, feature);

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
                {provider.highlight === "1" && <Link
                  href="#live-courses"
                  className={`choose-btn ${provider.highlight === "1" ? "active-btn" : ""}`}
                >
                  Explore
                </Link>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;