// RouteHelmet.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function RouteHelmet({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // optional: scroll to top on nav
  }, [pathname]);

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
