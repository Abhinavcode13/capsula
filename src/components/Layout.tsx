
import React from "react";
import { useRouter } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: React.ReactNode;
  theme?: "hopeful" | "romantic" | "funny" | null;
}

const Layout: React.FC<LayoutProps> = ({ children, theme = null }) => {
  const router = useRouter();
  const { toast } = useToast();
  
  // This would be replaced with Supabase auth logic
  const isLoggedIn = false;
  
  const handleLoginClick = () => {
    router.push("/login");
  };
  
  const handleSignupClick = () => {
    router.push("/signup");
  };
  
  const handleLogout = () => {
    // Implement Supabase logout logic here
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    router.push("/");
  };

  return (
    <div className={theme ? `theme-${theme}` : ""}>
      <header className="p-4 border-b">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 
              className="text-2xl font-bold cursor-pointer" 
              onClick={() => router.push("/")}
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
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                    </Button>
                  </li>
                  <li>
                    <Button 
                      variant="ghost"
                      onClick={() => router.push("/create")}
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
