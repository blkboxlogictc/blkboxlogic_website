import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      // Create form data with access key
      const formData = {
        access_key: "f62659dd-3191-49a4-b621-4e08326c203b",
        email: email,
        subject: "New Newsletter Subscription",
        from_name: "Blackbox Logic Website",
        to_email: "blackboxlogic772@gmail.com",
        message: `New newsletter subscription from: ${email}`,
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
        throw new Error(data.message || "Failed to subscribe");
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Submit the email to Web3Forms
    newsletterMutation.mutate(email);
  };

  return (
    <footer className="bg-black pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <Logo size="sm" />
              <span className="text-xl font-bold text-white ml-2">
                <span>Blackbox</span>
                <span className="text-accent">Logic</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 pr-4">
              Empowering Treasure Coast businesses with custom AI and technology
              solutions—one payment, no subscriptions.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Blackbox Logic. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-accent transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-accent transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-accent transition-colors">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us">
                  <a className="text-muted-foreground hover:text-accent transition-colors">
                    Why Choose Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-accent transition-colors">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates on the latest tech trends and
              insights for small businesses.
            </p>
            <form className="flex mb-4" onSubmit={handleSubscribe}>
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none bg-muted border-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-accent text-black rounded-l-none font-semibold hover:bg-opacity-90"
                disabled={newsletterMutation.isPending}
              >
                {newsletterMutation.isPending ? "Sending..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://www.facebook.com/profile.php?id=61574793891434"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://x.com/blackboxlogictc"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.instagram.com/blkboxlogic/"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/blackbox-logic"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* SEO Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-muted-foreground text-center">
          <p className="mb-1">
            Treasure Coast AI Solutions | Custom Technology for Small Businesses
            in Florida
          </p>
          <p>
            Serving Port St. Lucie, Stuart, Fort Pierce, Vero Beach, and
            surrounding areas
          </p>
        </div>
      </div>
    </footer>
  );
}
