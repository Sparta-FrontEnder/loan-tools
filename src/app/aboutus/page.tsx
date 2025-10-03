"use client";

import React from "react";
import Navbar from "../mortgage-calculator/navigation/Navbar";
export default function AboutUsPage() {
  return (
    <div>
        <Navbar/>
        <div className="flex min-h-screen w-full flex-col bg-background font-display text-text-primary">
        {/* Main */}
        <main className="flex-grow">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            {/* Hero */}
            <div className="mx-auto max-w-4xl text-center" id="hero">
                <h1 className="font-serif text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl leading-tight">
                About MTech
                </h1>
                <p className="mt-8 text-xl leading-relaxed text-text-secondary">
                Our mission is to make financial knowledge accessible for everyone. We share clear, actionable insights on mortgages, real estate, and personal finance.
                </p>
            </div>

            <div className="my-20 sm:my-32 h-px bg-border-color max-w-5xl mx-auto" />

            {/* Vision */}
            <section className="max-w-5xl mx-auto" id="vision">
                <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary text-center">Our Vision</h2>
                <div className="mt-12 md:columns-2 md:gap-x-16 lg:gap-x-24 text-lg leading-relaxed text-text-secondary">
                <p>
                    MTech is an independent platform providing free calculators, mortgage tools, and financial articles. Our goal is to empower readers with transparent and practical insights. We believe that everyone, regardless of their financial background, should have the tools and knowledge to make informed decisions about their money. Our resources are designed to simplify complex financial topics, making them understandable and actionable for everyday users.
                </p>
                <p className="mt-6 md:mt-0">
                    We are committed to constantly updating our content and tools to reflect the latest market trends and financial regulations, ensuring our readers always have access to the most current and reliable information. Our dedication to impartiality means that our content is unbiased, focusing solely on providing value to our community. We strive to be a trusted partner in your financial journey, offering guidance that is both insightful and easy to implement.
                </p>
                </div>
            </section>

            <div className="my-20 sm:my-32 h-px bg-border-color max-w-5xl mx-auto" />

            {/* Quote */}
            <section className="max-w-5xl mx-auto text-center" id="pull-quote">
                <blockquote className="font-serif text-4xl italic font-medium leading-relaxed text-text-primary px-4 sm:px-8 lg:px-12">
                "Financial literacy is not just about numbers, but about empowerment and freedom. We are here to light the way."
                </blockquote>
                <p className="mt-8 text-lg text-text-secondary">- The MTech Team</p>
            </section>

            <div className="my-20 sm:my-32 h-px bg-border-color max-w-5xl mx-auto" />

            {/* Values */}
            <section className="max-w-5xl mx-auto" id="values">
                <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary text-center">Our Values</h2>
                <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
                {[
                    { icon: "lightbulb", title: "Clarity", desc: "We break down complex financial concepts into clear, digestible explanations, ensuring everyone can understand and apply them effectively." },
                    { icon: "accessibility_new", title: "Accessibility", desc: "Our tools and resources are free and designed to be user-friendly, making financial empowerment accessible to all, regardless of their background." },
                    { icon: "verified", title: "Trust", desc: "We commit to providing accurate, unbiased, and reliable financial information, earning and maintaining the trust of our readers through transparency." },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg border border-border-color">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 text-3xl">
                        <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-4 text-base text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                ))}
                </div>
            </section>

            <div className="my-20 sm:my-32 h-px bg-border-color max-w-5xl mx-auto" />

            {/* What We Offer */}
            <section className="max-w-5xl mx-auto" id="what-we-offer">
                <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary text-center">What We Offer</h2>
                <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { icon: "calculate", title: "Mortgage Calculator", desc: "Quick and simple estimates to help you understand your potential mortgage payments." },
                    { icon: "real_estate_agent", title: "Real Estate Insights", desc: "Comprehensive guides and analysis of current market trends to inform your property decisions." },
                    { icon: "insights", title: "Investment Guides", desc: "Practical advice and strategies for smart investing, suitable for beginners and experienced investors alike." },
                    { icon: "article", title: "Financial News", desc: "Daily updates, breaking news, and in-depth articles on the global financial landscape." },
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-xl text-center bg-white shadow-lg border border-border-color">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 mx-auto text-3xl">
                        <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-3 text-base text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                ))}
                </div>
            </section>

            <div className="my-20 sm:my-32 h-px bg-border-color max-w-5xl mx-auto" />

            {/* Why Choose Us */}
            <section className="max-w-5xl mx-auto" id="why-choose-us">
                <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary text-center">Why Choose Us</h2>
                <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
                {[
                    { icon: "lock_open", title: "Free Access", desc: "All our powerful tools and insightful articles are provided completely free of charge, with no hidden fees." },
                    { icon: "update", title: "Always Updated", desc: "Our content is regularly reviewed and updated to ensure it remains current, accurate, and highly reliable." },
                    { icon: "psychology_alt", title: "Easy to Understand", desc: "We pride ourselves on simplifying even the most complex financial concepts, making them accessible and easy to grasp for everyone." },
                ].map((item, i) => (
                    <div key={i} className="text-center p-8 bg-white rounded-xl shadow-lg border border-border-color">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 mx-auto text-3xl">
                        <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-3 text-base text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                ))}
                </div>
            </section>

            <div className="my-20 sm:my-32 h-px bg-border-color max-w-5xl mx-auto" />

                {/* Contact */}
                {/* <section className="text-center max-w-3xl mx-auto" id="contact">
                    <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary">Contact Us</h2>
                    <p className="mt-8 text-xl leading-relaxed">
                    <a className="text-primary hover:underline" href="mailto:contact@fintech.com">
                        contact@fintech.com
                    </a>
                    </p>
                </section> */}
            </div>
        </main>
        </div>
    </div>
   
  );
}
