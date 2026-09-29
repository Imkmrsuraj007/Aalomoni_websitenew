import { KudmaliGeet, Submission } from '../types';

// Archive starts empty as requested; songs can be posted later by the user or admin
export const KUDMALI_GEET_DATA: KudmaliGeet[] = [];

export const INITIAL_KUDMALI_GEET: KudmaliGeet[] = KUDMALI_GEET_DATA;

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    title: 'करम डालीक बंदना गीत',
    authorName: 'रोहित कुमार महतो',
    type: 'geet',
    category: 'Karam Geet',
    script: 'devanagari',
    content: 'करम गाछेक डाली काटी, आनलय भाय रे हे,\nआखड़ा माझे गाड़लय डाली, बहिने पूजे रे हे।\n\nआपन करम भायाक धरम, सबे मने राखो,\nमांदर बाजे ता-धिन-ता, सबे सांगे नाँचो।',
    status: 'pending',
    submittedAt: '2025-09-18 14:30'
  },
  {
    id: 'sub-2',
    title: 'मांदर आरु धमसाक ताल परंपरा',
    authorName: 'डॉ. सुनील महतो',
    type: 'article',
    category: 'Music & Mandar',
    script: 'devanagari',
    content: 'छोटांनागपुर आरु मानभूम क्षेत्रे मांदर बाजा बिना कोनो परब संपूर्ण नइ होवे। मांदरेर माटिक काया आरु चमड़ाक छावनी प्रकृति आरु पशु-जगत केर सम्मिश्रण हेक। एकर बाजेर गूँज दूर-दूर गांवे सुनाय देहे।',
    status: 'pending',
    submittedAt: '2025-09-19 09:15'
  }
];
