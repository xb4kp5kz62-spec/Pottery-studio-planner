import { useState, useEffect } from 'react';
import { FloorPlan } from './components/FloorPlan';
import { EquipmentPanel } from './components/EquipmentPanel';
import { InfoTabs } from './components/InfoTabs';
import { SupplyList } from './components/SupplyList';
import { MaintenanceList } from './components/MaintenanceList';
import { FiringLog } from './components/FiringLog';
import { Ruler, Info, ShoppingCart, Wrench, Flame, GripVertical, RotateCcw, Save } from 'lucide-react';

export interface Equipment {
  id: string;
  name: string;
  category: string;
  width: number; // in feet
  depth: number; // in feet
  x: number;
  y: number;
  purchased: boolean;
  priority: 'essential' | 'recommended' | 'optional';
  estimatedCost: string;
  brands: string[];
  notes: string;
  rotation: 0 | 90 | 180 | 270; // rotation in degrees
}

export default function App() {
  const [spaceWidth, setSpaceWidth] = useState(() => {
    const saved = localStorage.getItem('pottery-studio-width');
    return saved ? Number(saved) : 12;
  });
  const [spaceDepth, setSpaceDepth] = useState(() => {
    const saved = localStorage.getItem('pottery-studio-depth');
    return saved ? Number(saved) : 20;
  });
  const [showUtilities, setShowUtilities] = useState(() => {
    const saved = localStorage.getItem('pottery-studio-show-utilities');
    return saved ? JSON.parse(saved) : false;
  });
  const [showKilnClearance, setShowKilnClearance] = useState(() => {
    const saved = localStorage.getItem('pottery-studio-show-kiln-clearance');
    return saved ? JSON.parse(saved) : true;
  });
  const [manDoorPosition, setManDoorPosition] = useState(() => {
    const saved = localStorage.getItem('pottery-studio-door-position');
    return saved ? Number(saved) : 8;
  });

  // Sidebar sections with drag and drop ordering
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem('pottery-studio-sections');
    if (saved) {
      return JSON.parse(saved).map((section: any) => ({
        ...section,
        icon: section.id === 'firing-log' ? Flame :
              section.id === 'supply-list' ? ShoppingCart :
              section.id === 'equipment' ? Ruler :
              section.id === 'setup-guide' ? Info :
              section.id === 'maintenance' ? Wrench : Info,
        component: section.id === 'firing-log' ? FiringLog :
                   section.id === 'supply-list' ? SupplyList :
                   section.id === 'setup-guide' ? InfoTabs :
                   section.id === 'maintenance' ? MaintenanceList : null
      }));
    }
    return [
      { id: 'firing-log', label: 'Firing Log', icon: Flame, component: FiringLog, expanded: false },
      { id: 'supply-list', label: 'Supply Shopping List', icon: ShoppingCart, component: SupplyList, expanded: false },
      { id: 'equipment', label: 'Equipment List', icon: Ruler, component: null, expanded: false }, // Special case
      { id: 'setup-guide', label: 'Studio Setup Guide', icon: Info, component: InfoTabs, expanded: false },
      { id: 'maintenance', label: 'Maintenance Schedule', icon: Wrench, component: MaintenanceList, expanded: false }
    ];
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('pottery-studio-equipment');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'wheel-1',
        name: 'Pottery Wheel',
        category: 'Wheels',
        width: 2,
        depth: 2.5,
        x: 1.5,
        y: 16.5,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$800-$2000',
        brands: ['Shimpo', 'Brent', 'Speedball'],
        notes: 'Shimpo VL-Whisper is quiet and reliable. Brent Model C is industry standard.',
        rotation: 0
      },
      {
        id: 'wheel-2',
        name: 'Pottery Wheel (Optional)',
        category: 'Wheels',
        width: 2,
        depth: 2.5,
        x: 4.5,
        y: 16.5,
        purchased: false,
        priority: 'optional',
        estimatedCost: '$800-$2000',
        brands: ['Shimpo', 'Brent', 'Speedball'],
        notes: 'Second wheel if you plan to teach or work with others.',
        rotation: 0
      },
      {
        id: 'kiln-1',
        name: 'Electric Kiln',
        category: 'Kilns',
        width: 2.5,
        depth: 2.5,
        x: 9,
        y: 1,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$1500-$4000',
        brands: ['L&L', 'Skutt', 'Olympic'],
        notes: 'Skutt KM-1027 (10 cu ft) is great for home studios. Needs 240V outlet. Keep 18" clearance.',
        rotation: 0
      },
      {
        id: 'worktable-1',
        name: 'Wedging/Work Table',
        category: 'Work Surfaces',
        width: 3,
        depth: 2.5,
        x: 5,
        y: 7,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$200-$600',
        brands: ['Custom/DIY', 'Continental Clay', 'Bailey'],
        notes: 'Canvas-covered plaster surface ideal for wedging. Counter height (36").',
        rotation: 0
      },
      {
        id: 'worktable-2',
        name: 'Hand-building Table',
        category: 'Work Surfaces',
        width: 4,
        depth: 3,
        x: 1,
        y: 12.5,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$150-$400',
        brands: ['DIY', 'IKEA (modified)', 'Adjustable workbench'],
        notes: 'Sturdy table for slab building and handwork. 30-36" height.',
        rotation: 0
      },
      {
        id: 'sink-1',
        name: 'Clay Sink w/ Trap',
        category: 'Plumbing',
        width: 2,
        depth: 2,
        x: 10,
        y: 10,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$300-$800',
        brands: ['Plaster trap (DIY)', 'Continental Clay', 'Bluebird'],
        notes: 'MUST have sediment trap to prevent clay clogging plumbing. Never wash clay down regular drain.',
        rotation: 0
      },
      {
        id: 'shelving-1',
        name: 'Greenware Drying Shelf #1',
        category: 'Storage',
        width: 2,
        depth: 1.5,
        x: 1,
        y: 1,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$150-$400',
        brands: ['Continental Clay', 'Bailey', 'Wire shelving (DIY)'],
        notes: 'For drying greenware. Needs good airflow between shelves. 4-6 shelves high.',
        rotation: 0
      },
      {
        id: 'shelving-2',
        name: 'Greenware Drying Shelf #2',
        category: 'Storage',
        width: 2,
        depth: 1.5,
        x: 4,
        y: 1,
        purchased: false,
        priority: 'recommended',
        estimatedCost: '$150-$400',
        brands: ['Continental Clay', 'Bailey', 'Wire shelving (DIY)'],
        notes: 'Additional drying space. You can never have too many drying shelves!',
        rotation: 0
      },
      {
        id: 'shelving-3',
        name: 'Glaze/Tool Storage',
        category: 'Storage',
        width: 2,
        depth: 1.5,
        x: 7,
        y: 1,
        purchased: false,
        priority: 'recommended',
        estimatedCost: '$100-$300',
        brands: ['Wire shelving', 'Gladiator garage system', 'Husky'],
        notes: 'Store glazes, tools, and supplies. Keep organized and labeled.',
        rotation: 0
      },
      {
        id: 'shelving-4',
        name: 'Finished Ware Storage',
        category: 'Storage',
        width: 2,
        depth: 1.5,
        x: 10,
        y: 5,
        purchased: false,
        priority: 'recommended',
        estimatedCost: '$100-$300',
        brands: ['Wire shelving', 'Metro shelving', 'Gladiator'],
        notes: 'For storing bisque-fired and finished pieces. Keep separate from greenware.',
        rotation: 0
      },
      {
        id: 'clay-storage',
        name: 'Clay Storage',
        category: 'Storage',
        width: 2,
        depth: 2,
        x: 10,
        y: 14.5,
        purchased: false,
        priority: 'essential',
        estimatedCost: '$50-$200',
        brands: ['Rubbermaid containers', 'Trash cans with lids'],
        notes: 'Keep clay moist. Airtight containers or lined trash cans work well. Store 100-200 lbs.',
        rotation: 0
      },
      {
        id: 'reclaim-station',
        name: 'Clay Reclaim/Slop Buckets',
        category: 'Clay Prep',
        width: 2,
        depth: 2,
        x: 7.5,
        y: 14.5,
        purchased: false,
        priority: 'recommended',
        estimatedCost: '$30-$100',
        brands: ['5-gallon buckets', 'Rubbermaid', 'Home Depot buckets'],
        notes: 'For clay scraps and throwing slurry. Let settle, pour off water, reclaim clay. Get 4-6 buckets.',
        rotation: 0
      },
      {
        id: 'pugmill',
        name: 'Pug Mill (Optional)',
        category: 'Clay Prep',
        width: 2,
        depth: 3,
        x: 5.5,
        y: 14.5,
        purchased: false,
        priority: 'optional',
        estimatedCost: '$1500-$3500',
        brands: ['Peter Pugger', 'Venco', 'Bluebird'],
        notes: 'For recycling clay. Not essential when starting out. Can wedge by hand.',
        rotation: 0
      },
      {
        id: 'bat-storage',
        name: 'Bat & Board Rack',
        category: 'Storage',
        width: 1.5,
        depth: 1,
        x: 7.5,
        y: 16.5,
        purchased: false,
        priority: 'recommended',
        estimatedCost: '$50-$150',
        brands: ['DIY wall-mounted', 'Continental Clay'],
        notes: 'Wall-mounted or standing rack for wheel bats and drying boards. Essential for throwing.',
        rotation: 0
      },
      {
        id: 'tool-cart',
        name: 'Rolling Tool Cart',
        category: 'Storage',
        width: 1.5,
        depth: 2,
        x: 1,
        y: 4,
        purchased: false,
        priority: 'recommended',
        estimatedCost: '$100-$300',
        brands: ['Husky rolling cart', 'IKEA Raskog', 'Harbor Freight'],
        notes: 'Mobile storage for frequently used tools. Keep by your wheel/work area.',
        rotation: 0
      }
    ];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('pottery-studio-equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('pottery-studio-width', String(spaceWidth));
  }, [spaceWidth]);

  useEffect(() => {
    localStorage.setItem('pottery-studio-depth', String(spaceDepth));
  }, [spaceDepth]);

  useEffect(() => {
    localStorage.setItem('pottery-studio-show-utilities', JSON.stringify(showUtilities));
  }, [showUtilities]);

  useEffect(() => {
    localStorage.setItem('pottery-studio-show-kiln-clearance', JSON.stringify(showKilnClearance));
  }, [showKilnClearance]);

  useEffect(() => {
    localStorage.setItem('pottery-studio-door-position', String(manDoorPosition));
  }, [manDoorPosition]);

  useEffect(() => {
    // Save section order and expanded states, but remove icon/component (can't stringify functions)
    const sectionsToSave = sections.map(({ id, label, expanded }) => ({ id, label, expanded }));
    localStorage.setItem('pottery-studio-sections', JSON.stringify(sectionsToSave));
  }, [sections]);

  const updateEquipment = (id: string, updates: Partial<Equipment>) => {
    setEquipment(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const togglePurchased = (id: string) => {
    setEquipment(prev =>
      prev.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item)
    );
  };

  const deleteEquipment = (id: string) => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  };

  const addEquipment = (newEquipment: Omit<Equipment, 'id' | 'x' | 'y' | 'rotation'>) => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newItem: Equipment = {
      ...newEquipment,
      id,
      x: 1, // Start position
      y: 5,
      rotation: 0
    };
    setEquipment(prev => [...prev, newItem]);
  };

  const resetToDefaults = () => {
    if (confirm('Reset floor plan to default layout? This will clear all your changes.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedIndex !== null && draggedIndex !== index) {
      const newSections = [...sections];
      const [draggedSection] = newSections.splice(draggedIndex, 1);
      newSections.splice(index, 0, draggedSection);
      setSections(newSections);
    }
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const toggleSection = (index: number) => {
    const newSections = [...sections];
    newSections[index].expanded = !newSections[index].expanded;
    setSections(newSections);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-slate-900">Pottery Studio Planner</h1>
            <p className="text-slate-600 mt-1">
              Design your home pottery studio with interactive floor planning and equipment recommendations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
              <Save className="w-4 h-4" />
              <span>Auto-saved</span>
            </div>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Default</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Floor Plan */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-slate-600" />
                  <h2 className="text-slate-900">Floor Plan</h2>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="text-slate-600 text-sm">Width:</label>
                    <input
                      type="number"
                      value={spaceWidth}
                      onChange={(e) => setSpaceWidth(Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                      min="8"
                      max="40"
                    />
                    <span className="text-slate-600 text-sm">ft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-slate-600 text-sm">Depth:</label>
                    <input
                      type="number"
                      value={spaceDepth}
                      onChange={(e) => setSpaceDepth(Number(e.target.value))}
                      className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                      min="8"
                      max="40"
                    />
                    <span className="text-slate-600 text-sm">ft</span>
                  </div>
                  <button
                    onClick={() => { setSpaceWidth(12); setSpaceDepth(20); }}
                    className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                  >
                    12x20 Garage
                  </button>
                  <button
                    onClick={() => { setSpaceWidth(16); setSpaceDepth(20); }}
                    className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                  >
                    16x20 Shed
                  </button>
                </div>
              </div>
              
              <div className="mb-4 flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <label className="text-slate-700 text-sm whitespace-nowrap">Interior Man Door Position:</label>
                <input
                  type="range"
                  value={manDoorPosition}
                  onChange={(e) => setManDoorPosition(Number(e.target.value))}
                  className="flex-1"
                  min="2"
                  max={spaceDepth - 5}
                  step="0.5"
                />
                <span className="text-slate-600 text-sm whitespace-nowrap">{manDoorPosition}' from top</span>
              </div>
              
              <FloorPlan
                width={spaceWidth}
                depth={spaceDepth}
                equipment={equipment}
                onUpdateEquipment={updateEquipment}
                onDeleteEquipment={deleteEquipment}
                manDoorPosition={manDoorPosition}
              />

              <div className="mt-4 flex items-start gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-slate-600">Essential</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-slate-600">Recommended</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-slate-600">Optional</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-300 border-2 border-slate-400 rounded"></div>
                  <span className="text-slate-600">Purchased</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                className={`relative transition-all ${draggedIndex === index ? 'opacity-50' : ''} ${draggedIndex !== null && draggedIndex !== index ? 'border-2 border-dashed border-blue-300 rounded-lg' : ''}`}
              >
                <div className="flex items-stretch gap-2">
                  {/* Drag Handle */}
                  <div 
                    draggable
                    onDragStart={(e) => {
                      handleDragStart(index);
                      e.stopPropagation();
                    }}
                    onDragEnd={handleDragEnd}
                    className="flex items-center cursor-grab active:cursor-grabbing bg-white border border-slate-200 rounded-l-lg hover:bg-slate-50 transition-colors px-2"
                  >
                    <GripVertical className="w-4 h-4 text-slate-400" />
                  </div>
                  
                  {/* Section Button */}
                  <button
                    onClick={() => {
                      if (section.id === 'equipment') {
                        const newSections = [...sections];
                        newSections[index].expanded = !newSections[index].expanded;
                        setSections(newSections);
                      } else {
                        toggleSection(index);
                      }
                    }}
                    className="flex-1 flex items-center justify-between px-4 py-3 bg-white rounded-r-lg shadow-sm border border-l-0 border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">{section.label}</span>
                    </div>
                    <span className="text-slate-400">{section.expanded ? '−' : '+'}</span>
                  </button>
                </div>

                {/* Section Content */}
                {section.expanded && section.component && <section.component />}
                
                {section.id === 'equipment' && section.expanded && (
                  <EquipmentPanel 
                    equipment={equipment} 
                    onTogglePurchased={togglePurchased}
                    onDeleteEquipment={deleteEquipment}
                    onAddEquipment={addEquipment}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
