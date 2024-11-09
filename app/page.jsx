"use client";
import Image from "next/image";
import Header from "@/components/Header";
import NavigationMenuDemo from "@/components/Header2";
import { Hero } from "@/components/Hero";
import { Robot3D } from "@/components/Robot3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Sparkles,
  FileText,
  Brain,
  Zap,
  MoreHorizontal,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <Hero />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Service
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Brain className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Advanced AI Detection Bypass</CardTitle>
            </CardHeader>
            <CardContent>
              Our service intelligently rewrites content to bypass AI detection
              while maintaining meaning.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Natural Writing Style</CardTitle>
            </CardHeader>
            <CardContent>
              Adds human-like variations, idioms, and natural language patterns
              to your text.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="w-12 h-12 text-primary mb-2" />
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
      <section className="container mx-auto px-4 py-16 bg-white border-r-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
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
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
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
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
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

      {/* Events Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Two Small Boxes */}
            <div className="flex flex-col justify-center col-span-4 space-y-6">
              {/* Top Small Box */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white">
                <div className="text-sm opacity-80 mb-1">April</div>
                <h3 className="text-lg font-medium mb-4">
                  AI Writing Sprint: 24-Hour Challenge
                </h3>
                <button className="text-sm opacity-80 hover:opacity-100">
                  Learn more
                </button>
              </div>

              {/* Bottom Small Box */}
              <div className="bg-white rounded-3xl p-6 text-slate-900">
                <div className="text-sm opacity-80 mb-1">November</div>
                <h3 className="text-lg font-medium mb-4">
                  Writing Style Conference 2024
                </h3>
                <button className="text-sm opacity-80 hover:opacity-100">
                  Learn more
                </button>
              </div>
            </div>

            {/* Center - Large Blue Box */}
            <div className="col-span-4">
              <div className="bg-blue-600 rounded-3xl p-8 text-white h-full">
                <div className="text-sm opacity-80 mb-1">August</div>
                <h3 className="text-6xl font-medium mb-4">
                  AI Content Creator Summit & Meetup 2024
                </h3>
                <button className="text-sm opacity-80 hover:opacity-100">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right Column - Two Boxes */}
            <div className="col-span-4 space-y-6">
              {/* Top Small Box */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white">
                <div className="text-sm opacity-80 mb-1">March</div>
                <h3 className="text-lg font-medium mb-4">
                  Natural Language Processing Workshop
                </h3>
                <button className="text-sm opacity-80 hover:opacity-100">
                  Learn more
                </button>
              </div>

              {/* Bottom Small Box */}
              <div className="bg-green-400 rounded-3xl p-6 h-96 text-slate-900">
                <div className="text-sm opacity-80 mb-1">December</div>
                <h3 className="text-6xl font-medium mb-4">
                  Content Innovation Festival
                </h3>
                <button className="text-sm opacity-80 hover:opacity-100">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          {/* More Events Link */}
          <div className="mt-6 text-slate-600 flex items-center gap-2 justify-end">
            <span>More events</span>
            <MoreHorizontal className="w-4 h-4" />
          </div>
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
          <Button size="lg" className="bg-primary hover:bg-green-700">
            Get Started For Free
          </Button>
        </div>
      </section>
    </div>
  );
}
