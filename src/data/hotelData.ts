export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  category: string;
  description: string;
  materialSpec?: string;
}

export interface CameraTransition {
  moveType: 'pedestal-down' | 'dolly-in' | 'pan-corridor' | 'ascend-suite' | 'tilt-culinary' | 'pan-onsen' | 'crane-out';
  label: string;
  sublabel: string;
  lensSpec: string;
  cinematicNarrative: string;
}

export interface TourStop {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  zone: string;
  floor: string;
  heroImage: string;
  cameraTransition: CameraTransition;
  alternateImages?: { url: string; label: string }[];
  description: string;
  designNarrative: string;
  architecturalHighlights: string[];
  hotspots: Hotspot[];
}

export const TOUR_STOPS: TourStop[] = [
  {
    id: 'facade',
    stepNumber: '01',
    title: 'The Urban Slate Tower',
    subtitle: 'Exterior Architecture & Louvered Balconies',
    zone: 'Street Presence',
    floor: 'Exterior View',
    heroImage: '/assets/aistudio/4_86733a23.webp',
    cameraTransition: {
      moveType: 'pedestal-down',
      label: 'Pedestal Down & Tilt',
      sublabel: 'Skyline to Threshold',
      lensSpec: '24mm Ultra-Wide Architectural Prime',
      cinematicNarrative: 'Camera tilts and pedestals down from the Tokyo sky along the white slatted facade towards street level.',
    },
    description:
      'Standing tall against the clear Tokyo sky, Minn Kasai presents a refined architectural presence. The charcoal slate facade is softened by rhythmic white vertical louvers that serve as private balconies and dynamic light filters.',
    designNarrative:
      'The exterior strikes a balance between urban Tokyo contemporary architecture and welcoming residential comfort. Vertical slats create privacy screens for guests while casting changing shadow plays across the facade throughout the daylight hours.',
    architecturalHighlights: [
      'Charcoal-grey textured ceramic cladding',
      'Acoustic white privacy louvers with integrated drainage',
      'Ground-level volcanic basalt stone foundation',
      'Native street-level cedar planters grounding the pedestrian threshold',
    ],
    hotspots: [
      {
        id: 'hs-facade-louvers',
        x: 64,
        y: 42,
        title: 'Architectural Louver Screens',
        category: 'Facade Element',
        description:
          'Precision-fabricated aluminum vertical louvers provide privacy from neighboring structures while preserving natural daylight and Tokyo skyline vistas.',
        materialSpec: 'Powder-coated Matte White Aluminum Slats',
      },
      {
        id: 'hs-facade-entry',
        x: 35,
        y: 84,
        title: 'Recessed Ground Threshold',
        category: 'Street Interface',
        description:
          'The pedestrian approach is recessed under a deep cantilevered overhang, shielding arriving guests from weather while framing the illuminated entrance portal.',
        materialSpec: 'Honed Volcanic Basalt Stone & Deep Canopy',
      },
      {
        id: 'hs-facade-glass',
        x: 52,
        y: 62,
        title: 'High-Performance Acoustic Glazing',
        category: 'Glazing',
        description:
          'Double-glazed acoustic windows ensure serene guestrooms even in the heart of the energetic Kasai transit district.',
        materialSpec: 'Low-E Double Acoustic Glazing',
      },
    ],
  },
  {
    id: 'entrance-portal',
    stepNumber: '02',
    title: 'The Luminous Torii Gates',
    subtitle: 'Nested Light Portals & Signature Entrance',
    zone: 'Arrival Threshold',
    floor: '1F · Main Entrance',
    heroImage: '/assets/aistudio/1_d12b4430.webp',
    cameraTransition: {
      moveType: 'dolly-in',
      label: 'Dolly In & Forward Push',
      sublabel: 'Through the Torii Portals',
      lensSpec: '35mm High-Speed T1.4 Prime',
      cinematicNarrative: 'Camera dollies smoothly forward through the glowing concentric rectangular light gates toward the Hinoki doors.',
    },
    description:
      'The unmistakable architectural signature of Minn Kasai: twin concentric rectangular LED portals that illuminate the evening path. Inspired by sacred Japanese Torii gates, it symbolizes a clean psychological transition from the fast-paced city into residential peace.',
    designNarrative:
      'By replacing the traditional red vermillion timber arch with minimalist rectangular aluminum channels housing continuous 3000K warm LED diffusers, the entrance transforms everyday arrival into a ceremonial experience.',
    architecturalHighlights: [
      'Concentric dual-frame warm LED portals (3000K glow)',
      'Black honed granite paving with flush threshold drainage',
      'Custom Shoji-inspired vertical bronze and washi lantern sconce',
      'Brushed stainless Minn "Your Second Home" illuminated sign',
    ],
    hotspots: [
      {
        id: 'hs-portal-inner',
        x: 50,
        y: 42,
        title: 'Nested LED Light Portals',
        category: 'Lighting Architecture',
        description:
          'Continuous edge-lit rectangular portals form an ethereal tunnel effect, drawing the eye inward toward the natural timber entrance doors.',
        materialSpec: '3000K Diffuse Architectural Grade LED Channels',
      },
      {
        id: 'hs-portal-lantern',
        x: 21,
        y: 48,
        title: 'Washi-Inspired Bronze Lantern',
        category: 'Feature Luminaire',
        description:
          'A vertical geometric lantern fixture featuring fine metal latticework and diffused cylindrical lighting, honoring traditional Japanese street lanterns.',
        materialSpec: 'Dark Bronze Steel & Translucent Polycarbonate Washi',
      },
      {
        id: 'hs-portal-sign',
        x: 79,
        y: 38,
        title: 'Minn "Your Second Home" Signet',
        category: 'Identity',
        description:
          'The hotel logo in crisp illuminated typography on dark slate, signaling an apartment-style sanctuary for extended and family travelers.',
        materialSpec: 'Laser-Cut Backlit Acrylic on Honed Granite',
      },
      {
        id: 'hs-portal-door',
        x: 50,
        y: 68,
        title: 'Natural Hinoki Veneer Entrance',
        category: 'Joinery',
        description:
          'Tall vertical sliding doors clad in pale natural wood veneer provide a tactile, organic contrast to the dark architectural stone.',
        materialSpec: 'Blonde Oak & Japanese Hinoki Veneer',
      },
    ],
  },
  {
    id: 'lobby-lounge',
    stepNumber: '03',
    title: 'The Timber Slat Reception',
    subtitle: 'Minimalist Bamboo Screen & Smart Kiosks',
    zone: 'Reception & Lounge',
    floor: '1F · Lobby',
    heroImage: '/assets/aistudio/7_adc3d311.webp',
    cameraTransition: {
      moveType: 'pan-corridor',
      label: 'Track In & Pan Right',
      sublabel: 'Bamboo Corridor Entrance',
      lensSpec: '28mm Steadicam Smooth Gimbal',
      cinematicNarrative: 'Stepping across the threshold, camera pans right across the illuminated bamboo screen into the corridor.',
    },
    description:
      'Entering the lobby, the atmosphere shifts to acoustic calm and warm timber scents. A dramatic feature wall composed of alternating bamboo poles and blonde oak battens frames the reception counter, anchored by a custom triangular ochre bench.',
    designNarrative:
      'Minn’s hospitality philosophy eliminates check-in lines and paperwork. Guests can scan their reservation QR code at touch terminals or receive personal assistance at the front desk, all within a tranquil Japandi architectural setting.',
    architecturalHighlights: [
      'Vertical bamboo and timber batten backdrop with backlighting',
      'Suspended Shoji-style rectangular pendant chandelier',
      'Custom triangular ochre leather banquette on powder-coated steel frame',
      'Contactless iPad self-check-in station for express keyless arrival',
    ],
    hotspots: [
      {
        id: 'hs-lobby-bamboo',
        x: 50,
        y: 36,
        title: 'Backlit Bamboo Feature Wall',
        category: 'Architectural Feature',
        description:
          'Hand-selected natural bamboo poles rhythmically arranged alongside vertical oak battens, washed with warm concealed cove LED illumination.',
        materialSpec: 'Natural Treated Japanese Bamboo & White Oak',
      },
      {
        id: 'hs-lobby-bench',
        x: 51,
        y: 77,
        title: 'Triangular Ochre Bench',
        category: 'Bespoke Furniture',
        description:
          'A geometric triangular resting bench upholstered in mustard leatherette over an open structural steel base, allowing flexible multi-angle seating.',
        materialSpec: 'Ochre Vegan Leather on Welded Black Steel Matrix',
      },
      {
        id: 'hs-lobby-pendant',
        x: 50,
        y: 27,
        title: 'Shoji Coffer Chandelier',
        category: 'Custom Lighting',
        description:
          'Suspended overhead luminaire evoking traditional Japanese coffer ceilings, diffusing gentle, shadow-free illumination across the lobby floor.',
        materialSpec: 'Matte Black Steel Frame & Acrylic Paper Diffusers',
      },
      {
        id: 'hs-lobby-kiosks',
        x: 38,
        y: 47,
        title: 'Express Self-Check-in Terminals',
        category: 'Smart Hospitality',
        description:
          'Guests complete check-in in under a minute with multi-language touch displays issuing mobile keycodes and QR access passes.',
        materialSpec: 'Integrated iOS Hospitality Kiosks',
      },
    ],
  },
  {
    id: 'japandi-suite',
    stepNumber: '04',
    title: 'The Japandi Living Suite',
    subtitle: 'Twin Beds, Indigo Accents & Dining Lounge',
    zone: 'Guest Suite',
    floor: 'Floors 2–10 · Guest Rooms',
    heroImage: '/assets/aistudio/2_bf5b9b97.webp',
    cameraTransition: {
      moveType: 'ascend-suite',
      label: 'Elevator Ascend & Room Dolly',
      sublabel: 'Ascent to Japandi Suite',
      lensSpec: '24mm Wide Perspective',
      cinematicNarrative: 'Elevator ascends to residential floors; camera dollies into the calm, sunlit Japandi suite.',
    },
    alternateImages: [
      { url: '/assets/aistudio/5_a7a4eafc.webp', label: 'Living & Dining Banquette' },
      { url: '/assets/aistudio/12_fe54431a.webp', label: 'Evening Suite Ambiance' },
      { url: '/assets/aistudio/15_452cc79e.webp', label: 'Open Closet & Amenities' },
    ],
    description:
      'Step inside the guestroom where Scandinavian minimalism marries Japanese precision. Instead of cramped Tokyo hotel confines, Minn Kasai offers generous multi-bed apartment layouts with dedicated dining banquettes, textured feature walls, and ample natural light.',
    designNarrative:
      'Every centimeter is engineered for group comfort. Custom low-profile bed bases create visual openness, while rich indigo blue runners nod to traditional Edo aizome (indigo dye) heritage against warm sandy oak wood tones.',
    architecturalHighlights: [
      'Twin premium Simmons pocket-coil beds with indigo runners',
      'Cushioned dining banquette doubling as dining space and workspace',
      'Tactile relief wallpaper reminiscent of woven straw and washi fiber',
      'Concealed ceiling cove lighting producing glare-free evening warmth',
    ],
    hotspots: [
      {
        id: 'hs-suite-bed',
        x: 28,
        y: 65,
        title: 'Simmons Pocket-Coil Twin Beds',
        category: 'Bedding',
        description:
          'Engineered for deep recovery after exploring Tokyo or Disney Resort, featuring high-thread-count crisp linens and deep navy runners.',
        materialSpec: 'Simmons Beautyrest Pocket Coil & Indigo Cotton Accents',
      },
      {
        id: 'hs-suite-banquette',
        x: 82,
        y: 63,
        title: 'Custom Dining Banquette Corner',
        category: 'Living Space',
        description:
          'A spacious dining table and cushioned bench allow families to dine together comfortably, enjoy takeout from nearby sushi restaurants, or work remotely.',
        materialSpec: 'Solid White Oak Table with Ergonomic High-Density Foam',
      },
      {
        id: 'hs-suite-wall',
        x: 16,
        y: 28,
        title: 'Woven Grid Accent Wall',
        category: 'Interior Finish',
        description:
          'Textured acoustic wallpaper with subtle geometric tactile relief that catches the soft glow of the concealed ceiling cove lighting.',
        materialSpec: 'Embossed Textured Fibers with Warm Backlit Pelmet',
      },
      {
        id: 'hs-suite-window',
        x: 78,
        y: 38,
        title: 'Deep Inset Daylight Apertures',
        category: 'Fenestration',
        description:
          'Deep window reveals with minimalist horizontal louvers optimize natural daylight while preventing street glare and heat gain.',
        materialSpec: 'Double-glazed with Integrated Horizontal Blind Systems',
      },
    ],
  },
  {
    id: 'resident-kitchen',
    stepNumber: '05',
    title: 'The Resident’s Kitchenette',
    subtitle: 'Induction Cooktop, Microwave & Tableware',
    zone: 'In-Room Kitchen',
    floor: 'Suite Culinary Zone',
    heroImage: '/assets/aistudio/8_32251d11.webp',
    cameraTransition: {
      moveType: 'tilt-culinary',
      label: 'Tilt Down & Macro Push-In',
      sublabel: 'Culinary Craft Angle',
      lensSpec: '50mm Tactile Macro Prime',
      cinematicNarrative: 'Camera rotates from the dining lounge, tilting down into the induction cooktop and tableware drawers.',
    },
    alternateImages: [
      { url: '/assets/aistudio/13_0ac296cd.webp', label: 'Family Dining Setting' },
      { url: '/assets/aistudio/10_6c59ab88.webp', label: 'Tobu Supermarket Downstairs' },
    ],
    description:
      'Unlike conventional hotels that limit you to expensive room service, Minn Kasai equips every suite with a resident kitchenette. With the Tobu Store supermarket literally downstairs, guests can cook fresh Japanese Wagyu beef, sashimi, ramen, or warm baby meals anytime.',
    designNarrative:
      'Clean horizontal cabinetry in light oak hides generous storage. Deep pull-out drawers are fully stocked with ceramic plates, soup bowls, cooking pans, spatulas, and stainless flatware, giving you the complete freedom of living in Tokyo.',
    architecturalHighlights: [
      'Dual-zone flat glass IH induction cooktop (safe and child-friendly)',
      'Under-counter whisper-quiet refrigerator and built-in microwave',
      'Granite-composite waterproof countertops with deep stainless steel basin',
      'Curated matte-ceramic Japanese dining bowls and cutlery sets',
    ],
    hotspots: [
      {
        id: 'hs-kitchen-hob',
        x: 23,
        y: 62,
        title: 'Dual Induction IH Cooktop',
        category: 'Appliances',
        description:
          'High-efficiency magnetic induction cooktop boils water in seconds and offers precise temperature control without open flames.',
        materialSpec: 'Ceramic Glass Induction Surface (Safe & Rapid Heat)',
      },
      {
        id: 'hs-kitchen-storage',
        x: 52,
        y: 84,
        title: 'Stocked Tableware Drawers',
        category: 'Kitchen Equipment',
        description:
          'Deep soft-close pullout drawers organized with porcelain rice bowls, soup bowls, plates, stainless cooking pots, and child-safe cutlery.',
        materialSpec: 'Matte Glazed Japanese Ceramic & 18/10 Stainless Steel',
      },
      {
        id: 'hs-kitchen-microwave',
        x: 53,
        y: 12,
        title: 'Built-in Microwave & Vent Hood',
        category: 'Appliances',
        description:
          'Overhead compact microwave and quiet exhaust canopy, ideal for heating ready-made delicacies from Tokyo depachika or convenience stores.',
        materialSpec: 'Compact Inverter Microwave with Directional Task Light',
      },
      {
        id: 'hs-kitchen-counter',
        x: 62,
        y: 48,
        title: 'Quartz Composite Countertop',
        category: 'Surfaces',
        description:
          'Non-porous hygienic stone-composite surface with chrome swivel mixer tap and integrated splashback.',
        materialSpec: 'Engineered Quartz Countertop with Stainless Basin',
      },
    ],
  },
  {
    id: 'japanese-bath',
    stepNumber: '06',
    title: 'The Japanese Bathhouse Sanctuary',
    subtitle: 'Deep Soaking Ofuro, Rain Shower & Toto Washlet',
    zone: 'Sanitary Suite',
    floor: 'Private Room Bath',
    heroImage: '/assets/aistudio/3_88d42e1e.webp',
    cameraTransition: {
      moveType: 'pan-onsen',
      label: 'Pan Left & Pedestal Down',
      sublabel: 'Ofuro Sanctuary Staging',
      lensSpec: '24mm Wet-Room Prime',
      cinematicNarrative: 'Camera pans left into the wet-room staging area, revealing the deep soaking ofuro tub and cobalt mosaic vanity.',
    },
    alternateImages: [
      { url: '/assets/aistudio/6_9e28cc5c.webp', label: 'Separate Toto Washlet Room' },
    ],
    description:
      'Immerse in authentic Japanese bathing culture. Minn Kasai suites feature a true Japanese-style separated bathroom with a full-depth soaking tub and dedicated wash area, paired with an elegant vessel sink vanity framed in cobalt blue mosaic tiles.',
    designNarrative:
      'Japanese bathroom architecture separates the toilet and bathing spaces so multiple guests can prepare simultaneously. The deep ofuro tub allows complete shoulder-deep soaking with thermostatic water temperature control.',
    architecturalHighlights: [
      'Deep Japanese soaking bathtub with automated temperature maintenance',
      'Ceramic vessel wash basin set into quartz vanity counter',
      'Handcrafted cobalt and navy glass mosaic feature border',
      'Separated private restroom featuring Toto high-tech heated washlet',
    ],
    hotspots: [
      {
        id: 'hs-bath-tub',
        x: 14,
        y: 74,
        title: 'Deep Soaking Ofuro Tub',
        category: 'Bath Fixtures',
        description:
          'Deep ergonomic bathtub designed for soaking after full days at Tokyo Disney Resort or walking through Tokyo’s lively districts.',
        materialSpec: 'Heat-Retaining Acrylic Tub with Safety Grab Rails',
      },
      {
        id: 'hs-bath-mosaic',
        x: 56,
        y: 35,
        title: 'Cobalt Blue Mosaic Borders',
        category: 'Accent Tile',
        description:
          'Vertical border pillars lined in miniature rectangular indigo and cobalt blue tiles that echo the hotel’s signature accent color.',
        materialSpec: 'Handmade Glazed Ceramic & Glass Mosaic Tiles',
      },
      {
        id: 'hs-bath-sink',
        x: 72,
        y: 64,
        title: 'Geometric Vessel Vanity Basin',
        category: 'Sanitaryware',
        description:
          'Generous white rectangular ceramic vessel sink with single-lever chrome mixer tap and open under-counter towel storage shelf.',
        materialSpec: 'Vitreous China Vessel on Granular Composite Slab',
      },
      {
        id: 'hs-bath-shower',
        x: 32,
        y: 40,
        title: 'Wet-Room Thermostatic Shower',
        category: 'Showers',
        description:
          'Japanese onsen wet-room design with non-slip textured drainage floor and adjustable height handheld shower wand.',
        materialSpec: 'Thermostatic Anti-Scald Mixer with Grooved Floor Tiles',
      },
    ],
  },
  {
    id: 'neighborhood-transit',
    stepNumber: '07',
    title: 'Tokyo Connected & Kasai Life',
    subtitle: 'Direct Disney Buses, Tozai Subway & Local Food',
    zone: 'The District',
    floor: 'Kasai Station & Surrounds',
    heroImage: '/assets/aistudio/10_6c59ab88.webp',
    cameraTransition: {
      moveType: 'crane-out',
      label: 'Dolly Out & Crane Up',
      sublabel: 'District Wide Expansion',
      lensSpec: '21mm Wide-Angle Vista',
      cinematicNarrative: 'Camera dollies and cranes out into the open neighborhood, highlighting the supermarket downstairs and Disney buses.',
    },
    alternateImages: [
      { url: '/assets/aistudio/11_8d8d3ccd.webp', label: 'Kasai Subway Station' },
      { url: '/assets/aistudio/14_b08fcf0c.webp', label: 'Metro Center Kasai Arcade' },
      { url: '/assets/aistudio/9_c6295ca1.webp', label: '24h In-House Laundry' },
    ],
    description:
      'Location is where Minn Kasai truly shines. Kasai is one of Tokyo’s best-kept secrets for savvy travelers: just 3 minutes walk to Kasai Station (Tokyo Metro Tozai Line), direct 18-minute express shuttle to Tokyo Disney Resort, and a huge supermarket and sushi bar right at your doorstep.',
    designNarrative:
      'Rather than feeling like an isolated tourist bubble, staying here connects you to everyday authentic Tokyo neighborhood life. Stroll through the lively Metro Center arcade for fresh pastries and bento, or pick up ingredients at Tobu Store downstairs.',
    architecturalHighlights: [
      'Tobu Store 2-story supermarket and Sushiro restaurant adjacent to hotel',
      'Kasai Station 3-minute walking distance (Tokyo Metro Tozai Line)',
      'Direct highway express bus stop to Tokyo Disney Resort (18 minutes)',
      '24/7 guest coin laundry room with smart cashless Aqua washer-dryers',
    ],
    hotspots: [
      {
        id: 'hs-neigh-tobu',
        x: 48,
        y: 52,
        title: 'Tobu Store & Sushiro',
        category: 'Groceries & Dining',
        description:
          'Full-service grocery store stocked with fresh produce, sushi platters, drinks, and snacks, with Sushiro conveyor sushi on the 2nd floor.',
        materialSpec: 'Directly adjacent to hotel entrance',
      },
      {
        id: 'hs-neigh-metro',
        x: 75,
        y: 35,
        title: 'Tokyo Metro Tozai Line',
        category: 'Rapid Transit',
        description:
          'Direct trains to Otemachi (Tokyo Station 16 min), Nihombashi (14 min), and Takadanobaba/Shinjuku connection.',
        materialSpec: '300m / 3 min level walking route',
      },
      {
        id: 'hs-neigh-disney',
        x: 25,
        y: 25,
        title: 'Direct Disney Resort Shuttle',
        category: 'Theme Park Access',
        description:
          'Keisei Bus "Shuttle Seven" departs directly from Kasai Station bus terminal straight to Tokyo Disneyland & Tokyo DisneySea in ~18 minutes.',
        materialSpec: 'Terminal 7 at Kasai Station',
      },
    ],
  },
];

