"use client";

import React from "react";
import Image from "next/image";
import { useAppContext } from "../../context/Context";
import { useSettings } from "@/context/SettingsContext";

const InstructorDashboardHeader = () => {

  const { settings, loading } = useSettings();
  const site = settings?.site;

  const { userData, loadingUser } = useAppContext();

  if (loadingUser) return <div className="rbt-dashboard-content-wrapper skeleton" style={{ height: '350px' }}></div>;

  const u = userData || {};
  const prof = u.profile || {};
  const avgRating = u.reviews_avg_rating || 0;
  const reviewsCount = u.reviews_count || 0;
  const totalCouses = u?.total_courses || 0;
  const enrolledCertificatesCount = u?.enrolled_certificates_count || 0;
  console.log('site>>>>>>>', u);


  return (
    <>
      <div className="rbt-dashboard-content-wrapper">
        <div className="tutor-bg-photo "
          style={{
            backgroundImage: `url(${site?.profile_cover_photo})`,
            backgroundSize: "contain", // ya "100% 100%"
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            aspectRatio: "2610 / 700",
            maxHeight: "700px",
          }}
        />

        <div className="rbt-tutor-information">
          <div className="rbt-tutor-information-left">
            <div className="thumbnail rbt-avatars size-lg">
              <Image
                width={300}
                height={300}
                src={prof.file?.url || "/images/team/avatar.jpg"}
                alt={u.name || "Instructor"}
              />
            </div>
            <div className="tutor-content">
              <h5 className="title">{u.name}</h5>
              <div className="course-detail">
                <span className="2">
                  <i className="feather-calendar color-white"></i>
                  <span className="mx-2">{totalCouses} Courses Enroled </span>
                </span>
                <span className="">
                  <i className="feather-award "></i>
                  <span className="mx-2"> {enrolledCertificatesCount} Certificate</span>
                </span>
              </div>
              {/* <div className="rbt-review">
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`${star <= Math.round(avgRating) ? "fas" : "far"} fa-star`}
                      style={{ color: star <= Math.round(avgRating) ? "#E5BA12" : "#e1e1e1" }}
                    />
                  ))}
                </div>
                <span className="rating-count"> ({reviewsCount} Reviews)</span>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default InstructorDashboardHeader;
