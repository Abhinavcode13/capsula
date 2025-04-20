
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Time Capsule</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg mb-4">
            Time Capsule was created to help people connect with their future selves through 
            thoughtful messages delivered at just the right moment. We believe in the power of 
            reflection and personal growth that comes from communicating across time.
          </p>
          <p className="text-lg mb-4">
            Whether you want to preserve important memories, set goals for yourself, or simply 
            share thoughts with your future self, Time Capsule creates a bridge between your 
            present and future.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Create Your Message</h3>
              <p>Write a message to your future self using our editor. Add a title and choose a theme that matches the mood of your message.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Set Delivery Options</h3>
              <p>Choose when you want to receive your message and how you want to receive it — via email or unlocked in our app.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Future Delivery</h3>
              <p>On your chosen date, we'll deliver your time capsule. For in-app delivery, you'll need the password you set.</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Themes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="capsule-card hopeful p-6">
              <h3 className="text-xl font-hopeful font-bold text-hopeful-accent mb-2">Hopeful</h3>
              <p>Perfect for setting goals, aspirations, and optimistic thoughts about the future.</p>
            </div>
            
            <div className="capsule-card romantic p-6">
              <h3 className="text-xl font-romantic font-bold text-romantic-text mb-2">Romantic</h3>
              <p>Ideal for love letters, anniversary messages, or sentimental reflections.</p>
            </div>
            
            <div className="capsule-card funny p-6">
              <h3 className="text-xl font-funny font-bold text-funny-text mb-2">Funny</h3>
              <p>Great for jokes, light-hearted predictions, or playful messages to make your future self smile.</p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Security & Privacy</h2>
          <p className="text-lg mb-4">
            Your messages are important and personal. That's why we:
          </p>
          <ul className="list-disc pl-8 mb-4 space-y-2">
            <li>Encrypt all message content using AES-256</li>
            <li>Hash passwords with bcrypt</li>
            <li>Never read or access your personal messages</li>
            <li>Use HTTPS for all connections</li>
            <li>Verify email addresses to ensure secure delivery</li>
          </ul>
        </section>
        
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Ready to Create Your Time Capsule?</h2>
          <Button 
            size="lg" 
            onClick={() => navigate("/create")}
            className="btn-primary"
          >
            Create a Capsule
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
