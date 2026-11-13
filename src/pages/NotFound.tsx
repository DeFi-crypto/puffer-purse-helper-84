import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";

const NotFound = () => {
  const location = useLocation();
  usePageMeta(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-background text-foreground">
      <div className="text-center px-6">
        <div className="tag inline-block mb-3">404</div>
        <h1 className="font-display text-3xl sm:text-5xl mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-6">That page doesn't exist. The purse that turns into a puffer does.</p>
        <Link to="/" className="btn-primary inline-flex items-center justify-center">
          Back to Minny
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
