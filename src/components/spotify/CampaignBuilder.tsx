import { useState } from "react";
import Layout from "@/components/Layout";
import CampaignConfiguration from "@/components/CampaignConfiguration";
import AIRecommendations from "@/components/AIRecommendations";
import CampaignReview from "@/components/CampaignReview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";

type CampaignStep = "configuration" | "recommendations" | "review" | "complete";

interface CampaignData {
  name: string;
  client: string;
  client_id?: string;
  track_url: string;
  track_name?: string;
  stream_goal: number;
  budget: number;
  sub_genre: string;
  start_date: string;
  duration_days: number;
}

const steps = [
  { id: "configuration", title: "Configuration", description: "Basic campaign setup" },
  { id: "recommendations", title: "AI Recommendations", description: "Playlist selection" },
  { id: "review", title: "Review & Launch", description: "Final review" },
];

export default function CampaignBuilder() {
  const [currentStep, setCurrentStep] = useState<CampaignStep>("configuration");
  const [campaignData, setCampaignData] = useState<Partial<CampaignData>>({});
  const [allocationsData, setAllocationsData] = useState<any>(null);

  const handleConfigurationNext = (data: CampaignData) => {
    console.log('CampaignBuilder received data:', data);
    setCampaignData(data);
    setCurrentStep("recommendations");
  };

  const handleRecommendationsNext = (data: any) => {
    setAllocationsData(data);
    setCurrentStep("review");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "recommendations":
        setCurrentStep("configuration");
        break;
      case "review":
        setCurrentStep("recommendations");
        break;
      default:
        break;
    }
  };

  const getStepProgress = () => {
    const stepIndex = steps.findIndex(step => step.id === currentStep);
    return ((stepIndex + 1) / steps.length) * 100;
  };

  const isStepCompleted = (stepId: string) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    return stepIndex < currentIndex;
  };

  const isStepCurrent = (stepId: string) => {
    return stepId === currentStep;
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Campaign Builder</h2>
                  <Badge variant="outline" className="text-xs">
                    Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
                  </Badge>
                </div>
                
                <Progress value={getStepProgress()} className="h-2" />
                
                <div className="flex justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-2">
                      {isStepCompleted(step.id) ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle 
                          className={`w-5 h-5 ${
                            isStepCurrent(step.id) ? 'text-primary' : 'text-muted-foreground'
                          }`} 
                        />
                      )}
                      <div className="hidden md:block">
                        <p className={`text-sm font-medium ${
                          isStepCurrent(step.id) ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto">
          {currentStep === "configuration" && (
            <CampaignConfiguration
              onNext={handleConfigurationNext}
              initialData={campaignData}
            />
          )}
          
          {currentStep === "recommendations" && campaignData.stream_goal && campaignData.sub_genre && (
            <AIRecommendations
              campaignData={campaignData as CampaignData}
              onNext={handleRecommendationsNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === "recommendations" && (!campaignData.stream_goal || !campaignData.sub_genre) && (
            <div className="max-w-4xl mx-auto">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Missing campaign data. Please go back and complete the configuration.</p>
                  <Button variant="outline" onClick={handleBack} className="mt-4">
                    Back to Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          
          {currentStep === "review" && campaignData.stream_goal && allocationsData && (
            <CampaignReview
              campaignData={campaignData as CampaignData}
              allocationsData={allocationsData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}