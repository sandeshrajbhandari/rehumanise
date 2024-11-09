import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, FileText, Brain, Zap } from "lucide-react";

const HumanizerLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900">
            Transform AI Text into Natural Human Writing
          </h1>
          <p className="text-xl text-slate-600">
            Our advanced humanizer service helps you convert AI-generated
            content into natural, engaging text that reads like it was written
            by a human.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Try It Free
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Service
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Brain className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>Advanced AI Detection Bypass</CardTitle>
            </CardHeader>
            <CardContent>
              Our service intelligently rewrites content to bypass AI detection
              while maintaining meaning.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>Natural Writing Style</CardTitle>
            </CardHeader>
            <CardContent>
              Adds human-like variations, idioms, and natural language patterns
              to your text.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-12 h-12 text-blue-600 mb-2" />
              <CardTitle>Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              Get your humanized content in seconds, ready to use for any
              purpose.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Paste Your Text</h3>
              <p className="text-slate-600">
                Simply paste your AI-generated content into our editor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Style</h3>
              <p className="text-slate-600">
                Select from multiple writing styles and customization options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Get Humanized Text</h3>
              <p className="text-slate-600">
                Receive your naturally-written content instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="relative">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <div className="text-3xl font-bold">$9/mo</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>10,000 words per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Basic writing styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Standard support</span>
                </li>
              </ul>
              <Button className="w-full mt-6">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="relative border-blue-600">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <div className="text-3xl font-bold">$29/mo</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>50,000 words per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Advanced writing styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>API access</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <div className="text-3xl font-bold">Custom</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Unlimited words</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Custom writing styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />
                  <span>Custom integration</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">
            Ready to Humanize Your Content?
          </h2>
          <p className="text-xl text-slate-600">
            Start converting your AI-generated text into natural, engaging
            content today.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started For Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HumanizerLanding;
