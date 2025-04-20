
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState<"hopeful" | "romantic" | "funny" | null>(null);

  // Preview the different themes
  const handleThemePreview = (theme: "hopeful" | "romantic" | "funny" | null) => {
    setActiveTheme(theme);
  };

  return (
    <Layout theme={activeTheme}>
      <section className="py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold animation-text">
            Send a Message to Your Future Self
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Create digital time capsules with personal messages, delivered exactly when you want them.
          </p>
          <div className="flex justify-center space-x-4 pt-6">
            <Button 
              size="lg" 
              onClick={() => navigate("/create")}
              className="btn-primary"
            >
              Create a Capsule
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Choose Your Experience</h2>
          <p className="text-muted-foreground mt-2">Preview our themes to personalize your time capsule.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            className={`capsule-card hopeful cursor-pointer ${activeTheme === "hopeful" ? "ring-4 ring-hopeful-primary" : ""}`}
            onClick={() => handleThemePreview("hopeful")}
          >
            <h3 className="text-2xl font-hopeful font-bold text-hopeful-accent mb-4">Hopeful</h3>
            <p>Bright and optimistic styles with fade-in animations.</p>
            <div className="mt-4">
              <Button className="bg-hopeful-primary text-hopeful-accent hover:bg-hopeful-secondary">Preview</Button>
            </div>
          </div>

          <div 
            className={`capsule-card romantic cursor-pointer ${activeTheme === "romantic" ? "ring-4 ring-romantic-primary" : ""}`}
            onClick={() => handleThemePreview("romantic")}
          >
            <h3 className="text-2xl font-romantic font-bold text-romantic-text mb-4">Romantic</h3>
            <p>Elegant design with typewriter text effects.</p>
            <div className="mt-4">
              <Button className="bg-romantic-primary text-white hover:bg-romantic-accent">Preview</Button>
            </div>
          </div>

          <div 
            className={`capsule-card funny cursor-pointer ${activeTheme === "funny" ? "ring-4 ring-funny-primary" : ""}`}
            onClick={() => handleThemePreview("funny")}
          >
            <h3 className="text-2xl font-funny font-bold text-funny-text mb-4">Funny</h3>
            <p>Playful styles with bouncy text animations.</p>
            <div className="mt-4">
              <Button className="bg-funny-primary text-funny-text hover:bg-funny-secondary">Preview</Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => handleThemePreview(null)}
          >
            Reset Theme
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Write Your Message</h3>
            <p className="text-muted-foreground">Compose a message to your future self with our rich text editor.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Set a Future Date</h3>
            <p className="text-muted-foreground">Choose when your message will be delivered, from tomorrow to 10 years from now.</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Receive Your Capsule</h3>
            <p className="text-muted-foreground">Get your message via email or unlock it in-app when the time comes.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
