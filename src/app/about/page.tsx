"use client"
import { Footer } from '@/modules/index/footer';
import { Navbar } from '@/modules/index/navbar/navbar';
import { Book, Users, Heart, Award } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as s from "../../modules/index/home/styles"
const About = () => {
  const theme = useTheme()
  return (
    <div className="min-h-screen flex flex-col dark:bg-[linear-gradient(180deg,#2E2E2E_0%,#1A1A1A_45%,#0F0F0F_100%)]">
      <Navbar />

      <main className="relative flex-1 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
        <div className={s.heroGlow} />
        <section className="py-16 bg-linear-to-br from-indigo-600/5 via-background to-accent/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6"><span className="dark:text-[#C6A96B]">About </span> BookStore</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're passionate about connecting readers with their next great adventure through the pages of a book.
            </p>
          </div>
        </section>

        <section className="py-16 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2020, BookStore began with a simple mission: to make quality books accessible to everyone in Indonesia. What started as a small online shop has grown into a thriving community of book lovers.
                  </p>
                  <p>
                    We believe that books have the power to transform lives, spark imagination, and build bridges between people. That's why we carefully curate our collection, ensuring that every title we offer meets our standards of quality and value.
                  </p>
                  <p>
                    Today, we're proud to serve thousands of customers across Indonesia, delivering not just books, but experiences that enrich minds and souls.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop"
                  alt="Bookstore"
                  className="rounded-2xl shadow-elevated"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100/30 dark:bg-linear-to-b dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl p-6 shadow-card text-center bg-white/60 dark:bg-white/5 dark:backdrop-blur-md">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600/10 dark:bg-[#C6A96B]/10 rounded-xl flex items-center justify-center">
                  <Book className="w-6 h-6 text-indigo-600 dark:text-[#C6A96B]" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Quality Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Every book is handpicked to ensure it meets our quality standards.
                </p>
              </div>
              <div className="rounded-xl p-6 shadow-card text-center bg-white/60 dark:bg-white/5 dark:backdrop-blur-md">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-600/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Customer First</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority. We're here to help you find the perfect book.
                </p>
              </div>
              <div className="rounded-xl p-6 shadow-card text-center bg-white/60 dark:bg-white/5 dark:backdrop-blur-md">
                <div className="w-12 h-12 mx-auto mb-4 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Passion for Reading</h3>
                <p className="text-sm text-muted-foreground">
                  We're readers too, and we understand the joy of discovering a great book.
                </p>
              </div>
              <div className="rounded-xl p-6 shadow-card text-center bg-white/60 dark:bg-white/5 dark:backdrop-blur-md">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600/10 dark:bg-[#C6A96B]/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-indigo-600 dark:text-[#C6A96B]" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Trust & Reliability</h3>
                <p className="text-sm text-muted-foreground">
                  Secure payments, fast delivery, and genuine products every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 dark:bg-linear-to-t dark:from-[#2E2E2E] dark:via-[#1A1A1A] dark:to-[#0F0F0F]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-serif font-bold text-indigo-600 dark:text-[#C6A96B]">10K+</p>
                <p className="text-muted-foreground mt-1">Books Available</p>
              </div>
              <div>
                <p className="text-4xl font-serif font-bold text-indigo-600 dark:text-[#C6A96B]">50K+</p>
                <p className="text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-serif font-bold text-indigo-600 dark:text-[#C6A96B]">100+</p>
                <p className="text-muted-foreground mt-1">Partner Authors</p>
              </div>
              <div>
                <p className="text-4xl font-serif font-bold text-indigo-600 dark:text-[#C6A96B]">34</p>
                <p className="text-muted-foreground mt-1">Provinces Served</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer theme={theme.resolvedTheme} />
    </div>
  );
};

export default About;
