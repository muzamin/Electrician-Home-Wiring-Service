/**
 * ============================================================================
 * VOLTGUARD — SERVICE DETAILS DYNAMIC ENGINE (service detail.js)
 * Master Interactive JavaScript for Service Specification & Dynamic Details
 *
 * Supported 6 Services:
 *  1. wiring: Whole-Home Rewiring & Cable Replacement
 *  2. fan-light: Ceiling Fan & Architectural Light Fitting
 *  3. switchboard: Switchboard & Circuit Breaker Repair
 *  4. ev-charger: Residential EV Charging Station Setup
 *  5. emergency-diagnostics: Emergency Electrical Diagnostics & Safety Audits
 *  6. smart-home: Smart Home Load Centers & Panel Automation
 *
 * Capabilities:
 *  - URL Parameter Parsing (?service=...)
 *  - Dynamic 6-Service Content Engine (Hero, Context, Specs, Why Choose, Pricing, FAQs)
 *  - Seamless In-Page Service Switcher without Reload
 *  - Synchronized Theme Toggle & RTL Toggle
 *  - Sticky Header Elevation
 *  - Classy Dropdown & Mobile Drawer Navigation
 *  - Dynamic Quote Modal Pre-filling
 *  - Interactive FAQ Accordions
 *  - Toast Notifications
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. SIX DISTINCT SERVICES COMPREHENSIVE DATA STORE
     -------------------------------------------------------------------------- */
  const SERVICES_DATA = {
    'wiring': {
      id: 'wiring',
      shortName: 'Whole-Home Rewire',
      title: 'Whole-Home Rewiring & Cable Replacement',
      tagline: 'Engineered Copper Feeder Distribution & Code-Certified Safety',
      badge: 'NEC 2024 SAFETY COMPLIANT',
      heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80',
      heroImageAlt: 'Electrician stripping and wiring clean copper circuits in modern residential panel',
      telemetry: 'NEC 2024 Inspected',
      heroCaption: 'Pure Copper Romex & EMT Feeder Architecture',
      heroSubtext: 'Subpanel load-balanced for high-draw appliances and EV future-proofing',
      description: 'Complete removal of outdated knob-and-tube, degraded cloth wiring, or hazardous aluminum branch circuits. We install 99.9% oxygen-free pure copper THHN and Romex conductors encased in heavy-duty conduits, complete with code-certified bonding, arc-fault defense, and certified municipal inspection sign-off.',
      chips: [
        '99.9% Pure Copper THHN',
        'EMT & NM-B Conduit Spec',
        'Dual AFCI/GFCI Protection',
        'City Permit & Sign-off Included'
      ],
      contextHeading: 'Engineered Copper Feeder Distribution & Code-Certified Safety',
      contextParagraph1: 'Modern homes consume up to 400% more electricity than properties built just thirty years ago. Aging cloth-insulated and aluminum conductors become brittle over time, generating high electrical resistance and dangerous micro-arcing inside enclosed wall cavities.',
      contextParagraph2: 'VoltGuard engineered rewiring designs structured multi-branch circuits with separate home-runs for heavy draw appliances, smart home servers, and modern EV infrastructure, completely eliminating voltage drops and flickering lights.',
      specs: [
        { label: 'Conductor Standard', value: 'THHN 99.9% Copper', note: 'Oxygen-free annealed conductors' },
        { label: 'Thermal Rating', value: '90°C Wet/Dry', note: 'UL 83 listed fire-retardant jacket' },
        { label: 'Circuit Capacity', value: 'Up to 200A / 400A', note: 'Split-phase balanced distribution' },
        { label: 'Code Stamped', value: 'NEC 2024 & NFPA 70', note: 'Full municipal compliance certificate' }
      ],
      includedChecklist: [
        'Complete safe extraction and eco-disposal of old aluminum/cloth wiring',
        'Minimal-invasive endoscopic wire fishing through wall and ceiling cavities',
        'Dedicated 20A GFCI appliance circuits for kitchen, laundry, and baths',
        'Subpanel installation with balanced phase loads and heavy-duty ground rods',
        'Turnkey municipal permit management and final inspector sign-off'
      ],
      whyChoose: [
        {
          title: 'Zero-Trace Wire Fishing',
          desc: 'Our endoscopic cavity cameras and flexible guide rods route circuits through wall framing with surgical precision, reducing sheetrock incisions by over 80%.',
          icon: 'laser'
        },
        {
          title: 'Megohmmeter Insulation Verification',
          desc: 'Every single branch circuit undergoes rigorous high-voltage insulation resistance testing before energizing to guarantee zero micro-shorts.',
          icon: 'shield'
        },
        {
          title: 'Lifetime Workmanship Guarantee',
          desc: 'We back every terminal, conductor run, and junction connection with our unconditional VoltGuard lifetime labor and safety warranty.',
          icon: 'tool'
        }
      ],
      pricing: [
        {
          title: 'Circuit Diagnostics & Audit',
          summary: 'Complete infrared thermography and circuit mapping of existing wiring.',
          price: '189',
          period: 'flat evaluation',
          featured: false,
          features: [
            'Full FLIR thermal scan of all junction boxes',
            'Neutral-to-ground impedance measurement',
            'Outdated cloth/aluminum circuit identification',
            'Itemized municipal code compliance report'
          ],
          cta: 'Book Wiring Diagnostic'
        },
        {
          title: 'Partial High-Risk Rewire',
          summary: 'Targeted rewire for kitchens, bathrooms, and vulnerable branch circuits.',
          price: '1,850',
          period: 'starting price',
          featured: true,
          features: [
            'Complete copper rewiring for up to 6 high-draw zones',
            'New dual AFCI/GFCI dual-function breakers',
            'Zero-trace wall cavity guide installation',
            'Permit acquisition and master electrician sign-off',
            'Patch-ready drywall restoration'
          ],
          cta: 'Select Partial Rewire'
        },
        {
          title: 'Whole-Home Master Overhaul',
          summary: 'Turnkey whole-property electrical modernization from meter to every room.',
          price: '4,200',
          period: 'starting price',
          featured: false,
          features: [
            'Complete removal of all legacy conductors',
            'Up to 30 dedicated copper branch circuits',
            'Whole-home surge protector unit included',
            '200-Amp master subpanel upgrade coordination',
            'Official municipal certificate of occupancy compliance'
          ],
          cta: 'Book Whole-Home Rewire'
        }
      ],
      faqs: [
        {
          q: 'How long does a complete whole-home rewiring project take?',
          a: 'A standard 2,000 to 2,500 square foot home takes 3 to 5 business days. We stage the electrical work room-by-room so you maintain uninterrupted refrigeration, Wi-Fi, and temporary lighting overnight.'
        },
        {
          q: 'Will my interior walls need to be demolished?',
          a: 'No. Our licensed master electricians utilize specialized wire-fishing rods and bore cameras to maneuver wiring through hollow framing spaces. Small, neat drywall access holes are patched neatly upon completion.'
        },
        {
          q: 'Does VoltGuard handle city permits and building inspections?',
          a: 'Yes, we handle the entire process from start to finish. We submit electrical schematics, pull the required permits, and host the municipal electrical inspector for final green-tag sign-off.'
        },
        {
          q: 'How can I tell if my existing wiring is a fire hazard?',
          a: 'Warning signs include frequent breaker trips, warm or discolored outlet covers, burning plastic smells, flickering lights when appliances engage, or properties built before 1975 with ungrounded 2-prong plugs.'
        }
      ]
    },

    'fan-light': {
      id: 'fan-light',
      shortName: 'Fan & Light Fitting',
      title: 'Ceiling Fan & Architectural Light Fitting',
      tagline: 'Precision Dynamic Balancing, Recessed LED Layouts & Chandelier Engineering',
      badge: 'ARCHITECTURAL ILLUMINATION & AIRFLOW',
      heroImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      heroImageAlt: 'Modern architectural ceiling lighting and premium fixture assembly',
      telemetry: '70lb Dynamic Box Tested',
      heroCaption: 'Laser-Balanced Fixture Assembly',
      heroSubtext: 'Whisper-quiet fan resonance dampening and zero-flicker LED drivers',
      description: 'Transform your living environment with master-level lighting and ventilation installation. We engineer high-load ceiling junction boxes, chandelier winch hoists, multi-zone recessed LED downlights, and smart digital dimming controls with whisper-quiet, zero-wobble precision.',
      chips: [
        '70lb Dynamic Fan Rated',
        'CRI 95+ Warm Tone LEDs',
        'Lutron 0-10V / TRIAC Dimming',
        'Vibration Isolation Mount'
      ],
      contextHeading: 'Precision Dynamic Balancing & Architectural Lighting Layouts',
      contextParagraph1: 'A ceiling fan or chandelier is a dynamic mechanical load that requires specialized structural junction boxes. Fastening a vibrating fan motor to a standard plastic light box is dangerous and frequently causes drywall fractures, ceiling rattling, and motor burnout.',
      contextParagraph2: 'VoltGuard installs heavy-duty expandable steel joist brackets rated for 70 to 150 lbs of dynamic centrifugal force. We calculate lumen density and beam angles to eliminate dark corners, pairing fixtures with high-efficiency Lutron and smart dimming architecture.',
      specs: [
        { label: 'Centrifugal Load Rating', value: 'Up to 150 lbs', note: 'Heavy-duty steel ceiling joist brace' },
        { label: 'Color Rendering Index', value: 'CRI 95+ True Tone', note: 'Architectural studio lighting grade' },
        { label: 'Dimming Compatibility', value: 'Lutron / Zigbee / Z-Wave', note: 'Zero-flicker smooth sine curve' },
        { label: 'Energy Savings', value: 'Up to 85%', note: 'Energy Star certified LED efficiency' }
      ],
      includedChecklist: [
        'Installation of UL-listed dynamic ceiling fan support boxes and safety cables',
        'Dual-gang wall switch retrofits for separate fan speed and lighting control',
        'Laser-calibrated blade balancing to eliminate wobble and humming',
        'Precision layout and hole-boring for slim architectural wafer LED pot lights',
        'Assembly, wiring, testing, and safe disposal of old existing fixtures'
      ],
      whyChoose: [
        {
          title: 'Laser Centering & Balancing',
          desc: 'We utilize digital blade balancing clips and laser plumb lines to eliminate fan oscillation, ceiling shudder, and bearing friction.',
          icon: 'laser'
        },
        {
          title: 'Smart Scene Dimming Integration',
          desc: 'Enjoy personalized circadian lighting schedules, mood presets, and hands-free smartphone or voice commands with high-end dimming controls.',
          icon: 'shield'
        },
        {
          title: 'High-Ceiling & Chandelier Specialists',
          desc: 'Equipped with heavy-duty scaffolding and telescoping access gear to safely assemble and mount fixtures in 20ft foyers and cathedral ceilings.',
          icon: 'tool'
        }
      ],
      pricing: [
        {
          title: 'Single Fixture / Fan Swap',
          summary: 'Replacement of existing fixture onto pre-approved code-compliant junction box.',
          price: '149',
          period: 'per unit',
          featured: false,
          features: [
            'Assembly and wiring of customer-provided fan or light',
            'Reinforcement check of existing ceiling box',
            'Full dynamic blade balancing & speed calibration',
            'Clean removal and disposal of old fixture'
          ],
          cta: 'Book Fixture Swap'
        },
        {
          title: 'New Run Fan & Light Package',
          summary: 'Complete installation including new wiring, heavy-duty brace, and switch.',
          price: '389',
          period: 'starting price',
          featured: true,
          features: [
            'Heavy-duty steel joist spreader box installation',
            'New dedicated wall switch and circuit wiring',
            'Separate fan motor and dimmable lighting control',
            'Whisper-quiet vibration dampening system',
            'Master electrician lifetime installation warranty'
          ],
          cta: 'Select Fan Package'
        },
        {
          title: 'Architectural Recessed LED Suite',
          summary: 'Custom multi-point warm LED ceiling layout with smart digital dimmer.',
          price: '749',
          period: '6-can array',
          featured: false,
          features: [
            '6x ultra-slim CRI 95+ wafer LED downlights',
            'Laser-aligned geometric ceiling layout',
            'Lutron smart wireless digital dimmer switch included',
            'Zero drywall dust extraction cutting system',
            'Color-temperature selectable (2700K to 5000K)'
          ],
          cta: 'Book LED Suite'
        }
      ],
      faqs: [
        {
          q: 'Can you install a ceiling fan where only a standard light fixture was before?',
          a: 'Yes! Standard light junction boxes are only rated for stationary 50lb loads. We remove the old box and insert an expandable steel joist bracket that clamps firmly between your ceiling rafters, engineered specifically for moving fan motors.'
        },
        {
          q: 'Why do my current LED lights buzz or flicker when dimmed?',
          a: 'Flicker happens when the dimmer switch is incompatible with the solid-state drivers in LED bulbs. We replace incompatible switches with adaptive phase dimmers that provide smooth, continuous, zero-flicker dimming down to 1%.'
        },
        {
          q: 'Do I need to assemble the fixture before your electricians arrive?',
          a: 'No need! Our electricians unbox, inspect, assemble, and hang your fans, chandeliers, or pendants directly on site as part of our turnkey service.'
        },
        {
          q: 'Can I control my ceiling fan speed and lighting from my smartphone?',
          a: 'Absolutely. We install smart wall switches and canopy controllers compatible with Apple HomeKit, Amazon Alexa, and Google Assistant for effortless voice and smartphone control.'
        }
      ]
    },

    'switchboard': {
      id: 'switchboard',
      shortName: 'Switchboard Repair',
      title: 'Switchboard & Circuit Breaker Repair',
      tagline: 'Thermal Busbar Restoration, AFCI Upgrades & Panel Health Modernization',
      badge: 'NEMA 3R INDUSTRIAL RELIABILITY',
      heroImage: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80',
      heroImageAlt: 'Electrician testing multimeter terminals and inspecting industrial circuit breaker panel',
      telemetry: 'Thermal IR Verified',
      heroCaption: 'Silver-Plated Copper Busbar Restoration',
      heroSubtext: 'Eliminates hot terminals, loose lugs, and dangerous micro-arcing',
      description: 'Your main switchboard is the central nervous system of your entire electrical system. Our master electricians diagnose burnt breaker lugs, balance split-phase voltages, replace failing double-tapped breakers, and upgrade aging fuse boxes into state-of-the-art surge-protected power centers.',
      chips: [
        'Thermal IR Scan Certified',
        'Siemens & Square D QO Spec',
        'Whole-Home Surge 50kA',
        '22k AIC Fault Current Rated'
      ],
      contextHeading: 'Precision Thermal Diagnostics & Main Switchboard Restoration',
      contextParagraph1: 'High contact resistance on breaker busbars generates silent, extreme heat buildup that frequently goes undetected until catastrophic breaker failure or panel fire occurs. Overloaded terminals cause premature breaker trips and gradual appliance motor damage.',
      contextParagraph2: 'VoltGuard utilizes calibrated FLIR infrared thermal cameras to scan every breaker and feeder lug under active load. We torque all terminals to strict manufacturer inch-pound specifications, eliminate hazardous double-tapped neutrals, and install modern arc-fault mitigation.',
      specs: [
        { label: 'Busbar Purity', value: 'Silver-Plated Copper', note: 'Maximum conductivity & low resistance' },
        { label: 'Interruption Rating', value: '10k - 22k AIC', note: 'High fault-current short circuit rating' },
        { label: 'Surge Suppression', value: 'Type 2 50kA SPD', note: 'Whole-house electronic device shield' },
        { label: 'Thermal Scan Precision', value: '±0.1°C Accuracy', note: 'Calibrated FLIR micro-bolometer' }
      ],
      includedChecklist: [
        'Comprehensive thermal infrared imaging inspection under peak electrical load',
        'Replacement of buzzing, loose, heat-damaged, or trip-fatigued breakers',
        'Correction of double-tapped neutral bars and non-isolated ground loops',
        'Re-torquing all main breaker terminations to NEC calibrated specs',
        'Clean schematic relabeling of every household branch circuit'
      ],
      whyChoose: [
        {
          title: 'Calibrated Digital Torque Wrenching',
          desc: 'Loose terminal connections are responsible for over 70% of electrical panel fires. Every single screw terminal is torqued to exact engineering tolerances.',
          icon: 'tool'
        },
        {
          title: 'Original OEM Components Only',
          desc: 'We never mix non-certified breaker brands. We stock genuine Square D, Siemens, Eaton, and Leviton certified components for 100% manufacturer compliance.',
          icon: 'shield'
        },
        {
          title: 'Same-Day Breaker Warehouse Stock',
          desc: 'Our service vehicles carry hundreds of specialized, high-amperage, and AFCI breakers, ensuring immediate same-day restoration without supply delays.',
          icon: 'laser'
        }
      ],
      pricing: [
        {
          title: 'Emergency Breaker Diagnostic',
          summary: 'Thermal imaging scan, circuit tracing, and single-breaker replacement labor.',
          price: '169',
          period: 'flat diagnostic',
          featured: false,
          features: [
            'FLIR infrared heat mapping of main switchboard',
            'Digital circuit voltage & amp-draw audit',
            'Single faulty breaker replacement labor included',
            'Calibrated terminal torque re-tightening'
          ],
          cta: 'Book Breaker Diagnostic'
        },
        {
          title: 'Panel Safety & AFCI Upgrade',
          summary: 'Modernization of vulnerable breakers with arc-fault & surge protection.',
          price: '550',
          period: 'starting price',
          featured: true,
          features: [
            'Replacement of up to 6 breakers with dual AFCI/GFCI units',
            'Type 2 whole-house 50kA surge protector module',
            'Correction of hazardous double-tapped neutrals',
            'Full busbar cleaning, polishing, and torque certification',
            '10-Year VoltGuard switchboard performance warranty'
          ],
          cta: 'Select Panel Upgrade'
        },
        {
          title: '200A Master Panel Overhaul',
          summary: 'Complete replacement of outdated or hazardous fuse/breaker enclosure.',
          price: '1,950',
          period: 'starting price',
          featured: false,
          features: [
            'Brand-new 200-Amp Square D QO or Siemens copper panel',
            'New exterior utility disconnect and grounding electrode',
            'Whole-home surge protection & 30 branch breakers',
            'Coordination with power utility for same-day cutover',
            'Turnkey city building permit & final inspection sign-off'
          ],
          cta: 'Book Panel Overhaul'
        }
      ],
      faqs: [
        {
          q: 'Why does one particular circuit breaker keep tripping repeatedly?',
          a: 'A breaker trips due to three distinct causes: an electrical overload (too many active devices on one line), a short circuit (live wire touching neutral or ground), or mechanical fatigue in the breaker itself. Our technicians pinpoint the exact cause in minutes.'
        },
        {
          q: 'Can you replace outdated fuse boxes or Federal Pacific panels?',
          a: 'Yes. Older fuse boxes and discontinued panels like Federal Pacific Electric (FPE) and Zinsco are documented fire hazards with high breaker failure rates. We specialize in fast, same-day transitions to modern, code-certified load centers.'
        },
        {
          q: 'What is the purpose of an Arc-Fault Circuit Interrupter (AFCI)?',
          a: 'AFCI breakers detect subtle electrical sparking (arcing) caused by punctured wire insulation or loose outlet connections, instantly shutting down power before combustible framing lumber can catch fire.'
        },
        {
          q: 'How long will my power be off during a switchboard repair?',
          a: 'Routine breaker repairs or surge protector additions take only 30 to 60 minutes. A full 200A panel overhaul typically requires power shutoff for only 4 to 6 hours, coordinated directly with your local electric utility.'
        }
      ]
    },

    'ev-charger': {
      id: 'ev-charger',
      shortName: 'EV Charger Setup',
      title: 'Residential EV Charging Station Setup',
      tagline: 'Level 2 High-Speed 48A/60A Dedicated Home Charging Systems',
      badge: 'CLEAN MOBILITY & FAST POWER',
      heroImage: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=1200&q=80',
      heroImageAlt: 'Electric vehicle charging cable connected to luxury electric vehicle in clean residential garage',
      telemetry: '48A / 240V Continuous Duty',
      heroCaption: 'Level 2 High-Speed Home Charging',
      heroSubtext: 'Up to 44 miles of driving range added per hour of charge',
      description: 'Charge your electric vehicle up to seven times faster than a standard wall outlet. We engineer dedicated 240-Volt circuits, hardwired 48-Amp smart chargers, and industrial NEMA 14-50 receptacles with dynamic load management to safely power Tesla, Rivian, BMW, and universal EVs.',
      chips: [
        'Level 2 240V / 48A Max',
        'Tesla NACS & Universal J1772',
        'Off-Peak Smart Scheduling',
        'NEMA 4X Weatherproof Enclosure'
      ],
      contextHeading: 'High-Amperage Continuous Duty EV Charging Circuits',
      contextParagraph1: 'Plugging an electric car into a standard 120V household wall outlet adds only 3 to 4 miles of range per hour. Furthermore, continuous multi-hour loads push electrical connections to their thermal limits, requiring industrial-spec conductors and dedicated breakers.',
      contextParagraph2: 'VoltGuard installs heavy-gauge 6 AWG copper cable runs encased in metallic EMT or heavy-wall PVC conduits. We pair your charging station with dynamic load-management modules to safely accommodate fast charging without requiring an expensive utility service upgrade.',
      specs: [
        { label: 'Charge Speed', value: 'Up to 44 Miles/Hr', note: '11.5 kW high-speed Level 2 charging' },
        { label: 'Circuit Voltage', value: '240V Dedicated', note: '50A or 60A continuous duty rated' },
        { label: 'Connector Standard', value: 'NACS & J1772', note: 'Compatible with all electric vehicles' },
        { label: 'Weather Protection', value: 'NEMA 4X / IP66', note: 'Rated for outdoor rain, snow, and sun' }
      ],
      includedChecklist: [
        'Detailed electrical panel capacity load calculation and safety check',
        'Installation of dedicated 240V 50A/60A two-pole circuit breaker',
        'Surface-mount or in-wall metallic EMT conduit run to vehicle parking stall',
        'Industrial-grade Bryant/Hubbell receptacle or hardwired charger termination',
        'Smart Wi-Fi app configuration for automated off-peak utility rate charging'
      ],
      whyChoose: [
        {
          title: 'Industrial Heavy-Duty Receptacles',
          desc: 'We refuse to install budget consumer outlets that melt under sustained 40A charging loads. We exclusively specify heavy-duty industrial brass-clamped receptacles.',
          icon: 'tool'
        },
        {
          title: 'Smart Dynamic Load Shedding',
          desc: 'Avoid thousands in utility panel upgrade fees. Our smart monitors automatically throttle charging power if your home oven or heat pump turns on simultaneously.',
          icon: 'shield'
        },
        {
          title: 'Utility Rebate & Tax Credit Filing',
          desc: 'We compile all certified electrical schematics and permits needed to claim federal EV charger tax credits and local utility rebates of up to $1,000.',
          icon: 'laser'
        }
      ],
      pricing: [
        {
          title: 'EV Site & Load Evaluation',
          summary: 'Load calculation, electrical capacity check, and fixed-price installation quote.',
          price: '129',
          period: 'flat consultation',
          featured: false,
          features: [
            'NEC 220 electrical panel load calculation',
            'Conduit path and garage wiring assessment',
            'Evaluation for hardwire vs. NEMA 14-50 plug',
            'Utility rebate eligibility documentation'
          ],
          cta: 'Book EV Site Audit'
        },
        {
          title: 'Level 2 Standard Installation',
          summary: 'Complete 240V 50A circuit run and customer charger wall-mount installation.',
          price: '799',
          period: 'starting price',
          featured: true,
          features: [
            'Up to 30ft EMT conduit run from main panel to charger',
            '50-Amp dedicated circuit breaker & industrial outlet',
            'Secure wall mounting of customer-provided charger',
            'Full commissioning test with digital EV simulator',
            'City permit filing and inspection management'
          ],
          cta: 'Select Level 2 Install'
        },
        {
          title: 'Pro 48A Smart Hardwire Package',
          summary: 'High-speed smart charger hardware included with automated off-peak app.',
          price: '1,450',
          period: 'turnkey hardware + labor',
          featured: false,
          features: [
            '48-Amp Level 2 smart Wi-Fi charger unit included',
            '60-Amp heavy-duty copper circuit for max 11.5 kW output',
            'Dynamic off-peak rate scheduling for lowest charging cost',
            'Whole-home electrical surge protection module included',
            '5-Year full equipment and labor replacement warranty'
          ],
          cta: 'Book Pro Smart Charger'
        }
      ],
      faqs: [
        {
          q: 'Will my home electrical panel need to be upgraded to support an EV charger?',
          a: 'Not necessarily! If your main panel has 150A or 200A capacity and open breaker slots, you can install directly. If your panel is near capacity, our smart load-management switches eliminate the need for costly utility service upgrades.'
        },
        {
          q: 'Is it better to hardwire the charger or install a NEMA 14-50 plug?',
          a: 'Hardwiring provides the highest possible charging speed (48 Amps / 44 miles per hour) compared to plug-in stations (40 Amps / 30 miles per hour) and eliminates a plug connection point, maximizing long-term reliability.'
        },
        {
          q: 'Can an EV charging station be installed outside if I do not have a garage?',
          a: 'Yes, our outdoor installations utilize weatherproof NEMA 4X rated enclosures and UV-stabilized conduits designed to withstand torrential rain, sub-zero snow, and extreme heat.'
        },
        {
          q: 'How much money will I save by charging at home compared to public chargers?',
          a: 'Charging at home on off-peak electricity rates costs approximately $0.04 to $0.12 per kWh, compared to $0.40+ per kWh at public commercial fast chargers, saving typical drivers $1,200 to $1,800 annually.'
        }
      ]
    },

    'emergency-diagnostics': {
      id: 'emergency-diagnostics',
      shortName: 'Emergency Diagnostics',
      title: 'Emergency Electrical Diagnostics & Safety Audits',
      tagline: '24/7 Rapid Fault Location, Infrared Thermography & Spark Mitigation',
      badge: '24/7 EMERGENCY RAPID DISPATCH',
      heroImage: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
      heroImageAlt: 'Master technician troubleshooting commercial electrical system with digital diagnostic equipment',
      telemetry: 'Under 45-Min Priority Dispatch',
      heroCaption: 'FLIR Thermal Imaging & Fault Isolation',
      heroSubtext: 'Pinpoint underground and in-wall short circuits without destructive tearing',
      description: 'Sudden power outages, smoking outlets, burning plastic odors, and persistent breaker trips require urgent professional triage. Our emergency electricians arrive equipped with thermal infrared cameras and digital reflectometers to isolate faults and restore power fast.',
      chips: [
        'Under 45-Min Metro Dispatch',
        'FLIR Thermal Micro-Camera',
        'Digital Ground Fault Tracer',
        'Zero Spark Safety Protocol'
      ],
      contextHeading: '24/7 Rapid Short-Circuit Localization & Thermal Diagnostics',
      contextParagraph1: 'Electrical emergencies rarely happen during convenient business hours. A hidden ground fault or loose neutral inside a finished wall cavity can quietly generate extreme temperatures that ignite wood framing within minutes.',
      contextParagraph2: 'VoltGuard maintains fully stocked mobile diagnostic laboratories ready for immediate emergency deployment 24/7. Our licensed electricians isolate damaged lines and restore power safely to unaffected zones within the first hour of arrival.',
      specs: [
        { label: 'Dispatch Response', value: 'Under 45 Minutes', note: 'Priority 24/7 emergency hotline' },
        { label: 'Thermal Sensor Precision', value: '±0.1°C FLIR', note: 'Pinpoint hidden heat and micro-arcs' },
        { label: 'Availability', value: '24/7 / 365 Days', note: 'Never closed, weekend & holiday staff' },
        { label: 'Hazard Mitigation', value: '100% Safe Isolation', note: 'Code-certified safety protocol' }
      ],
      includedChecklist: [
        'Immediate on-site arrival with fully equipped emergency master electrician vehicle',
        'Thermal infrared thermography scan of all electrical lines and distribution panels',
        'Electromagnetic and digital reflectometer short-circuit fault localization',
        'Emergency branch circuit isolation allowing safe restoration of unaffected circuits',
        'Official written hazard remediation report and insurance proof of inspection'
      ],
      whyChoose: [
        {
          title: 'Guaranteed Priority Response',
          desc: 'Our dedicated emergency dispatch operators route the closest available master electrician directly to your address with immediate GPS tracking.',
          icon: 'laser'
        },
        {
          title: 'True Diagnostic Instrumentation',
          desc: 'We never guess. We pinpoint hidden broken neutrals and ground shorts inside conduit or underground using calibrated time-domain reflectometers.',
          icon: 'tool'
        },
        {
          title: 'Transparent Upfront Pricing',
          desc: 'No hidden emergency fee gouging. We provide transparent flat-rate diagnostic pricing before beginning work, even at midnight or on holidays.',
          icon: 'shield'
        }
      ],
      pricing: [
        {
          title: 'Emergency Priority Triage',
          summary: 'Rapid dispatch, fault location, complete hazard isolation, and first-hour labor.',
          price: '199',
          period: 'priority dispatch + 1 hr',
          featured: true,
          features: [
            'Immediate priority master electrician dispatch',
            'Full FLIR thermal scan and short circuit trace',
            'Hazard isolation and temporary power restoration',
            'First hour of certified master electrician repair labor',
            'Transparent quote for any required major part replacements'
          ],
          cta: 'Dispatch Emergency Team'
        },
        {
          title: 'Comprehensive Safety Audit',
          summary: 'Whole-property 50-point NFPA safety audit, panel inspection, and report.',
          price: '349',
          period: 'complete property audit',
          featured: false,
          features: [
            'Comprehensive 50-point electrical safety inspection',
            'GFCI and AFCI trip threshold micro-second testing',
            'Grounding electrode resistance to earth measurement',
            'Full digital photographic report for home insurance',
            'Recommendations to eliminate shock and fire hazards'
          ],
          cta: 'Book Safety Audit'
        },
        {
          title: 'Catastrophic Surge Restoration',
          summary: 'Urgent rebuild of damaged service lines, charred breakers, and meter base.',
          price: '1,100',
          period: 'starting price',
          featured: false,
          features: [
            'Emergency temporary generator or bypass hookup',
            'Replacement of melted or carbonized breaker hardware',
            'Utility coordination for emergency power restoration',
            'Full municipal emergency permit filing',
            'Comprehensive safety green-tag certification'
          ],
          cta: 'Restore Damaged Service'
        }
      ],
      faqs: [
        {
          q: 'What should I do while waiting for your emergency electrician to arrive?',
          a: 'If you see active sparks, smoke, or smell burning plastic, safely shut off your main breaker if the panel is accessible, evacuate the immediate area, and ensure everyone is safe.'
        },
        {
          q: 'Can you find a short circuit without cutting open my walls?',
          a: 'Yes! Our digital Time-Domain Reflectometers (TDR) send safe high-frequency pulses down the wire to calculate the exact distance in feet to the broken conductor, eliminating destructive wall exploratory holes.'
        },
        {
          q: 'Do you work directly with homeowner insurance companies for claims?',
          a: 'Yes, we provide itemized failure reports, thermal diagnostic photos, and NEC code documentation accepted by all major homeowner insurance carriers.'
        },
        {
          q: 'Why do my lights dim or flicker when my air conditioner turns on?',
          a: 'This usually indicates an unstable utility neutral connection or severe startup voltage drop. It should be diagnosed promptly to prevent damaging delicate electronics.'
        }
      ]
    },

    'smart-home': {
      id: 'smart-home',
      shortName: 'Smart Panel Automation',
      title: 'Smart Home Load Centers & Panel Automation',
      tagline: 'Intelligent Circuit Breakers, Real-Time App Telemetry & Solar/Battery Sync',
      badge: 'INTELLIGENT ENERGY MANAGEMENT',
      heroImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
      heroImageAlt: 'Modern smart home automation touchscreen controller on luxury interior wall',
      telemetry: 'Real-Time IoT Telemetry',
      heroCaption: 'Smart Circuit Breaker Automation',
      heroSubtext: 'Sub-second power metering and automated battery load shedding',
      description: 'Transform your electrical system into an intelligent, adaptive energy hub. We engineer Span.io, Schneider Pulse, and Leviton smart breaker panels that enable you to control individual circuits from your smartphone, monitor real-time appliance consumption, and optimize solar battery storage.',
      chips: [
        'Span.io & Leviton Smart Breakers',
        'Real-Time kWh Circuit Telemetry',
        'Tesla Powerwall & Enphase Sync',
        'Remote App Load Shedding'
      ],
      contextHeading: 'Next-Generation Smart Panels & Automated Power Management',
      contextParagraph1: 'Traditional circuit breakers are passive electromechanical switches that offer zero insight into your energy usage. Smart electrical panels replace legacy switches with microprocessor-controlled breakers that track power draw down to the second.',
      contextParagraph2: 'VoltGuard configures automated energy management routines that extend home battery life during power outages by automatically shedding high-draw loads (such as pool heaters and dryers) while preserving critical medical equipment, refrigeration, and home office circuits.',
      specs: [
        { label: 'Energy Monitoring', value: 'Per-Circuit Real-Time', note: '99.5% accuracy revenue-grade metering' },
        { label: 'Battery Optimization', value: 'Extends Storage by 40%', note: 'Automated dynamic circuit shedding' },
        { label: 'Network Redundancy', value: 'Wi-Fi / Ethernet / LTE', note: 'Always-online cloud and local control' },
        { label: 'Platform Standards', value: 'Matter / HomeKit / Alexa', note: 'Universal smart home interoperability' }
      ],
      includedChecklist: [
        'Smart load center architectural design and battery/solar synchronization plan',
        'Installation of smart intelligent Wi-Fi and cellular-enabled circuit breakers',
        'Precision current-transformer (CT) sensor calibration across all household feeds',
        'Mobile app programming, custom push notifications, and automation scenarios',
        'Comprehensive homeowner orientation and hands-on system demonstration'
      ],
      whyChoose: [
        {
          title: 'Certified Smart Panel Installers',
          desc: 'We are certified master installers for top-tier smart panel platforms including Span.io, Schneider Pulse, and Leviton Smart Load Centers.',
          icon: 'tool'
        },
        {
          title: 'Solar & Battery Longevity',
          desc: 'Our dynamic load prioritization algorithms automatically extend home battery backup runtimes by up to 40% during extended winter power outages.',
          icon: 'shield'
        },
        {
          title: 'Off-Peak Utility Tariff Arbitrage',
          desc: 'Save hundreds annually by programming the panel to draw battery power during expensive peak hours and recharge during cheap overnight off-peak rates.',
          icon: 'laser'
        }
      ],
      pricing: [
        {
          title: 'Smart Energy Monitor Add-On',
          summary: 'Retrofit current-sensing CT clamps onto existing panel with live smartphone app.',
          price: '489',
          period: 'starting price',
          featured: false,
          features: [
            '16-circuit real-time wattage tracking sensors',
            'Wi-Fi bridge and cloud monitoring app setup',
            'Real-time phantom load and appliance usage alerts',
            'Full electrical panel safety and torque check'
          ],
          cta: 'Book Energy Monitor'
        },
        {
          title: '10-Circuit Smart Automation Hub',
          summary: 'Replacement of key home circuits with app-controllable smart breakers.',
          price: '1,650',
          period: 'starting price',
          featured: true,
          features: [
            '10x smart microprocessor circuit breakers installed',
            'Remote on/off scheduling from anywhere in the world',
            'Automated battery backup shedding integration',
            'Voice assistant setup (Apple Home, Alexa, Google)',
            '5-Year smart hardware and labor replacement warranty'
          ],
          cta: 'Select 10-Circuit Hub'
        },
        {
          title: 'Full Span.io Smart Panel Overhaul',
          summary: 'Complete replacement of main panel with 32-circuit smart load center.',
          price: '3,800',
          period: 'starting price',
          featured: false,
          features: [
            'Turnkey Span.io smart panel hardware installation',
            '32 fully controllable, metered circuit breakers',
            'Seamless Tesla Powerwall or Enphase solar sync',
            'Utility coordination, city permits, and final sign-off',
            '10-Year premium warranty and cloud support'
          ],
          cta: 'Book Span Smart Panel'
        }
      ],
      faqs: [
        {
          q: 'Can I turn off individual circuit breakers from my phone when away from home?',
          a: 'Yes! Through the secure companion smartphone app, you can remotely toggle any circuit on or off from anywhere in the world, verifying that irons, heaters, or appliances are safely powered down.'
        },
        {
          q: 'How does a smart panel extend battery backup during a power outage?',
          a: 'When grid power drops, the smart panel instantly turns off pre-selected non-essential loads (like water heaters, EV chargers, and AC compressors) while keeping refrigeration, internet, and lighting on, stretching battery life by up to 40%.'
        },
        {
          q: 'Will my smart circuit breakers still work if my home internet goes down?',
          a: 'Yes! The breakers retain physical trip switches and continue to operate mechanically with 100% safety. Furthermore, premium smart panels include built-in cellular LTE connectivity to maintain app controls.'
        },
        {
          q: 'Can a smart panel integrate with solar panels and electric vehicle chargers?',
          a: 'Yes! It intelligently coordinates solar generation, EV charging speed, battery storage, and grid feed-in tariffs in a unified real-time dashboard.'
        }
      ]
    }
  };

  /* --------------------------------------------------------------------------
     2. ELEMENT SELECTORS
     -------------------------------------------------------------------------- */
  const htmlEl = document.documentElement;
  const mainHeader = document.getElementById('mainHeader');

  // Breadcrumbs
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

  // Hero Elements
  const heroBadge = document.getElementById('heroBadge');
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const heroChipsContainer = document.getElementById('heroChipsContainer');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const heroImg = document.getElementById('heroImg');
  const heroTelemetry = document.getElementById('heroTelemetry');
  const heroCaption = document.getElementById('heroCaption');
  const heroSubtext = document.getElementById('heroSubtext');

  // Context Elements
  const contextHeading = document.getElementById('contextHeading');
  const contextP1 = document.getElementById('contextP1');
  const contextP2 = document.getElementById('contextP2');
  const contextChecklist = document.getElementById('contextChecklist');
  const specsMatrix = document.getElementById('specsMatrix');

  // Why Choose Elements
  const whyCardsContainer = document.getElementById('whyCardsContainer');

  // Pricing Elements
  const pricingCardsContainer = document.getElementById('pricingCardsContainer');

  // FAQs Elements
  const faqsAccordionList = document.getElementById('faqsAccordionList');

  // Switcher Buttons
  const switchTabs = document.querySelectorAll('.service-switch-tab');

  // Modals & Forms
  const quoteModalBackdrop = document.getElementById('quoteModalBackdrop');
  const quoteModalClose = document.getElementById('quoteModalClose');
  const quoteModalForm = document.getElementById('quoteModalForm');
  const quoteServiceSelect = document.getElementById('quoteServiceSelect');

  const loginModalBackdrop = document.getElementById('loginModalBackdrop');
  const loginModalClose = document.getElementById('loginModalClose');
  const loginForm = document.getElementById('loginForm');

  const dashboardModalBackdrop = document.getElementById('dashboardModalBackdrop');
  const dashboardModalClose = document.getElementById('dashboardModalClose');

  const comingSoonModalBackdrop = document.getElementById('comingSoonModalBackdrop');
  const comingSoonClose = document.getElementById('comingSoonClose');
  const comingSoonOkBtn = document.getElementById('comingSoonOkBtn');

  const notFoundModalBackdrop = document.getElementById('notFoundModalBackdrop');
  const notFoundClose = document.getElementById('notFoundClose');
  const notFoundHomeBtn = document.getElementById('notFoundHomeBtn');

  // Theme & RTL
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const mobileRtlToggleBtn = document.getElementById('mobileRtlToggleBtn');
  const mobileRtlLabel = document.getElementById('mobileRtlLabel');

  // Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileHomeAccordionBtn = document.getElementById('mobileHomeAccordionBtn');
  const mobileHomeAccordion = document.getElementById('mobileHomeAccordion');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.accordion-header), .mobile-sublink');

  // Classy Dropdown
  const homeDropdownParent = document.getElementById('homeDropdownParent');
  const homeDropdownBtn = document.getElementById('homeDropdownButton');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  // Year
  const currentYearSpan = document.getElementById('currentYear');

  /* --------------------------------------------------------------------------
     3. ICON SVGS HELPER
     -------------------------------------------------------------------------- */
  function getIconSvg(type) {
    if (type === 'laser') {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>`;
    }
    if (type === 'shield') {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>`;
  }

  /* --------------------------------------------------------------------------
     4. RENDER SERVICE DATA DYNAMICALLY
     -------------------------------------------------------------------------- */
  function renderService(serviceKey) {
    const service = SERVICES_DATA[serviceKey] || SERVICES_DATA['wiring'];

    // Update document title
    document.title = `${service.title} | VoltGuard Service Details`;

    // 1. Breadcrumb
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = service.shortName;

    // 2. Hero Elements
    if (heroBadge) heroBadge.textContent = service.badge;
    if (heroTitle) {
      heroTitle.innerHTML = service.title.replace('&', '<span>&amp;</span>');
    }
    if (heroDesc) heroDesc.textContent = service.description;

    // Hero Chips
    if (heroChipsContainer) {
      heroChipsContainer.innerHTML = service.chips.map(chip => `
        <span class="detail-spec-chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          ${chip}
        </span>
      `).join('');
    }

    // Hero Visual
    if (heroImg) {
      heroImg.src = service.heroImage;
      heroImg.alt = service.heroImageAlt;
    }
    if (heroTelemetry) heroTelemetry.textContent = service.telemetry;
    if (heroCaption) heroCaption.textContent = service.heroCaption;
    if (heroSubtext) heroSubtext.textContent = service.heroSubtext;

    // Hero Book CTA prefill
    if (heroBookBtn) {
      heroBookBtn.setAttribute('data-service-prefill', service.id);
    }

    // 3. Context & Narrative
    if (contextHeading) contextHeading.textContent = service.contextHeading;
    if (contextP1) contextP1.textContent = service.contextParagraph1;
    if (contextP2) contextP2.textContent = service.contextParagraph2;

    // Context Checklist
    if (contextChecklist) {
      contextChecklist.innerHTML = service.includedChecklist.map(item => `
        <li class="included-checklist-item">
          <svg class="checklist-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${item}</span>
        </li>
      `).join('');
    }

    // Specs Matrix
    if (specsMatrix) {
      specsMatrix.innerHTML = service.specs.map(spec => `
        <div class="spec-metric-box">
          <div class="spec-metric-label">${spec.label}</div>
          <div class="spec-metric-value">${spec.value}</div>
          <div class="spec-metric-note">${spec.note}</div>
        </div>
      `).join('');
    }

    // Context Guarantee Card Booking Link
    const contextBookBtn = document.getElementById('contextBookBtn');
    if (contextBookBtn) {
      contextBookBtn.href = `book-a-service.html?service=${service.id}`;
      contextBookBtn.setAttribute('data-service-prefill', service.id);
    }

    // 4. Why Choose Cards
    if (whyCardsContainer) {
      whyCardsContainer.innerHTML = service.whyChoose.map(item => `
        <div class="why-feature-card">
          <div class="why-icon-box">
            ${getIconSvg(item.icon)}
          </div>
          <h4 class="why-card-title">${item.title}</h4>
          <p class="why-card-desc">${item.desc}</p>
        </div>
      `).join('');
    }

    // 5. Pricing Tiers
    if (pricingCardsContainer) {
      pricingCardsContainer.innerHTML = service.pricing.map(tier => `
        <div class="pricing-tier-card ${tier.featured ? 'featured-tier' : ''}">
          ${tier.featured ? '<div class="popular-ribbon">Most Popular</div>' : ''}
          <h4 class="tier-title">${tier.title}</h4>
          <p class="tier-summary">${tier.summary}</p>
          <div class="tier-cost-block">
            <span class="currency-sym">$</span>
            <span class="tier-price-val">${tier.price}</span>
            <span class="tier-period">/ ${tier.period}</span>
          </div>
          <ul class="tier-features-list">
            ${tier.features.map(f => `
              <li class="tier-feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
          <button type="button" class="btn ${tier.featured ? 'btn-primary' : 'btn-outline'} tier-action-btn open-quote-modal-btn" data-service-prefill="${service.id}">
            <span>${tier.cta}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      `).join('');

      // Re-bind quote modal triggers for newly rendered pricing buttons
      bindQuoteButtons();
    }

    // 6. FAQs Accordion
    if (faqsAccordionList) {
      faqsAccordionList.innerHTML = service.faqs.map((faq, idx) => `
        <div class="faq-accordion-item ${idx === 0 ? 'open' : ''}">
          <button type="button" class="faq-question-btn" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span>${faq.q}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-answer-pane" ${idx === 0 ? 'style="display: block;"' : ''}>
            <p>${faq.a}</p>
          </div>
        </div>
      `).join('');

      // Re-bind FAQ click handlers
      bindFaqAccordions();
    }

    // 7. Update Switcher Bar active tab
    switchTabs.forEach(tab => {
      const tabKey = tab.getAttribute('data-service-key');
      if (tabKey === serviceKey) {
        tab.classList.add('active');
        // Smoothly scroll tab into view on mobile
        tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        tab.classList.remove('active');
      }
    });

    // 8. Pre-set quote service dropdown if present
    if (quoteServiceSelect) {
      quoteServiceSelect.value = service.id;
    }
  }

  /* --------------------------------------------------------------------------
     5. SERVICE SWITCHER TAB CLICK HANDLERS
     -------------------------------------------------------------------------- */
  switchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetKey = tab.getAttribute('data-service-key');
      if (!targetKey || !SERVICES_DATA[targetKey]) return;

      // Update URL query string without full reload
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('service', targetKey);
      window.history.replaceState({ service: targetKey }, '', newUrl.toString());

      renderService(targetKey);
      showToast(`Switched view to ${SERVICES_DATA[targetKey].shortName}`);
    });
  });

  /* --------------------------------------------------------------------------
     6. FAQ ACCORDION EXPAND / COLLAPSE
     -------------------------------------------------------------------------- */
  function bindFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const pane = item.querySelector('.faq-answer-pane');

      if (btn && pane) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');

          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('open')) {
              otherItem.classList.remove('open');
              const otherBtn = otherItem.querySelector('.faq-question-btn');
              const otherPane = otherItem.querySelector('.faq-answer-pane');
              if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
              if (otherPane) otherPane.style.display = 'none';
            }
          });

          if (isOpen) {
            item.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            pane.style.display = 'none';
          } else {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            pane.style.display = 'block';
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. MODALS SUITE & HOOKS
     -------------------------------------------------------------------------- */
  function openModal(modal) {
    if (!modal) return;
    closeAllModals();
    closeMobileDrawer();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    [quoteModalBackdrop, loginModalBackdrop, dashboardModalBackdrop, comingSoonModalBackdrop, notFoundModalBackdrop].forEach(m => {
      if (m && m.classList.contains('open')) {
        closeModal(m);
      }
    });
  }

  function bindQuoteButtons() {
    const openBtns = document.querySelectorAll('.open-quote-modal-btn');
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prefill = btn.getAttribute('data-service-prefill');
        if (prefill && quoteServiceSelect) {
          quoteServiceSelect.value = prefill;
        }
        openModal(quoteModalBackdrop);
      });
    });
  }

  // Hook generic opener buttons
  document.querySelectorAll('.open-login-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModalBackdrop);
    });
  });

  document.querySelectorAll('.open-dashboard-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(dashboardModalBackdrop);
    });
  });

  document.querySelectorAll('.open-coming-soon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(comingSoonModalBackdrop);
    });
  });

  document.querySelectorAll('.open-404-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(notFoundModalBackdrop);
    });
  });

  // Modal Closers
  if (quoteModalClose) quoteModalClose.addEventListener('click', () => closeModal(quoteModalBackdrop));
  if (loginModalClose) loginModalClose.addEventListener('click', () => closeModal(loginModalBackdrop));
  if (dashboardModalClose) dashboardModalClose.addEventListener('click', () => closeModal(dashboardModalBackdrop));
  if (comingSoonClose) comingSoonClose.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  if (comingSoonOkBtn) comingSoonOkBtn.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  if (notFoundClose) notFoundClose.addEventListener('click', () => closeModal(notFoundModalBackdrop));
  if (notFoundHomeBtn) notFoundHomeBtn.addEventListener('click', () => closeModal(notFoundModalBackdrop));

  [quoteModalBackdrop, loginModalBackdrop, dashboardModalBackdrop, comingSoonModalBackdrop, notFoundModalBackdrop].forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop);
      });
    }
  });

  // Form Submissions
  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(quoteModalBackdrop);
      quoteModalForm.reset();
      showToast('Service booking request dispatched! Our licensed master electrician will call within 15 minutes.');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModalBackdrop);
      loginForm.reset();
      showToast('Customer portal authenticated. Loading service history.');
    });
  }

  /* --------------------------------------------------------------------------
     8. THEME & RTL PREFERENCE (Synchronized with localStorage)
     -------------------------------------------------------------------------- */
  function updateThemeUI(theme) {
    htmlEl.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    const lightIcons = document.querySelectorAll('.theme-icon-light');
    const darkIcons = document.querySelectorAll('.theme-icon-dark');

    lightIcons.forEach(icon => {
      icon.style.display = isDark ? 'inline-block' : 'none';
    });
    darkIcons.forEach(icon => {
      icon.style.display = isDark ? 'none' : 'inline-block';
    });

    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('voltguard_theme_preference') || 'dark';
    updateThemeUI(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('voltguard_theme_preference', nextTheme);
    updateThemeUI(nextTheme);
    showToast(nextTheme === 'dark' ? 'Switched to Midnight Teal Dark Mode' : 'Switched to Pale Aqua Light Mode');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  function updateRtlUI(dir) {
    htmlEl.setAttribute('dir', dir);
    if (mobileRtlLabel) {
      mobileRtlLabel.textContent = dir === 'rtl' ? 'LTR View' : 'RTL View';
    }
  }

  function initDirection() {
    const savedDir = localStorage.getItem('voltguard_direction_preference') || 'ltr';
    updateRtlUI(savedDir);
  }

  function toggleDirection() {
    const currentDir = htmlEl.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem('voltguard_direction_preference', nextDir);
    updateRtlUI(nextDir);
    showToast(nextDir === 'rtl' ? 'Direction set to RTL (Arabic / Hebrew)' : 'Direction set to LTR (Standard)');
  }

  if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleDirection);
  if (mobileRtlToggleBtn) mobileRtlToggleBtn.addEventListener('click', toggleDirection);

  /* --------------------------------------------------------------------------
     9. CLASSY HOME DROPDOWN & MOBILE DRAWER
     -------------------------------------------------------------------------- */
  let isDropdownOpen = false;

  function toggleHomeDropdown(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    isDropdownOpen = !isDropdownOpen;
    if (homeDropdownParent) homeDropdownParent.classList.toggle('active', isDropdownOpen);
    if (homeDropdownBtn) homeDropdownBtn.setAttribute('aria-expanded', isDropdownOpen ? 'true' : 'false');
  }

  function closeHomeDropdown() {
    if (!isDropdownOpen) return;
    isDropdownOpen = false;
    if (homeDropdownParent) homeDropdownParent.classList.remove('active');
    if (homeDropdownBtn) homeDropdownBtn.setAttribute('aria-expanded', 'false');
  }

  if (homeDropdownBtn) homeDropdownBtn.addEventListener('click', toggleHomeDropdown);
  dropdownItems.forEach(item => item.addEventListener('click', closeHomeDropdown));

  document.addEventListener('click', (e) => {
    if (homeDropdownParent && !homeDropdownParent.contains(e.target)) {
      closeHomeDropdown();
    }
  });

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

  if (mobileHomeAccordionBtn && mobileHomeAccordion) {
    mobileHomeAccordionBtn.addEventListener('click', () => {
      const isExpanded = mobileHomeAccordionBtn.classList.toggle('active');
      mobileHomeAccordion.classList.toggle('open');
      mobileHomeAccordionBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHomeDropdown();
      closeMobileDrawer();
      closeAllModals();
    }
  });

  /* --------------------------------------------------------------------------
     10. STICKY HEADER & TOAST
     -------------------------------------------------------------------------- */
  function handleHeaderScroll() {
    if (!mainHeader) return;
    if (window.scrollY > 15) {
      mainHeader.classList.add('header-scrolled');
    } else {
      mainHeader.classList.remove('header-scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = msg;
    toastNotification.classList.add('visible');

    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('visible');
    }, 4200);
  }

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     11. INITIALIZATION & URL PARSING
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();

    // Parse URL query parameter ?service=...
    const urlParams = new URLSearchParams(window.location.search);
    const initialKey = urlParams.get('service') || 'wiring';

    renderService(initialKey);
    bindQuoteButtons();
  });

  // Expose global api
  window.VoltGuardServiceDetail = {
    renderService,
    showToast,
    toggleTheme,
    toggleDirection
  };

})();
