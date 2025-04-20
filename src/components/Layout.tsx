
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: React.ReactNode;
  theme?: "hopeful" | "romantic" | "funny" | null;
}

const Layout: React.FC<LayoutProps> = ({ children, theme = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // This would be replaced with Supabase auth logic
  const isLoggedIn = false;
  
  const handleLoginClick = () => {
    navigate("/login");
  };
  
  const handleSignupClick = () => {
    navigate("/signup");
  };
  
  const handleLogout = () => {
    // Implement Supabase logout logic here
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className={theme ? `theme-${theme}` : ""}>
      <header className="p-4 border-b">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 
              className="text-2xl font-bold cursor-pointer" 
              onClick={() => navigate("/")}
            >
              Time Capsule
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Button 
                      variant="outline" 
                      onClick={handleLoginClick}
                    >
                      Log In
                    </Button>
                  </li>
                  <li>
                    <Button 
                      onClick={handleSignupClick}
                    >
                      Sign Up
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Button 
                      variant="ghost"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost"
                      onClick={() => navigate("/create")}
                    >
                      Create Capsule
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container py-8">
        {children}
      </main>
      <footer className="bg-muted py-6">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Time Capsule App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
