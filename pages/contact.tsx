import React from 'react';
import { Text } from '@headstorm/foundry-react-ui';
import styled from 'styled-components';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiLinkedin, mdiGithub, mdiEmail, mdiPhone, mdiMessage } from '@mdi/js';
import { useTheme } from '../components/ThemeContext';

const ContactText = styled(Text.Container)`
  margin-top: 20%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
`;

const SocialLinks = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media (min-width: 800px) {
    flex-direction: row;
  }
  @media (max-width: 799px) {
    flex-direction: column;
  }
`;

const SocialImage = styled.a`
  margin: 0 2.5rem 0 2.5rem;
`;

const SocialLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

interface Social {
  site: string;
  href: string;
  src: string;
  text: string;
}

const socials: Social[] = [
  {
    site: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pcdevri/',
    src: mdiLinkedin,
    text: 'https://www.linkedin.com/in/pcdevri/',
  },
  {
    site: 'GitHub',
    href: 'https://github.com/PatrickDeVries',
    src: mdiGithub,
    text: 'https://github.com/PatrickDeVries',
  },
  { site: 'Email', href: 'mailto:pcdevri@gmail.com', src: mdiEmail, text: 'pcdevri@gmail.com' },
  { site: 'Text', href: 'sms:8178881514', src: mdiMessage, text: '(817) 888-1514' },
  { site: 'Phone', href: 'tel:8178881514', src: mdiPhone, text: '(817) 888-1514' },
];

const Contact = () => {
  const { theme } = useTheme();
  return (
    <>
      <Text size="2rem" color={theme.primary} StyledContainer={ContactText}>
        Contact me:
      </Text>
      <SocialLinks>
        {socials.map(social => (
          <SocialLink key={social.site}>
            <Link href={social.href} passHref={true}>
              <SocialImage>
                <Icon path={social.src} size="10rem" color={theme.primary} />
              </SocialImage>
            </Link>
            <Text size=".75rem" color={theme.primary}>
              {social.text}
            </Text>
          </SocialLink>
        ))}
      </SocialLinks>
    </>
  );
};

export default Contact;
