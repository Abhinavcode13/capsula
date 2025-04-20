
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <div className="mb-8">
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-muted-foreground">
            The time capsule you're looking for seems to be lost in time.
          </p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>
            Return Home
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
