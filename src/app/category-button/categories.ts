export interface Category {
    icon: string;
    title: string;
    route?: string;
    link?: string;
}


// create the categories Animaux, Nature, Meteo, Personnes, Drole, et Moteurs
export const CATEGORIES: Category[] = [
    { icon: 'paw', title: 'Animaux', route: 'animaux' },
    { icon: 'leaf', title: 'Nature', route: 'nature' },
    { icon: 'cloud', title: 'Météo', route: 'meteo' },
    { icon: 'people', title: 'Personnes', route: 'personnes' },
    { icon: 'happy', title: 'Drôle', route: 'drole' },
    { icon: 'car-sport', title: 'Moteurs', route: 'moteurs' },
];