export interface RoomTypeData {
  id: string;
  name: string;
  japaneseName: string;
  size: string;
  capacity: string;
  bedConfig: string;
  basePrice: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  kitchenEquipment: string[];
  bathroomSpecs: string[];
}

export const ROOM_CATALOG: RoomTypeData[] = [
  {
    id: 'standard-twin',
    name: 'Standard Twin Suite',
    japaneseName: 'スタンダード ツイン スイート',
    size: '26 m²',
    capacity: 'Up to 3 Guests',
    bedConfig: '2 Single Simmons Beds + 1 Sofa Sleeper',
    basePrice: 16000,
    image: '/assets/aistudio/2_bf5b9b97.webp',
    gallery: [
      '/assets/aistudio/2_bf5b9b97.webp',
      '/assets/aistudio/12_fe54431a.webp',
      '/assets/aistudio/8_32251d11.webp',
      '/assets/aistudio/3_88d42e1e.webp',
    ],
    description:
      'A serene, thoughtfully arranged sanctuary for couples, solo business travelers, or friends. Features twin Simmons pocket-coil beds, a dedicated wooden work desk and dining table, and an efficient kitchenette with full cooking ware.',
    features: [
      'Twin Simmons Pocket-Coil Mattresses (110cm width each)',
      'High-Speed 1 Gbps WiFi & 50" Smart 4K TV with Netflix / YouTube',
      'Compact dining & workspace table with ergonomic chairs',
      'Acoustic double-glazed windows with blackout blinds',
      'In-room open wardrobe with solid timber hangers and deodorizer',
    ],
    kitchenEquipment: [
      'Dual-zone flat induction IH cooktop',
      'Under-counter whisper-quiet refrigerator',
      'Microwave oven with defrost function',
      'Electric kettle & Japanese tea set',
      'Stainless steel pot, frying pan, utensils & dinnerware',
    ],
    bathroomSpecs: [
      'Deep Japanese soaking bathtub with automated heat control',
      'Separate shower wash area with thermostatic mixer',
      'Quartz vanity counter with ceramic vessel sink',
      'Separate Toto heated bidet toilet room',
    ],
  },
  {
    id: 'family-suite',
    name: 'Family Suite with Dining Lounge',
    japaneseName: 'ファミリー スイート ダイニング ラウンジ',
    size: '35 m²',
    capacity: 'Up to 5 Guests',
    bedConfig: '2 Double Beds + 1 Extra Pull-out Bed',
    basePrice: 24000,
    image: '/assets/aistudio/5_a7a4eafc.webp',
    gallery: [
      '/assets/aistudio/5_a7a4eafc.webp',
      '/assets/aistudio/13_0ac296cd.webp',
      '/assets/aistudio/2_bf5b9b97.webp',
      '/assets/aistudio/6_9e28cc5c.webp',
    ],
    description:
      'The ideal choice for families visiting Tokyo Disney Resort or extended groups. Offers a large central dining banquette, slatted timber architectural partitions, full kitchen, and separated wet/dry sanitary quarters.',
    features: [
      'Two large double beds plus fold-out modular daybed',
      'Deep cushioned dining banquette seating up to 5 people',
      'Slatted wood architectural divider creating semi-private zones',
      'Extra floor area for large suitcases and stroller storage',
      'Baby/child-friendly safety corner designs and non-slip floors',
    ],
    kitchenEquipment: [
      'Full resident kitchenette with deep stainless sink',
      'IH dual cooking hobs and range hood',
      'Microwave oven, refrigerator & electric kettle',
      'Complete set of ceramic family bowls, plates & mugs',
      'Cooking oils, dish soap & organic cleaning supplies provided',
    ],
    bathroomSpecs: [
      'Deep Japanese ofuro soaking tub with handheld rain shower',
      'Separate entrance to Toto washlet restroom for multi-guest privacy',
      'Spacious grooming vanity with double mirror and hairdryer',
      'Plush cotton bath towels, face towels, and botanic amenities',
    ],
  },
  {
    id: 'deluxe-residence',
    name: 'Deluxe Multi-Bed Residence',
    japaneseName: 'デラックス レジデンス スイート',
    size: '42 m²',
    capacity: 'Up to 6 Guests',
    bedConfig: '2 Double Beds + 2 Single Beds',
    basePrice: 32000,
    image: '/assets/aistudio/13_0ac296cd.webp',
    gallery: [
      '/assets/aistudio/13_0ac296cd.webp',
      '/assets/aistudio/5_a7a4eafc.webp',
      '/assets/aistudio/8_32251d11.webp',
      '/assets/aistudio/3_88d42e1e.webp',
    ],
    description:
      'Our premier apartment residence offering maximum space, comfort, and independence in Tokyo. Crafted for larger families, multi-generational journeys, or friends traveling together who desire a shared living experience with home cooking.',
    features: [
      'Generous 42 m² open-plan apartment layout',
      'Accommodates up to 6 guests in luxurious Simmons bedding',
      'Expansive 6-person dining table for communal feasts & gatherings',
      'Multiple USB-C & AC charging hubs beside every bed',
      'Luggage staging area with heavy-duty hanger racks and shoe bench',
    ],
    kitchenEquipment: [
      'Premium dual IH hob with rapid boiling capacity',
      'Full cookware set: skillet, sauté pan, stockpot & cutting boards',
      'Microwave, large refrigerator-freezer, electric kettle',
      'Complete service for 6 guests including chopsticks and cutlery',
    ],
    bathroomSpecs: [
      'Luxury deep soaking bathtub with safety rails',
      'Separate onsen-style shower staging area with thermostatic head',
      'Double vanity grooming mirror with high-power ionic blow dryer',
      'Isolated private washlet room with Toto sensor bidet',
    ],
  },
];

