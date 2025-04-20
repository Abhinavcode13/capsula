
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays, isAfter, isBefore, addYears } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  message: z.string().min(1, "Message is required").max(5000, "Message cannot exceed 5000 characters"),
  deliveryDate: z.date()
    .refine(date => isAfter(date, addDays(new Date(), 1)), "Date must be at least 1 day in the future")
    .refine(date => isBefore(date, addYears(new Date(), 10)), "Date cannot be more than 10 years in the future"),
  deliveryMethod: z.enum(["email", "in-app"]),
  theme: z.enum(["hopeful", "romantic", "funny"]),
  password: z.string().optional(),
  passwordHint: z.string().max(50, "Hint cannot exceed 50 characters").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"hopeful" | "romantic" | "funny">("hopeful");
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      deliveryDate: addDays(new Date(), 7),
      deliveryMethod: "email",
      theme: "hopeful",
    }
  });
  
  const deliveryMethod = watch("deliveryMethod");
  const message = watch("message");
  const title = watch("title");
  
  const handleThemeChange = (theme: "hopeful" | "romantic" | "funny") => {
    setValue("theme", theme);
    setCurrentTheme(theme);
  };
  
  const onSubmit = async (data: FormValues) => {
    // This would be replaced with actual Supabase logic
    console.log("Form data:", data);
    
    // For in-app delivery, we need to set a password
    if (data.deliveryMethod === "in-app" && !data.password) {
      setPasswordModalOpen(true);
      return;
    }
    
    // Mock API call
    try {
      // This would be an API call to Supabase
      toast({
        title: "Time Capsule Created!",
        description: `Your message will be delivered on ${format(data.deliveryDate, "MMMM dd, yyyy")}`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create time capsule. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const setPassword = (password: string, hint?: string) => {
    setValue("password", password);
    if (hint) setValue("passwordHint", hint);
    setPasswordModalOpen(false);
    handleSubmit(onSubmit)();
  };

  return (
    <Layout theme={currentTheme}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 animation-text">Create Your Time Capsule</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Theme Selection */}
          <div className="space-y-2">
            <Label htmlFor="theme">Choose a Theme</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`capsule-card hopeful cursor-pointer ${currentTheme === "hopeful" ? "ring-4 ring-hopeful-primary" : ""}`}
                onClick={() => handleThemeChange("hopeful")}
              >
                <h3 className="text-lg font-hopeful font-bold text-hopeful-accent">Hopeful</h3>
                <p className="text-sm">Bright & optimistic</p>
              </div>
              
              <div 
                className={`capsule-card romantic cursor-pointer ${currentTheme === "romantic" ? "ring-4 ring-romantic-primary" : ""}`}
                onClick={() => handleThemeChange("romantic")}
              >
                <h3 className="text-lg font-romantic font-bold text-romantic-text">Romantic</h3>
                <p className="text-sm">Elegant & sentimental</p>
              </div>
              
              <div 
                className={`capsule-card funny cursor-pointer ${currentTheme === "funny" ? "ring-4 ring-funny-primary" : ""}`}
                onClick={() => handleThemeChange("funny")}
              >
                <h3 className="text-lg font-funny font-bold text-funny-text">Funny</h3>
                <p className="text-sm">Playful & bouncy</p>
              </div>
            </div>
            {errors.theme && <p className="text-sm text-destructive">{errors.theme.message}</p>}
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-muted-foreground text-sm">({title.length}/100)</span></Label>
            <Input 
              id="title"
              {...register("title")} 
              placeholder="What would you like to call this time capsule?"
              maxLength={100}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          
          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message <span className="text-muted-foreground text-sm">({message.length}/5000)</span></Label>
            <Textarea 
              id="message"
              {...register("message")} 
              placeholder="Write a message to your future self..."
              className="min-h-[200px]"
              maxLength={5000}
            />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>
          
          {/* Delivery Date */}
          <div className="space-y-2">
            <Label>Delivery Date</Label>
            <Controller
              control={control}
              name="deliveryDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        isBefore(date, addDays(new Date(), 1)) ||
                        isAfter(date, addYears(new Date(), 10))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.deliveryDate && <p className="text-sm text-destructive">{errors.deliveryDate.message}</p>}
          </div>
          
          {/* Delivery Method */}
          <div className="space-y-2">
            <Label>Delivery Method</Label>
            <Controller
              control={control}
              name="deliveryMethod"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-app" id="in-app" />
                    <Label htmlFor="in-app">In-App (Password Protected)</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.deliveryMethod && <p className="text-sm text-destructive">{errors.deliveryMethod.message}</p>}
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="btn-primary">Create Time Capsule</Button>
          </div>
        </form>
        
        {/* Password Modal for In-App Delivery */}
        <PasswordModal 
          isOpen={passwordModalOpen} 
          onClose={() => setPasswordModalOpen(false)}
          onPasswordSet={setPassword}
        />
      </div>
    </Layout>
  );
};

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordSet: (password: string, hint?: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onPasswordSet }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hint, setHint] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (password.length < 8 || password.length > 20) {
      setError("Password must be 8-20 characters long");
      return;
    }
    
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      setError("Password must contain at least one letter and one number");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    // Submit
    onPasswordSet(password, hint);
  };
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Password for Your Time Capsule</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password (8-20 characters, including a letter and number)</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hint">Password Hint (Optional, max 50 characters)</Label>
            <Input
              id="hint"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Enter a hint to help you remember"
              maxLength={50}
            />
          </div>
          
          {error && <p className="text-sm text-destructive">{error}</p>}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Set Password</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
