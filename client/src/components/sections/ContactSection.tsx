import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  business: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

// Chat message types
type MessageRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Predefined responses for the AI assistant
const botResponses = [
  "Thank you for your message! How can I help you with your technology needs today?",
  "Blackbox Logic specializes in custom software development, AI solutions, and IT consulting for small businesses in the Treasure Coast area.",
  "Our team can help with website development, custom software, AI chatbots, and IT infrastructure. What specific services are you interested in?",
  "We typically respond to inquiries within 24 hours, but I'm here to answer basic questions immediately.",
  "Would you like to schedule a consultation with one of our technology experts?",
  "Our pricing varies based on project scope and requirements. We'd be happy to provide a custom quote after understanding your needs better.",
  "We've helped many local businesses improve their operations through technology. You can check out our case studies on our website.",
  "I'll pass your information to our team, and someone will contact you shortly to discuss your project in more detail.",
];

// Simple AI response function
function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("pricing") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("quote")
  ) {
    return botResponses[5];
  } else if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("talk to someone") ||
    lowerMessage.includes("representative")
  ) {
    return botResponses[7];
  } else if (
    lowerMessage.includes("services") ||
    lowerMessage.includes("offer") ||
    lowerMessage.includes("provide")
  ) {
    return botResponses[2];
  } else if (
    lowerMessage.includes("time") ||
    lowerMessage.includes("how long") ||
    lowerMessage.includes("when")
  ) {
    return botResponses[3];
  } else if (
    lowerMessage.includes("examples") ||
    lowerMessage.includes("portfolio") ||
    lowerMessage.includes("case studies")
  ) {
    return botResponses[6];
  } else if (
    lowerMessage.includes("consultation") ||
    lowerMessage.includes("meeting") ||
    lowerMessage.includes("appointment")
  ) {
    return botResponses[4];
  } else if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return botResponses[0];
  } else {
    return botResponses[1];
  }
}

interface ContactSectionProps {
  hideTitle?: boolean;
}

export default function ContactSection({ hideTitle = false }: ContactSectionProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi there! How can I help you with your technology needs today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      message: "",
    },
  });

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const contactMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      // Create form data with access key
      const formData = {
        access_key: "f62659dd-3191-49a4-b621-4e08326c203b",
        ...values,
      };

      // Send request to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse response
      const data = await response.json();

      // Check for success
      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormValues) {
    contactMutation.mutate(values);
  }

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle pressing Enter to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {!hideTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="text-accent">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-300">
              Ready to transform your business with custom technology solutions?
              Reach out to us today for a consultation.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-muted rounded-lg p-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-accent transition-colors"
                          placeholder="your@email.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="business"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your Business"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md focus:outline-none focus:border-accent transition-colors"
                          placeholder="How can we help you?"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-3 bg-accent text-black font-semibold rounded-md hover:bg-opacity-90 transition-all duration-300"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-muted rounded-lg p-8 h-full">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <ContactInfo
                  icon={<Phone className="h-6 w-6" />}
                  title="Phone"
                  info="(772) 634-8025"
                  subInfo="Mon-Sat, 8am-8pm ET"
                />

                <ContactInfo
                  icon={<Mail className="h-6 w-6" />}
                  title="Email"
                  info="info@blkboxlogic.com"
                  subInfo="We respond within 24 hours"
                />

                <ContactInfo
                  icon={<MapPin className="h-6 w-6" />}
                  title="Location"
                  info="Stuart, FL"
                  subInfo="Serving all of Treasure Coast and Surrounding Areas"
                />
              </div>

              <div className="mt-10">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <SocialLink
                    icon={<Facebook className="h-6 w-6" />}
                    href="https://www.facebook.com/profile.php?id=61574793891434"
                  />
                  <SocialLink
                    icon={<Twitter className="h-6 w-6" />}
                    href="https://x.com/blackboxlogictc"
                  />
                  <SocialLink
                    icon={<Instagram className="h-6 w-6" />}
                    href="https://www.instagram.com/blkboxlogic/"
                  />
                  <SocialLink
                    icon={<Linkedin className="h-6 w-6" />}
                    href="https://www.linkedin.com/company/blackbox-logic"
                  />
                </div>
              </div>

              {/* Chat Bot Option */}
              <div className="mt-10 p-4 bg-black bg-opacity-40 rounded-lg border border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Have a quick question?</h4>
                    <p className="text-sm text-gray-300">
                      Chat with our AI assistant for immediate help
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="w-full mt-4 py-2 bg-black border border-accent text-accent font-semibold rounded hover:bg-accent hover:bg-opacity-10 transition-all duration-300"
                >
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
          <Card className="border border-gray-700 shadow-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-accent p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-black bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <MessageSquare className="h-4 w-4 text-black" />
                </div>
                <h3 className="font-semibold text-black">
                  Blackbox Logic Assistant
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="text-black hover:bg-black hover:bg-opacity-10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-80 p-4 bg-black bg-opacity-90">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-accent text-black ml-auto"
                          : "bg-muted text-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-3 bg-muted border-t border-gray-700 flex">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-black border-gray-700"
              />
              <Button
                onClick={handleSendMessage}
                className="ml-2 bg-accent text-black hover:bg-opacity-90"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  info: React.ReactNode;
  subInfo?: string;
}

function ContactInfo({ icon, title, info, subInfo }: ContactInfoProps) {
  return (
    <div className="flex items-start">
      <div className="text-accent mr-4">{icon}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-gray-300">{info}</p>
        {subInfo && <p className="text-sm text-gray-400 mt-1">{subInfo}</p>}
      </div>
    </div>
  );
}

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

function SocialLink({ icon, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-accent transition-colors"
    >
      {icon}
    </a>
  );
}
