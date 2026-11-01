export type IndianRegion = 'North' | 'South' | 'East' | 'West' | 'Northeast';

export type DestinationCategory = 
  | 'mountains'
  | 'beaches'
  | 'heritage'
  | 'spiritual'
  | 'wildlife'
  | 'adventure'
  | 'nature'
  | 'city';

export interface CategoryInfo {
  id: DestinationCategory;
  name: string;
  iconName: string;
  tagline: string;
}

export interface Attraction {
  name: string;
  description: string;
  timing: string;
  entryFee: string;
  highlight: string;
}

export interface ThingToDo {
  title: string;
  category: 'Adventure' | 'Sightseeing' | 'Nature' | 'Shopping' | 'Culture';
  duration: string;
  description: string;
}

export interface FamousDish {
  name: string;
  type: 'Veg' | 'Non-Veg' | 'Sweet' | 'Beverage';
  description: string;
  whereToTry: string;
}

export interface Festival {
  name: string;
  month: string;
  description: string;
}

export interface LocalMarket {
  name: string;
  famousFor: string;
  tip: string;
}

export interface DayPlan {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  recommendedMeals: string;
}

export interface Itinerary {
  daysCount: 1 | 2 | 3 | 5 | 7;
  title: string;
  summary: string;
  schedule: DayPlan[];
}

export interface DailyBudgetRates {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  region: IndianRegion;
  tagline: string;
  categories: DestinationCategory[];
  isHiddenGem?: boolean;
  heroImage: string;
  gallery: string[];
  shortDescription: string;
  overview: string;
  bestTimeToVisit: {
    recommendedMonths: string;
    peakSeason: string;
    offSeason: string;
    weatherOverview: string;
    avgTemp: string;
  };
  howToReach: {
    airport: string;
    railway: string;
    bus: string;
    localTransport: string;
  };
  topAttractions: Attraction[];
  thingsToDo: ThingToDo[];
  foodAndCulture: {
    famousDishes: FamousDish[];
    festivals: Festival[];
    localMarkets: LocalMarket[];
    culturalTradition: string;
  };
  itineraries: Itinerary[];
  budget: {
    backpacker: DailyBudgetRates;
    midRange: DailyBudgetRates;
    luxury: DailyBudgetRates;
  };
}

export const CATEGORIES_LIST: CategoryInfo[] = [
  { id: 'mountains', name: 'Mountains & Hill Stations', iconName: 'Mountain', tagline: 'Snow peaks, misty valleys, tea estates & serene pine ridges' },
  { id: 'beaches', name: 'Beaches & Islands', iconName: 'Palmtree', tagline: 'Sun-drenched golden coastlines, Arabian seas & coral atolls' },
  { id: 'heritage', name: 'Historical & Heritage', iconName: 'Landmark', tagline: 'UNESCO monuments, fortresses, Mughal palaces & ancient carvings' },
  { id: 'spiritual', name: 'Religious & Spiritual', iconName: 'Flame', tagline: 'Sacred river ghats, historic temples, ashrams & soul journeys' },
  { id: 'wildlife', name: 'Wildlife & National Parks', iconName: 'TreePine', tagline: 'Royal Bengal tigers, one-horned rhinos, elephant herds & safaris' },
  { id: 'adventure', name: 'Adventure Tourism', iconName: 'Compass', tagline: 'High-altitude treks, white-water rapids, desert dunes & scuba dives' },
  { id: 'nature', name: 'Nature & Waterfalls', iconName: 'Waves', tagline: 'Emerald backwaters, cascading falls, living root bridges & gorges' },
  { id: 'city', name: 'City Tourism', iconName: 'Building2', tagline: 'Bustling metro hubs, vibrant bazaars, art galleries & colonial boulevards' },
];

export const REGIONS_LIST: IndianRegion[] = ['North', 'South', 'West', 'East', 'Northeast'];

