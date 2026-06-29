import { lazy, Suspense } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { Calculator, TrendingUp, DollarSign, Zap } from 'lucide-react';

const RefractionCanvas = lazy(() => import('../components/RefractionCanvas'));

export default function CalculatorSection() {
  const { bill, result, handleBillChange } = useCalculator();

  return (
    <section id="calculator" className="py-20 md:py-28 bg-white dark:bg-midnight relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="lg:col-span-2 section-reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-teal" />
              <span className="text-teal text-sm font-semibold uppercase tracking-[3px]">
                Savings Calculator
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-white mb-6">
              Calculate Your{' '}
              <span className="text-amber">Savings</span>
            </h2>
            <p className="text-slate leading-relaxed mb-8">
              Enter your average monthly WAPDA electricity bill below and see how much
              you could save by switching to solar power with Sarwer Enterprises.
            </p>

            {/* Input */}
            <div className="bg-cloud dark:bg-white/5 rounded-2xl p-6 mb-6">
              <label className="block text-sm font-semibold text-charcoal dark:text-white mb-3">
                Monthly Electricity Bill (PKR)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => handleBillChange(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-midnight border-2 border-teal/20 rounded-xl text-charcoal dark:text-white font-display text-lg font-bold placeholder:text-slate/50 focus:outline-none focus:border-amber transition-colors"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2">
              {[5000, 10000, 20000, 35000, 50000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleBillChange(preset.toString())}
                  className="px-4 py-2 text-sm font-medium bg-cloud dark:bg-white/5 text-slate dark:text-white/70 rounded-lg hover:bg-amber hover:text-midnight transition-all duration-200"
                >
                  PKR {preset.toLocaleString('en-PK')}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Results + Refraction */}
          <div className="lg:col-span-3 section-reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="relative min-h-[480px] rounded-2xl overflow-hidden">
              {/* Refraction Background */}
              <Suspense
                fallback={
                  <div className="absolute inset-0 bg-gradient-to-br from-midnight via-[#0f2d3a] to-midnight" />
                }
              >
                <RefractionCanvas />
              </Suspense>

              {/* Results Overlay */}
              <div className="relative z-10 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-amber/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-amber" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Your Solar Estimate
                  </h3>
                </div>

                {result ? (
                  <div className="space-y-4">
                    {/* System Size */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-amber" />
                        <span className="text-white/60 text-sm">Recommended System Size</span>
                      </div>
                      <p className="font-display text-3xl md:text-4xl font-bold text-white">
                        {result.systemSize}
                      </p>
                    </div>

                    {/* Payback Period */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-teal" />
                        <span className="text-white/60 text-sm">Cost Payback Period</span>
                      </div>
                      <p className="font-display text-3xl md:text-4xl font-bold text-amber">
                        {result.paybackPeriod}
                      </p>
                    </div>

                    {/* Lifetime Savings */}
                    <div className="bg-amber/20 backdrop-blur-md rounded-xl p-5 border border-amber/30">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-amber" />
                        <span className="text-white/80 text-sm font-semibold">
                          25-Year Lifetime Savings
                        </span>
                      </div>
                      <p className="font-display text-3xl md:text-4xl font-bold text-white">
                        {result.lifetimeSavings}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Calculator className="w-10 h-10 text-white/40" />
                    </div>
                    <p className="text-white/50 text-lg">
                      Enter your monthly bill to see your solar savings estimate
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