export interface TransitRoute {
  destination: string;
  japanese: string;
  time: string;
  mode: string;
  detail: string;
  badge: string;
}

export const TRANSIT_ROUTES: TransitRoute[] = [
  {
    destination: 'Tokyo Disney Resort®',
    japanese: '東京ディズニーリゾート',
    time: '18 min',
    mode: 'Direct Express Bus',
    detail: 'Keisei Shuttle Seven departs from Kasai Station Bus Terminal directly to Disneyland & DisneySea gates.',
    badge: 'Guest Favorite',
  },
  {
    destination: 'Tokyo Station / Otemachi',
    japanese: '東京・大手町',
    time: '16 min',
    mode: 'Tokyo Metro Tozai Line',
    detail: 'Direct rapid subway line straight into the core financial center, Tokyo Shinkansen hub, and Imperial Palace.',
    badge: 'Direct Transit',
  },
  {
    destination: 'Nihombashi & Ginza',
    japanese: '日本橋・銀座',
    time: '14 min',
    mode: 'Tokyo Metro Tozai Line',
    detail: 'Direct train to Nihombashi with seamless 1-stop connection to Ginza luxury shopping and department stores.',
    badge: 'Direct Transit',
  },
  {
    destination: 'Haneda Airport (HND)',
    japanese: '羽田空港',
    time: '35 min',
    mode: 'Direct Airport Limousine Bus',
    detail: 'Hop on the airport limousine bus directly in front of Kasai Station with no train transfers or heavy luggage hassles.',
    badge: 'Airport Direct',
  },
  {
    destination: 'Narita Airport (NRT)',
    japanese: '成田空港',
    time: '60 min',
    mode: 'Direct Airport Limousine Bus',
    detail: 'Direct coach service from Kasai Station terminal straight to Narita Terminals 1, 2, and 3.',
    badge: 'Airport Direct',
  },
  {
    destination: 'Akihabara & Ueno',
    japanese: '秋葉原・上野',
    time: '22 min',
    mode: 'Subway (Tozai to Hibiya Line)',
    detail: 'Quick transfer via Kayabacho station into the anime capital Akihabara and cultural museums of Ueno.',
    badge: 'Easy Transfer',
  },
];

