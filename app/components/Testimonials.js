"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: 'Filip Gojković',
    role: 'Bakery co-founder, Software developer, Supporter of Tezos ecosystem',
    avatar: 'FG',
    content: "TezBake has been incredibly reliable. I've been delegating for over a year and the returns are consistent.",
    rating: 5
  },
  {
    name: 'Gordan Jagačić',
    role: 'Bakery co-founder, Digital Marketing Specialist, Supporter of Tezos ecosystem',
    avatar: 'GJ',
    content: 'The technical infrastructure is impressive. Fast payouts and excellent uptime. Highly recommend!',
    rating: 5
  },
  {
    name: 'Filip Strelec',
    role: 'Crypto Enthusiast, Cardano pool operator',
    avatar: 'FS',
    content: "Best baking service I've used.",
    rating: 5
  }
];

const Testimonials = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          What Our Delegators Say
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Don&apos;t just take our word for it. Here&apos;s what our community has to say 
          about their experience with TezBake.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={testimonial.name + '-star-' + i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 aspect-square bg-gradient-to-r from-tezos-blue to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-white font-semibold text-lg leading-none">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
