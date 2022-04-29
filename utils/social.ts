type SocialPlatform = {
  id: string;
  name: string;
  url: string;
  invertDark: boolean;
};

export const social: SocialPlatform[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/borjadotai',
    invertDark: false,
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/borjadotai',
    invertDark: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/borjadotai',
    invertDark: true,
  },
  {
    id: 'producthunt',
    name: 'ProductHunt',
    url: 'https://www.producthunt.com/@borjadotai',
    invertDark: false,
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com/borjadotai',
    invertDark: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/borjadotai',
    invertDark: false,
  },
];
