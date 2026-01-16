"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/modules/index/navbar/navbar";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Footer } from "@/modules/index/footer";
import * as s from "../../modules/index/home/styles";
import useAuthStore from "@/store/authStore";

const Profile = () => {
  const {user, isAuthenticated} = useAuthStore()
  const theme = useTheme();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email:"",
    phone: "",
    address: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!isAuthenticated || !user) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // updateProfile({
    //   name: formData.name,
    //   phone: formData.phone,
    //   address: formData.address,
    // });

    // toast({
    //   title: "Profile updated",
    //   description: "Your profile has been updated successfully.",
    // });

    setIsSaving(false);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-[linear-gradient(360deg,#2E2E2E_0%,#1A1A1A_45%,#0F0F0F_100%)]">
      <Navbar />

      <main className="relative flex-1 py-8 animate-in fade-in 
      dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className={s.heroGlow} />
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-serif font-bold mb-8">My <span className="dark:text-[#C6A96B]">Profile</span></h1>

          <div className="bg-card rounded-xl shadow-card p-6">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="w-16 h-16 rounded-full bg-indigo-600/10 dark:bg-[#C6A96B]/10 flex items-center justify-center">
                <User className="w-8 h-8 text-indigo-600 dark:text-[#C6A96B]" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.username}</p>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/10 text-indigo-600 dark:bg-[#C6A96B]/10 dark:text-[#C6A96B] mt-1 inline-block capitalize">
                  {user.role}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Username</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={formData.email}
                      className="pl-10"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+62 xxx xxxx xxxx"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Enter your address"
                    className="pl-10"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="cursor-pointer 
                bg-linear-to-r from-blue-600  via-indigo-600 to-violet-600 text-white 
                dark:bg-linear-to-r dark:from-[#C6A96B] dark:via-[#837047] dark:to-[#55492b] dark:border-white/10
                py-3 font-semibold hover:scale-[1.02] active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
};

export default Profile;
