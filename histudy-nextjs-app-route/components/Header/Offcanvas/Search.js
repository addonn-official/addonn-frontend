"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { searchCourses } from "@/redux/action/CourseAction";
import { useAppContext } from "@/context/Context";

const Search = () => {
  const { search } = useAppContext();
  const [searchCours, setSearchCours] = useState("");

  const dispatch = useDispatch();

  const { courses = [], loading, error, } = useSelector((state) => state.courseReducer);

  useEffect(() => {
    const keyword = searchCours.trim();

    if (keyword.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchCourses(keyword));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchCours, dispatch]);

  const handleSearch = (e) => {
    setSearchCours(e.target.value);
  };

  return (
    <div className={`rbt-search-dropdown ${!search ? "active" : ""}`}>
      <div className="wrapper">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchCours}
                onChange={handleSearch}
                autoComplete="off"
              />
            </form>
          </div>
        </div>

        {searchCours.trim().length >= 2 && (
          <>
            <div className="rbt-separator-mid">
              <hr className="rbt-separator m-0" />
            </div>

            <div className="row g-4 pt--30 pb--60">
              <div className="col-lg-12">
                <div className="section-title">
                  <h5 className="rbt-title-style-2">
                    Search Results
                  </h5>
                </div>
              </div>

              {loading && (
                <div className="col-12 text-center">
                  <p>Searching courses...</p>
                </div>
              )}

              {/* {!loading && error && (
                <div className="col-12 text-center">
                  <p>Failed to load courses.</p>
                </div>
              )} */}

              {!loading &&
                !error &&
                courses?.length === 0 && (
                  <div className="col-12 text-center">
                    <p>No courses found.</p>
                  </div>
                )}

              {!loading && courses?.length > 0 && courses.map((course) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12"
                  key={course?.id}
                >
                  <div className="rbt-card variation-01 rbt-hover">
                    <div className="rbt-card-img">
                      <Link
                        href={`/course-details/${course?.slug}`}
                      >
                        <Image
                          src={
                            course?.file?.url ||
                            "/images/course/course-online-01.jpg"
                          }
                          width={186}
                          height={128}
                          alt={course?.title || "Course"}
                          unoptimized
                        />
                      </Link>
                    </div>

                    <div className="rbt-card-body">
                      <h5 className="rbt-card-title">
                        <Link
                          href={`/course-details/${course?.slug}`}
                        >
                          {course?.title}
                        </Link>
                      </h5>

                      <div className="rbt-review">
                        <div className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>

                        <span className="rating-count">
                          ({course?.total_star_ratings || 0}
                          Reviews)
                        </span>
                      </div>

                      <div className="rbt-card-bottom">
                        <div className="rbt-price">
                          <span className="current-price">
                            ₹ <span className="mx-1">{course?.course_type !== 'free' ? course?.discounted_price : "Free"}</span>
                          </span>

                          {course?.actual_price && (
                            <span className="off-price">
                              ₹{course?.actual_price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;