export const DESTINATIONS_DATA: Destination[] = [
  // 1. JAIPUR
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    tagline: 'The Pink City of Maharajas and Grand Palaces',
    categories: ['heritage', 'city', 'spiritual'],
    isHiddenGem: false,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603288967323-010f3c5fcaea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'World UNESCO heritage city famous for terracotta-pink stone facades, hilltop forts, astronomical observatories, and vibrant block-print textiles.',
    overview: 'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India’s first planned city. Known universally as the Pink City after its rose-tinted terracotta walls painted to welcome the Prince of Wales in 1876, it offers majestic hilltop fortresses, royal Rajput-Mughal palaces, and bustling heritage bazaars.',
    bestTimeToVisit: {
      recommendedMonths: 'October to March',
      peakSeason: 'November to February (Pleasant sunny days, cool evenings)',
      offSeason: 'April to June (Scorching summer dry heat exceeding 40°C)',
      weatherOverview: 'Winter: 10°C to 25°C. Summer: 28°C to 43°C. Monsoon: Moderate rain in July-August.',
      avgTemp: '18°C - 27°C'
    },
    howToReach: {
      airport: 'Jaipur International Airport (JAI), Sanganer (12 km from city center). Frequent direct flights from Delhi, Mumbai, Bengaluru, Dubai.',
      railway: 'Jaipur Junction (JP). Connected via Vande Bharat, Shatabdi, and Rajdhani express trains to Delhi in ~4 hours.',
      bus: 'Sindhi Camp Inter-State Bus Terminal (ISBT). Luxury Volvo AC buses run every 30 minutes from New Delhi (ISBT Kashmiri Gate / Dhaula Kuan).',
      localTransport: 'Jaipur Metro connects Mansarovar to Badi Chaupar (City Palace). App-based Uber/Ola, auto-rickshaws, and Government RTDC tourist coaches.'
    },
    topAttractions: [
      { name: 'Amber Fort (Amer)', description: 'Grand 16th-century Rajput citadel overlooking Maota Lake, famous for Sheesh Mahal (Mirror Palace) and intricate marble carvings.', timing: '8:00 AM - 5:30 PM, Light Show 6:30 PM', entryFee: '₹100 (Indians), ₹550 (Foreigners)', highlight: 'Sheesh Mahal Mirror Hall' },
      { name: 'Hawa Mahal (Palace of Winds)', description: 'Five-story honeycomb pink sandstone facade with 953 jharokhas (casements) designed for royal ladies to view royal processions anonymously.', timing: '9:00 AM - 5:00 PM', entryFee: '₹50 (Indians), ₹200 (Foreigners)', highlight: 'Panoramic view from the top' },
      { name: 'City Palace & Chandra Mahal', description: 'Active residence of the Jaipur Royal Family housing royal attire museums, peacock courtyards, and giant sterling silver urns (Gangajali).', timing: '9:30 AM - 5:00 PM', entryFee: '₹300 (General), ₹3,000 (Royal Grandeur tour)', highlight: 'Pritam Niwas Peacock Gate' },
      { name: 'Jantar Mantar Observatory', description: 'UNESCO astronomical observatory housing the world’s largest stone sundial (Samrat Yantra) with 2-second time precision.', timing: '9:00 AM - 4:30 PM', entryFee: '₹50 (Indians), ₹200 (Foreigners)', highlight: 'World’s Largest Stone Sundial' }
    ],
    thingsToDo: [
      { title: 'Sunrise Hot Air Balloon Ride', category: 'Adventure', duration: '3 hours', description: 'Float over Amber Fort, Aravalli ridges, and rural Rajasthani hamlets at dawn with licensed pilots.' },
      { title: 'Block Printing Workshop at Bagru', category: 'Culture', duration: '4 hours', description: 'Learn natural mud-resist (Dabu) and wooden block dyeing directly from traditional Chippa master artisans.' },
      { title: 'Heritage Walk through Old City Bazaars', category: 'Sightseeing', duration: '2.5 hours', description: 'Explore spice alleys, silversmiths, lac bangle lanes in Maniharon Ka Rasta, and sample lassi at Lassiwala MI Road.' },
      { title: 'Sunset at Nahargarh Fort', category: 'Sightseeing', duration: '2 hours', description: 'Watch the entire Pink City illuminate in golden lights from the rooftop battlements of Nahargarh Fort.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Dal Baati Churma', type: 'Veg', description: 'Baked wheat flour balls dipped in desi ghee, served with spiced panchmel lentils and sweet jaggery churma.', whereToTry: 'Chokhi Dhani or Laxmi Mishthan Bhandar (LMB)' },
        { name: 'Pyaaz Kachori', type: 'Veg', description: 'Crispy flaky deep-fried pastry stuffed with spicy caramelised onion and asafoetida filling.', whereToTry: 'Rawat Mishthan Bhandar, Station Road' },
        { name: 'Laal Maas', type: 'Non-Veg', description: 'Smoky, fiery Rajput mutton curry slow-cooked with Mathania red chillies and garlic.', whereToTry: 'Handi Restaurant or Spice Court' },
        { name: 'Ghevar', type: 'Sweet', description: 'Honeycomb-textured disc made from refined flour soaked in saffron sugar syrup and topped with rabri & pistachio.', whereToTry: 'Sambhar Fini Ghewar / LMB Johari Bazaar' }
      ],
      festivals: [
        { name: 'Jaipur Literature Festival (JLF)', month: 'January', description: 'The world’s largest free literary extravaganza held at Hotel Clarks Amer featuring global authors and Nobel laureates.' },
        { name: 'Gangaur & Teej Royal Processions', month: 'March / August', description: 'Spectacular parades of decorated elephants, folk dancers, and royal palanquins through the walled city.' },
        { name: 'Diwali City Illumination', month: 'October / November', description: 'The entire Pink City is adorned with millions of fairy lights and oil lamps, competing for the best-decorated market award.' }
      ],
      localMarkets: [
        { name: 'Johari Bazaar', famousFor: 'Kundan, Meenakari precious gems, 22K gold jewellery and tie-dye bandhani sarees.', tip: 'Visit early morning or late afternoon; ask for authentic Hallmark certification.' },
        { name: 'Bapu Bazaar', famousFor: 'Camel leather mojari shoes, Jaipuri razai (lightweight cotton quilts), and vibrant kurtis.', tip: 'Gentle friendly bargaining is expected; counter with ~60% of first quoted price.' },
        { name: 'Tripolia Bazaar', famousFor: 'Traditional lac bangles crafted hot on miniature furnaces, brassware, and iron artifacts.', tip: 'Walk into Maniharon Ka Rasta alleyway to watch bangles handcrafted.' }
      ],
      culturalTradition: 'Traditional Rajasthani hospitality (Padharo Mhare Desh), folk Ghoomar and Kalbelia snake dances, and royal lineage pride.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Jaipur Classic Express: Forts & Palaces',
        summary: 'Hit the iconic trio of Amber Fort, Hawa Mahal, and City Palace in a concentrated 24-hour itinerary.',
        schedule: [
          {
            day: 1,
            title: 'Royal Highlights of the Pink City',
            morning: '8:30 AM: Amber Fort excursion and Sheesh Mahal mirror tour. Quick photo stop at Jal Mahal (Water Palace) in Man Sagar Lake.',
            afternoon: '1:00 PM: Traditional thali lunch at LMB. 2:30 PM: City Palace royal museum & Jantar Mantar sun observatory.',
            evening: '5:30 PM: Walk around exterior facade of Hawa Mahal at sunset; evening shopping at Johari Bazaar for blue pottery and textiles.',
            recommendedMeals: 'Pyaaz Kachori breakfast at Rawat, Royal Rajasthani Thali for lunch, dinner at 1135 AD inside Amber Fort.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Heritage & Hill Forts Deep Dive',
        summary: 'Explore Nahargarh, Jaigarh, Albert Hall, and artisan villages over 48 hours.',
        schedule: [
          {
            day: 1,
            title: 'Amer & Royal Heritage',
            morning: 'Amber Fort exploration and Panna Meena Ka Kund stepwell photography.',
            afternoon: 'Anokhi Museum of Hand Printing; lunch at 1135 AD; Jal Mahal viewpoint.',
            evening: 'City Palace and Jantar Mantar; rooftop coffee overlooking Hawa Mahal.',
            recommendedMeals: 'Lassiwala MI Road lassi, spiced kachoris, dinner at Handi for authentic Laal Maas.'
          },
          {
            day: 2,
            title: 'Ramparts, Bazaars & Sunset',
            morning: 'Jaigarh Fort to see the Jaivana Cannon (once the world’s largest cannon on wheels).',
            afternoon: 'Albert Hall Museum in Ram Niwas Garden; visit Central Museum for Indo-Saracenic architecture.',
            evening: 'Watch the sunset and sunset drinks at Padao Nahargarh Fort with views of the illuminated city below.',
            recommendedMeals: 'Ghevar tasting at LMB, Dal Baati Churma lunch, dinner at Bar Palladio.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'The Complete Pink City & Artisan Odyssey',
        summary: 'Comprehensive 3-day exploration including Bagru block printing, stepwells, temples, and cultural evening.',
        schedule: [
          {
            day: 1,
            title: 'Iconic Palaces & Old Walled City',
            morning: 'Hawa Mahal sunrise photo shoot; walk through Badi Chaupar; City Palace.',
            afternoon: 'Jantar Mantar observatory tour; lunch at The Johri; Albert Hall Museum.',
            evening: 'Shopping in Bapu Bazaar; dinner and puppet performance at Chokhi Dhani ethnic village.',
            recommendedMeals: 'Traditional Bajra Roti with Lehsun Chutney and Kadhi.'
          },
          {
            day: 2,
            title: 'Amer, Jaigarh & Stepwells',
            morning: 'Amber Fort early morning; Panna Meena Kund stepwell; Jaigarh Fort cannon.',
            afternoon: 'Lunch at Amer cafe; visit Jagat Shiromani Temple; drive up to Nahargarh Fort.',
            evening: 'Nahargarh Wax Museum and sunset panorama; dinner at Spice Court.',
            recommendedMeals: 'Junglee Maas / Gatte Ki Sabzi with hot tandoori rotis.'
          },
          {
            day: 3,
            title: 'Artisans, Temples & Royal Cenotaphs',
            morning: 'Morning aarti at Govind Dev Ji Temple; visit Gaitore Ki Chhatriyan (Royal Cenotaphs).',
            afternoon: 'Half-day excursion to Sanganer or Bagru for block printing workshops; Blue Pottery showroom.',
            evening: 'Cocktails at the stunning Bar Palladio; relaxed souvenir shopping at Rajasthali Government Emporium.',
            recommendedMeals: 'Mawa Kachori, Rabri Faluda at Pandit Kulfi.'
          }
        ]
      },
      {
        daysCount: 5,
        title: 'Pink City Grandeur & Shekhawati / Samode Excursion',
        summary: 'A full 5-day royal journey covering Jaipur, Samode Palace, Chand Baori stepwell at Abhaneri, and wildlife sanctuary.',
        schedule: [
          {
            day: 1,
            title: 'Walled City Arrival & Sights',
            morning: 'Hawa Mahal, Jantar Mantar, City Palace.',
            afternoon: 'Heritage walk in Johari Bazaar and Bapu Bazaar.',
            evening: 'Albert Hall night lights.',
            recommendedMeals: 'MI Road Lassiwala, LMB Thali.'
          },
          {
            day: 2,
            title: 'Amer, Jaigarh & Nahargarh Fort Trio',
            morning: 'Amber Fort, Sheesh Mahal, Panna Meena Stepwell.',
            afternoon: 'Jaigarh cannon and armory.',
            evening: 'Sunset over Jaipur from Nahargarh ramparts.',
            recommendedMeals: '1135 AD royal banquet.'
          },
          {
            day: 3,
            title: 'Abhaneri Stepwell & Bhangarh Excursion',
            morning: 'Day trip to Chand Baori in Abhaneri—one of India’s deepest stepwells (3,500 narrow steps).',
            afternoon: 'Visit 17th-century Bhangarh Fort surrounded by the lush Aravalli hills.',
            evening: 'Return to Jaipur for rooftop dinner.',
            recommendedMeals: 'Roadside dhaba tandoori parathas.'
          },
          {
            day: 4,
            title: 'Artisan Heritage & Heritage Stays',
            morning: 'Bagru textile printing workshop.',
            afternoon: 'Gaitore Cenotaphs and Galta Ji (Monkey Temple).',
            evening: 'Cultural dance and folk music evening at Sisodia Rani Garden.',
            recommendedMeals: 'Chokhi Dhani traditional feast.'
          },
          {
            day: 5,
            title: 'Leisure, Shopping & Royal Spa',
            morning: 'Explore Samode Palace or Nahargarh Biological Park.',
            afternoon: 'High-end gems and jewellery shopping at Gem Palace.',
            evening: 'Farewell sunset rooftop dinner at Rambagh Palace or Polo Bar.',
            recommendedMeals: 'Royal Thali at Suvarna Mahal.'
          }
        ]
      },
      {
        daysCount: 7,
        title: 'Golden Triangle Jaipur Master Itinerary',
        summary: 'The ultimate week-long exploration including day trips to Ajmer, Pushkar holy lake, and Ranthambore tiger safari.',
        schedule: [
          { day: 1, title: 'Pink City Welcome & Heritage Walk', morning: 'Hawa Mahal and City Palace.', afternoon: 'Jantar Mantar.', evening: 'Johari Bazaar shopping.', recommendedMeals: 'Rawat Kachori.' },
          { day: 2, title: 'The Fortress Trail', morning: 'Amer Fort & Elephant Village.', afternoon: 'Jaigarh Fort.', evening: 'Nahargarh sunset.', recommendedMeals: 'Handi Laal Maas.' },
          { day: 3, title: 'Artisan Villages & Stepwells', morning: 'Chand Baori Stepwell.', afternoon: 'Bagru printing.', evening: 'Albert Hall Museum.', recommendedMeals: 'Dhaba lunch.' },
          { day: 4, title: 'Day Trip to Ajmer & Pushkar', morning: 'Drive to Ajmer Sharif Dargah (venerated Sufi shrine).', afternoon: 'Brahma Temple and sacred Pushkar Lake; Camel ride across Pushkar dunes.', evening: 'Rose garden cafe sunset; return to Jaipur.', recommendedMeals: 'Pushkar Malpua at Halwai Gali.' },
          { day: 5, title: 'Ranthambore Tiger Safari Day Excursion', morning: 'Early morning express train to Sawai Madhopur.', afternoon: 'Afternoon open-top jeep tiger safari in Ranthambore Zone 1-5.', evening: 'Return to Jaipur.', recommendedMeals: 'Packed forest lunch, hearty Rajasthani dinner.' },
          { day: 6, title: 'Museums, Temples & Palaces', morning: 'Govind Dev Ji Temple, Sisodia Rani Palace.', afternoon: 'Amrapali Museum of Jewellery.', evening: 'Sound & light show at Amber Fort.', recommendedMeals: 'Bar Palladio Italian.' },
          { day: 7, title: 'Bespoke Shopping & Royal Farewells', morning: 'Precious gemstone and blue pottery shopping.', afternoon: 'Ayurvedic wellness massage.', evening: 'Farewell feast at Suvarna Mahal with classical sitar.', recommendedMeals: 'Ghevar & Royal Saffron Pulao.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 800, food: 450, transport: 250, activities: 350 },
      midRange: { accommodation: 3200, food: 1400, transport: 900, activities: 900 },
      luxury: { accommodation: 12000, food: 4500, transport: 2800, activities: 2500 }
    }
  },

  // 2. VARANASI
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    tagline: 'The Spiritual Capital of India on the Holy Ganges',
    categories: ['spiritual', 'heritage', 'city'],
    isHiddenGem: false,
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'One of the world’s oldest continuously inhabited cities. Famous for riverfront ghats, mystical evening Ganga Aarti, and sacred silk weaving.',
    overview: 'Mark Twain famously wrote that Varanasi is older than history, older than tradition, older even than legend. Stretching along the sacred crescent curve of the Ganges River, Kashi (City of Light) is the spiritual epicenter of Hinduism, where pilgrims perform rituals along 84 historic stone ghats.',
    bestTimeToVisit: {
      recommendedMonths: 'October to March',
      peakSeason: 'November to February (Cool morning mist, comfortable walking weather)',
      offSeason: 'April to June (Extreme summer temperatures exceeding 42°C)',
      weatherOverview: 'Winter: 9°C to 24°C. Monsoon: Heavy rains and swollen Ganges river in July-August.',
      avgTemp: '16°C - 26°C'
    },
    howToReach: {
      airport: 'Lal Bahadur Shastri International Airport (VNS) at Babatpur (26 km from ghats). Direct flights from Delhi, Mumbai, Kolkata, Kathmandu.',
      railway: 'Varanasi Junction (BSB) and Pt. Deen Dayal Upadhyaya Junction (DDU). Multiple high-speed Vande Bharat and Rajdhani express trains daily.',
      bus: 'Direct express bus connectivity to Lucknow, Prayagraj, Gorakhpur, and Patna.',
      localTransport: 'Walk through narrow pedestrian alleys (galis); hand-rowed wooden boats & electric e-rickshaws on main ring roads.'
    },
    topAttractions: [
      { name: 'Dashashwamedh Ghat & Evening Ganga Aarti', description: 'The grandest ghat where seven priests perform synchronized brass-lamp worship of the sacred Ganga every twilight.', timing: 'Aarti starts 6:30 PM (Winter) / 7:00 PM (Summer)', entryFee: 'Free (Boat seat ₹150 - ₹300)', highlight: 'Evening Synchronized Aarti' },
      { name: 'Kashi Vishwanath Corridor & Golden Temple', description: 'One of the 12 sacred Jyotirlingas, reconstructed with a massive 50,000 sq meter marble corridor connecting straight to the river ghats.', timing: '3:00 AM - 11:00 PM', entryFee: 'Free (Sugam Darshan VIP ticket available ₹300)', highlight: 'Gold-plated Shikhara spire' },
      { name: 'Assi Ghat Sunrise & Yoga', description: 'Southernmost sacred ghat known for morning Subah-e-Banaras cultural performances, Vedic chanting, and boat departures.', timing: 'Open 24 hours (Morning program 5:30 AM)', entryFee: 'Free', highlight: 'Subah-e-Banaras sunrise music' },
      { name: 'Sarnath Deer Park & Dhamek Stupa', description: 'Just 10 km away where Gautama Buddha preached his first sermon after enlightenment (Dhammacakkappavattana Sutta).', timing: '6:00 AM - 6:00 PM', entryFee: '₹25 (Indians), ₹300 (Foreigners)', highlight: 'Ashoka Pillar & Stupa' }
    ],
    thingsToDo: [
      { title: 'Dawn Rowboat Ride on the Ganges', category: 'Sightseeing', duration: '2 hours', description: 'Watch the sunrise paint the ghats in ochre light as thousands of pilgrims bathe and pray along the water.' },
      { title: 'Banarasi Silk Weaving Alley Exploration', category: 'Culture', duration: '3 hours', description: 'Visit Muslim weavers in Madanpura creating heirloom bridal sarees on wooden handlooms with pure gold zari thread.' },
      { title: 'Street Food Walking Tour in Thatheri Bazaar', category: 'Culture', duration: '2 hours', description: 'Taste Tamatar Chaat, creamy Malaiyyo foam sweet, Kachori Jalebi, and authentic Banarasi Paan.' },
      { title: 'Classical Sitar Music at Music Ashrams', category: 'Culture', duration: '2 hours', description: 'Attend an acoustic evening baithak of the famous Benares Gharana classical musical tradition.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Banarasi Tamatar Chaat', type: 'Veg', description: 'Spiced tomato mash simmered with hing, ginger, cumin, cashew nuts, and topped with crunchy namkeen.', whereToTry: 'Kashi Chaat Bhandar, Godowlia' },
        { name: 'Malaiyyo (Winter Cloud Dessert)', type: 'Sweet', description: 'Ethereal saffron-flavoured milk froth created by exposing churned milk to overnight dew, topped with pistachios.', whereToTry: 'Chaukhamba Gali near Neelkanth' },
        { name: 'Kachori Sabzi & Jalebi', type: 'Veg', description: 'Crisp deep-fried urad dal kachoris paired with spicy potato-chickpea curry and syrupy coiled jalebis.', whereToTry: 'Ram Bhandar or Netaji Subhash Chowk' },
        { name: 'Banarasi Meetha Paan', type: 'Sweet', description: 'Fragrant betel leaf filled with gulkand (rose petal paste), fennel, tutti frutti, and silver foil (vark).', whereToTry: 'Keshav Tambool Bhandar, Ravindrapuri' }
      ],
      festivals: [
        { name: 'Dev Deepawali', month: 'November (Kartik Purnima)', description: 'Over one million earthen oil lamps (diyas) light up every inch of the 84 ghats in a breathtaking cosmic spectacle.' },
        { name: 'Maha Shivratri', month: 'February / March', description: 'Hundreds of thousands of devotees carry holy Ganga water to Kashi Vishwanath in jubilant processions.' },
        { name: 'Dhrupad Mela', month: 'February', description: 'An all-night Indian classical music festival held at Tulsi Ghat under the stars.' }
      ],
      localMarkets: [
        { name: 'Godowlia Market', famousFor: 'Silk scarves, wooden toys, brass puja vessels, and silver jewellery.', tip: 'Heavy pedestrian crowd; keep valuables secure.' },
        { name: 'Thatheri Bazaar', famousFor: 'Handmade bell-metal kitchenware, copper lotas, and traditional silversmiths.', tip: 'Narrow labyrinth of medieval lanes dating back centuries.' }
      ],
      culturalTradition: 'Philosophical acceptance of life and death, evening prayers to Mother Ganga, classical Indian arts, and guru-shishya lineages.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Spiritual Varanasi in 24 Hours',
        summary: 'Experience sunrise boat ride, Kashi Vishwanath temple, street food, and evening Ganga Aarti.',
        schedule: [
          {
            day: 1,
            title: 'Dawn to Twilight on Sacred Waters',
            morning: '5:30 AM: Dawn hand-rowed boat ride from Assi Ghat to Manikarnika Ghat. 8:00 AM: Kachori-jalebi breakfast.',
            afternoon: '10:00 AM: Kashi Vishwanath Temple Darshan via the river corridor. 1:00 PM: Vegetarian lunch and resting.',
            evening: '5:00 PM: Walk through Godowlia bazaar; 6:30 PM: Attend Dashashwamedh Ghat Grand Ganga Aarti; dinner at Kashi Chaat.',
            recommendedMeals: 'Ram Bhandar Kachori, Blue Lassi, Kashi Chaat Bhandar.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Ghats, Silk Weavers & Sarnath Heritage',
        summary: 'Two complete days covering ghat life, Buddhist holy Sarnath, and artisan silk colonies.',
        schedule: [
          {
            day: 1,
            title: 'Sacred River & Old City Galis',
            morning: 'Sunrise boat ride; explore old alleys; visit Bharat Kala Bhavan museum.',
            afternoon: 'Kashi Vishwanath Corridor; stroll through spice markets; lunch.',
            evening: 'Dashashwamedh Ganga Aarti from boat or ghat steps; Banarasi Paan tasting.',
            recommendedMeals: 'Langar / Satvik Thali at Annapurna Mandir, Tamatar Chaat.'
          },
          {
            day: 2,
            title: 'Buddhist Peace in Sarnath',
            morning: 'Drive to Sarnath; visit Dhamek Stupa, Mulagandha Kuti Vihar, and Archaeological Museum.',
            afternoon: 'Lunch at Sarnath; visit Tibetan & Thai Buddhist monasteries; visit Banarasi silk weaving looms.',
            evening: 'Assi Ghat evening musical aarti and riverside chai.',
            recommendedMeals: 'Pizzeria Vaatika Cafe at Assi Ghat for wood-fired pizza and apple pie.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'The Soul of Kashi: Ghats, Ashrams & History',
        summary: 'In-depth immersion into Banarasi classical music, meditation, Ramnagar Fort, and ancient ghats.',
        schedule: [
          { day: 1, title: 'The Sacred Riverbank', morning: 'Sunrise boat trip and temple darshan.', afternoon: 'Old city alley exploration and textile shops.', evening: 'Dashashwamedh Aarti.', recommendedMeals: 'Kashi Chaat.' },
          { day: 2, title: 'Sarnath & Silk Weavers', morning: 'Sarnath Buddha stupas and Ashoka Lion Capital.', afternoon: 'Madanpura silk loom tour.', evening: 'Classical Indian music concert.', recommendedMeals: 'Baati Chokha.' },
          { day: 3, title: 'Ramnagar Fort & River Crossing', morning: 'Visit 17th-century Ramnagar Fort across the river; view vintage cars and royal palanquins.', afternoon: 'Taste famous Shiv Prasad Lassi at Ramnagar; visit Tulsi Manas Temple.', evening: 'Sunset quiet boat ride along Chet Singh Fort and Darbhanga Ghat.', recommendedMeals: 'Ramnagar Lassi, Kashi street sweets.' }
        ]
      },
      {
        daysCount: 5,
        title: 'Spiritual Varanasi & Prayagraj Triveni Sangam',
        summary: 'Comprehensive 5-day cultural sojourn including day trip to Prayagraj Sangam confluence.',
        schedule: [
          { day: 1, title: 'River Awakening', morning: 'Ghat boat ride.', afternoon: 'Kashi Vishwanath.', evening: 'Main Aarti.', recommendedMeals: 'Kachori.' },
          { day: 2, title: 'Sarnath Buddhist Holy Trail', morning: 'Dhamek Stupa.', afternoon: 'Archaeological Museum.', evening: 'Assi Ghat.', recommendedMeals: 'Vaatika Cafe.' },
          { day: 3, title: 'Day Trip to Prayagraj (Allahabad)', morning: 'Drive 2.5 hours to Prayagraj; boat ride to holy Triveni Sangam (confluence of Ganga, Yamuna & mythical Saraswati).', afternoon: 'Visit Anand Bhavan (Nehru ancestral home) and Allahabad Fort.', evening: 'Return to Varanasi.', recommendedMeals: 'Prayagraj Gujiya and Loknath Chaat.' },
          { day: 4, title: 'Artisan & Musical Lineages', morning: 'Varanasi Weavers Quarter.', afternoon: 'Sitar and Tabla workshop.', evening: 'Private evening boat with lamps.', recommendedMeals: 'Satvik Thali.' },
          { day: 5, title: 'Varanasi Forts & Leisure', morning: 'Ramnagar Fort and Chunar Fort excursion.', afternoon: 'Souvenir and spice shopping.', evening: 'Subah-e-Banaras remembrance farewell.', recommendedMeals: 'Malaiyyo & Paan.' }
        ]
      },
      {
        daysCount: 7,
        title: 'Spiritual Triangle: Varanasi, Ayodhya & Bodh Gaya',
        summary: 'Ultimate 7-day pilgrimage connecting Varanasi, Ayodhya Ram Mandir, and Bodh Gaya Enlightenment Tree.',
        schedule: [
          { day: 1, title: 'Kashi Arrival & Ghats', morning: 'Welcome to Varanasi.', afternoon: 'Rest and orientation.', evening: 'Dashashwamedh Aarti.', recommendedMeals: 'Chaat.' },
          { day: 2, title: 'Sacred Temples & Sarnath', morning: 'Vishwanath Corridor.', afternoon: 'Sarnath Stupa.', evening: 'Boat ride.', recommendedMeals: 'Thali.' },
          { day: 3, title: 'Excursion to Ayodhya', morning: 'High speed Vande Bharat to Ayodhya.', afternoon: 'Darshan at Ram Janmabhoomi Mandir and Hanuman Garhi.', evening: 'Saryu River Aarti; return to Varanasi.', recommendedMeals: 'Ayodhya Pedas.' },
          { day: 4, title: 'Excursion to Bodh Gaya', morning: 'Drive/train to Bodh Gaya (Bihar).', afternoon: 'Meditate under the sacred Bodhi Tree at Mahabodhi Temple (UNESCO).', evening: 'Visit Great Buddha statue and Japanese Monastery; overnight Bodh Gaya.', recommendedMeals: 'Tibetan momos & Satvik meals.' },
          { day: 5, title: 'Bodh Gaya to Varanasi', morning: 'Morning meditation at Mahabodhi; drive back to Varanasi.', afternoon: 'Relaxation at Assi Ghat.', evening: 'Classical concert.', recommendedMeals: 'Lassi.' },
          { day: 6, title: 'Ramnagar & Traditional Crafts', morning: 'Ramnagar Fort.', afternoon: 'Silk weavers & brass shops.', evening: 'Sunset river cruise.', recommendedMeals: 'Baati Chokha.' },
          { day: 7, title: 'Dawn Farewell to the Ganges', morning: 'Final sunrise meditation and holy Ganga dip.', afternoon: 'Souvenir collection.', evening: 'Departure.', recommendedMeals: 'Sweet Malaiyyo.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 600, food: 350, transport: 200, activities: 250 },
      midRange: { accommodation: 2800, food: 1200, transport: 800, activities: 750 },
      luxury: { accommodation: 10500, food: 3800, transport: 2400, activities: 2000 }
    }
  },

  // 3. KERALA BACKWATERS (ALLEPPEY & KUMARAKOM)
  {
    id: 'kerala_backwaters',
    name: 'Kerala Backwaters',
    state: 'Kerala',
    region: 'South',
    tagline: 'God’s Own Country: Emerald Canals, Houseboats & Ayurvedic Bliss',
    categories: ['nature', 'beaches', 'adventure'],
    isHiddenGem: false,
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609137144822-48226d9c636f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Interconnected labyrinth of 900 km of serene brackish lagoons, palm-fringed canals, traditional kettuvallam houseboats, and paddy fields below sea level.',
    overview: 'The Kerala Backwaters are a unique eco-system of 38 rivers and five large lakes running parallel to the Arabian Sea coast. Boarding a thatched houseboat (kettuvallam) made of anjili wood and coir rope allows travelers to glide past tranquil village life, toddy tappers, ducks in emerald paddy fields, and migratory birds.',
    bestTimeToVisit: {
      recommendedMonths: 'September to March',
      peakSeason: 'November to February (Cool, balmy tropical weather, no humidity spikes)',
      offSeason: 'June to August (Monsoon season—ideal for authentic Ayurvedic rejuvenation treatments)',
      weatherOverview: 'Winter: 22°C to 32°C. Monsoon: Heavy rain showers, lush vibrant greenery.',
      avgTemp: '24°C - 31°C'
    },
    howToReach: {
      airport: 'Cochin International Airport (COK), 75 km to Alleppey (2 hours by taxi). Fully solar-powered international airport with global connections.',
      railway: 'Alappuzha Railway Station (ALLP) and Ernakulam Junction (ERS). Direct trains from Mumbai, Delhi, Chennai, Bengaluru.',
      bus: 'KSRTC state buses connect Alleppey to Kochi, Trivandrum, Munnar, and Thekkady regularly.',
      localTransport: 'SWTD Government public passenger ferries (tickets from ₹10!), shikara boats, auto-rickshaws, and private canoe rentals.'
    },
    topAttractions: [
      { name: 'Vembanad Lake & Canal Network', description: 'India’s longest lake, dotted with hundreds of houseboats and Chinese fishing nets.', timing: 'Houseboat cruises typically 12:00 PM to 9:00 AM', entryFee: 'Day cruise ₹4,000 - ₹8,000, Overnight ₹8,000 - ₹20,000', highlight: 'Overnight Houseboat Stay' },
      { name: 'Kumarakom Bird Sanctuary', description: '14-acre sanctuary on the eastern bank of Vembanad Lake, hosting Siberian storks, egrets, herons, and waterfowls.', timing: '6:00 AM - 6:00 PM', entryFee: '₹100 (Indians), ₹250 (Foreigners)', highlight: 'Dawn canoe bird-watching' },
      { name: 'Marari Beach', description: 'Tranquil white-sand coastline fringed by coconut groves, just 14 km from Alleppey, free of heavy crowds.', timing: 'Open all day', entryFee: 'Free', highlight: 'Sunset walks & seafood shacks' },
      { name: 'Pathiramanal Island', description: 'Enchanting uninhabited island in Vembanad Lake, accessible only by boat, sheltering rare migratory bird species.', timing: '6:00 AM - 6:00 PM', entryFee: 'Free (Boat hire extra)', highlight: 'Pristine mangrove trails' }
    ],
    thingsToDo: [
      { title: 'Overnight Traditional Kettuvallam Cruise', category: 'Nature', duration: '21 hours', description: 'Float through narrow palm-shaded canals while a private chef prepares freshly caught Karimeen fish on banana leaves.' },
      { title: 'Village Canoe Shikhara Excursion', category: 'Culture', duration: '3 hours', description: 'Take a silent narrow-canal wooden canoe to witness local coir yarn spinning, coconut harvesting, and duck farming.' },
      { title: 'Authentic Ayurvedic Abhyanga Massage', category: 'Culture', duration: '90 minutes', description: 'Experience centuries-old herbal oil healing therapy under the guidance of certified Kerala Ayurvedic practitioners.' },
      { title: 'Kayaking in Kuttanad Waterways', category: 'Adventure', duration: '3 hours', description: 'Paddle through the Venice of the East where farming is done up to 2 meters below sea level.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Karimeen Pollichathu', type: 'Non-Veg', description: 'Pearl spot fish marinated in spicy shallots and red chilli paste, wrapped in a banana leaf and pan-grilled.', whereToTry: 'Houseboat kitchens or Cassia Alleppey' },
        { name: 'Appam with Vegetable / Duck Stew', type: 'Veg', description: 'Fluffy fermented rice batter pancakes with soft lacy borders, paired with fragrant mild coconut milk stew.', whereToTry: 'Thaff Dawat Restaurant or Kumarakom Lake Resort' },
        { name: 'Kerala Sadya', type: 'Veg', description: 'Grand multi-course vegetarian feast served on plantain leaves featuring avial, thoran, sambar, olan, and payasam.', whereToTry: 'Hotel Brothers or local temple festivals' },
        { name: 'Fresh Tender Coconut Water', type: 'Beverage', description: 'Sweet, electrolyte-rich water fresh-cut from roadside palm trees for ₹40-50.', whereToTry: 'Roadside vendors along canal bunds' }
      ],
      festivals: [
        { name: 'Nehru Trophy Boat Race', month: 'August (Second Saturday)', description: 'Fierce snake boat (Chundan Vallam) races on Punnamada Lake with 100 rowers per boat chanting synchronous rhythms.' },
        { name: 'Onam Harvest Festival', month: 'August / September', description: 'Grand ten-day festival featuring intricate floral carpets (Pookkalam), Kathakali dance, and joyous community feasts.' },
        { name: 'Aranmula Vallamkali', month: 'August', description: 'Centuries-old water fiesta of snake boats accompanied by traditional Vanchipattu songs.' }
      ],
      localMarkets: [
        { name: 'Mullakkal Street', famousFor: 'Spices (green cardamom, black pepper, cinnamon), banana chips fried in pure coconut oil, and gold jewellery.', tip: 'Taste warm freshly fried nendran banana chips right at the kadai.' },
        { name: 'Kochi Spice Market (Mattancherry)', famousFor: 'Historic warehouses trading cloves, nutmeg, star anise, and organic vanilla pods.', tip: 'Ask for vacuum packing for air travel.' }
      ],
      culturalTradition: 'Kathakali masked drama, Kalaripayattu martial arts, reverence for marine ecology, and matrilineal heritage.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Alleppey Backwaters Day Cruise & Village Life',
        summary: 'Experience the magic of Kerala backwaters in a 1-day shikhara and village tour.',
        schedule: [
          {
            day: 1,
            title: 'Canals & Coastal Sunset',
            morning: '8:30 AM: Board an open motorized wooden Shikhara boat for a 4-hour morning cruise through Kuttanad.',
            afternoon: '1:00 PM: Traditional lunch at a canal-side toddy shop / homestay (Karimeen Pollichathu & Kappa tapioca).',
            evening: '4:30 PM: Drive to Marari Beach; enjoy a relaxing sunset walk on white sands; dinner at a beach shack.',
            recommendedMeals: 'Appam breakfast, Karimeen lunch, Coconut seafood dinner.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Overnight Houseboat & Serene Beach Escape',
        summary: 'Spend 24 luxurious hours cruising on a houseboat plus a night at Marari beach.',
        schedule: [
          {
            day: 1,
            title: 'Life on the Houseboat',
            morning: '11:30 AM: Check-in to your private Kettuvallam at Finishing Point Jetty; welcome coconut drink.',
            afternoon: 'Cruise through Vembanad Lake; hot freshly prepared lunch on board; stop at Pathiramanal island.',
            evening: 'Houseboat anchors at dusk (as per government fishing net rules); enjoy village walk and sunset on deck.',
            recommendedMeals: 'On-board multi-course Kerala meal with fish fry and payasam.'
          },
          {
            day: 2,
            title: 'Sunrise on the Lake & Marari Beach',
            morning: '8:00 AM: Morning cruise while breakfast is served; check-out at 9:30 AM.',
            afternoon: 'Visit Alleppey Lighthouse and ancient Coir museum; lunch in town.',
            evening: 'Sunset at Marari Beach with fresh seafood dinner.',
            recommendedMeals: 'Banana fritters (Pazham Pori) with evening tea.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'Kochi Heritage & Backwater Bliss',
        summary: 'Combine Fort Kochi colonial charm, Chinese fishing nets, and Alleppey backwaters.',
        schedule: [
          {
            day: 1,
            title: 'Historic Fort Kochi & Mattancherry',
            morning: 'Explore Fort Kochi, St. Francis Church (Vasco da Gama original burial site), and iconic Chinese Fishing Nets.',
            afternoon: 'Visit Paradesi Jewish Synagogue and Dutch Palace in Jew Town; spice shopping.',
            evening: 'Live Kathakali dance and face-makeup demonstration at Kerala Kathakali Centre.',
            recommendedMeals: 'Fish moilee and Malabar parotta.'
          },
          {
            day: 2,
            title: 'Transfer to Alleppey & Houseboat',
            morning: 'Drive 1.5 hours to Alleppey; board luxury houseboat.',
            afternoon: 'Backwater cruise through palm lagoons; Ayurvedic oil massage demo.',
            evening: 'Candlelight dinner on the docked houseboat under starry skies.',
            recommendedMeals: 'Duck roast with appams on board.'
          },
          {
            day: 3,
            title: 'Village Kayaking & Marari Relaxation',
            morning: 'Dawn canal kayaking through lotus ponds; breakfast and check-out.',
            afternoon: 'Check-in to Marari Beach resort; relax under coconut palms.',
            evening: 'Beachside barbecue dinner with fresh lobster/prawns.',
            recommendedMeals: 'Tender coconut, grilled tiger prawns.'
          }
        ]
      },
      {
        daysCount: 5,
        title: 'The Classic Kerala Circuit: Hills, Tea & Waters',
        summary: 'Munnar mist, spice plantations, and serene backwater houseboats.',
        schedule: [
          { day: 1, title: 'Arrival in Kochi & Heritage', morning: 'Fort Kochi sights.', afternoon: 'Jew Town antiques.', evening: 'Kathakali show.', recommendedMeals: 'Kochi seafood.' },
          { day: 2, title: 'Drive to Munnar Hill Station', morning: 'Scenic 4-hour drive past Cheeyappara waterfalls.', afternoon: 'Check-in among tea plantations.', evening: 'Munnar town market walk.', recommendedMeals: 'Cardamom tea.' },
          { day: 3, title: 'Tea Gardens & Eravikulam', morning: 'Spot endangered Nilgiri Tahr goats in Eravikulam National Park.', afternoon: 'Tea Museum and plucking experience.', evening: 'Campfire at resort.', recommendedMeals: 'Kerala Parotta.' },
          { day: 4, title: 'Descend to Alleppey Backwaters', morning: 'Drive down to Alleppey.', afternoon: 'Board luxury houseboat cruise.', evening: 'Village night stay on boat.', recommendedMeals: 'Karimeen fry.' },
          { day: 5, title: 'Marari Beach Relaxation & Farewell', morning: 'Breakfast on boat, transfer to Marari beach.', afternoon: 'Ayurvedic wellness therapy.', evening: 'Farewell sunset dinner.', recommendedMeals: 'Tender coconut pudding.' }
        ]
      },
      {
        daysCount: 7,
        title: 'Complete God’s Own Country Odyssey',
        summary: 'Kochi, Munnar, Thekkady wildlife sanctuary, Alleppey backwaters, and Marari beach.',
        schedule: [
          { day: 1, title: 'Fort Kochi Colonial Heritage', morning: 'Chinese fishing nets.', afternoon: 'Dutch Palace.', evening: 'Kathakali performance.', recommendedMeals: 'Fusion cafe dining.' },
          { day: 2, title: 'Ascend to Munnar Tea Country', morning: 'Drive into Western Ghats.', afternoon: 'Mattupetty Dam and Echo Point.', evening: 'Tea estate walk.', recommendedMeals: 'Steaming stew.' },
          { day: 3, title: 'Munnar Peaks & Wildlife', morning: 'Anamudi Peak viewpoints and Eravikulam Park.', afternoon: 'Tea processing factory.', evening: 'Ayurvedic foot reflexology.', recommendedMeals: 'Dosa feast.' },
          { day: 4, title: 'Thekkady Spices & Periyar Tigers', morning: 'Drive to Periyar Tiger Reserve.', afternoon: 'Guided organic spice plantation walk (cardamom, pepper, vanilla).', evening: 'Kalaripayattu martial arts show.', recommendedMeals: 'Traditional Syrian beef/veg fry.' },
          { day: 5, title: 'Thekkady Lake Cruise to Alleppey', morning: 'Boat safari on Periyar Lake spotting wild elephants.', afternoon: 'Drive to Alleppey backwaters.', evening: 'Sunset Shikara ride.', recommendedMeals: 'Alleppey fish curry.' },
          { day: 6, title: 'Private Overnight Houseboat Journey', morning: 'Embark on full 21-hour houseboat cruise.', afternoon: 'Kuttanad farming zones below sea level.', evening: 'Lakeside dinner under the stars.', recommendedMeals: 'Houseboat feast.' },
          { day: 7, title: 'Marari Beach Rejuvenation & Departure', morning: 'Disembark boat, morning beach yoga at Marari.', afternoon: 'Ayurvedic full-body Abhyanga.', evening: 'Transfer to Kochi airport.', recommendedMeals: 'Fresh coconut & sadya.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 700, food: 400, transport: 250, activities: 400 },
      midRange: { accommodation: 3500, food: 1500, transport: 1000, activities: 1200 },
      luxury: { accommodation: 14000, food: 5000, transport: 3000, activities: 3500 }
    }
  },

  // 4. LADAKH (LEH, NUBRA & PANGONG)
  {
    id: 'ladakh',
    name: 'Leh Ladakh',
    state: 'Ladakh (UT)',
    region: 'North',
    tagline: 'The Land of High Mountain Passes and Azure Lakes',
    categories: ['mountains', 'adventure', 'spiritual'],
    isHiddenGem: false,
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High-altitude desert wonderland featuring turquoise alpine lakes at 14,000 ft, cliffside Buddhist gompas, Bactrian double-humped camels, and dramatic motorable passes.',
    overview: 'Perched in the rain-shadow of the Greater Himalayas, Ladakh is a stark moonscape of snow-capped peaks, rugged granite gorges, and Tibetan Buddhist culture. From crossing Khardung La (one of the world’s highest motorable roads) to witnessing the color-changing waters of Pangong Tso, Ladakh is India’s ultimate high-altitude frontier.',
    bestTimeToVisit: {
      recommendedMonths: 'May to September',
      peakSeason: 'June to August (All mountain passes clear of snow, pleasant 15°C to 25°C daytime)',
      offSeason: 'November to April (Sub-zero winter, passes closed; popular only for Chadar Frozen River Trek)',
      weatherOverview: 'Summer: 12°C to 25°C. Winter: -15°C to -30°C. Intense UV sun during daylight.',
      avgTemp: '14°C - 22°C'
    },
    howToReach: {
      airport: 'Kushok Bakula Rimpochee Airport (IXL), Leh (3,256m elevation). Daily morning flights from Delhi, Mumbai, Srinagar, Chandigarh.',
      railway: 'No direct railway. Nearest railheads are Jammu Tawi (700 km) and Chandigarh (580 km).',
      bus: 'Two legendary road routes open June-October: Manali-Leh Highway (475 km) and Srinagar-Leh Highway (420 km) via HRTC and J&K RTC buses.',
      localTransport: 'Registered Leh Taxi Union 4x4 vehicles (Innova, Scorpio), rented Royal Enfield Himalayan motorcycles, and bicycle rentals.'
    },
    topAttractions: [
      { name: 'Pangong Tso Lake (14,270 ft)', description: 'Endorheic salt-water lake extending 134 km from India to Tibet, famous for changing shades from turquoise to cobalt blue.', timing: 'Open all day (ILP permit required)', entryFee: 'Inner Line Permit ₹400 + ₹20/day green fee', highlight: 'Color-shifting waters at sunrise' },
      { name: 'Nubra Valley & Hunder Sand Dunes', description: 'Valley of flowers situated between Karakoram and Ladakh ranges, home to double-humped Bactrian camels.', timing: 'Best experienced late afternoon', entryFee: 'Camel ride ₹300 - ₹500', highlight: 'Bactrian camel desert safari' },
      { name: 'Thiksey Monastery (Mini Potala)', description: 'Twelve-story cliffside gompa belonging to the Yellow Hat Gelug sect, housing a 49-foot Maitreya Buddha statue.', timing: '7:00 AM - 7:00 PM (Morning prayers 7:00 AM)', entryFee: '₹50', highlight: 'Morning monastic chanting' },
      { name: 'Khardung La Pass (17,982 ft)', description: 'Historic mountain pass on the Silk Route linking Leh to the Shyok and Nubra valleys with panoramic Karakoram views.', timing: 'Pass traffic regulated by Indian Army', entryFee: 'Included in Ladakh permit', highlight: 'High-altitude selfie flagpoint' }
    ],
    thingsToDo: [
      { title: 'Stargazing at Hanle Dark Sky Reserve', category: 'Nature', duration: 'Overnight', description: 'Gaze into the Milky Way at India’s premier certified Dark Sky Reserve with telescope stations.' },
      { title: 'White-Water Rafting on the Zanskar River', category: 'Adventure', duration: '4 hours', description: 'Raft through Grade III and IV rapids in the breathtaking steep granite gorge of the Zanskar River.' },
      { title: 'Bactrian Camel Ride in Desert Dunes', category: 'Adventure', duration: '1 hour', description: 'Ride rare double-humped woolly camels across the silver sand dunes of Hunder with snow peaks in the backdrop.' },
      { title: 'Magnetic Hill Zero Gravity Experience', category: 'Sightseeing', duration: '30 mins', description: 'Park your vehicle in neutral on the marked spot on the Leh-Kargil highway and watch it roll uphill against gravity.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Ladakhi Thukpa', type: 'Non-Veg', description: 'Steaming bowl of hand-pulled noodles in a hearty garlic-ginger vegetable or mutton bone broth.', whereToTry: 'The Tibetan Kitchen, Fort Road Leh' },
        { name: 'Steamed Tingmo with Spicy Dal', type: 'Veg', description: 'Fluffy flower-shaped steamed Tibetan bread paired with rich chickpea or mutton curry.', whereToTry: 'Chopsticks Noodle Bar, Leh' },
        { name: 'Butter Tea (Gur Gur Cha)', type: 'Beverage', description: 'Traditional salty pink tea churned with yak butter, milk, and tea leaves in a wooden dongmo cylinder.', whereToTry: 'Local homestays and monastic kitchens' },
        { name: 'Chhurpi (Yak Cheese)', type: 'Veg', description: 'Dense, nutrient-rich hardened yak cheese chewed during long mountain treks.', whereToTry: 'Leh Main Bazaar organic counters' }
      ],
      festivals: [
        { name: 'Hemis Festival', month: 'June / July', description: 'Celebrates Guru Padmasambhava with sacred Cham masked dances, cymbals, and 10-foot trumpet fanfares.' },
        { name: 'Ladakh Festival', month: 'September (First week)', description: 'Showcase of traditional archery contests, polo matches, folk dances, and vibrant ceremonial costumes.' },
        { name: 'Losar (Ladakhi New Year)', month: 'December / January', description: 'Illuminated homes, dough sculptures, and traditional offerings heralding the new solar year.' }
      ],
      localMarkets: [
        { name: 'Leh Main Bazaar', famousFor: 'Pashmina shawls, prayer wheels, Tibetan turquoise jewellery, and dried apricots.', tip: 'Check for authentic Craftmark tag on Pashmina wool.' },
        { name: 'Moti Market', famousFor: 'Traditional Ladakhi semi-precious coral and silver ornaments and Tibetan thangkas.', tip: 'One of the oldest trading quarters on the Silk Route.' }
      ],
      culturalTradition: 'Tibetan Buddhism, eco-conscious living, compassion (Karuna), prayer flags transmitting mantras on the mountain wind.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Leh Acclimatization & Monasteries',
        summary: 'Gentle low-intensity day in Leh to acclimatize to high altitude safely.',
        schedule: [
          {
            day: 1,
            title: 'Leh Town & Shanti Stupa',
            morning: 'MANDATORY REST: Rest completely in your hotel room for 4-5 hours to prevent Acute Mountain Sickness (AMS); drink 3L water.',
            afternoon: '3:00 PM: Gentle walk to Leh Palace (17th-century former royal residence) overlooking the old mud-brick town.',
            evening: '5:30 PM: Visit white-domed Shanti Stupa for sunset over the Stok Kangri mountain range; stroll in Leh Main Bazaar.',
            recommendedMeals: 'Garlic soup at Tibetan Kitchen (helps oxygenation), Tingmo, hot herbal mint tea.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Leh Heritage & Magnetic Hill',
        summary: 'Explore Hall of Fame, Magnetic Hill, confluence of Indus-Zanskar, and Thiksey.',
        schedule: [
          { day: 1, title: 'Acclimatization & Shanti Stupa', morning: 'Rest and hydration.', afternoon: 'Leh Palace museum.', evening: 'Shanti Stupa sunset.', recommendedMeals: 'Tibetan Kitchen.' },
          {
            day: 2,
            title: 'Indus Valley & Confluence',
            morning: 'Drive towards Sham Valley; stop at Hall of Fame war museum; experience Magnetic Hill defying gravity.',
            afternoon: 'Witness Sangam: confluence of emerald Indus River and muddy Zanskar River; visit Gurdwara Pathar Sahib.',
            evening: 'Return to Leh; evening shopping for dried apricots and pashminas.',
            recommendedMeals: 'Langar lunch at Gurdwara, momos and thukpa for dinner.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'Leh & Nubra Valley Mountain Safari',
        summary: 'Cross Khardung La pass to explore Diskit Monastery and Hunder sand dunes.',
        schedule: [
          { day: 1, title: 'Acclimatization in Leh', morning: 'Rest.', afternoon: 'Shanti Stupa.', evening: 'Leh market.', recommendedMeals: 'Garlic soup.' },
          {
            day: 2,
            title: 'Khardung La to Nubra Valley',
            morning: 'Drive 5 hours across Khardung La Pass (17,982 ft); capture photos at the top; descend into scenic Nubra Valley.',
            afternoon: 'Visit 100-foot tall Maitreya Buddha statue at Diskit Monastery overlooking the valley.',
            evening: 'Bactrian double-humped camel ride across the Hunder white sand dunes; overnight in luxury tented camp.',
            recommendedMeals: 'Buffet dinner with Ladakhi mutton curry and freshly baked bread.'
          },
          {
            day: 3,
            title: 'Return to Leh via Shyok River',
            morning: 'Breakfast in Hunder; visit Sumur village and Samstanling Monastery.',
            afternoon: 'Scenic drive back to Leh via the rugged Shyok river gorge.',
            evening: 'Farewell rooftop dinner in Leh overlooking the illuminated palace.',
            recommendedMeals: 'Chopsticks Noodle Bar.'
          }
        ]
      },
      {
        daysCount: 5,
        title: 'The Iconic Ladakh Circuit: Nubra & Pangong',
        summary: 'The classic 5-day circuit covering Leh, Khardung La, Nubra Valley, and world-famous Pangong Lake.',
        schedule: [
          { day: 1, title: 'Leh Arrival & Acclimatization', morning: 'Mandatory rest.', afternoon: 'Leh Palace.', evening: 'Shanti Stupa sunset.', recommendedMeals: 'Warm soups.' },
          { day: 2, title: 'Sham Valley Exploration', morning: 'Hall of Fame & Magnetic Hill.', afternoon: 'Sangam Indus-Zanskar confluence.', evening: 'Spituk Monastery.', recommendedMeals: 'Thukpa.' },
          { day: 3, title: 'Khardung La Pass to Nubra Valley', morning: 'Cross Khardung La (17,982 ft).', afternoon: 'Diskit Monastery Buddha statue.', evening: 'Hunder sand dunes camel ride.', recommendedMeals: 'Camp dinner.' },
          { day: 4, title: 'Nubra to Pangong Tso via Shyok', morning: 'Scenic drive directly along the turquoise Shyok River route to Pangong Lake (14,270 ft).', afternoon: 'First view of Pangong Tso’s sapphire waters; check-in to lakeside cottage/camp.', evening: 'Sunset photography as the lake waters shift colors; night stargazing.', recommendedMeals: 'Hot Ladakhi stew.' },
          { day: 5, title: 'Pangong Sunrise to Leh via Chang La', morning: 'Sunrise over Pangong Lake; spot Himalayan marmots on the grasslands.', afternoon: 'Drive back across Chang La Pass (17,688 ft); stop at Thiksey Monastery.', evening: 'Farewell dinner in Leh.', recommendedMeals: 'Tibetan Kitchen feast.' }
        ]
      },
      {
        daysCount: 7,
        title: 'Grand Ladakh Expedition: Nubra, Turtuk & Pangong',
        summary: 'Explore Leh, Nubra, the Baltic border village of Turtuk, Pangong Lake, and Tso Moriri.',
        schedule: [
          { day: 1, title: 'Arrival & Complete Rest', morning: 'Rest & acclimatize.', afternoon: 'Short walk in Leh.', evening: 'Shanti Stupa.', recommendedMeals: 'Hydration & light broth.' },
          { day: 2, title: 'Monasteries of Indus Valley', morning: 'Shey Palace & Thiksey morning chanting.', afternoon: 'Hemis Monastery.', evening: 'Sindhu Ghat.', recommendedMeals: 'Local cafe.' },
          { day: 3, title: 'Leh to Nubra via Khardung La', morning: 'Khardung La Pass crossing.', afternoon: 'Diskit Monastery.', evening: 'Hunder camel dunes.', recommendedMeals: 'Nubra camp buffet.' },
          { day: 4, title: 'Excursion to Turtuk (Balti Culture)', morning: 'Drive 2.5 hours to Turtuk—the last Indian village before the Line of Control, annexed in 1971.', afternoon: 'Walk through organic apricot orchards, wooden heritage houses, and meet Balti villagers.', evening: 'Return to Hunder camp.', recommendedMeals: 'Balti apricot stew & walnut cake.' },
          { day: 5, title: 'Nubra to Pangong Lake', morning: 'Drive along Shyok River route.', afternoon: 'Arrival at Pangong Tso.', evening: 'Campfire and Milky Way astrophotography.', recommendedMeals: 'Warm lake camp food.' },
          { day: 6, title: 'Pangong to Leh via Chang La', morning: 'Sunrise lake photography.', afternoon: 'Cross Chang La Pass; visit Druk White Lotus School.', evening: 'Souvenir shopping in Leh.', recommendedMeals: 'Bon Appetit Leh.' },
          { day: 7, title: 'Fly Out with Himalayan Aerial Views', morning: 'Transfer to Leh Airport for morning flight over snow peaks.', afternoon: 'Departure.', evening: 'Trip memories.', recommendedMeals: 'Airport breakfast.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 900, food: 500, transport: 800, activities: 400 },
      midRange: { accommodation: 4000, food: 1600, transport: 2400, activities: 1000 },
      luxury: { accommodation: 15000, food: 4800, transport: 5500, activities: 3000 }
    }
  },

  // 5. GOA
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West',
    tagline: 'Sun-Kissed Beaches, Portuguese Architecture & Susegad Vibe',
    categories: ['beaches', 'heritage', 'adventure', 'nature'],
    isHiddenGem: false,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8418365?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'India’s pocket-sized paradise of swaying palm trees, 100+ km of Arabian Sea coastline, UNESCO Baroque churches, spice farms, and laidback Susegad lifestyle.',
    overview: 'Ruled by Portugal for 451 years until 1961, Goa presents a harmonious blend of Indian and Iberian culture. From the lively beach shacks and night flea markets of North Goa to the serene white crescent bays, luxury boutique villas, and Latin Quarters of South Goa, it is India’s favourite coastal playground.',
    bestTimeToVisit: {
      recommendedMonths: 'November to February',
      peakSeason: 'December & January (Christmas & New Year festivals, vibrant nightlife, sunny 28°C days)',
      offSeason: 'May to June (Humid heat), July to September (Monsoon rains transform Goa into emerald green paradise)',
      weatherOverview: 'Winter: 20°C to 30°C. Monsoon: Heavy rains, roaring Dudhsagar waterfalls.',
      avgTemp: '22°C - 31°C'
    },
    howToReach: {
      airport: 'Manohar International Airport (GOX), Mopa (North Goa) and Dabolim Airport (GOI) (Central/South Goa). Direct international & domestic flights.',
      railway: 'Madgaon Junction (MAO) and Thivim (THVM). Served by Vande Bharat express trains from Mumbai in ~7.5 hours.',
      bus: 'Kadamba State Transport & private sleeper buses from Mumbai, Pune, Bengaluru, and Hyderabad.',
      localTransport: 'Rented two-wheelers (scooters ₹350 - ₹500/day), self-drive cars, GoaMiles app-based cabs, and river passenger ferries (free for pedestrians).'
    },
    topAttractions: [
      { name: 'Basilica of Bom Jesus (UNESCO)', description: 'Baroque 16th-century church holding the mortal remains of St. Francis Xavier in a silver casket.', timing: '9:00 AM - 6:30 PM (Sundays 10:30 AM - 6:30 PM)', entryFee: 'Free', highlight: 'Silver reliquary casket' },
      { name: 'Palolem & Butterfly Beach', description: 'Idyllic crescent bay in South Goa with calm turquoise waters, colorful beach huts, and dolphin spotting cruises.', timing: 'Best from dawn to sunset', entryFee: 'Free (Boat to Butterfly Beach ₹1,000)', highlight: 'Calm swimming & dolphins' },
      { name: 'Fontainhas Latin Quarter', description: 'Asia’s only Latin Quarter in Panaji, featuring pastel-painted Portuguese villas, tiled nameplates, and wrought-iron balconies.', timing: 'Best walked in morning or late afternoon', entryFee: 'Free', highlight: 'Portuguese colonial architecture' },
      { name: 'Dudhsagar Waterfalls', description: 'Four-tiered sea of milk cascade falling 310 meters through dense Bhagwan Mahavir Wildlife Sanctuary.', timing: 'Jeep safaris run October to May', entryFee: 'Jeep safari ₹3,500/vehicle (seats 7) + entry fee', highlight: 'Jeep safari through forest' }
    ],
    thingsToDo: [
      { title: 'Scuba Diving at Grande Island', category: 'Adventure', duration: '5 hours', description: 'Dive among coral reefs, sea turtles, and shipwrecks in the Arabian Sea with PADI instructors.' },
      { title: 'Historic Walk of Fontainhas Latin Quarter', category: 'Culture', duration: '2 hours', description: 'Stroll past yellow and indigo colonial mansions and stop for Portuguese egg tarts (Pastéis de Nata).' },
      { title: 'Sahakari Spice Farm Guided Tour', category: 'Nature', duration: '3 hours', description: 'Walk through organic plantations of cardamom, betel nut, and peri-peri chillies followed by a traditional Goan buffet.' },
      { title: 'Sunset Kayaking in Sal Backwaters', category: 'Adventure', duration: '2 hours', description: 'Paddle silently through tranquil mangrove tunnels and spot kingfishers and river otters.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Goan Fish Curry Thali', type: 'Non-Veg', description: 'Fresh Kingfish (Surmai) cooked in a coconut, kokum, and Kashmiri red chilli gravy served with rice, fried fish, and kismoor.', whereToTry: 'Vinayak Family Restaurant, Assagao or Ritz Classic, Panaji' },
        { name: 'Chicken / Pork Vindaloo', type: 'Non-Veg', description: 'Portuguese-influenced fiery stew prepared with toddy vinegar, garlic, and whole roasted spices.', whereToTry: 'Mum’s Kitchen, Panaji or Martin’s Corner, Betalbatim' },
        { name: 'Bebinca', type: 'Sweet', description: 'Traditional Indo-Portuguese 7-to-16-layered pudding baked with coconut milk, egg yolks, sugar, and ghee.', whereToTry: 'Confeitaria 31 De Janeiro, Fontainhas' },
        { name: 'Cashew Feni', type: 'Beverage', description: 'GI-tagged indigenous Goan spirit distilled from crushed cashew apples, traditionally served with Limca and green chillies.', whereToTry: 'Joseph Bar, Panaji' }
      ],
      festivals: [
        { name: 'Goa Carnival', month: 'February (4 days before Lent)', description: 'Spectacular street floats, brass bands, King Momo processions, and masquerades in Panaji and Margao.' },
        { name: 'Shigmo Festival', month: 'March', description: 'The Goan spring harvest festival with vibrant mythological street parades, folk dances, and colors.' },
        { name: 'Sunburn & Goa Sunsets', month: 'December', description: 'World-renowned electronic dance music festival attracting global performers on the beaches.' }
      ],
      localMarkets: [
        { name: 'Anjuna Wednesday Flea Market', famousFor: 'Bohemian clothes, handmade jewellery, spices, hammocks, and live acoustic music.', tip: 'Arrive around 3:30 PM for golden-hour browsing and sunset drinks.' },
        { name: 'Mapusa Friday Market', famousFor: 'Authentic local market for dried fish, Goan chouriço (spicy pork sausages), cashew nuts, and homemade feni.', tip: 'Great place to buy authentic Goan spices at wholesale rates.' },
        { name: 'Saturday Night Market (Arpora)', famousFor: 'Designer boutiques, international gourmet food stalls, and world music stages.', tip: 'Runs December to March only.' }
      ],
      culturalTradition: 'Susegad (contentment and relaxed pace of life), evening community gatherings, love for live music, and seafood culinary artistry.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Goa Heritage & Coastal Flavours',
        summary: 'Explore Old Goa churches, Fontainhas Latin Quarter, and sunset dinner at a beach shack.',
        schedule: [
          {
            day: 1,
            title: 'Churches, Quarters & Sunset',
            morning: '9:00 AM: Visit UNESCO World Heritage Basilica of Bom Jesus and Se Cathedral in Old Goa.',
            afternoon: '1:00 PM: Goan Fish Curry Thali lunch at Ritz Classic; stroll through colorful Fontainhas Latin Quarter.',
            evening: '5:00 PM: Head to Miramar or Anjuna Beach; sunset drinks at a shack listening to live music; fresh grilled fish dinner.',
            recommendedMeals: 'Fish thali, Bebinca, grilled red snapper.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'North Goa Vibe vs South Goa Serenity',
        summary: 'Experience the electric buzz of North Goa beaches and the peaceful charms of South Goa.',
        schedule: [
          {
            day: 1,
            title: 'North Goa Forts & Beaches',
            morning: 'Explore Aguada Fort and lighthouse; panoramic Arabian Sea views.',
            afternoon: 'Water sports at Calangute/Baga or peaceful lunch in boutique cafes of Assagao.',
            evening: 'Sunset at Vagator Beach and Chapora Fort (Dil Chahta Hai point); dinner at Thalassa or Curlies.',
            recommendedMeals: 'Prawn Balchao, Poi bread with chorizo.'
          },
          {
            day: 2,
            title: 'South Goa Heritage & Turquoise Bays',
            morning: 'Drive south to Old Goa churches; coffee and pastry in Fontainhas.',
            afternoon: 'Lunch at Martin’s Corner; head down to crescent-shaped Palolem Beach.',
            evening: 'Kayak to Butterfly Beach or relax on Palolem sands; beachfront candlelit dinner.',
            recommendedMeals: 'Crab Xec Xec, Bebinca with vanilla ice cream.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'The Essential Goan Holiday',
        summary: 'Fortresses, spice plantations, Dudhsagar falls, and tranquil beaches.',
        schedule: [
          { day: 1, title: 'Portuguese Heritage & Panaji', morning: 'Old Goa churches.', afternoon: 'Fontainhas walking tour.', evening: 'Mandovi River sunset cruise.', recommendedMeals: 'Mum’s Kitchen.' },
          { day: 2, title: 'Spice Plantations & Dudhsagar Falls', morning: 'Jeep safari into Dudhsagar Falls; swim in natural pools.', afternoon: 'Sahakari Spice Farm tour and buffet lunch.', evening: 'Relaxation at Colva/Benaulim beach.', recommendedMeals: 'Spice farm buffet.' },
          { day: 3, title: 'Coastal Sunsets & Night Markets', morning: 'Morning beach yoga at Ashwem/Morjim.', afternoon: 'Boutique shopping in Assagao.', evening: 'Sunset at Chapora Fort; visit Anjuna Flea or Arpora night market.', recommendedMeals: 'Vinayak Fish Thali.' }
        ]
      },
      {
        daysCount: 5,
        title: 'Ultimate Goa Explorer: North, South & Hinterland',
        summary: 'Complete vacation balancing water adventure, colonial heritage, islands, and cuisine.',
        schedule: [
          { day: 1, title: 'Colonial Heart & Fontainhas', morning: 'Panaji & Latin Quarter.', afternoon: 'Museum of Goa (MOG).', evening: 'Sunset at Miramar.', recommendedMeals: 'Ritz Classic.' },
          { day: 2, title: 'North Coast Forts & Beaches', morning: 'Aguada & Chapora Forts.', afternoon: 'Vagator cafes.', evening: 'Anjuna nightlife.', recommendedMeals: 'Greek / Goan fusion.' },
          { day: 3, title: 'Scuba Diving & Grande Island', morning: 'Boat ride to Grande Island; scuba dive & dolphin watch.', afternoon: 'Barbecue lunch on island.', evening: 'Rest and massage.', recommendedMeals: 'Seafood grill.' },
          { day: 4, title: 'Hinterland Waterfalls & Spice', morning: 'Dudhsagar waterfalls safari.', afternoon: 'Ponda spice plantations.', evening: 'South Goa beach transfer.', recommendedMeals: 'Traditional Goan Hindu buffet.' },
          { day: 5, title: 'South Goa Paradise (Palolem & Agonda)', morning: 'Dolphin boat trip at Palolem.', afternoon: 'Sea kayaking & swimming in gentle waves.', evening: 'Farewell sunset dinner on the sand.', recommendedMeals: 'Martin’s Corner feast.' }
        ]
      },
      {
        daysCount: 7,
        title: 'A Week in Tropical Paradise',
        summary: 'Slow travel across Goa including Divar Island, spice trails, South beaches, and heritage homes.',
        schedule: [
          { day: 1, title: 'Welcome to North Goa', morning: 'Check-in & scooter rental.', afternoon: 'Anjuna / Vagator relaxation.', evening: 'Sunset cliffside drinks.', recommendedMeals: 'Beach cafe.' },
          { day: 2, title: 'Heritage & Latin Heritage', morning: 'Old Goa UNESCO monuments.', afternoon: 'Fontainhas photography tour.', evening: 'Panaji riverfront.', recommendedMeals: 'Fish thali.' },
          { day: 3, title: 'Hinterland & Divar Island', morning: 'Ferry across to peaceful Divar Island; cycle past old mansions.', afternoon: 'Lunch in a restored heritage home.', evening: 'Saligao Mae De Deus Church.', recommendedMeals: 'Pork Vindaloo.' },
          { day: 4, title: 'Adventures on the Sea', morning: 'Scuba diving & snorkeling at Grande Island.', afternoon: 'Jet-ski / parasailing at Baga.', evening: 'Night market exploration.', recommendedMeals: 'Fresh king prawns.' },
          { day: 5, title: 'Transfer to South Goa Tranquility', morning: 'Drive south via scenic coastal roads.', afternoon: 'Check-in at Palolem/Agonda beach resort.', evening: 'Silent Noise headphone party or tranquil beach walk.', recommendedMeals: 'Palolem shacks.' },
          { day: 6, title: 'Hidden Bays & Waterfalls', morning: 'Boat trip to Butterfly Beach & Honeymoon Island.', afternoon: 'Cabo de Rama fort cliff viewpoint.', evening: 'Sunset at Agonda beach.', recommendedMeals: 'Crab curry.' },
          { day: 7, title: 'Spices, Souvenirs & Farewell', morning: 'Organic spice shopping and cashew buying in Margao.', afternoon: 'Ayurvedic oil massage.', evening: 'Farewell banquet under the stars.', recommendedMeals: 'Bebinca & Feni cocktail.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 800, food: 600, transport: 350, activities: 400 },
      midRange: { accommodation: 3500, food: 1800, transport: 1000, activities: 1200 },
      luxury: { accommodation: 13000, food: 5500, transport: 3000, activities: 3200 }
    }
  },

  // 6. HIDDEN GEM: ZIRO VALLEY (ARUNACHAL PRADESH)
  {
    id: 'ziro_valley',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    region: 'Northeast',
    tagline: 'Lush Pine Hills, Paddy Fields & Ancient Apatani Tribal Culture',
    categories: ['nature', 'mountains', 'adventure'],
    isHiddenGem: true,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'UNESCO tentative heritage plateau nestled in the lower Subansiri district, famous for the indigenous Apatani tribe, organic paddy-cum-fish farming, and pine valleys.',
    overview: 'Ziro is an untouched ecological paradise located at 5,500 feet elevation in the misty Eastern Himalayas of Arunachal Pradesh. It is home to the Apatani tribe, known globally for their sustainable agricultural wisdom, distinctive facial tattoos (Yaping Hullo), bamboo architecture, and the annual outdoor Ziro Music Festival.',
    bestTimeToVisit: {
      recommendedMonths: 'March to October',
      peakSeason: 'September / October (Ziro Festival of Music, golden rice harvest seasons)',
      offSeason: 'December to February (Sub-zero winter chill, though beautiful clear skies)',
      weatherOverview: 'Spring & Autumn: 12°C to 24°C. Monsoon: Lush green paddies with intermittent mountain fog.',
      avgTemp: '12°C - 20°C'
    },
    howToReach: {
      airport: 'Hollongi Airport, Itanagar (Donyi Polo Airport), ~115 km (3.5 hours drive). Or Lilabari Airport, Assam (~120 km).',
      railway: 'Naharlagun Railway Station (100 km). Daily overnight Shatabdi/Donyi Polo express from Guwahati.',
      bus: 'Shared Tata Sumo utility vehicles and ASTC/APSTS government buses from Itanagar and Guwahati.',
      localTransport: 'Shared and private Tata Sumos, hired local cabs, and peaceful scenic village walking trails.'
    },
    topAttractions: [
      { name: 'Hong & Hari Apatani Villages', description: 'Asia’s largest tribal village settlements, showcasing indigenous bamboo homes on stilts and centuries-old customs.', timing: 'Best visited with local tribal guide', entryFee: 'Free (Polite to ask before photographing elders)', highlight: 'Apatani bamboo architecture' },
      { name: 'Kardo Shiva Lingam', description: 'A massive 25-foot naturally formed stone Shiva Lingam discovered inside the dense pine forests in 2004.', timing: '7:00 AM - 5:00 PM', entryFee: 'Free', highlight: 'Natural giant stone Lingam' },
      { name: 'Talley Valley Wildlife Sanctuary', description: 'Bio-diversity hotspot 30 km from Ziro, home to clouded leopards, pleioblastus simone bamboo, and rare orchids.', timing: 'Requires forest permit & guide', entryFee: 'Forest permit ₹200', highlight: 'Pristine trek through rhododendrons' },
      { name: 'Tarin Fish Farm & Paddy Fields', description: 'Ingenious eco-friendly agricultural system where rice crops and fish fingerlings are cultivated together in the same flooded terraces.', timing: 'Open all day', entryFee: '₹50', highlight: 'Paddy-cum-pisciculture system' }
    ],
    thingsToDo: [
      { title: 'Attend Ziro Festival of Music (ZFM)', category: 'Culture', duration: '4 days in Sept', description: 'India’s most scenic outdoor eco-friendly indie music festival, held entirely on bamboo stages amidst green paddies.' },
      { title: 'Trek to Kime Pakho Ridge', category: 'Adventure', duration: '3 hours', description: 'Hike to the ridge viewpoint offering panoramic vistas of the entire Ziro plateau on one side and snow peaks on the other.' },
      { title: 'Local Apong Rice Beer Tasting', category: 'Culture', duration: '2 hours', description: 'Sample traditional fermented organic rice and millet wine poured inside bamboo tumblers at an Apatani family hearth.' },
      { title: 'Bamboo Craft & Basket Weaving Workshop', category: 'Culture', duration: '2 hours', description: 'Learn how Apatani artisans turn local giant bamboo into intricate carrying baskets, fences, and household utensils.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Pika Pila', type: 'Veg', description: 'Traditional Apatani pickle made with bamboo shoots, pork fat, king chillies (Bhut Jolokia), and mustard oil.', whereToTry: 'Village homestays in Hong' },
        { name: 'Bamboo Shoot Chicken (Lukter)', type: 'Non-Veg', description: 'Tender chicken or pork slow-roasted inside hollow green bamboo stalks directly over an open wood fire.', whereToTry: 'Apatani kitchen homestays' },
        { name: 'Marua Apong', type: 'Beverage', description: 'Nutritious, naturally sweet fermented red rice/millet beverage served warm in polished bamboo glasses.', whereToTry: 'Homestay welcoming ceremonies' },
        { name: 'Boiled Mountain Greens with Tapyo Salt', type: 'Veg', description: 'Wild herbs seasoned with Tapyo—an indigenous organic herbal salt processed from ashes of specific forest plants.', whereToTry: 'Traditional dinners in Ziro' }
      ],
      festivals: [
        { name: 'Myoko Festival', month: 'March', description: 'Sacred friendship and fertility festival where clans renew bonds with prayers, sacred chants, and bamboo pole erections.' },
        { name: 'Dree Festival', month: 'July (July 5th)', description: 'Agricultural festival praying for a bumper harvest with traditional dances, cucumber distributions, and sports.' },
        { name: 'Ziro Festival of Music', month: 'September', description: 'Celebrated indie music and cultural camping fest in the paddy fields.' }
      ],
      localMarkets: [
        { name: 'Hapoli Local Market', famousFor: 'Smoked meat, bamboo shoot pickles, wild hill honey, and hand-woven tribal shawls.', tip: 'Shop in the morning when villagers bring fresh produce from the forest.' }
      ],
      culturalTradition: 'Animist Donyi-Polo (Sun and Moon) reverence, community bamboo construction, and sustainable zero-waste ecology.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Ziro Valley Day Excursion',
        summary: 'Explore Apatani villages, fish-cum-paddy fields, and sample local bamboo food.',
        schedule: [
          {
            day: 1,
            title: 'Tribal Villages & Organic Terraces',
            morning: '8:30 AM: Guided walk through Hong and Hari villages; interact with Apatani elders; learn about bamboo construction.',
            afternoon: '1:00 PM: Traditional lunch cooked inside hollow bamboo stalks at a local homestay; visit Tarin Fish Farm.',
            evening: '4:30 PM: Visit Kardo Shiva Lingam; sunset tea at a viewpoint overlooking the golden paddies.',
            recommendedMeals: 'Bamboo shoot chicken, organic red rice, herbal tea.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Apatani Culture & Mountain Treks',
        summary: 'Village immersion, nature trekking, and local craft workshops over 48 hours.',
        schedule: [
          { day: 1, title: 'Apatani Village Life', morning: 'Hong village walk.', afternoon: 'Paddy terrace systems.', evening: 'Apong tasting by fireside.', recommendedMeals: 'Homestay tribal meal.' },
          { day: 2, title: 'Talley Valley & Ridge Hikes', morning: 'Trek to Kime Pakho viewpoint.', afternoon: 'Visit craft workshops in Hapoli.', evening: 'Sunset over pine groves.', recommendedMeals: 'Pika Pila & smoked stew.' }
        ]
      },
      {
        daysCount: 3,
        title: 'The Untouched Ziro Experience',
        summary: 'Deep cultural connection with homestays, nature reserves, and sustainable farming.',
        schedule: [
          { day: 1, title: 'Arrival & Village Welcome', morning: 'Arrive from Naharlagun; check-in to eco-homestay.', afternoon: 'Orientation walk in Old Ziro.', evening: 'Fireside welcome with Donyi-Polo chants.', recommendedMeals: 'Traditional Apatani dinner.' },
          { day: 2, title: 'Talley Valley Rainforest Trek', morning: 'Day trek into Talley Valley Sanctuary.', afternoon: 'Pack forest picnic amidst rare bamboo.', evening: 'Return to village; relax with hot water baths.', recommendedMeals: 'Forest picnic, warm stew.' },
          { day: 3, title: 'Handicrafts, Temples & Valley Panorama', morning: 'Visit weavers and bamboo artisans.', afternoon: 'Kardo Shiva Lingam and Tarin fish farm.', evening: 'Farewell feast with tribal dance.', recommendedMeals: 'Bamboo-smoked pork/veg.' }
        ]
      },
      {
        daysCount: 5,
        title: 'Ziro Valley & Arunachal Foothills Circuit',
        summary: 'Combine Ziro plateau with Itanagar, Nishi tribal villages, and river camps.',
        schedule: [
          { day: 1, title: 'Itanagar to Ziro', morning: 'Drive through misty mountain passes.', afternoon: 'Arrival in Ziro.', evening: 'Evening tea in pine orchards.', recommendedMeals: 'Warm noodles.' },
          { day: 2, title: 'Apatani Cultural Deep Dive', morning: 'Hong & Bulla village walks.', afternoon: 'Meet tribal historians.', evening: 'Apong rice beer brewing session.', recommendedMeals: 'Apatani thali.' },
          { day: 3, title: 'Talley Valley Eco Trail', morning: 'Full-day wilderness trek.', afternoon: 'Orchid and bird spotting.', evening: 'Campfire at eco lodge.', recommendedMeals: 'Camp stew.' },
          { day: 4, title: 'Organic Farming & Crafts', morning: 'Work alongside farmers in paddy fields.', afternoon: 'Bamboo basket weaving lesson.', evening: 'Sunset at Seeh Lake.', recommendedMeals: 'Organic vegetables & fish.' },
          { day: 5, title: 'Descent to Itanagar & Departure', morning: 'Visit Ita Fort in Itanagar.', afternoon: 'State Museum.', evening: 'Departure from Naharlagun.', recommendedMeals: 'North-Eastern feast.' }
        ]
      },
      {
        daysCount: 7,
        title: 'Arunachal Explorer: Ziro, Majuli & Kaziranga',
        summary: 'Trans-Brahmaputra expedition linking Ziro tribal hills, Majuli river island, and Kaziranga rhinos.',
        schedule: [
          { day: 1, title: 'Guwahati to Ziro Drive', morning: 'Scenic scenic drive into the mountains.', afternoon: 'Cross Assam-Arunachal border.', evening: 'Check-in at Ziro.', recommendedMeals: 'Dhaba lunch.' },
          { day: 2, title: 'Ziro Apatani Wonders', morning: 'Village architecture and elder interactions.', afternoon: 'Tarin fish terraces.', evening: 'Fireside music.', recommendedMeals: 'Tribal dinner.' },
          { day: 3, title: 'Talley Valley Wilderness', morning: 'Trek into primary rainforests.', afternoon: 'Flora photography.', evening: 'Rest.', recommendedMeals: 'Camp dinner.' },
          { day: 4, title: 'Descend to Majuli River Island', morning: 'Drive down to Brahmaputra riverbank; board ferry to Majuli Island.', afternoon: 'Check-in to bamboo cottage.', evening: 'Sunset over river waters.', recommendedMeals: 'Assamese fish curry.' },
          { day: 5, title: 'Majuli Monasteries & Mask Making', morning: 'Visit Samaguri Satra to see traditional handmade drama masks.', afternoon: 'Uttar Kamalabari Satra monk chanting.', evening: 'Ferry back to mainland.', recommendedMeals: 'Assamese thali.' },
          { day: 6, title: 'Kaziranga National Park Rhino Safari', morning: 'Dawn elephant safari spotting greater one-horned rhinos.', afternoon: 'Jeep safari into Central Kohora range.', evening: 'Bihu cultural dance show.', recommendedMeals: 'Joha rice & duck curry.' },
          { day: 7, title: 'Return to Guwahati', morning: 'Tea garden visit.', afternoon: 'Drive back to Guwahati.', evening: 'Departure.', recommendedMeals: 'Assam tea & pithas.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 700, food: 400, transport: 500, activities: 250 },
      midRange: { accommodation: 2600, food: 1100, transport: 1400, activities: 700 },
      luxury: { accommodation: 7500, food: 2800, transport: 3200, activities: 1800 }
    }
  },

  // 7. HIDDEN GEM: GANDIKOTA (ANDHRA PRADESH)
  {
    id: 'gandikota',
    name: 'Gandikota',
    state: 'Andhra Pradesh',
    region: 'South',
    tagline: 'The Grand Canyon of India & The Subterranean Belum Caves',
    categories: ['nature', 'heritage', 'adventure'],
    isHiddenGem: true,
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010f443b74e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Spectacular red granite gorge carved by the Pennar River, featuring a dramatic 13th-century fort, Madhavaraya temple, and nearby 3-km underground limestone caves.',
    overview: 'Gandikota earns its title as the Grand Canyon of India from the striking 300-foot deep canyon formed by the Pennar River cutting through the Erramala hills. Crowned by a massive red sandstone fort built in 1123 AD by Kapa Raja, the site offers breathtaking sunset views, rock climbing, and tranquil cliff camping under the stars.',
    bestTimeToVisit: {
      recommendedMonths: 'October to February',
      peakSeason: 'November to January (Pleasant weather, ideal for cliff camping and stargazing)',
      offSeason: 'March to June (Extreme summer temperatures exceeding 43°C)',
      weatherOverview: 'Winter: 18°C to 30°C. Summer: Dry and hot. Monsoon: Fast-flowing Pennar River.',
      avgTemp: '20°C - 28°C'
    },
    howToReach: {
      airport: 'Bengaluru Kempegowda Airport (BLR) ~280 km (5.5 hrs drive) or Tirupati Airport ~220 km.',
      railway: 'Jammalamadugu Railway Station (18 km) or Kadapa Junction (77 km). Frequent trains from Chennai and Bengaluru.',
      bus: 'APSRTC buses run from Kadapa, Jammalamadugu, and Proddatur to Gandikota fort gate.',
      localTransport: 'Local autos from Jammalamadugu, rented cars from Bengaluru/Hyderabad, and walking trails inside fort.'
    },
    topAttractions: [
      { name: 'Pennar River Canyon Viewpoint', description: 'Jaw-dropping cliff edge overlooking the 300-foot sheer red gorge and deep turquoise waters.', timing: 'Best at sunrise and sunset', entryFee: 'Free', highlight: 'Sunrise canyon panorama' },
      { name: 'Gandikota Fort & Madhavaraya Temple', description: 'Massive stone fort spanning 5 miles with intricate 16th-century Vijayanagara gopurams and granary (Dhanyagara).', timing: '6:00 AM - 6:00 PM', entryFee: 'Free', highlight: 'Towering stone Gopuram' },
      { name: 'Jamia Masjid', description: 'Elegant Islamic architecture with twin minarets positioned directly beside Hindu temples inside the fort walls.', timing: '6:00 AM - 6:00 PM', entryFee: 'Free', highlight: 'Harmonious historic minarets' },
      { name: 'Belum Caves (60 km away)', description: 'Second-largest cave system in India, extending over 3.2 km underground with stalactites, stalagmites, and deep shafts.', timing: '10:00 AM - 5:00 PM', entryFee: '₹65 (Indians), ₹300 (Foreigners)', highlight: 'Subterranean musical limestone' }
    ],
    thingsToDo: [
      { title: 'Cliff Camping under the Stars', category: 'Adventure', duration: 'Overnight', description: 'Pitch a canvas tent right along the canyon edge with bonfire and stargazing over the Pennar gorge.' },
      { title: 'Kayaking on the Pennar River', category: 'Adventure', duration: '1 hour', description: 'Paddle directly through the deep gorge waters looking up at towering 300-foot sheer granite cliffs.' },
      { title: 'Rock Climbing & Rappelling', category: 'Adventure', duration: '2 hours', description: 'Tackle natural red sandstone rock faces with certified local adventure guides.' },
      { title: 'Explore Belum Subterranean Chambers', category: 'Sightseeing', duration: '2.5 hours', description: 'Walk through illuminated chambers, the Meditation Hall used by Buddhist monks in 4500 BC, and Pataalaganga underground stream.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Rayalaseema Ragi Mudda & Natu Kodi', type: 'Non-Veg', description: 'Nutritious finger-millet dough balls paired with fiery Rayalaseema country chicken curry.', whereToTry: 'Haritha Resort or local dhabas near fort' },
        { name: 'Gongura Mutton / Pachadi', type: 'Non-Veg', description: 'Tangy sorrel leaf paste cooked with tender meat and Guntur red chillies.', whereToTry: 'Kadapa local eateries' },
        { name: 'Pootharekulu (Paper Sweet)', type: 'Sweet', description: 'Paper-thin rice starch sheets rolled with ghee and powdered jaggery/dry fruits.', whereToTry: 'Local Andhra sweet shops' }
      ],
      festivals: [
        { name: 'Gandikota Utsav', month: 'January', description: 'Three-day cultural festival organized by AP Tourism featuring light shows on canyon cliffs, rock concerts, and traditional Kuchipudi dance.' },
        { name: 'Maha Shivratri', month: 'March', description: 'Devotees gather at ancient rock temples inside the fort and near Pennar river.' }
      ],
      localMarkets: [
        { name: 'Jammalamadugu Bazaar', famousFor: 'Handloom cotton dhotis, Kadapa black stone artifacts, and Rayalaseema spices.', tip: 'Small rural market, cash is preferred.' }
      ],
      culturalTradition: 'Vijayanagara and Qutb Shahi military history, rock architecture, and spicy Rayalaseema culinary pride.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Canyon Sunrise to Belum Caves',
        summary: 'Explore the Grand Canyon of India, ancient fort, and subterranean caves in a concentrated day.',
        schedule: [
          {
            day: 1,
            title: 'Gorge & Underground Caverns',
            morning: '6:00 AM: Witness stunning sunrise over the Pennar River Canyon; explore Gandikota Fort, Madhavaraya Temple, and Jamia Masjid.',
            afternoon: '12:30 PM: Spicy Rayalaseema lunch; 1:30 PM: Drive 1 hour to Belum Caves; explore 3 km underground chambers.',
            evening: '5:00 PM: Sunset at Belum Caves Buddha statue; drive onward to Bengaluru or Kadapa.',
            recommendedMeals: 'Ragi Mudda, Natu Kodi Pulusu, and sweet Pootharekulu.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Canyon Adventure & Night Camping',
        summary: 'Two days of kayaking, cliff-edge camping, night skies, and historical exploration.',
        schedule: [
          {
            day: 1,
            title: 'Canyon Rim & Stargazing',
            morning: 'Arrive at Gandikota; check-in to canyon-view camp; visit granary and royal tank.',
            afternoon: 'Kayaking in the Pennar gorge between towering cliffs.',
            evening: 'Campfire by the canyon; watch constellations under crystal clear rural skies.',
            recommendedMeals: 'Bonfire barbecue and spicy Andhra curry.'
          },
          {
            day: 2,
            title: 'Subterranean Wonder',
            morning: 'Sunrise canyon walk; rock climbing and rappelling session.',
            afternoon: 'Drive to Belum Caves; explore Pataalaganga underground stream.',
            evening: 'Departure.',
            recommendedMeals: 'Traditional Andhra thali.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'Gandikota, Belum Caves & Lepakshi Heritage',
        summary: 'A 3-day golden triangle of Rayalaseema geological wonders and Vijayanagara art.',
        schedule: [
          { day: 1, title: 'Gandikota Canyon & Fort', morning: 'Canyon viewpoint arrival.', afternoon: 'Fort exploration.', evening: 'Cliff camping.', recommendedMeals: 'Rayalaseema feast.' },
          { day: 2, title: 'Belum Caves & Yaganti Temple', morning: 'Belum Caves exploration.', afternoon: 'Drive to Yaganti Temple known for the growing Nandi stone idol and Pushkarini.', evening: 'Stay at Kurnool or Kadapa.', recommendedMeals: 'Andhra meals.' },
          { day: 3, title: 'Lepakshi Hanging Pillar & Monolithic Nandi', morning: 'Drive to historic Lepakshi temple; marvel at the hanging pillar and giant 20-foot monolithic Nandi.', afternoon: 'Observe 500-year-old Vijayanagara ceiling frescoes.', evening: 'Return to Bengaluru.', recommendedMeals: 'Mysore Pak & filter coffee.' }
        ]
      },
      {
        daysCount: 5,
        title: 'Deccan Odyssey: Hampi to Gandikota',
        summary: 'Combine the UNESCO ruins of Hampi with the canyons of Gandikota and caves of Belum.',
        schedule: [
          { day: 1, title: 'Hampi Arrival & Sacred Centre', morning: 'Virupaksha Temple.', afternoon: 'Hemakuta Hill.', evening: 'Sunset at Tungabhadra river.', recommendedMeals: 'Mango Tree Hampi.' },
          { day: 2, title: 'Hampi Royal Enclosure & Vittala Temple', morning: 'Stone Chariot at Vittala Temple.', afternoon: 'Queen’s Bath & Elephant Stables.', evening: 'Coracle boat ride.', recommendedMeals: 'South Indian thali.' },
          { day: 3, title: 'Scenic Drive to Gandikota', morning: 'Drive 4 hours past granite boulder landscapes.', afternoon: 'Check-in to canyon camp.', evening: 'Sunset over Pennar river.', recommendedMeals: 'Camp dinner.' },
          { day: 4, title: 'Canyon Kayaking & Belum Caves', morning: 'Gorge kayaking.', afternoon: 'Belum Caves deep exploration.', evening: 'Stargazing at canyon.', recommendedMeals: 'Ragi Mudda.' },
          { day: 5, title: 'Lepakshi Temple & Bengaluru', morning: 'Lepakshi hanging pillar.', afternoon: 'Monolithic Nandi.', evening: 'Arrival in Bengaluru.', recommendedMeals: 'Bangalore filter coffee.' }
        ]
      },
      {
        daysCount: 7,
        title: 'The Great Southern Heritage & Geology Expedition',
        summary: 'Bengaluru, Lepakshi, Gandikota, Belum, Yaganti, and Hampi over 7 days.',
        schedule: [
          { day: 1, title: 'Bengaluru to Lepakshi', morning: 'Drive north.', afternoon: 'Lepakshi temple frescoes.', evening: 'Overnight near Kadapa.', recommendedMeals: 'Dosa.' },
          { day: 2, title: 'Gandikota Canyon Rim', morning: 'Fort walk.', afternoon: 'Canyon views.', evening: 'Campfire under stars.', recommendedMeals: 'Andhra meals.' },
          { day: 3, title: 'Kayaking & Belum Caves', morning: 'River kayaking.', afternoon: 'Belum stalactite caves.', evening: 'Kurnool stay.', recommendedMeals: 'Natu Kodi.' },
          { day: 4, title: 'Yaganti & Alampur Temples', morning: 'Yaganti growing Nandi.', afternoon: 'Navabrahma temples at Alampur.', evening: 'Drive to Hampi.', recommendedMeals: 'Thali.' },
          { day: 5, title: 'Hampi Sacred Monuments', morning: 'Virupaksha & Stone Chariot.', afternoon: 'Anegundi monkey kingdom.', evening: 'Sunset at Matanga Hill.', recommendedMeals: 'Mango Tree.' },
          { day: 6, title: 'Hampi Boulders & Coracles', morning: 'Bouldering and river coracle ride.', afternoon: 'Zenana Enclosure.', evening: 'Music on Tungabhadra ghats.', recommendedMeals: 'Continental / Indian.' },
          { day: 7, title: 'Return Journey', morning: 'Souvenir shopping.', afternoon: 'Drive back to Bengaluru.', evening: 'Departure.', recommendedMeals: 'Filter coffee.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 600, food: 350, transport: 400, activities: 300 },
      midRange: { accommodation: 2400, food: 1000, transport: 1200, activities: 800 },
      luxury: { accommodation: 6000, food: 2500, transport: 2800, activities: 1800 }
    }
  },

  // 8. UDAIPUR (RAJASTHAN)
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North',
    tagline: 'The Venice of the East & City of Shimmering Lakes',
    categories: ['heritage', 'city', 'nature', 'spiritual'],
    isHiddenGem: false,
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Romantic lakeside oasis cradled by the Aravalli Hills, famed for ivory-white marble island palaces, mirror mosaics, and serene boat cruises.',
    overview: 'Founded in 1559 by Maharana Udai Singh II as the capital of the Mewar kingdom, Udaipur is famed for its interconnected lakes—Lake Pichola, Fateh Sagar, and Swaroop Sagar. The white marble Lake Palace (Taj Lake Palace) appearing to float on water and the colossal City Palace make it India’s most romantic city.',
    bestTimeToVisit: {
      recommendedMonths: 'October to March',
      peakSeason: 'November to February (Cool sunny days, sparkling lake waters)',
      offSeason: 'April to June (Dry summer heat)',
      weatherOverview: 'Winter: 11°C to 26°C. Monsoon: Full shimmering lakes and lush green Aravalli hills.',
      avgTemp: '16°C - 27°C'
    },
    howToReach: {
      airport: 'Maharana Pratap Airport (UDR), Dabok (22 km from center). Flights to Delhi, Mumbai, Bengaluru, Hyderabad.',
      railway: 'Udaipur City Railway Station (UDZ). Mewar Express and Chetak Express connect overnight to Delhi.',
      bus: 'Direct AC sleeper buses to Ahmedabad (4.5 hrs), Jaipur (7 hrs), and Jodhpur (5 hrs).',
      localTransport: 'Lake Pichola boats, auto-rickshaws, scooter rentals, and walking through old pedestrian ghats.'
    },
    topAttractions: [
      { name: 'City Palace Complex', description: 'Rajasthan’s largest palace complex, perched above Lake Pichola with mirror mosaics at Sheesh Mahal and Mor Chowk peacocks.', timing: '9:30 AM - 5:30 PM', entryFee: '₹300 (Indians), ₹400 (Foreigners)', highlight: 'Mor Chowk glass peacock courtyard' },
      { name: 'Lake Pichola & Jag Mandir Island', description: 'Historic 4 km lake featuring island palaces; boat tours take travelers around Taj Lake Palace to garden courtyards.', timing: 'Boat rides 9:00 AM - 6:00 PM', entryFee: 'Boat ride ₹450 - ₹700 (Day / Sunset)', highlight: 'Sunset cruise to Jag Mandir' },
      { name: 'Jagdish Temple', description: 'Magnificent 1651 AD Indo-Aryan temple dedicated to Lord Vishnu, adorned with carved friezes of musicians, elephants, and horsemen.', timing: '5:00 AM - 10:00 PM', entryFee: 'Free', highlight: 'Intricate marble carvings' },
      { name: 'Sajjangarh Monsoon Palace', description: 'Hilltop white fortress at 3,100 feet elevation built to track monsoon clouds, offering 360-degree sunset panoramas.', timing: '9:00 AM - 6:00 PM', entryFee: '₹100 + ₹250 vehicle entry', highlight: 'Panoramic sunset view' }
    ],
    thingsToDo: [
      { title: 'Sunset Boat Cruise on Lake Pichola', category: 'Sightseeing', duration: '1 hour', description: 'Cruise past the bathing ghats and royal palaces as the setting sun turns the white marble into burnished gold.' },
      { title: 'Dharohar Folk Dance at Bagore Ki Haveli', category: 'Culture', duration: '1 hour (7:00 PM)', description: 'Watch thrilling Rajasthani Rajasthani Chari, Ghoomar, and an 80-year-old dancer balancing 11 brass pots on her head.' },
      { title: 'Miniature Mewar Painting Class', category: 'Culture', duration: '2 hours', description: 'Learn the delicate brush techniques of single-hair squirrel brushes with natural stone pigments from master artists.' },
      { title: 'Ropeway Ride to Karni Mata Temple', category: 'Adventure', duration: '1 hour', description: 'Glide over the city in a cable car for panoramic views of Fateh Sagar Lake and City Palace.' }
    ],
    foodAndCulture: {
      famousDishes: [
        { name: 'Dal Baati Churma with Gatte', type: 'Veg', description: 'Authentic Mewari thali featuring crispy baatis crushed in pure cow ghee with garlic chutney and gram flour dumplings.', whereToTry: 'Krishna Dal Bati Restro or Traditional Heritage Haveli' },
        { name: 'Safed Maas', type: 'Non-Veg', description: 'Royal Mewari lamb curry cooked in a silky white gravy of cashew nuts, poppy seeds, fresh cream, and cardamoms.', whereToTry: 'Ambrai Restaurant on Lake Pichola' },
        { name: 'Kachori with Sweet Kadhi', type: 'Veg', description: 'Crispy lentil kachori drenched in sweet spiced buttermilk kadhi.', whereToTry: 'Jain Nashta Centre, Shastri Circle' }
      ],
      festivals: [
        { name: 'Mewar Festival', month: 'March / April', description: 'Marks the arrival of spring with colorful processions, boats on Lake Pichola, and fireworks.' },
        { name: 'Shilpgram Crafts Mela', month: 'December (Last 10 days)', description: 'Huge open-air rural arts fair with 400+ artisans showcasing traditional crafts, folk theatre, and camel rides.' }
      ],
      localMarkets: [
        { name: 'Hathi Pol Bazaar', famousFor: 'Authentic Pichwai and Phad miniature paintings, camel bone crafts, and Mojari footwear.', tip: 'Shop directly from the artisan workshops behind the main road.' },
        { name: 'Bada Bazaar', famousFor: 'Traditional Rajasthani tie-dye (Bandhani), block prints, and antique silver jewellery.', tip: 'Great place to buy natural spice teas.' }
      ],
      culturalTradition: 'Mewar chivalry (Maharana Pratap), miniature art, classical music, and lakeside leisure.'
    },
    itineraries: [
      {
        daysCount: 1,
        title: 'Udaipur Lakeside Highlights',
        summary: 'City Palace, Lake Pichola cruise, and Bagore Ki Haveli evening folk dance.',
        schedule: [
          {
            day: 1,
            title: 'The Royal Lakeshore',
            morning: '9:00 AM: Explore the City Palace Museum, Mor Chowk, and crystal gallery.',
            afternoon: '1:00 PM: Lunch at Ambrai overlooking the water; visit Jagdish Temple and browse Hathi Pol miniature art.',
            evening: '4:30 PM: Sunset boat cruise to Jag Mandir; 7:00 PM: Watch Dharohar folk dance at Bagore Ki Haveli.',
            recommendedMeals: 'Mewari Thali at Krishna, Safed Maas at Ambrai.'
          }
        ]
      },
      {
        daysCount: 2,
        title: 'Palaces, Monsoons & Artisan Arts',
        summary: 'Two complete days covering Monsoon Palace, Fateh Sagar, Saheliyon Ki Bari, and craft villages.',
        schedule: [
          { day: 1, title: 'City Palace & Lake Pichola', morning: 'City Palace.', afternoon: 'Jagdish Temple.', evening: 'Sunset cruise & Bagore Ki Haveli.', recommendedMeals: 'Ambrai.' },
          {
            day: 2,
            title: 'Fateh Sagar & Monsoon Palace',
            morning: 'Walk through Saheliyon Ki Bari (Garden of the Maids of Honour) with its marble fountains.',
            afternoon: 'Drive around Fateh Sagar Lake; visit Shilpgram rural craft village; miniature painting workshop.',
            evening: 'Drive up to Sajjangarh Monsoon Palace for a 360-degree sunset over the Aravallis.',
            recommendedMeals: 'Fateh Sagar street food, Dal Baati Churma.'
          }
        ]
      },
      {
        daysCount: 3,
        title: 'The Complete Mewar Experience',
        summary: 'Udaipur lakes plus an excursion to the magnificent marble Jain temples of Ranakpur.',
        schedule: [
          { day: 1, title: 'Old City & Lake Pichola', morning: 'City Palace & Jagdish temple.', afternoon: 'Hathi Pol shopping.', evening: 'Lake cruise & Dharohar dance.', recommendedMeals: 'Lakeside dining.' },
          { day: 2, title: 'Fateh Sagar & Monsoon Palace', morning: 'Saheliyon Ki Bari.', afternoon: 'Shilpgram village.', evening: 'Monsoon Palace sunset.', recommendedMeals: 'Dal Baati.' },
          {
            day: 3,
            title: 'Excursion to Ranakpur Jain Temples',
            morning: 'Drive 2 hours into the Aravalli hills to Ranakpur Jain Temple, famous for 1,444 uniquely carved marble pillars.',
            afternoon: 'Explore Kumbhalgarh Fort—featuring the world’s second-longest continuous wall (36 km).',
            evening: 'Return to Udaipur for a farewell lakeside dinner.',
            recommendedMeals: 'Pure vegetarian satvik thali at Ranakpur Bhojanshala.'
          }
        ]
      },
      {
        daysCount: 5,
        title: 'Mewar & Marwar Royal Circuit',
        summary: 'Udaipur, Kumbhalgarh fort, Ranakpur temples, and blue city of Jodhpur.',
        schedule: [
          { day: 1, title: 'Udaipur Lake Arrival', morning: 'City Palace.', afternoon: 'Old city bazaars.', evening: 'Lake Pichola cruise.', recommendedMeals: 'Mewari food.' },
          { day: 2, title: 'Gardens & Monsoon Palace', morning: 'Saheliyon Ki Bari.', afternoon: 'Shilpgram art.', evening: 'Sajjangarh sunset.', recommendedMeals: 'Safed Maas.' },
          { day: 3, title: 'Kumbhalgarh & Ranakpur', morning: 'Drive to Kumbhalgarh Great Wall.', afternoon: 'Ranakpur marble temple.', evening: 'Stay in Ranakpur valley.', recommendedMeals: 'Rajasthani thali.' },
          { day: 4, title: 'Onward to Jodhpur (The Blue City)', morning: 'Drive to Jodhpur; check-in near Clock Tower.', afternoon: 'Mehrangarh Fort exploration.', evening: 'Walk through blue Brahmin houses.', recommendedMeals: 'Makhaniya Lassi & Mirchi Bada.' },
          { day: 5, title: 'Jodhpur Palaces & Departure', morning: 'Jaswant Thada & Umaid Bhawan Palace.', afternoon: 'Sardar Market spice shopping.', evening: 'Departure.', recommendedMeals: 'Shahi Samosa.' }
        ]
      },
      {
        daysCount: 7,
        title: 'The Grand Rajasthan Romantic Odyssey',
        summary: 'Udaipur, Mount Abu hill station, Ranakpur, Kumbhalgarh, and Chittorgarh fortress.',
        schedule: [
          { day: 1, title: 'Udaipur Arrival & Lake Pichola', morning: 'Lake arrival.', afternoon: 'City Palace.', evening: 'Lake cruise.', recommendedMeals: 'Ambrai.' },
          { day: 2, title: 'Art & Heritage of Udaipur', morning: 'Jagdish temple & Hathi Pol.', afternoon: 'Miniature painting class.', evening: 'Bagore Ki Haveli.', recommendedMeals: 'Dal Baati.' },
          { day: 3, title: 'Chittorgarh Fortress Day Trip', morning: 'Drive to Chittorgarh (India’s largest fort).', afternoon: 'Visit Vijay Stambh (Tower of Victory) and Padmini Palace.', evening: 'Return to Udaipur.', recommendedMeals: 'Dhaba lunch.' },
          { day: 4, title: 'Ranakpur & Kumbhalgarh', morning: 'Ranakpur marble carvings.', afternoon: 'Kumbhalgarh fortress wall.', evening: 'Aravalli resort stay.', recommendedMeals: 'Satvik dinner.' },
          { day: 5, title: 'Mount Abu Hill Station Excursion', morning: 'Drive to Mount Abu—Rajasthan’s only hill station.', afternoon: 'Dilwara Jain Temples with peerless marble filigree.', evening: 'Boating on Nakki Lake at sunset.', recommendedMeals: 'Mount Abu rabri.' },
          { day: 6, title: 'Mount Abu to Udaipur', morning: 'Guru Shikhar peak (highest in Aravallis).', afternoon: 'Drive back to Udaipur.', evening: 'Relaxing Ayurvedic massage.', recommendedMeals: 'Fine dining.' },
          { day: 7, title: 'Farewell Udaipur', morning: 'Saheliyon Ki Bari morning stroll.', afternoon: 'Final souvenir and silver shopping.', evening: 'Farewell feast at Taj Lake Palace.', recommendedMeals: 'Royal Thali.' }
        ]
      }
    ],
    budget: {
      backpacker: { accommodation: 800, food: 500, transport: 300, activities: 400 },
      midRange: { accommodation: 3500, food: 1600, transport: 900, activities: 1100 },
      luxury: { accommodation: 16000, food: 5000, transport: 3000, activities: 3500 }
    }
  }
];

export const REGIONAL_FOOD_SPECIALTIES = [
  {
    region: 'North India',
    cuisines: 'Punjabi, Kashmiri, Mughlai, Awadhi & Rajasthani',
    highlights: 'Tandoori breads, rich gravies simmered with butter and whole spices, slow-cooked biryanis, and milk desserts.',
    topDishes: ['Butter Chicken', 'Dal Baati Churma', 'Rogan Josh', 'Awadhi Dum Biryani', 'Chole Bhature', 'Rabri Jalebi'],
    cultureTradition: 'Warm, lavish hospitality ("Atithi Devo Bhava"), joint family festive banquets, and lively Dhabas along grand trunk roads.'
  },
  {
    region: 'South India',
    cuisines: 'Chettinad, Malabar, Udupi, Hyderabadi & Andhra',
    highlights: 'Fermented rice and lentil batters (dosas, idlis), fresh coconut milk bases, mustard seed tempering, and curry leaves.',
    topDishes: ['Masala Dosa with Sambar', 'Hyderabadi Biryani', 'Karimeen Pollichathu', 'Chettinad Pepper Chicken', 'Filter Kaapi', 'Payasam'],
    cultureTradition: 'Reverence for banana leaf dining, traditional brass utensils, and morning coffee ceremonies.'
  },
  {
    region: 'West India',
    cuisines: 'Gujarati, Maharashtrian, Goan & Parsi',
    highlights: 'Sweet-sour-spicy Gujarati thalis, coastal kokum & coconut curries, street food chaats, and cashew spirits.',
    topDishes: ['Dhokla & Thepla', 'Misal Pav', 'Goan Fish Curry', 'Parsi Dhansak', 'Vada Pav', 'Puran Poli'],
    cultureTradition: 'Vibrant street food culture, coastal fishing village communities, and Navratri Garba celebrations.'
  },
  {
    region: 'East India',
    cuisines: 'Bengali, Odia, Bihari & Assamese',
    highlights: 'Mustard oil cooking, five-spice panch phoron, freshwater fish (Hilsa, Rohu), and world-famous cottage cheese sweets.',
    topDishes: ['Macher Jhol', 'Rasgulla & Sandesh', 'Litti Chokha', 'Chhena Poda', 'Kolkata Kathi Roll', 'Mishti Doi'],
    cultureTradition: 'Intellectual Adda conversations over chai, Durga Puja celebrations, and artistic culinary literature.'
  },
  {
    region: 'Northeast India',
    cuisines: 'Naga, Apatani, Khasi, Manipuri & Mizo',
    highlights: 'Fermented bamboo shoots, ghost pepper (Bhut Jolokia), smoked meats over wood hearths, and organic forest herbs.',
    topDishes: ['Smoked Pork with Bamboo Shoot', 'Momos & Thukpa', 'Jadoh Rice', 'Eromba', 'Pika Pila', 'Apong Rice Beer'],
    cultureTradition: 'Deep ecological balance with nature, matriarchal communities in Meghalaya, and harvest music festivals.'
  }
];

export const UPCOMING_FESTIVALS = [
  {
    name: 'Diwali (Festival of Lights)',
    month: 'October / November',
    location: 'Pan-India (Varanasi, Jaipur, Delhi, Ayodhya)',
    description: 'Celebrates the victory of light over darkness with clay oil lamps, fireworks, and sharing of sweets.',
    icon: 'Sparkles'
  },
  {
    name: 'Holi (Festival of Colours)',
    month: 'March',
    location: 'Mathura, Vrindavan, Jaipur, Pushkar',
    description: 'Joyous spring festival of throwing colored powders (gulal), music, dancing, and traditional Thandai drinks.',
    icon: 'Palette'
  },
  {
    name: 'Durga Puja',
    month: 'October',
    location: 'Kolkata, West Bengal',
    description: 'UNESCO intangible cultural heritage festival with elaborate artistic pandals, dhak drums, and Sindoor Khela.',
    icon: 'Flame'
  },
  {
    name: 'Pushkar Camel Fair',
    month: 'November (Kartik Purnima)',
    location: 'Pushkar, Rajasthan',
    description: 'Over 50,000 decorated camels, horses, turban-tying contests, and hot air balloons over desert dunes.',
    icon: 'Sun'
  },
  {
    name: 'Hornbill Festival',
    month: 'December 1 - 10',
    location: 'Kisama Heritage Village, Kohima, Nagaland',
    description: 'The Festival of Festivals uniting 17 Naga tribes in traditional warrior regalia, folk songs, and archery.',
    icon: 'Music'
  },
  {
    name: 'Onam Harvest Festival',
    month: 'August / September',
    location: 'Kerala',
    description: 'Celebrates King Mahabali with flower carpets (Pookkalam), 26-dish grand feasts, and snake boat races.',
    icon: 'Flower2'
  }
];
