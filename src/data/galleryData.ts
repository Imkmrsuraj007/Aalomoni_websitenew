import { GalleryPhoto } from '../types';
import karamImage from '../assets/karam.jpeg';
import tusuImage from '../assets/tusu.jpeg';
import sohraiImage from '../assets/sohrai.jpeg';
import sarhulImage from '../assets/sarhul.jpeg';
import kudmaliMarriageImage from '../assets/kudmali_marriage.jpeg';
import chhauImage from '../assets/chhau.jpeg';
import jhumarImage from '../assets/jhumar.jpeg';
import kudmaliCuisineImage from '../assets/kudmali_cuisine.jpeg';
import kudmaliAttireImage from '../assets/kudmali_attire.jpeg';

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'The Resonance of the Mandar Drum',
    category: 'Music & Instruments',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted clay body with goat-skin heads and black tuning paste (Kharan), the soul of every Kudmali melody.',
    location: 'Purulia / Manbhum'
  },
  {
    id: 'g-2',
    title: 'Sacred Sal Grove & Sarhul Blossom Sanctuary',
    category: 'Festivals',
    imageUrl: sarhulImage,
    caption: 'Flowering Shorea robusta canopy and sacred Jahersthan altar decorated with terracotta monsoon prediction pots and fresh spring blossoms.',
    location: 'Dalma Hills, East Singhbhum'
  },
  {
    id: 'g-3',
    title: 'Karam Dance at the Village Akhra',
    category: 'Festivals',
    imageUrl: karamImage,
    caption: 'Women linking arms in the unbroken circle around the decorated Karam branch on Bhado Ekadashi.',
    location: 'Ranchi Plateau'
  },
  {
    id: 'g-4',
    title: 'Sohrai Wall Painting & Cattle Adornment',
    category: 'Art & Craft',
    imageUrl: sohraiImage,
    caption: 'Sacred zebu bull crowned with golden Dhankatti paddy sheaves before radiant ochre murals and glowing diyas on Kartik Amavasya.',
    location: 'Hazaribagh / Manbhum'
  },
  {
    id: 'g-5',
    title: 'Immersion of the Golden Chouradol',
    category: 'Festivals',
    imageUrl: tusuImage,
    caption: 'Handwoven bamboo shrines illuminated with oil lamps floating on the mist-covered Subarnarekha on Makar morning.',
    location: 'Subarnarekha River, Ghatshila'
  },
  {
    id: 'g-6',
    title: 'Earthen Courtyard & Morning Chores',
    category: 'Village Life',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    caption: 'Freshly swept courtyard treated with cow-dung wash, drying paddy grain, and clay cooking pots.',
    location: 'Bokaro Rural Valley'
  },
  {
    id: 'g-7',
    title: 'Purulia Chhau Martial Dancer & Giant Mask',
    category: 'Art & Craft',
    imageUrl: chhauImage,
    caption: 'Heroic Chhau dancer in mid-air leap brandishing sword and shield, wearing the multi-tiered peacock feather crown and Charida mask, propelled by the thunder of the Dhamsa drum.',
    location: 'Charida, Purulia'
  },
  {
    id: 'g-8',
    title: 'Kudmali Biha & Chuman Ritual under Marwa',
    category: 'Ceremonies',
    imageUrl: kudmaliMarriageImage,
    caption: 'Groom in traditional palm-leaf Maur crown and bride in Lal-Paad saree blessed with unpolished rice, Dhubi grass, and sacred Kalas under the leaf canopy.',
    location: 'Manbhum / Chotanagpur'
  },
  {
    id: 'g-9',
    title: 'Harvesting Winter Paddy',
    category: 'Village Life',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    caption: 'Golden sheaves of paddy gathered by hand before the arrival of Poush and Tusu celebrations.',
    location: 'Mayurbhanj Border'
  },
  {
    id: 'g-10',
    title: 'Kudmali Jhumur Dance Circle at the Akhra',
    category: 'Festivals',
    imageUrl: jhumarImage,
    caption: 'Women linking arms at wrists and elbows in synchronized wave motion wearing Lal-Paad sarees with fresh Sal blossoms in their hair, accompanied by the clay Mandar and bamboo Banshi.',
    location: 'Purulia / Manbhum Akhra'
  },
  {
    id: 'g-11',
    title: 'Flavors of the Soil: Dhuska, Arsa Pitha & Madua',
    category: 'Village Life',
    imageUrl: kudmaliCuisineImage,
    caption: 'A traditional feast served on a fresh stitched Sal leaf platter (Patari): golden puffed Dhuska with spicy Kala Chana Ghugni in a leaf Dona, jaggery-glazed Arsa Pitha with white sesame seeds, and warm rustic Madua Roti.',
    location: 'Chotanagpur / Manbhum'
  },
  {
    id: 'g-12',
    title: 'Kudmali Panchat & Solid Silver Hasli Ornaments',
    category: 'Art & Craft',
    imageUrl: kudmaliAttireImage,
    caption: 'Traditional handspun organic cotton Panchat with madder-red temple borders, worn with the heavy cast-silver Hansli torque, Tarpat earrings, and silver Bajubandh.',
    location: 'Manbhum / Chotanagpur Courtyard'
  }
];
