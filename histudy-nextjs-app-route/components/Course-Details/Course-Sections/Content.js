import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/storage";
import { getLocalStorageToken } from "@/utils/common.util";
import { useAppContext } from "@/context/Context";
import toast from "react-hot-toast";

import "venobox/dist/venobox.min.css";
import Swal from "sweetalert2";

import { UserOrderServices } from "@/services/User";
import { getUser } from "@/utils/storage";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "@/redux/action/CartAction";

const Content = ({ checkMatchCourses, courseSlug, lesson, course_id, courseData }) => {

  const router = useRouter();
  const { userData, fetchUserProfile } = useAppContext();
  const [expandedLessons, setExpandedLessons] = React.useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);



  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.CartReducer);

  const { cartToggle, setCart } = useAppContext();

  const amount = 1;


  const addToCartFun = (id, amount, product) => {
    dispatch(addToCartAction(id, amount, product));
    setCart(!cartToggle);
  };

  const token = getLocalStorageToken() || getToken();
  const isLoggedIn = Boolean(token);
  const isEnrolled = Boolean(
    userData?.active_enrollments?.some((enrollment) =>
      String(enrollment.course_id || enrollment.course?.id || enrollment.course?.course_id || enrollment.course?.course_id || enrollment.course?.slug) ===
      String(checkMatchCourses?.id) ||
      String(enrollment.course?.slug || enrollment.course_slug) === String(courseSlug)
    )
  );

  useEffect(() => {
    if (isLoggedIn && userData === null) {
      fetchUserProfile();
    }
  }, [isLoggedIn, userData, fetchUserProfile]);

  const toggleLessonSummary = (e, lessonId) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleLessonClick = async (e, list, lessonId) => {
    e.preventDefault();
    e.stopPropagation();
    const token = getLocalStorageToken() || getToken();
    const hasAccess = list.status || (isLoggedIn && isEnrolled);

    // console.log(`/lesson?course_slug=${courseSlug}&topic_id=${list.topicId}&content_id=${list.contentId}`);
    // console.log({ hasAccess });


    // if (!token && !list.status) {
    //   toast.error("Please login first to access course lessons.");
    //   router.push("/login");
    //   return;
    // }

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    // if (list.summary) {
    //   if (!expandedLessons.includes(lessonId)) {
    //     setExpandedLessons((prev) => [...prev, lessonId]);
    //   }
    //   return;
    // }

    // Summary hai aur abhi expand nahi hai
    if (list.summary && !expandedLessons.includes(lessonId)) {
      setExpandedLessons((prev) => [...prev, lessonId]);
      return;
    }

    if (hasAccess) {
      console.log("BEFORE PUSH");

      router.push(`/lesson?course_slug=${courseSlug}&topic_id=${list.topicId}&content_id=${list.contentId}`);
      console.log("AFTER PUSH");

      return;
    }

    // router.push(`/checkout?id=${courseSlug}`);

    const result = await Swal.fire({
      title: "Enroll Required",
      text: "Unlock full access by enrolling in the course.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Enroll Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2f57ef",
      cancelButtonColor: "#6c757d",
    });

    if (result.isConfirmed) {
      await handleEnrollCourse();
    }
  };


  const handleEnrollCourse = async () => {
    try {
      const token = getLocalStorageToken() || getToken();
      const user = getUser();

      if (!token || !user) {
        router.push("/login");
        return;
      }

      // Paid Course
      if (Number(courseData.price) > 0) {

        const itemInCart = cart.find(
          (item) => item.id === courseData.id
        );

        if (!itemInCart) {
          addToCartFun(
            courseData.id,
            amount,
            courseData
          );
        }

        window.location.href = `/checkout?id=${courseData.id}`;
        return;
      }

      // ==========================
      // Free Course
      // ==========================

      const orderPayload = {
        order_status: "create_order",
        courses: [courseData.id],
        bundles: [],
        coupon_code: "",
        order_sub_total: 0,
        order_total: 0,
      };

      const createRes = await UserOrderServices.placeOrder(orderPayload);

      if (createRes?.status !== "success") {
        throw new Error(createRes?.message || "Unable to create order.");
      }

      const verifyRes = await UserOrderServices.placeOrder({
        ...orderPayload,
        order_status: "verify_order_payment",
        gateway_amount: 0,
        gateway_currency: "INR",
        gateway_order_id: null,
        gateway_payment_id: null,
        gateway_signature: null,
      });

      if (verifyRes?.status !== "success") {
        throw new Error(
          verifyRes?.message || "Unable to enroll in free course."
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Course enrolled successfully.",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      await fetchUserProfile();

      router.push("/instructor-enrolled-course");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong.",
      });
    }
  };



  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".popup-video",
      });
    });
  }, [checkMatchCourses.contentList]);

  return (
    <>
      <div className="rbt-course-feature-inner udemy-curriculum">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Course Content</h4>
        </div>
        <div className="rbt-accordion-style rbt-accordion-02 accordion">
          <div className="accordion" id="accordionExampleb2">

            {checkMatchCourses.contentList.map((item, innerIndex) => (

              < div className="accordion-item card" key={innerIndex} >
                <h2
                  className="accordion-header card-header"
                  id={`headingTwo${innerIndex}`}
                >
                  <button className={`accordion-button ${!item.collapsed ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseTwo${innerIndex + 1}`}
                    aria-expanded={item.expand}
                    aria-controls={`collapseTwo${innerIndex + 1}`}
                  >
                    <span className="accordion-title-left">
                      <i className="feather-chevron-down mr--10"></i>
                      {item.title}
                    </span>
                    <span className="accordion-title-right">
                      {item.listItem?.length > 0 && (
                        <span className="lec-count">
                          {item?.numberOfLactures} lecture{item?.numberOfLactures > 1 ? "s" : ""}
                        </span>
                      )}
                      {item.time && (
                        <span className="section-time">{item?.totalDuration}</span>
                      )}
                    </span>
                  </button>
                </h2>
                <div
                  id={`collapseTwo${innerIndex + 1}`}
                  className={`accordion-collapse collapse ${item.isShow ? "show" : ""
                    }`}
                  aria-labelledby={`headingTwo${innerIndex}`}
                >
                  <div className="accordion-body card-body pr--0 pb--0">
                    <ul className="rbt-course-main-content liststyle">
                      {item.listItem.map((list, subIndex) => {
                        const lessonId = `lesson-${innerIndex}-${subIndex}`;
                        const isExpanded = expandedLessons.includes(lessonId);
                        const hasPreview = list.status && typeof list.preview_url === "string" && list.preview_url.trim().length > 0;

                        return (
                          <li key={subIndex} className={isExpanded ? "item-expanded" : ""}                          >
                            <a
                              href="#"
                              replace
                              scroll={false}
                              className={`course-content-link ${!list.status && !isEnrolled ? "disabled-lesson" : ""}`}
                              title={!isLoggedIn && !list.status ? "Login required" : !list.status && !isEnrolled ? "Enroll to unlock lessons" : ""}
                              aria-disabled={!list.status && !isEnrolled}
                              // onClick={(e) => handleLessonClick(e, list, lessonId)}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation?.();
                                handleLessonClick(e, list, lessonId);
                              }}
                              style={{ display: "block" }}
                            >
                              <div className="course-content-left-outer w-100">
                                <div className="course-content-left">
                                  <i className={list.icon || "feather-play-circle"}></i>
                                  <div className="course-content-text-wrap d-flex flex-column align-items-start text-start">
                                    <div className="text-toggle-wrap">
                                      <span className="text">{list.text}</span>
                                      {list.summary && (
                                        <button
                                          type="button"
                                          className={`summary-toggle-btn ${isExpanded ? "active" : ""}`}
                                          aria-label={isExpanded ? "Collapse summary" : "Expand summary"}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.scheckMatchCoursestopPropagation();
                                            toggleLessonSummary(e, lessonId);
                                          }}
                                        >
                                          <i className="feather-chevron-down"></i>
                                        </button>
                                      )}
                                    </div>
                                    {list.summary && isExpanded && (
                                      <div className="lesson-summary-content mt--5"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          router.push(
                                            `/lesson?course_slug=${courseSlug}&topic_id=${list.topicId}&content_id=${list.contentId}`
                                          );
                                        }}
                                      >
                                        <p style={{ fontSize: "14px" }}>{list.summary}</p>

                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="course-content-right">
                                  {hasPreview && (
                                    <span
                                      className="preview-text popup-video"
                                      data-vbtype="video"
                                      href={list.videoUrl}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                    >
                                      Preview
                                    </span>
                                  )}
                                  {(!hasPreview && list.time) && (
                                    <span className="min-lable">{list.time}</span>
                                  )}
                                  {!list.status && (
                                    <span className="course-lock">
                                      <i className="feather-lock"></i>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >

      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h5 style={{ color: "#111827" }}>Login Required</h5>

            <p style={{ color: "#4b5563" }}>
              To see this content, you need to be logged in.
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                className="rbt-btn btn-border"
                onClick={() => setShowLoginModal(false)}
              >
                No
              </button>

              <button
                className="rbt-btn"
                onClick={() => {
                  setShowLoginModal(false);
                  router.push("/login");
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Content;
