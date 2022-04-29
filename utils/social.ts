type SocialPlatform = {
  id: string;
  name: string;
  url: string;
  invertDark: boolean;
};

export const social: SocialPlatform[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/haydenbleasel',
    invertDark: false,
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com/haydenbleasel',
    invertDark: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/hayden.bleasel/',
    invertDark: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/haydenbleasel/',
    invertDark: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/haydenbleasel',
    invertDark: false,
  },
  {
    id: 'producthunt',
    name: 'ProductHunt',
    url: 'https://www.producthunt.com/@haydenbleasel',
    invertDark: false,
  },
];
