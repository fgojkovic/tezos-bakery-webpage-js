"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Award, TrendingUp, Clock, Timer } from "lucide-react";


const BAKER_ADDRESS = "tz1fazA9hbHB2Z6nntT9UhdGsAXTcfzzvDpj";
const API_URL = `https://api.tzkt.io/v1/accounts/${BAKER_ADDRESS}`;

const defaultStats = [
  {
    icon: BarChart3,
    number: '—',
    label: 'XTZ Staked',
    description: 'Total value locked in our baking service'
  },
  {
    icon: Users,
    number: '—',
    label: 'Stakers / Delegators',
    description: 'Live participant count in our baking service'
  },
  {
    icon: Award,
    number: '—',
    label: 'Performance',
    description: 'Baker performance (not true uptime)'
  },
  {
    icon: TrendingUp,
    number: '—',
    label: 'Baker Fee',
    description: 'Current fee for delegators'
  },
  {
    icon: Clock,
    number: '—',
    label: 'Next Block ETA',
    description: 'Estimated time until next block'
  },
  {
    icon: Timer,
    number: '—',
    label: 'Uptime',
    description: 'Time since last missed block'
  }
];


const Stats = () => {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    const formatNumber = (value) => {
      if (value === 0) return '0';
      return value ? value.toLocaleString() : '—';
    };

    // Fetch all stats in parallel
    Promise.all([
      fetch(API_URL).then(res => res.json()),
      fetch('https://api.tzkt.io/v1/head').then(res => res.json()),
      fetch(`https://api.tzkt.io/v1/accounts/${BAKER_ADDRESS}/missed/blocks?limit=1`).then(res => res.ok ? res.json() : null)
    ])
      .then(([data, head, missedBlocks]) => {
        let nextBlockEta = '—';
        let uptimeValue = 'No missed blocks';

        // Next block ETA
        if (head?.timestamp) {
          const blockTime = 30; // seconds, from protocol constants
          const blockDate = new Date(head.timestamp);
          const nextBlockDate = new Date(blockDate.getTime() + blockTime * 1000);
          const now = new Date();
          const diff = (nextBlockDate - now) / 1000;
          nextBlockEta = diff > 0 ? `${Math.floor(diff)}s` : 'Imminent';
        }

        // Uptime: time since last missed block
        if (missedBlocks && missedBlocks.length > 0 && missedBlocks[0].timestamp) {
          const lastMissed = new Date(missedBlocks[0].timestamp);
          const now = new Date();
          const diffMs = now - lastMissed;
          const diffH = Math.floor(diffMs / (1000 * 60 * 60));
          const diffM = Math.floor((diffMs / (1000 * 60)) % 60);
          const diffS = Math.floor((diffMs / 1000) % 60);
          uptimeValue = `${diffH}h ${diffM}m ${diffS}s`;
        }

        setStats([
          {
            icon: BarChart3,
            number: data.stakingBalance ? `${(data.stakingBalance / 1_000_000).toLocaleString()} XTZ` : '—',
            label: 'XTZ Staked',
            description: 'Total value locked in our baking service'
          },
          {
            icon: Users,
            number: `${formatNumber(data.stakersCount)} / ${formatNumber(data.delegatorsCount)}`,
            label: 'Stakers / Delegators',
            description: 'Live participant count in our baking service'
          },
          {
            icon: Award,
            number: data.performance ? `${(data.performance * 100).toFixed(2)}%` : '—',
            label: 'Performance',
            description: 'Baker performance (not true uptime)'
          },
          {
            icon: TrendingUp,
            number: data.fee ? `${data.fee}%` : '—',
            label: 'Baker Fee',
            description: 'Current fee for delegators'
          },
          {
            icon: Clock,
            number: head?.timestamp ? nextBlockEta : '—',
            label: 'Next Block ETA',
            description: 'Estimated time until next block'
          },
          {
            icon: Timer,
            number: uptimeValue,
            label: 'Uptime',
            description: 'Time since last missed block'
          }
        ]);
      })
      .catch(() => setStats(defaultStats));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-tezos-blue to-purple-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by the Community
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our track record speaks for itself. Join thousands of satisfied delegators 
            who trust us with their XTZ holdings.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center glass-effect rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-blue-100 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-blue-200">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
