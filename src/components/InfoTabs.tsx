import { useState } from 'react';
import { Thermometer, Droplets, Zap, Home, AlertCircle, Hammer } from 'lucide-react';
import { ContractorSpecs } from './ContractorSpecs';

export function InfoTabs() {
  const [activeTab, setActiveTab] = useState<'flooring' | 'hvac' | 'utilities' | 'layout' | 'contractor'>('contractor');

  const tabs = [
    { id: 'contractor' as const, label: 'For Contractor', icon: Hammer },
    { id: 'flooring' as const, label: 'Flooring', icon: Home },
    { id: 'hvac' as const, label: 'HVAC', icon: Thermometer },
    { id: 'utilities' as const, label: 'Utilities', icon: Zap },
    { id: 'layout' as const, label: 'Layout Tips', icon: AlertCircle },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="p-6">
        {activeTab === 'contractor' && (
          <ContractorSpecs />
        )}

        {activeTab === 'flooring' && (
          <div className="space-y-4">
            <h3 className="text-slate-900">Flooring Recommendations</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-slate-900">✓ Sealed Concrete (Best)</div>
                <p className="text-sm text-slate-600 mt-1">
                  Easy to clean, waterproof, durable. Apply epoxy or polyurethane sealer. Your garage likely has this already!
                </p>
                <p className="text-sm text-slate-500 mt-1">Cost: $2-5/sq ft for sealing</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-slate-900">✓ Vinyl Plank (Good)</div>
                <p className="text-sm text-slate-600 mt-1">
                  Waterproof luxury vinyl plank. Easy DIY install. Look for thick commercial-grade options.
                </p>
                <p className="text-sm text-slate-500 mt-1">Cost: $3-7/sq ft</p>
                <p className="text-sm text-slate-500">Brands: Coretec, LifeProof, Shaw</p>
              </div>

              <div className="border-l-4 border-amber-500 pl-4">
                <div className="text-slate-900">○ Tile (Acceptable)</div>
                <p className="text-sm text-slate-600 mt-1">
                  Ceramic or porcelain tile. Durable but grout lines can trap clay. Use epoxy grout.
                </p>
                <p className="text-sm text-slate-500 mt-1">Cost: $5-15/sq ft installed</p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <div className="text-slate-900">✗ Avoid These</div>
                <p className="text-sm text-slate-600 mt-1">
                  Carpet, hardwood, laminate, unsealed concrete. Clay dust will ruin them or make cleaning impossible.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 Pro Tip: Add rubber mats under your wheel for comfort and easy cleanup. They catch water and clay slurry.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'hvac' && (
          <div className="space-y-4">
            <h3 className="text-slate-900">Heating, Cooling & Ventilation</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-900">Heating</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Keep studio 50-70°F. Clay doesn't like freezing temperatures.
                </p>
                <ul className="text-sm text-slate-600 space-y-1 ml-4">
                  <li>• <span className="text-slate-900">Mini-split</span> - Best option. Efficient heating + cooling. ($1,500-3,000 installed)</li>
                  <li>• <span className="text-slate-900">Electric space heater</span> - Budget option. Get ceramic with tip-over protection. ($50-150)</li>
                  <li>• <span className="text-slate-900">Radiant floor heating</span> - Luxury option if building new. Nice for comfort.</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span className="text-slate-900">Cooling & Dehumidification</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Clay work generates moisture. You want 30-50% humidity.
                </p>
                <ul className="text-sm text-slate-600 space-y-1 ml-4">
                  <li>• <span className="text-slate-900">Mini-split AC/Heat pump</span> - Handles both temperature and humidity</li>
                  <li>• <span className="text-slate-900">Dehumidifier</span> - 50-70 pint capacity recommended ($200-400)</li>
                  <li>• <span className="text-slate-900">Window AC unit</span> - Budget option ($150-400)</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-slate-900">Ventilation (Critical!)</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Kilns produce fumes. Clay dust is hazardous. Good ventilation is non-negotiable.
                </p>
                <ul className="text-sm text-slate-600 space-y-1 ml-4">
                  <li>• <span className="text-slate-900">Kiln vent hood</span> - ESSENTIAL. Vent to outside. ($400-800)</li>
                  <li>• <span className="text-slate-900">Brands:</span> Vent-A-Kiln, Skutt Envirovent</li>
                  <li>• <span className="text-slate-900">General ventilation</span> - Box fan in window or exhaust fan</li>
                  <li>• <span className="text-slate-900">Air purifier</span> - HEPA filter for clay dust ($200-400)</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-900">
                ⚠️ Safety First: Never fire a kiln without proper ventilation. Fumes can be toxic. Budget for a kiln vent system.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'utilities' && (
          <div className="space-y-4">
            <h3 className="text-slate-900">Electrical, Plumbing & Gas</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-slate-900">Electrical Requirements</span>
                </div>
                <ul className="text-sm text-slate-600 space-y-2 ml-4">
                  <li>
                    <span className="text-slate-900">• Kiln:</span> Most home kilns need 240V/50A circuit. This is the biggest electrical requirement. Hire a licensed electrician. ($500-1,500 for new circuit)
                  </li>
                  <li>
                    <span className="text-slate-900">• Pottery wheels:</span> Standard 120V outlet is fine
                  </li>
                  <li>
                    <span className="text-slate-900">• Lighting:</span> Bright LED shop lights. 4,000-5,000K color temp shows clay color accurately. ($30-100 per fixture)
                  </li>
                  <li>
                    <span className="text-slate-900">• Total capacity:</span> Your garage probably needs a subpanel upgrade to handle the kiln. Budget $1,000-2,000 for electrical work.
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-900">Plumbing</span>
                </div>
                <ul className="text-sm text-slate-600 space-y-2 ml-4">
                  <li>
                    <span className="text-slate-900">• Sink is ESSENTIAL:</span> You'll wash hands, tools, and clean up constantly
                  </li>
                  <li>
                    <span className="text-slate-900">• Clay trap required:</span> Never wash clay down a regular drain! It will clog your pipes. Use a sediment trap or make one with 5-gallon buckets.
                  </li>
                  <li>
                    <span className="text-slate-900">• Location:</span> Place near exterior wall to minimize plumbing runs
                  </li>
                  <li>
                    <span className="text-slate-900">• Cost:</span> $800-2,000 to add sink with proper drainage if garage doesn't have plumbing
                  </li>
                  <li>
                    <span className="text-slate-900">• DIY option:</span> Use utility tub with sediment bucket system
                  </li>
                </ul>
              </div>

              <div>
                <div className="text-slate-900 mb-2">Natural Gas (Optional)</div>
                <p className="text-sm text-slate-600 mb-2">
                  Only needed if you want a gas kiln (rare for home studios). Electric kilns are the standard for home use—safer, easier, and no gas line needed.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-900">
                💰 Budget Summary: Electrical work for kiln ($1,500-2,500) + Plumbing for sink ($500-2,000) = $2,000-4,500 total for utilities. This is in addition to equipment costs.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-4">
            <h3 className="text-slate-900">Studio Layout Best Practices</h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-900 mb-2">🔄 Workflow Zones</div>
                <p className="text-sm text-slate-600">
                  Organize your studio in a circular workflow:
                </p>
                <ol className="text-sm text-slate-600 mt-2 ml-4 space-y-1">
                  <li>1. Clay storage → Wedging table</li>
                  <li>2. Wheel or hand-building table (creation)</li>
                  <li>3. Drying shelves (greenware)</li>
                  <li>4. Kiln (bisque firing)</li>
                  <li>5. Glazing area (near sink)</li>
                  <li>6. Kiln (glaze firing)</li>
                  <li>7. Finished piece storage</li>
                </ol>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-900 mb-2">📏 Space Requirements</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• <span className="text-slate-900">Minimum:</span> 10' x 12' (120 sq ft) - Very tight but workable</li>
                  <li>• <span className="text-slate-900">Comfortable:</span> 12' x 16' (192 sq ft) - Good for one potter</li>
                  <li>• <span className="text-slate-900">Ideal:</span> 16' x 20' (320 sq ft) - Room to grow and teach</li>
                </ul>
                <p className="text-sm text-green-600 mt-2">
                  ✓ Your 12' x 20' (240 sq ft) garage bay is PERFECT for a functional home studio!
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-900 mb-2">⚡ Safety Clearances</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• <span className="text-slate-900">Kiln:</span> 18" minimum clearance on all sides. Kiln gets HOT (2,300°F)</li>
                  <li>• <span className="text-slate-900">Fire extinguisher:</span> ABC-rated, mounted near exit</li>
                  <li>• <span className="text-slate-900">Smoke detector:</span> Install one (kiln fumes can trigger it though)</li>
                  <li>• <span className="text-slate-900">First aid kit:</span> Keep one handy for cuts from wire tools</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-900 mb-2">💡 Lighting</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Natural light is ideal for color accuracy</li>
                  <li>• LED shop lights: 4,000-5,000K color temperature</li>
                  <li>• Task lighting over work surfaces</li>
                  <li>• Aim for 75-100 foot-candles of brightness</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-900 mb-2">🧹 Cleanliness</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Clay dust is hazardous—wet mop, don't sweep</li>
                  <li>• HEPA vacuum for cleanup</li>
                  <li>• Keep work areas separate from finished piece storage</li>
                  <li>• Wear a respirator when mixing dry materials</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-900 mb-2">🎨 Nice-to-Haves</div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Sound system or speaker for music</li>
                  <li>• Comfortable stool with back support</li>
                  <li>• Mirror to see your wheel work from all angles</li>
                  <li>• Pegboard or wall organization for tools</li>
                  <li>• Apron and towel hooks</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
