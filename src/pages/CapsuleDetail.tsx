
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

// Mock data - would be fetched from Supabase in a real implementation
const mockCapsuleDetail = {
  id: "2",
  title: "Message to Future Me",
  message: "Dear Future Me,\n\nI hope you're doing well and have achieved some of the goals we set for ourselves. Remember to take care of your health and spend time with family.\n\nI wonder if you still enjoy the same hobbies or if you've discovered new passions. Whatever path you've taken, I hope you've found fulfillment and joy.\n\nThinking of you from the past,\nPast Me",
  created_at: new Date(2023, 5, 15),
  delivery_date: new Date(2025, 8, 22),
  theme: "romantic" as "hopeful" | "romantic" | "funny",
  delivery_method: "in-app",
};

const CapsuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [capsule, setCapsule] = useState<typeof mockCapsuleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch data from Supabase
    // const fetchCapsule = async () => {
    //   const { data, error } = await supabase
    //     .from('capsules')
    //     .select('*')
    //     .eq('id', id)
    //     .single();
    //     
    //   if (error) {
    //     toast({
    //       title: "Error",
    //       description: "Could not load time capsule details.",
    //       variant: "destructive",
    //     });
    //     navigate('/dashboard');
    //   } else {
    //     setCapsule(data);
    //   }
    //   setLoading(false);
    // };
    
    // Mock fetch
    setTimeout(() => {
      setCapsule(mockCapsuleDetail);
      setLoading(false);
    }, 1000);
  }, [id, navigate, toast]);
  
  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-16">
          <p>Loading your time capsule...</p>
        </div>
      </Layout>
    );
  }
  
  if (!capsule) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-16">
          <h2 className="text-2xl font-bold mb-4">Time Capsule Not Found</h2>
          <p className="mb-6">The time capsule you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout theme={capsule.theme}>
      <div className="max-w-3xl mx-auto">
        <div className={`capsule-card ${capsule.theme} p-8`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 animation-text">{capsule.title}</h1>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Created: {format(capsule.created_at, "MMMM dd, yyyy")}</span>
              <span>Delivered: {format(capsule.delivery_date, "MMMM dd, yyyy")}</span>
            </div>
          </div>
          
          <div className="border-t border-b py-8 mb-8 whitespace-pre-line">
            {capsule.message}
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CapsuleDetail;
