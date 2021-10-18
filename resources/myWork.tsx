export type workItem = {
  header: string;
  image: string;
  description: string;
  tags?: string[];
  href?: string;
  page?: string;
};

const myWork: workItem[] = [
  {
    header: 'Three Web Stalker',
    image: '/3ws.png',
    description:
      'A chrome extension I developed as an art project exploring alternatives to modern browsers inspired by The Web Stalker and adjusted for modern web with ThreeJS.',
    tags: ['ThreeJS', 'JavaScript', 'CSS', 'Extension', 'Web Crawler'],
    href: 'https://chrome.google.com/webstore/detail/three-web-stalker/klmhhglpadcjglppjmjpepicoidecdlo',
  },
  {
    header: 'Lasers',
    image: '/lasers.png',
    description: 'My first project working in ThreeJS. A site where you can create and explore a unique set of lasers with simple click-and-drag.',
    tags: ['ThreeJS', 'JavaScript', 'CSS'],
    page: '/static/lasers/index.html'
}
];

export default myWork;
