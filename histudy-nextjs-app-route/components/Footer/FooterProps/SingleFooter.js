import Link from "next/link";

const SingleFooter = ({
  classOne,
  title,
  footerType,
  footerSocial,
  icons,
}) => {
  return (
    <div className={classOne}>
      <div className="footer-widget">
        <h5 className="ft-title">{title}</h5>

        <ul className="ft-link">
          {footerType?.links?.map((item, index) => (
            <li key={index}>
              <Link href={item.url || "#"}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* {footerSocial && (
          <ul className="social-icon social-default icon-naked justify-content-start mt--25">
            {Object.entries(footerSocial).map(([platform, url]) => (
              <li key={platform}>
                <Link
                  href={
                    url?.startsWith("http")
                      ? url
                      : `https://${url}`
                  }
                  target="_blank"
                >
                  <i className={icons[platform]}></i>
                </Link>
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default SingleFooter;