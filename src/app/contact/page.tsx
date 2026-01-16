"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/modules/index/navbar/navbar";
import { Footer } from "@/modules/index/footer";
import { useTheme } from "next-themes";
import * as s from "../../modules/index/home/styles";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // toast({
    //   title: "Message sent!",
    //   description: "Thank you for contacting us. We'll get back to you soon.",
    // });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-[linear-gradient(360deg,#2E2E2E_0%,#1A1A1A_45%,#0F0F0F_100%)]">
      <Navbar />

      <main className="relative flex-1 py-16 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className={s.heroGlow} />
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">
              <span className="dark:text-[#C6A96B]">Contact </span> Us
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-600/10 dark:bg-[#C6A96B]/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-indigo-600 dark:text-[#C6A96B]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      Jl. Sudirman No. 123
                      <br />
                      Jakarta Pusat, 10110
                      <br />
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-600/10 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      +62 21 1234 5678
                      <br />
                      Mon - Fri, 9am - 6pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      hello@bookstore.id
                      <br />
                      support@bookstore.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-6 shadow-card space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your message here..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="cursor-pointer 
              bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white 
              dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#837047] dark:to-[#55492b] dark:border-white/10
              py-3
              font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2 text-white" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
};

export default Contact;
