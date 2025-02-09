import React from 'react';
import { Lock, Sparkles, Flame, CreditCard } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex gap-6 max-w-xl">
    <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-white font-mono text-lg mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Features = () => {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col justify-center px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-mono mb-4">
            <span className="text-yellow-400">100%</span>
            <span className="text-white"> Open-Source</span>
          </h2>
          <div className="text-slate-400 font-mono">
            <p>No vendor lock-in.</p>
            <p>Deploy anywhere.</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          <FeatureCard
            icon={<Sparkles className="text-yellow-400 w-6 h-6" />}
            title="Open-Source Philosophy"
            description="The repo and framework are 100% open-source, and so are the services wherever possible. Still missing something? Contribute!"
          />

          <FeatureCard
            icon={<Lock className="text-yellow-400 w-6 h-6" />}
            title="DIY Auth, Done For You"
            description="Pre-configured full-stack Auth that you own. No 3rd-party services or hidden fees."
          />

          <FeatureCard
            icon={<Flame className="text-yellow-400 w-6 h-6" />}
            title="Full-stack Type Safety"
            description="Full support for TypeScript with auto-generated types that span the whole stack. Nothing to configure!"
          />

          <FeatureCard
            icon={<CreditCard className="text-yellow-400 w-6 h-6" />}
            title="Stripe / Lemon Squeezy Integration"
            description="No SaaS is complete without payments. We've pre-configured checkout and webhooks. Just choose a provider and start cashing out."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;