"use client";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    id: 'standard',
    name: 'Standard',
    apy: '5.8%',
    fee: '8%',
    features: [
      'Regular payouts',
      'Email support',
      'Performance dashboard',
      'Mobile notifications'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    apy: '6.1%',
    fee: '6%',
    features: [
      'Daily payouts',
      'Priority support',
      'Advanced analytics',
      'API access',
      'Custom notifications'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    apy: '6.3%',
    fee: '5%',
    features: [
      'Instant payouts',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Personal account manager'
    ],
    popular: false
  }
];

const Rewards = () => (
  <section id="rewards" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Maximize Your Returns
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that fits your needs and start earning competitive 
          rewards on your XTZ holdings.
        </p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
              plan.popular ? 'ring-2 ring-tezos-blue scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-tezos-blue to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-tezos-blue mb-1">{plan.apy}</div>
              <div className="text-gray-600">Annual Percentage Yield</div>
              <div className="text-sm text-gray-500 mt-2">Fee: {plan.fee}</div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
              plan.popular 
                ? 'bg-gradient-to-r from-tezos-blue to-purple-600 text-white hover:shadow-lg' 
                : 'border-2 border-gray-300 text-gray-700 hover:border-tezos-blue hover:text-tezos-blue'
            }`}>
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Rewards;
