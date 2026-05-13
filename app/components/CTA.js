"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTA = () => (
  <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Earning?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of delegators who trust TezBake with their XTZ holdings. 
          Start earning competitive rewards today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-gradient-to-r from-tezos-blue to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group">
            <span>Delegate Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-full font-medium text-lg hover:border-white hover:text-white transition-all duration-300 flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
