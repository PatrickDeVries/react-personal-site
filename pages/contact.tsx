import { Text } from '@headstorm/foundry-react-ui'
import { mdiEmail, mdiGithub, mdiLinkedin, mdiMessage, mdiPhone } from '@mdi/js'
import Icon from '@mdi/react'
import Link from 'next/link'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Wrapper = styled.div`
  padding: 3rem;
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContactText = styled.div`
  font-size: 2rem;
`

const SocialLinks = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const SocialLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

interface Social {
  site: string
  href: string
  src: string
  text: string
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
]

const Contact: React.FC = () => {
  const theme = useTheme()
  return (
    <Wrapper>
      <ContactText>Contact me:</ContactText>
      <SocialLinks>
        {socials.map(social => (
          <SocialLink key={social.site}>
            <Link href={social.href} passHref={true}>
              <a href="">
                <Icon path={social.src} size="10rem" color={theme.secondary} />
              </a>
            </Link>
            <Text size=".75rem" color={theme.focus}>
              {social.text}
            </Text>
          </SocialLink>
        ))}
      </SocialLinks>
    </Wrapper>
  )
}

export default Contact
