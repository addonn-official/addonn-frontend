"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Select from "react-select";
import { showInfo } from "../../utils/swal";

import { useAppContext } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { getSubmissions } from "@/redux/action/SubmissionActions";
import { formatDate, formatDateWithTime } from "@/utils";

const Assignments = () => {
  const { userData, loadingUser } = useAppContext();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const dispatch = useDispatch();
  const { submissions, loading } = useSelector(
    (state) => state.submission
  );

  const courseOptions = useMemo(
    () => [
      ...(userData?.active_enrollments || []).map((en) => ({
        value: en.course?.id || en.course_id,
        label: en.course?.title || "Unknown Course",
      })),
    ],
    [userData]
  );




  const assignments = useMemo(
    () =>
      userData?.assignments ||
      userData?.assignment_submissions ||
      userData?.submissions ||
      userData?.submission_contents ||
      userData?.contents ||
      [],
    [userData]
  );

  const filteredAssignments = useMemo(
    () =>
      (assignments || []).filter((assignment) => {
        if (!selectedCourse?.value) return true;
        const courseId =
          assignment.course_id ||
          assignment.course?.id ||
          assignment.course?.course_id ||
          assignment.courseId ||
          assignment.enrollment?.course_id ||
          assignment.enrollment?.course?.id;
        return String(courseId || "") === String(selectedCourse.value);
      }),
    [assignments, selectedCourse]
  );

  useEffect(() => {
    if (courseOptions.length > 0 && !selectedCourse) {
      setSelectedCourse(courseOptions[0]);
    }
  }, [courseOptions]);

  useEffect(() => {
    if (selectedCourse?.value) {
      dispatch(getSubmissions(selectedCourse.value));
    }
  }, [selectedCourse]);



  const getAssignmentName = (assignment) =>
    assignment.name ||
    assignment.title ||
    assignment.assignment_name ||
    assignment.project_name ||
    assignment.heading ||
    "Unnamed Assignment";

  const getAttemptCount = (assignment) =>
    assignment.attempt ||
    assignment.attempts ||
    assignment.attempt_number ||
    assignment.attempt_count ||
    assignment?.total_submit ||
    assignment?.total_submit_count ||
    assignment.submission_count ||
    "-";

  const normalizeStatus = (assignment) => {
    const status =
      assignment.status ||
      assignment.latest_submission?.status ||
      assignment.submission_status ||
      assignment.state ||
      "";
    const hasUpload = assignment.uploaded || assignment.is_uploaded || assignment.latest_submission?.uploaded;
    if (!status && !hasUpload) return "-";
    const normalized = String(status || "").trim().toLowerCase();
    if (!normalized) return hasUpload ? "Pending" : "-";
    if (normalized === "upload" || normalized === "uploaded") return "Pending";
    if (normalized === "pending") return "Pending";
    if (normalized === "accepted" || normalized === "approve" || normalized === "approved") return "Accepted";
    if (normalized === "rejected" || normalized === "reject") return "Rejected";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getMarks = (assignment) => {
    const marks =
      assignment.marks_percentage ||
      assignment.score_percentage ||
      assignment.marks ||
      assignment.mark ||
      assignment.percentage ||
      assignment.latest_submission?.marks_percentage ||
      assignment.latest_submission?.score_percentage ||
      assignment.latest_submission?.marks ||
      assignment.latest_submission?.mark;
    return marks !== undefined && marks !== null ? `${marks}%` : "N/A";
  };

  const getTimestamp = (assignment) => {
    const timestamp =
      assignment.timestamp ||
      assignment.updated_at ||
      assignment.created_at ||
      assignment.submitted_at ||
      assignment.uploaded_at ||
      assignment.latest_submission?.submitted_at ||
      assignment.latest_submission?.updated_at;
    if (!timestamp) return "-";
    return new Date(timestamp).toLocaleString();
  };

  const getInfoMessage = (assignment) =>
    assignment.message ||
    assignment.feedback ||
    assignment.latest_submission?.message ||
    assignment.latest_submission?.feedback ||
    assignment.latest_submission?.review_note ||
    assignment.note ||
    "";

  const handleShowMessage = async (message) => {
    if (!message) return;
    await showInfo("Submission Message", String(message));
  };

  return (
    <>
      <div className="rbt-dashboard-content bg-color-white rbt-shadow-box">
        <div className="content">
          <div className="section-title">
            <h4 className="rbt-title-style-3">Assignments & Projects</h4>
          </div>

          <div className="rbt-dashboard-filter-wrapper">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="filter-select rbt-modern-select">
                  <span className="select-label d-block">Courses</span>
                  <Select
                    instanceId="courseSelect"
                    className="react-select"
                    classNamePrefix="react-select"
                    value={selectedCourse}
                    onChange={setSelectedCourse}
                    options={courseOptions}
                    closeMenuOnSelect={true}
                    isMulti={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="mt--30" />

          <div className="rbt-dashboard-table table-responsive mobile-table-750 mt--30">
            <table className="rbt-table table table-borderless text-center">
              <thead>
                <tr>
                  <th>Assignment/Project Name</th>
                  {/* <th className="d-none d-sm-table-cell">Attempt</th> */}
                  <th>Status</th>
                  <th>Marks %</th>
                  <th className="d-md-table-cell">Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions?.contents?.length > 0 ? (
                  submissions?.contents?.map((assignment, index) => {

                    const assSubm = assignment?.latest_submission

                    return (
                      <tr key={index}>
                        <th>
                          <span className="h6 mb--5 t">{assignment?.title}</span>
                          {/* {submissions?.title ? <p className="b3">Course: {submissions?.latest_submission?.title}</p> : null} */}
                        </th>
                        {/* <td className="d-none d-sm-table-cell">
                          <p className="b3">{attempt}</p>
                        </td> */}
                        <td>
                          <span className={`b3 text-secondry ${assSubm?.is_approved ? 'text-success' : "text-danger"}`}>{assSubm?.application_status}</span>
                        </td>
                        <td>
                          <span className="b3">{assSubm?.marks || '-'}</span>
                        </td>
                        <td className="d-md-table-cell">
                          <span className="b3">{formatDate(assSubm?.submitted_at) || '-'}</span>
                        </td>
                        <td>
                          <div className="rbt-button-group justify-content-end align-items-center">
                            {!assSubm?.latest_submission ? <Link
                              className="rbt-btn btn-sm bg-primary-opacity radius-round"
                              href="/lesson-assignments-submit"
                            >
                              Upload
                            </Link>
                              : (assSubm?.application_status !== 'Draft' && assSubm?.feedback ? (
                                <button
                                  type="button"
                                  className="rbt-btn btn-sm bg-color-info-opacity color-info radius-round ms--10"
                                  onClick={() => handleShowMessage(assSubm?.feedback)}
                                  title="View submission message"
                                >
                                  <i className="feather-info" />
                                </button>
                              ) :
                                <Link
                                  className="rbt-btn btn-sm bg-primary-opacity radius-round"
                                  href={`/lesson?course_slug=${submissions?.title
                                    ?.toLowerCase()
                                    ?.trim()
                                    ?.replace(/\s+/g, "-")}&topic_id=${assignment?.topic_id}&content_id=${assSubm?.content_id}`}
                                >
                                  {assSubm?.application_status === 'Draft' && "Upload"}
                                </Link>)
                            }
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <p className="b3">No assignments or projects found for the selected course.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignments;
