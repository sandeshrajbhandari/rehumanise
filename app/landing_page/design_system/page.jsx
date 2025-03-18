"use client";
import React, { useState } from "react";
import {
  Check,
  Bot,
  UserSquare2,
  ArrowRight,
  Menu,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DesignSystem = () => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4">
            Humanizer Design System
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive guide to our design components and styles.
          </p>
        </header>

        <Tabs defaultValue="colors">
          <TabsList className="mb-8 grid grid-cols-4 md:grid-cols-7 gap-2">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="forms">Form Elements</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          {/* Colors */}
          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Primary Colors</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-blue-600 rounded"></div>
                        <div>
                          <p className="font-medium">Blue 600</p>
                          <p className="text-sm text-gray-500">#2563eb</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard("bg-blue-600")}
                          className="ml-auto text-gray-500 hover:text-blue-600"
                        >
                          {copiedText === "bg-blue-600" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-green-500 rounded"></div>
                        <div>
                          <p className="font-medium">Green 500</p>
                          <p className="text-sm text-gray-500">#22c55e</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard("bg-green-500")}
                          className="ml-auto text-gray-500 hover:text-blue-600"
                        >
                          {copiedText === "bg-green-500" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Background Colors</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-blue-50 rounded border border-gray-200"></div>
                        <div>
                          <p className="font-medium">Blue 50</p>
                          <p className="text-sm text-gray-500">#eff6ff</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard("bg-blue-50")}
                          className="ml-auto text-gray-500 hover:text-blue-600"
                        >
                          {copiedText === "bg-blue-50" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-green-50 rounded border border-gray-200"></div>
                        <div>
                          <p className="font-medium">Green 50</p>
                          <p className="text-sm text-gray-500">#f0fdf4</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard("bg-green-50")}
                          className="ml-auto text-gray-500 hover:text-blue-600"
                        >
                          {copiedText === "bg-green-50" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Gradients</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded p-4">
                      <div className="h-16 bg-gradient-to-r from-blue-600 to-green-500 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <p className="text-sm">
                          bg-gradient-to-r from-blue-600 to-green-500
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              "bg-gradient-to-r from-blue-600 to-green-500"
                            )
                          }
                          className="text-gray-500 hover:text-blue-600"
                        >
                          {copiedText ===
                          "bg-gradient-to-r from-blue-600 to-green-500" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="border rounded p-4">
                      <div className="h-16 bg-gradient-to-br from-blue-50 to-green-50 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <p className="text-sm">
                          bg-gradient-to-br from-blue-50 to-green-50
                        </p>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              "bg-gradient-to-br from-blue-50 to-green-50"
                            )
                          }
                          className="text-gray-500 hover:text-blue-600"
                        >
                          {copiedText ===
                          "bg-gradient-to-br from-blue-50 to-green-50" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography */}
          <TabsContent value="typography">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Headings</h3>
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-5xl font-bold">Heading 1</h1>
                        <p className="text-sm text-gray-500 mt-2">
                          text-5xl font-bold
                        </p>
                      </div>
                      <div>
                        <h2 className="text-4xl font-bold">Heading 2</h2>
                        <p className="text-sm text-gray-500 mt-2">
                          text-4xl font-bold
                        </p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Heading 3</h3>
                        <p className="text-sm text-gray-500 mt-2">
                          text-2xl font-bold
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Gradient Text
                    </h3>
                    <div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                        Gradient Text Example
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text
                        text-transparent
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Paragraphs</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xl text-gray-600">
                          This is a large paragraph text used for important
                          content.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          text-xl text-gray-600
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-gray-600">
                          This is a standard paragraph text used for regular
                          content.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          text-base text-gray-600
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          This is a small paragraph text used for secondary
                          content.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          text-sm text-gray-500
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buttons */}
          <TabsContent value="buttons">
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Primary Buttons
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col items-center">
                        <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                          Get Started
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">Standard</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-lg px-8 py-6">
                          Try For Free
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">Large</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Secondary Buttons
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col items-center">
                        <Button
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          Learn More
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">Standard</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Button
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                        >
                          See Examples
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">Large</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Button with Icon
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col items-center">
                        <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                          <ArrowRight className="mr-2 h-4 w-4" /> Continue
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">With Icon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards */}
          <TabsContent value="cards">
            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Card</h3>
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          This is a basic card component used for displaying
                          content in a clean, contained format.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Feature Card</h3>
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="mb-4 bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                          <Bot className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          Smart Conversion
                        </h3>
                        <p className="text-gray-600">
                          Our AI analyzes and transforms robotic text into
                          natural human language.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Testimonial Card
                    </h3>
                    <Card className="bg-white shadow border-l-4 border-green-500">
                      <CardContent className="pt-6">
                        <p className="text-gray-600 italic mb-4">
                          "Humanizer completely transformed our content. Nobody
                          can tell it was originally AI-generated!"
                        </p>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="ml-3">
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-gray-500">
                              Content Manager, TechCorp
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Pricing Card</h3>
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>Pro Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">$29</span>
                          <span className="text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>50,000 words per month</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Advanced tone settings</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>API access</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                          Choose Plan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Elements */}
          <TabsContent value="forms">
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Text Area</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Standard Textarea
                        </label>
                        <Textarea
                          placeholder="Enter your text here..."
                          className="w-full h-32"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Disabled Textarea
                        </label>
                        <Textarea
                          placeholder="This textarea is disabled"
                          className="w-full h-32"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Humanizer Text Conversion
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <Bot className="inline h-4 w-4 mr-1" /> AI Text Input
                        </label>
                        <Textarea
                          placeholder="Paste AI-generated text here..."
                          className="w-full h-40"
                          value="The selected methodology facilitated the acquisition of substantive data points pertaining to user engagement metrics."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <UserSquare2 className="inline h-4 w-4 mr-1" />{" "}
                          Humanized Output
                        </label>
                        <Textarea
                          placeholder="Humanized text will appear here..."
                          className="w-full h-40"
                          value="We gathered some really interesting data about how people use our app."
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                        <ArrowRight className="mr-2 h-4 w-4" /> Humanize Text
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Icons */}
          <TabsContent value="icons">
            <Card>
              <CardHeader>
                <CardTitle>Icons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Primary Icons
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-4 border rounded">
                        <Bot className="h-8 w-8 text-blue-600 mb-2" />
                        <p className="text-sm">Bot</p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded">
                        <UserSquare2 className="h-8 w-8 text-blue-600 mb-2" />
                        <p className="text-sm">UserSquare2</p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded">
                        <ArrowRight className="h-8 w-8 text-blue-600 mb-2" />
                        <p className="text-sm">ArrowRight</p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded">
                        <Check className="h-8 w-8 text-green-500 mb-2" />
                        <p className="text-sm">Check</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Navigation Icons
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-4 border rounded">
                        <Menu className="h-8 w-8 text-gray-600 mb-2" />
                        <p className="text-sm">Menu</p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded">
                        <X className="h-8 w-8 text-gray-600 mb-2" />
                        <p className="text-sm">X (Close)</p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded">
                        <ExternalLink className="h-8 w-8 text-gray-600 mb-2" />
                        <p className="text-sm">ExternalLink</p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded">
                        <Copy className="h-8 w-8 text-gray-600 mb-2" />
                        <p className="text-sm">Copy</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Icon Usage Examples
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 border rounded">
                        <h4 className="text-md font-medium mb-2">
                          Icon with Text
                        </h4>
                        <div className="flex items-center text-blue-600">
                          <Bot className="h-5 w-5 mr-2" />
                          <span>AI Processing</span>
                        </div>
                      </div>
                      <div className="p-4 border rounded">
                        <h4 className="text-md font-medium mb-2">
                          Icon in Button
                        </h4>
                        <Button className="bg-gradient-to-r from-blue-600 to-green-500">
                          <ArrowRight className="mr-2 h-4 w-4" /> Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystem;
