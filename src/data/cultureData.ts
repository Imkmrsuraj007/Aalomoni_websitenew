import { CulturalTopic } from '../types';
import kudmaliMarriageImage from '../assets/kudmali_marriage.jpeg';
import chhauImage from '../assets/chhau.jpeg';
import jhumarImage from '../assets/jhumar.jpeg';
import kudmaliCuisineImage from '../assets/kudmali_cuisine.jpeg';
import kudmaliAttireImage from '../assets/kudmali_attire.jpeg';

export const CULTURAL_TOPICS_DATA: CulturalTopic[] = [
  {
    id: 'kudmali-biha-traditions',
    title: 'Kudmali Marriage Traditions (Biha & Neg-Chaar)',
    kudmaliTitle: 'कुड़मालि बिहा आरु नेग-चार (Sacred Nuptial Rituals)',
    category: 'Traditions',
    image: kudmaliMarriageImage,
    summary: 'A nature-reverent matrimonial tapestry grounded in community blessings, tree marriages (Aam-Biha / Mahul-Biha), turmeric cleansings, and heartfelt farewell songs.',
    keyHighlights: [
      'Aam-Biha & Mahul-Biha: Sacred tree wedding rituals where the bride and groom first establish communion with nature.',
      'Lagani & Chuman Geet: Spontaneous choral singing by women blessing the couple with grass (Dhub), paddy, and vermilion.',
      'No Dowry Culture: Traditional Kudmi customary laws uphold equality and village-sanctioned dignity.'
    ],
    fullArticle: [
      'In Kudmali culture, a marriage (Biha) is not an aristocratic display of private wealth, but a sacred covenant linking two agricultural families, two villages, and the living flora and fauna.',
      'The matrimonial journey begins with "Duar-Chheka" (welcoming the wedding procession at the village threshold) accompanied by the resounding bass of the Dhamsa and resonant cadence of the Mandar. The women sing witty and playful teasing songs (Khemta and Jhumur) that break social inhibitions.',
      'A singular feature of Kudmali wedding rites is the "Aam-Biha" for the groom (marrying a mango tree) and "Mahul-Biha" for the bride (marrying a Mahua tree). Before wedding one another, both youth pledge stewardship to the fruit and shade trees of Chotanagpur, acknowledging that survival and sustenance stem from the forest.',
      'The "Sindur-Daan" and "Chuman" rites follow, where community elders touch holy unpolished rice (Arok Chaal) and green grass to the couple’s heads, followed by the profoundly emotional "Kanya-Bidai" songs.'
    ],
    relatedSongs: ['कनियाँ बिदाई, रोहे आँखीर नीरे', 'लगनी सुर'],
    tags: ['Marriage', 'Biha', 'Customs', 'Tree Rituals', 'Songs']
  },
  {
    id: 'chhau-dance',
    title: 'Purulia Chhau: The Martial & Mask Dance of Manbhum',
    kudmaliTitle: 'पुरुलिया छऊ नाच: मानभूमेक मुखौटा आरु वीर रस',
    category: 'Dance & Music',
    image: chhauImage,
    summary: 'A world-renowned UNESCO Intangible Cultural Heritage martial dance fusing athletic leaps, heroic mythological storytelling, and majestic Charida papier-mâché masks.',
    keyHighlights: [
      'Charida Mask Artistry: Elaborate multi-tiered crowns adorned with iridescent peacock feathers, zari filigree, and expressive mythological deity faces.',
      'Martial Acrobatics (Parikhanda): Explosive mid-air somersaults, dynamic martial squats (Chowk), and heroic sword-and-shield combat.',
      'Volcanic Acoustic Heartbeat: Driven by the deafening strikes of the cast-iron Dhamsa cauldron, the clay Mandar, and piercing Shehnai horn melodies.'
    ],
    fullArticle: [
      'Chhau dance is the crowning theatrical glory of Manbhum and the Chotanagpur plateau, fusing ancient indigenous martial training (Parikhanda) with grand epics of heroic resistance and cosmic valor.',
      'Each dancer transforms into a deity or legendary warrior through the sacred clay-and-cloth mask, meticulously molded and painted by artisan families in the village of Charida in Purulia. The masks feature majestic multi-tiered crowns crowned with real peacock feathers and shimmering zari work.',
      'When the giant cauldron Dhamsa drum reverberates across the night Akhra, struck with dual curved hardwood sticks, the ground itself trembles. The dancers execute gravity-defying leaps, sweeping sword maneuvers, and spinning landings that capture the untamed spirit of the forest.'
    ],
    relatedSongs: ['धमसा बाजे गुरु-गुरु, नाचे छऊर वीर', 'वीर रस झांझ'],
    tags: ['Dance', 'Chhau', 'Dhamsa', 'Charida', 'UNESCO', 'Manbhum']
  },
  {
    id: 'jhumur-dance',
    title: 'Kudmali Jhumur: The Soulful Rhythms of the Village Akhra',
    kudmaliTitle: 'कुड़मालि झुमुर नाच: अखड़ाक सुर, ताल आरु गति',
    category: 'Dance & Music',
    image: jhumarImage,
    summary: 'The communal heartbeat of Kudmi sisterhood and seasonal romance — women linking arms in graceful swaying circles under the dusk sky of the village Akhra.',
    keyHighlights: [
      'Lal-Paad Handloom Elegance: Dancers draped in traditional white-and-crimson bordered sarees, adorned with silver Hansli neck collars and wild Sal blossoms in their hair buns.',
      'Unbroken Akhra Ring: Interlocking arms at wrists and elbows, stepping forward and backward in hypnotic synchronized waves mirroring windblown paddy fields.',
      'Living Musical Cadence: Guided by the clay Mandar drum with tuning Kharan paste, the resonant brass Kartal cymbals, and pastoral bamboo Tirio flutes.'
    ],
    fullArticle: [
      'If Chhau embodies the fiery, martial pulse of the plateau, Jhumur is its gentle, hypnotic feminine counterpart — the poetic breath of the Kudmi soul.',
      'As dusk envelops the Akhra, village women link arms at the wrists and elbows, forming an unbroken crescent or circle. Moving together with gentle knee bends and rhythmic half-steps, they create a mesmerizing visual wave that mirrors the ripening curves of windblown paddy stalks across the red earth.',
      'Jhumur is inseparable from the seasons: Bhaduria Jhumur laments the separation of lovers during the monsoon, Rong Jhumur welcomes the spring blossoming of Sal and Mahua, and Darbari Jhumur explores classical poetic refinement.'
    ],
    relatedSongs: ['आलोमोनि तोर नावे मांदर बाजे', 'भादरिया झुमुर', 'आपन करम भायाक धरम'],
    tags: ['Dance', 'Jhumur', 'Mandar', 'Akhra', 'Lal-Paad', 'Sisterhood']
  },
  {
    id: 'traditional-kudmali-cuisine',
    title: 'Flavors of the Soil: Dhuska, Arsa Pitha & Madua',
    kudmaliTitle: 'माटिर सुवाद: धुसका, अरसा पीठा आरु मड़ुआ रोटी',
    category: 'Food',
    image: kudmaliCuisineImage,
    summary: 'A seasonal, organic culinary philosophy celebrating wild forest tubers, indigenous short-grain rice, finger millet, and festive steamed and fried delicacies.',
    keyHighlights: [
      'Dhuska & Ghugni: Golden savory fritters made from soaked rice and chana dal, served during festivals.',
      'Arsa Pitha: Celebratory sweet made of stone-ground rice flour kneaded in hot jaggery syrup and fried in mustard oil.',
      'Madua (Finger Millet): Nutrient-dense staple eaten during winter plowing, accompanied by tangy Mahua flowers and dry fish chutney.'
    ],
    fullArticle: [
      'Kudmali cuisine is deeply intertwined with agrarian cycles and micro-climates. Nothing is artificial; the palette is shaped by freshly harvested crops, sun-dried wild greens (Saag), and earthen cooking pots.',
      'During Tusu and Makar Sankranti, every home prepares assorted "Pitha" — including Dudh-Pitha, Jhal-Pitha, and the crisp, enduring Arsa Pitha which travelers can carry for weeks without spoilage.',
      'Wild forest gifts like "Khukhrhi" (earthy indigenous forest mushrooms gathered after monsoon lightning strikes), "Rugda", and bamboo shoots (Karil) are cooked with freshly ground mustard paste and red chilies, reflecting the forest forage culture of the Chotanagpur plateau.'
    ],
    tags: ['Cuisine', 'Dhuska', 'Pitha', 'Forest Food', 'Culinary']
  },
  {
    id: 'sacred-spaces-jahersthan-akhra',
    title: 'Jahersthan & Akhra: The Sacred Grove & The Circle',
    kudmaliTitle: 'जाहिरथान आरु आखड़ा: धरमेक थान आरु मानभूमेक मण्डप',
    category: 'Sacred Spaces',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    summary: 'The spiritual and democratic institutions of Kudmi life: undisturbed sacred Sal groves where nature spirits reside, and the central village circle where culture lives.',
    keyHighlights: [
      'Jahersthan: The untouched, sacred ancient grove at the village edge dedicated to Mother Earth and ancestral spirits.',
      'The Akhra: A circular, open-air earthen arena serving as the court of village elders, cultural amphitheater, and youth dancing ground.',
      'Ecological Sanction: Cutting living trees or hunting within the Jahersthan is strictly prohibited, acting as ancestral conservation.'
    ],
    fullArticle: [
      'In traditional Kudmali worldview, worship does not require towering stone temples or institutional clergy. The supreme sanctuary is the "Jahersthan" (sacred Sal grove) preserved intact since the founding of the village.',
      'Here, beneath centuries-old Shorea robusta trees, the village priest (Laya or Pahan) offers earthen pots of water, fresh Sal blossoms, and unpolished grain during Sarhul and Baha festivals, asking the guardian spirits for rain, cattle health, and communal peace.',
      'A short walk away lies the "Akhra" — the democratic heart of Kudmi society. Under the shade of a central peepal or banyan tree, the village council (Panch) resolves disputes during the afternoon, while the evening welcomes the youth to beat the Mandar and practice folk songs.'
    ],
    tags: ['Jahersthan', 'Akhra', 'Sacred Grove', 'Ecology', 'Sanctuary']
  },
  {
    id: 'kudmali-language-chis-lipi',
    title: 'The Kudmali Language & Chis Script: An Awakening',
    kudmaliTitle: 'कुड़मालि भाखा आरु चिस लिपि: नवजागरण',
    category: 'Language & Lipi',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Tracing the phonetic richness, oral bards, and the historical development of the Chis writing system crafted to preserve the unique tonal sounds of Kudmali.',
    keyHighlights: [
      'Tonal Nuance: Kudmali has unique nasalized diphthongs and retroflex sounds that standard regional scripts struggled to capture.',
      'Chis Script: Developed to give phonetic autonomy and visual pride to the language.',
      'Trilingual Living Reality: Kudmali literature is actively penned in Devanagari, Bengali, and Chis scripts across Jharkhand, Bengal, and Odisha.'
    ],
    fullArticle: [
      'The Kudmali language (also referred to as Kurmali) is an Eastern Indo-Aryan language infused with deep Austroasiatic (Munda) substrate vocabulary, mirroring millennia of peaceful cohabitation in the plateau.',
      'For centuries, Kudmali flourished as a vibrant oral language preserved in millions of verses sung by anonymous agricultural bards across Manbhum, Ranchi, Purulia, Mayurbhanj, and Sundargarh.',
      'In the mid-20th century, scholars and poets recognized that standard Devanagari, Odia, and Bengali alphabets lacked precise glyphs for certain Kudmali aspirated glottal stops and nasal inflections. This catalyzed the creation and refinement of the Chis script. Today, young writers like Aarti Mahato write across script boundaries to ensure access for all.'
    ],
    tags: ['Language', 'Chis Lipi', 'Scripts', 'Linguistics', 'Preservation']
  },
  {
    id: 'traditional-attire-ornaments',
    title: 'Earthy Elegance: Kudmali Attire, Panchat & Ornaments',
    kudmaliTitle: 'हामार पहरावा: पाँछात, गमछा आरु चाँदीर गहना',
    category: 'Attire',
    image: kudmaliAttireImage,
    summary: 'The unbleached handloom cottons, red-bordered Panchat saris, and heavy cast-silver ornaments that reflect simplicity, dignity, and agricultural grace.',
    keyHighlights: [
      'Panchat Sari: Coarse organic cotton handwoven with natural madder-red borders, worn without petticoats for agility in the fields.',
      'Silver Jewelry: Hasli (rigid silver collar), Tarpat (ear ornaments), and Painri (resonant silver anklets).',
      'Wild Sal Blossom Adornment: Hair buns crowned with seasonal Sarhul sal flowers, mahua clusters, or yellow mustard sprigs.'
    ],
    fullArticle: [
      'Traditional Kudmi clothing is celebrated for its utilitarian elegance. Woven primarily on village pit-looms by local Tanti weavers, the garments are tailored to the rhythms of agrarian labor.',
      'Men traditionally wear the coarse unbleached cotton "Dhoti" or "Panchat" with a checked shoulder towel ("Gamchha") that doubles as a sun-shield, head-wrap, or grain bundle.',
      'Women drape the Panchat sari with deep reverence for modesty and comfort. During festival days like Karam and Tusu, silver jewelry shines against earthen courtyards: heavy cast "Hasli" necklaces guarding the collarbone, "Baju-bandh" on the arms, and "Jhumka" that swing in cadence with the dance steps.'
    ],
    tags: ['Attire', 'Panchat', 'Silver Jewelry', 'Handloom', 'Heritage']
  }
];
