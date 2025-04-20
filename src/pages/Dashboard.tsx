
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

// Mock data - would be fetched from Supabase in a real implementation
const mockCapsules = [
  {
    id: "1",
    title: "My 30th Birthday Thoughts",
    delivery_date: new Date(2026, 3, 15),
    theme: "hopeful",
    delivery_method: "email",
  },
  {
    id: "2",
    title: "Message to Future Me",
    delivery_date: new Date(2025, 8, 22),
    theme: "romantic",
    delivery_method: "in-app",
    password_hint: "My favorite pet's name",
  },
  {
    id: "3",
    title: "Funny Predictions for 2027",
    delivery_date: new Date(2027, 0, 1),
    theme: "funny",
    delivery_method: "in-app",
    password_hint: null,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState(mockCapsules);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<typeof mockCapsules[0] | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // In a real app, this would fetch data from Supabase
  // useEffect(() => {
  //   const fetchCapsules = async () => {
  //     const { data, error } = await supabase
  //       .from('capsules')
  //       .select('*')
  //       .eq('user_id', user.id)
  //       .order('delivery_date', { ascending: true });
  //       
  //     if (error) {
  //       toast({
  //         title: "Error",
  //         description: "Could not load your time capsules.",
  //         variant: "destructive",
  //       });
  //     } else {
  //       setCapsules(data);
  //     }
  //   };
  //   
  //   fetchCapsules();
  // }, []);
  
  const handleCreateClick = () => {
    navigate("/create");
  };
  
  const handleUnlockClick = (capsule: typeof mockCapsules[0]) => {
    setSelectedCapsule(capsule);
    setPassword("");
    setError("");
    setUnlockModalOpen(true);
  };
  
  const handleUnlock = () => {
    // In a real app, this would validate the password against the stored hash
    if (password === "password123") {
      setUnlockModalOpen(false);
      navigate(`/capsule/${selectedCapsule?.id}`);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Time Capsules</h1>
          <Button onClick={handleCreateClick}>Create New Capsule</Button>
        </div>
        
        {capsules.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No Time Capsules Yet</h2>
            <p className="text-muted-foreground mb-6">
              Write a message to your future self by creating your first time capsule.
            </p>
            <Button onClick={handleCreateClick}>Create Your First Capsule</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capsules.map((capsule) => (
              <div key={capsule.id} className={`capsule-card ${capsule.theme}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{capsule.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Delivery: {format(capsule.delivery_date, "MMMM dd, yyyy")}
                </p>
                <p className="text-sm mb-4">
                  Method: {capsule.delivery_method === "email" ? "Email" : "In-App"}
                </p>
                
                {new Date() >= capsule.delivery_date ? (
                  <Button 
                    className="w-full"
                    onClick={() => capsule.delivery_method === "in-app" 
                      ? handleUnlockClick(capsule) 
                      : toast({
                          title: "Already Delivered",
                          description: "This time capsule was sent to your email.",
                        })
                    }
                  >
                    {capsule.delivery_method === "in-app" ? "Unlock Now" : "Resend Email"}
                  </Button>
                ) : (
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Locked until delivery date</span>
                    <span>{Math.ceil((capsule.delivery_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Unlock Modal */}
        <Dialog open={unlockModalOpen} onOpenChange={setUnlockModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unlock Your Time Capsule</DialogTitle>
              <DialogDescription>
                Enter the password you set when creating this time capsule.
                {selectedCapsule?.password_hint && (
                  <div className="mt-2 p-2 bg-muted rounded-md">
                    <span className="font-semibold">Hint:</span> {selectedCapsule.password_hint}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setUnlockModalOpen(false)}>Cancel</Button>
              <Button onClick={handleUnlock}>Unlock</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Dashboard;
