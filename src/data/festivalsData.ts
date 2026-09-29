import { FestivalItem } from '../types';
import karamImage from '../assets/karam.jpeg';
import tusuImage from '../assets/tusu.jpeg';
import sohraiImage from '../assets/sohrai.jpeg';
import sarhulImage from '../assets/sarhul.jpeg';

export const FESTIVALS_DATA: FestivalItem[] = [
  {
    id: 'karam-parab',
    name: 'Karam Parab',
    kudmaliName: 'करम परब (Festival of Destiny & Agriculture)',
    season: 'Autumn (Bhado Monsoons)',
    month: 'Bhado Shukla Ekadashi (August – September)',
    significance: 'Celebrating nature fertility, youth purity, and the protective bond between brothers and sisters through the sacred Karam branch.',
    image: karamImage,
    history: 'Ancient legend tells of the brothers Karma and Dharma. Karma planted the Karam tree and maintained devotion to the soil, while Dharma learned that righteousness without labor and reverence for nature brings misfortune. In Kudmali folklore, Lord Karam (Karam Gosaaiñ) is the guardian spirit of prosperity and health.',
    traditionalPractices: [
      'Jawa Jagran: Seven days prior, unmarried maidens place five or seven varieties of grains (paddy, gram, wheat, mung) in bamboo baskets layered with river sand, watering them tenderly until golden yellow shoots (Jawa) sprout.',
      'Dal-Kata Ritual: On the eve of Ekadashi, village youths proceed in ceremonial procession to the forest to respectfully harvest two branches from a sacred Karam tree.',
      'Akhra Installation: The branches are ceremonially planted in the center of the Akhra and decorated with yellow flowers, puffed rice (Laawa), and vermilion.',
      'Night-long Vigil: The village gathers around the Karam branches to listen to the elder narrate the Karam Katha, dancing until dawn.'
    ],
    associatedSongs: [
      {
        title: 'आपन करम भायाक धरम, करम गोसाईं',
        description: 'Sung by sisters praying for their brothers’ longevity and health as they tender the sprouted Jawa seedlings.'
      },
      {
        title: 'डहर सुर आरु करम झुमुर',
        description: 'Vibrant choral melodies echoing the rhythm of footsteps around the planted Karam branch.'
      }
    ],
    culturalWisdom: 'Karam reminds humanity that true spirituality lies in protecting the flora, caring for siblings, and living in synchrony with the seasonal rains.'
  },
  {
    id: 'tusu-parab',
    name: 'Tusu Parab',
    kudmaliName: 'टुसू परब (The Winter Maiden & Harvest Crown)',
    season: 'Winter (Poush – Magh)',
    month: 'Whole month of Poush culminating on Makar Sankranti (Mid-January)',
    significance: 'The culmination of the winter rice harvest, honoring the heroic and gentle maiden Tusu through ornate bamboo shrines and river immersion.',
    image: tusuImage,
    history: 'Tusu is revered as a historical and mythological maiden of immense bravery and purity in the agrarian folk memory of Purulia, Bankura, and Chotanagpur. Folklore tells of her resilience against tyranny and her ultimate self-sacrifice into the waters of the river to protect her community’s honor.',
    traditionalPractices: [
      'Tusu Stapana: On the first day of Poush, unmarried girls place a small earthen icon or a decorated clay cup filled with newly harvested grain in their rooms.',
      'Evening Choral Singing: Every evening of the winter month, young women assemble in the courtyards to sing hundreds of humorous, touching, and lyrical Tusu verses.',
      'Chouradol Crafting: Skilled village craftspeople weave multi-tiered, architectural towers out of flexible green bamboo slivers, pasted over with bright pink, green, and golden foil.',
      'Makar Snan & Bhasan: At dawn on Makar Sankranti, millions converge on the banks of holy rivers (Subarnarekha, Kasai, Damodar) singing farewell songs before letting their Chouradols float away.'
    ],
    associatedSongs: [
      {
        title: 'चउड़ल साजाई हमरा नदिया तीरे जाबो',
        description: 'The iconic farewell melody sung while walking in procession toward the river at sunrise.'
      },
      {
        title: 'सोनार टुसू मोरा, सागर माँझे भाषाबो',
        description: 'Tearful, poignant verses expressing the pain of farewell to the beloved winter maiden.'
      }
    ],
    culturalWisdom: 'Tusu represents the dignity of daughters, the beauty of winter harvest, and the ancient art of letting go with community gratitude.'
  },
  {
    id: 'sohrai-bandna',
    name: 'Sohrai / Bandna Parab',
    kudmaliName: 'सोरहय / बाँदना (Honoring the Cattle & Earthly Companions)',
    season: 'Post-Harvest Autumn (Kartik Amavasya)',
    month: 'Kartik New Moon (October – November, coinciding with Diwali)',
    significance: 'A festival of deep gratitude toward cattle, oxen, and domestic animals whose toil brings forth the grain from the soil.',
    image: sohraiImage,
    history: 'In the agrarian worldview of the Kudmi people, the cow and bullock are not mere livestock or economic assets; they are divine kin and companions without whose sweat human civilization would starve. Sohrai honors this kinship with art, song, and feasting.',
    traditionalPractices: [
      'Wall Murals (Sohrai Chitrankan): Women clean their mud houses and paint walls with natural red ochre (Geru), white kaolin clay (Charak Mati), and black manganese pigments depicting birds, bulls, and leafy creepers.',
      'Goru Dhowa & Ail Washing: Cattle are led to village ponds, bathed with care, and their horns oiled with mustard oil and vermilion.',
      'Dhankatti Wreath: Wreaths of golden, unthreshed paddy spikes are woven and tied around the horns and necks of the cows as an offering of the first fruits.',
      'Khuntta Rites & Ohira Singing: Young men sing traditional cattle hymns (Ohira) and play the buffalo-horn trumpet (Singa) at night to keep the village safe.'
    ],
    associatedSongs: [
      {
        title: 'माटि मटकुरा माँझे गेरुआ रंग दियो',
        description: 'Sung while women paint the intricate earthen murals on the veranda walls.'
      },
      {
        title: 'ओहिरा सुर (Ohira Geet)',
        description: 'Vocal chants sung outside cattle sheds at midnight under the new moon.'
      }
    ],
    culturalWisdom: 'A profound reminder of eco-centrism: humans owe their sustenance to other living species, and reverence for animals must precede celebration.'
  },
  {
    id: 'sarhul-baha',
    name: 'Sarhul / Baha Parab',
    kudmaliName: 'सरहुल / बाहा परब (The Blossom of the Sal)',
    season: 'Spring (Chaitra – Baisakh)',
    month: 'Spring equinox (March – April)',
    significance: 'Welcoming the cosmic rebirth of nature when the Sal trees burst into creamy fragrant blossoms across the Chotanagpur forest.',
    image: sarhulImage,
    history: 'No one in the community eats new wild fruit, mahua, or tender sal leaves until Sarhul is solemnized at the Jahersthan. It marks the marriage of the sun and the earth, symbolized through the union of the village priest and nature.',
    traditionalPractices: [
      'Water Pitcher Prediction: The village priest (Laya) places two earthen pots of water overnight at the sacred grove; the morning water level predicts monsoon rainfall.',
      'Offering of Sal Blossoms: Fresh clusters of creamy Sal flowers are offered to the earth spirits.',
      'Tucking Blossoms in Hair: Every woman, man, and child places a sprig of Sal flower above their ears or in their buns as an auspicious talisman.'
    ],
    associatedSongs: [
      {
        title: 'बाहा बाहा फुलोल साल',
        description: 'Spring pastoral melodies echoing across the flowering forest tracks.'
      }
    ],
    culturalWisdom: 'Humility before nature’s cycles: human consumption must pause until nature has replenished herself in spring.'
  }
];
