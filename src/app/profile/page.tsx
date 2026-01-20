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
import { useForm } from "react-hook-form";
import { TUser } from "@/validation/user";
import { apiPrivate } from "@/instance/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const Profile = () => {
  const { user, isAuthenticated, token, setUser } = useAuthStore();
  const idUser = user?.uuid;
  const theme = useTheme();
  const router = useRouter();
  const api = apiPrivate(token || "");
  const { register, handleSubmit, reset } = useForm<TUser>({
    defaultValues: {
      name: user?.name,
      username: user?.username,
      phone: user?.phone || "",
      address: user?.address || "",
      role: user?.role || "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  // console.log(user)

  // if (!isAuthenticated || !user) {
  //   router.push("/login");
  //   return null;
  // }

  const { mutate: put } = useMutation({
    mutationKey: ["put-user"],
    mutationFn: async (payload: TUser) => {
      const res = await api.put(`/api/users/${idUser}`, payload);
      return res.data.data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      toast.success("Profile updated");
      setIsSaving(false);
    },
    onError: () => {
      toast.error("Failed to update profile");
      setIsSaving(false);
    },
  });

  const onSubmit = async (data: TUser) => {
    setIsSaving(true);
    put(data);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col  
        bg-linear-to-br from-indigo-600/10 via-[#e9e9e9] to-[#e0e0e0] 
        dark:bg-linear-to-t dark:from-[#2e2e2eb6] dark:to-[#c6a96b44] dark:via-[#0f0f0faf]"
      >
        <Navbar />

        <main
          className="relative flex-1 py-8 animate-in fade-in
          bg-linear-to-br from-indigo-600/10 via-[#f3f3f3] to-[#e0e0e0]
      dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]"
        >
          {theme.resolvedTheme === "dark" && <div className={s.heroGlow} />}
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-3xl font-serif font-bold mb-8">
              My <span className="dark:text-[#C6A96B]">Profile</span>
            </h1>

            <div className="bg-card rounded-xl p-6 shadow-xl shadow-gray-500/50">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-indigo-600/10 dark:bg-[#C6A96B]/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-600 dark:text-[#C6A96B]" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {user?.username}
                  </p>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/10 text-indigo-600 dark:bg-[#C6A96B]/10 dark:text-[#C6A96B] mt-1 inline-block capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...register("name")}
                        id="name"
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
                        {...register("username")}
                        id="text"
                        className="pl-10"
                        disabled
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Username cannot be changed
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...register("phone")}
                      id="phone"
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
                      {...register("address")}
                      id="address"
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
          <Toaster
            position="top-right"
            theme={theme.resolvedTheme}
            toastOptions={{
              style: {
                background:
                  theme.resolvedTheme === "dark"
                    ? "linear-gradient(to right, #C6A96B, #837047, #55492b)"
                    : "linear-gradient(to right, #2563eb, #4f46e5, #8b5cf6)",
                color: "#fff",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                marginTop: "80px",
                padding: "12px 20px",
              },
            }}
          />
        </main>

        <Footer theme={theme.resolvedTheme} />
      </div>
    </>
  );
};

export default Profile;
