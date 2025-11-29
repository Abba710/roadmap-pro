import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

/**
 * Hero section with main CTA
 */
export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const scrollToDemo = (): void => {
    const element = document.getElementById("demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-20 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Build Beautiful Roadmaps in Minutes</span>
          </div>

          {/* Main heading */}
          <h1 className="mx-auto max-w-4xl mb-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
            Plan Your Journey,
            <br />
            Track Your Progress
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl mb-10 text-slate-600 text-xl">
            Create stunning development roadmaps with our intuitive drag-and-drop builder. 
            Perfect for product managers, developers, and teams.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg"
              onClick={scrollToDemo}
            >
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-slate-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
}
