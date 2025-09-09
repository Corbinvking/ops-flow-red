import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

interface EmailProposalProps {
  dealData: any;
}

const EmailProposal: React.FC<EmailProposalProps> = ({ dealData }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendProposal = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the proposal.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      // Here you would typically send this to your backend
      console.log('Sending proposal to:', email, 'Deal data:', dealData);
      
      toast({
        title: "Proposal Sent",
        description: "The proposal has been sent successfully.",
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send proposal. Please try again.",
        variant: "destructive"
      });
    }
    setIsSending(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-gray-800 p-4">
      <div className="container mx-auto flex items-center gap-4">
        <div className="flex-1 flex items-center gap-4">
          <Mail className="h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Enter email to send proposal..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border-none text-gray-400"
          />
        </div>
        <Button
          className="bg-[#FF6B4B] hover:bg-[#FF6B4B]/90 min-w-[120px]"
          onClick={handleSendProposal}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send Proposal'}
        </Button>
      </div>
    </div>
  );
};

export default EmailProposal;
