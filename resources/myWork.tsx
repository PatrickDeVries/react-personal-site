export type workItem = {
  header: string;
  image: string;
  description: string;
  tags?: string[];
  href?: string;
  page?: string;
};

const myWork: Record<string, workItem[]> = {
  Certifications: [
    {
      header: 'AZ-900 - Azure Fundamentals (Complete)',
      image: '/AZ900.svg',
      description:
        'Earners of the Azure Fundamentals certification have demonstrated foundational level knowledge of cloud services and how those services are provided with Microsoft Azure.',
      tags: ['Cloud', 'Azure', 'Security', 'Virtualization', 'Cloud Data'],
      href: 'https://www.credly.com/badges/ff554b6a-5cb2-433a-af7e-1345ea8b7a51',
    },
    {
      header: 'AZ-204 - Azure Developer Associate (In progress)',
      image: '/AZ204.svg',
      description:
        'Earning Azure Developer Associate certification validates the skills and knowledge to design, build, test, and maintain cloud applications and services on Microsoft Azure. Candidates participate in all phases of cloud development from requirements definition and design, to development, deployment, and maintenance.',
      tags: ['Cloud', 'Azure', 'Security', 'Virtualization', 'Cloud Data', 'Architecture'],
      href: 'https://docs.microsoft.com/en-us/learn/certifications/azure-developer/',
    },
  ],
  'Github Contributions': [
    {
      header: 'Foundry UI',
      image: '/Foundry-BG.png',
      description:
        'An open-source React library of reusable styled components. I have contributed additions to the provider and multiple components. This library is also what I used to build this website.',
      tags: ['TypeScript', 'React', 'CSS', 'Styled Components', 'Open Source'],
      href: 'https://github.com/Headstorm/foundry-ui',
    },
    {
      header: 'Joker Cord',
      image: '/pokeball.svg',
      description:
        'A Discord self-bot that I revived for personal use. It automates the identitification and capture of pokemon generated by a separate Discord bot game. Images are captured and hashed, names are solved using hints and regular expressions, and it can automatically send capture commands or put them in your clipboard.',
      tags: ['Python', 'Discord Bot', 'Image Matching', 'Open Source', 'ToS Violation'],
      href: 'https://github.com/PatrickDeVries/JokerCord',
    },
  ],
  'Live Sites I Helped Design/Build': [
    {
      header: 'XDO Maturity Quiz',
      image: 'https://xdocicdapp.azurewebsites.net/static/media/XDO_Symbol-01.ec9e797f.svg',
      description: `A Buzzfeed style quiz for taking a quick assessment of a company's maturity in key categories. Used as a Marketing tool for Headstorm to introduce potential clients to XDO offerings in a fun and interactive package.`,
      tags: ['Typescript', 'React', 'Foundry UI', 'UX Design', 'Marketing'],
      href: 'https://xdocicdapp.azurewebsites.net/',
    },
    {
      header: 'Idle Content',
      image: 'https://www.melanieclemmons.com/HYBRID/resources/styling/loading.gif',
      description: `A gallery website to display my creative computing class' projects. Worked with the class to design and implement the site. Site is built out of flexible JS modules of a few types to be able to accommodate several kinds of media according to what each student made.`,
      tags: ['JavaScript', 'CSS', 'Creative Computing', 'Gallery'],
      href: 'https://www.melanieclemmons.com/HYBRID/',
    },
  ],
  'Art Projects': [
    {
      header: 'Three Web Stalker',
      image: '/3ws.png',
      description:
        'A chrome extension I developed as an art project exploring alternatives to modern browsers. The work is inspired by The Web Stalker and adjusted for modern web with ThreeJS. Entering a search term or a link generated an explorable and interactible 3D graph of websites that can be navigated through.',
      tags: ['ThreeJS', 'JavaScript', 'CSS', 'Extension', 'Web Crawler', 'Creative Computing'],
      href: 'https://chrome.google.com/webstore/detail/three-web-stalker/klmhhglpadcjglppjmjpepicoidecdlo',
    },
    {
      header: 'Lasers',
      image: '/lasers.png',
      description:
        'My first project working in ThreeJS. A site where you can create and explore a unique set of lasers with simple click-and-drag.',
      tags: ['ThreeJS', 'JavaScript', 'CSS', 'Creative Computing'],
      page: '/static/lasers/index.html',
    },
  ],
};

export default myWork;
