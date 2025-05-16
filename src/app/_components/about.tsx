import { Check } from "lucide-react";

const About = () => {
  const features = [
    {
      title: "AI-Powered Design",
      description:
        "Our AI analyzes your content and automatically creates beautifully designed slides with perfect layouts.",
    },
    {
      title: "Time-Saving Templates",
      description:
        "Choose from hundreds of professional templates to create presentations in record time.",
    },
    {
      title: "Smart Content Suggestions",
      description:
        "Get intelligent content suggestions that help you create more engaging presentations.",
    },
    {
      title: "Myanmar Language Support",
      description:
        "Full support for Myanmar language to create localized presentations with ease.",
    },
    {
      title: "Easy Collaboration",
      description:
        "Share and collaborate on presentations in real-time with your team.",
    },
    {
      title: "Export Options",
      description:
        "Export your presentations in multiple formats including PDF, PowerPoint, and more.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              About PresentAI
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Revolutionizing Presentation Creation
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              PresentAI uses cutting-edge artificial intelligence to help you create
              professional presentations in minutes instead of hours.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;