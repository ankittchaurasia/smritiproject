import { Container, Flex, Button } from '@mantine/core'; 
import Link from 'next/link';
import DarkMode from './DarkMode';

const links = [
  { link: '/pricing', label: 'Pricing' },
  { link: '/signin', label: 'Sign in', calltoaction:true },
];

export default function Navbar() {

  const items = links.map(link => ( 
    <Button component={Link} key={link.link} href="#" 
        size="compact-md" variant={link.calltoaction ? "filled" : "default"  } mx={4}>
      {link.label}
    </Button>
  ));

  return (
    <header>
      <Container size="md" pt="md">
        <div style={{display:'flex', justifyContent:'space-around'}}>
          <div className="logo">
            <img src='https://smriti.co/images/image2.png' width="100%" height="60%" draggable="false" style={{objectFit:"contain", touchAction:'none'}} />
          </div>
          <Flex justify="center" align="center">
            {items}
            <DarkMode />
          </Flex>
        </div>
      </Container>
    </header>
  );
}