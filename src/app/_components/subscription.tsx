import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Subscription = () => {
  const features = [
    "Unlimited AI presentations",
    "100+ premium templates",
    "Real-time collaboration",
    "Myanmar language support",
    "Export to multiple formats",
    "Priority customer support",
    "Regular feature updates",
    "Access to new AI features",
  ];

  return (
    <section id="subscription" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Simple Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              One Plan, All Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Get access to all features with our simple monthly subscription
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-md mt-12">
          <div className="rounded-lg border bg-card shadow-sm relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 h-20 w-20">
              <div className="absolute transform rotate-45 bg-primary text-primary-foreground text-xs font-medium py-1 px-6 right-[-35px] top-[32px]">
                Popular
              </div>
            </div>

            <div className="flex flex-col p-6 py-8">
              <h3 className="text-2xl font-bold">Premium Plan</h3>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                100,000 <span className="ml-1 text-lg font-normal text-muted-foreground">MMK/month</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Billed monthly. Cancel anytime.
              </p>
              <Button className="mt-6 w-full" size="lg">
                Get Started
              </Button>
            </div>
            <div className="p-6 bg-muted/50 border-t">
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