export const ARCHITECTURAL_PILLARS = [
  {
    number: '01',
    title: 'The Portal Threshold',
    subtitle: 'Psychological Transition',
    description:
      'In traditional Japanese architecture, the Torii gate marks the boundary between the mundane and the sacred. Minn Kasai reimagines this with glowing nested geometric LED portals, slowing guests’ pulse as they step off the bustling Tokyo street.',
    materials: 'Anodized Dark Slate · Continuous 3000K Diffuse LED · Granite Paving',
  },
  {
    number: '02',
    title: 'Japandi Spatial Efficiency',
    subtitle: 'Warmth Meets Modern Order',
    description:
      'Rather than isolating furniture in tight pockets, rooms integrate flexible banquettes that serve as breakfast tables, conference workstations, and social gathering spots. Light blonde woods reflect Tokyo morning sunlight deep into the room.',
    materials: 'White Oak Veneers · Woven Tactile Relief Walls · Simmons Pocket Coils',
  },
  {
    number: '03',
    title: 'Apartment Autonomy',
    subtitle: 'Live Like a Tokyo Resident',
    description:
      'Minn believes true luxury is independence. Every room houses an induction kitchenette, dining ware, and large refrigerator. Guests can cook fresh produce from the supermarket next door or reheat late-night ramen with total freedom.',
    materials: 'Ceramic Induction Glass · Quartz Composite Tops · Soft-Close Joinery',
  },
  {
    number: '04',
    title: 'Frictionless Digital Craft',
    subtitle: 'Hospitality Without the Bureaucracy',
    description:
      'Long hotel check-in queues are replaced with instant smartphone QR check-in and multi-language touch kiosks. Your phone is your key, and the digital concierge handles housekeeping requests with quiet efficiency.',
    materials: 'Contactless Digital Keycards · iOS Hospitality Kiosks · Smart Locks',
  },
];
