"use client";
import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, Users, Award, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Multi-signature wallets, cold storage, and enterprise-level security protocols protect your assets.',
    color: 'from-green-400 to-blue-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized infrastructure ensures rapid transaction processing and minimal downtime.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: TrendingUp,
    title: 'Maximum Rewards',
    description: 'Competitive fees and optimal baking strategies maximize your XTZ earnings.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Active community governance and transparent operations build trust and reliability.',
    color: 'from-blue-400 to-purple-500'
  },
  {
    icon: Award,
    title: 'Proven Track Record',
    description: 'Years of successful baking with consistent performance and satisfied delegators.',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    icon: Globe,
    title: 'Global Infrastructure',
    description: 'Distributed nodes across multiple continents ensure maximum reliability and speed.',
    color: 'from-teal-400 to-blue-500'
  }
];

const Features = () => (
  <section id="features" className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Choose TezBake?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We provide enterprise-grade infrastructure and unmatched reliability 
          for your Tezos baking needs.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
