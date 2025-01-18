import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-primary p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-secondary">404</h1>
        <h2 className="text-2xl text-muted">Page not found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. Please check the URL or return home.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="mt-8"
          variant="secondary"
        >
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;