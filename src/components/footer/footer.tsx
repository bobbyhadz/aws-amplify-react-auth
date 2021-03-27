import {NextLink} from '@components/next-link';
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const textLinks = [
  {text: 'About', href: '/'},
  {text: 'Blog', href: '/'},
  {text: 'Jobs', href: '/'},
  {text: 'Press', href: '/'},
  {text: 'Accessibility', href: '/'},
  {text: 'Partners', href: '/'},
];

const socialLinks = [
  {text: 'Facebook', href: '/', icon: <FacebookIcon />},
  {text: 'Instagram', href: '/', icon: <InstagramIcon />},
  {text: 'Twitter', href: '/', icon: <TwitterIcon />},
  {text: 'Github', href: '/', icon: <GithubIcon />},
  {text: 'Dribble', href: '/', icon: <DribbleIcon />},
];

export const Footer = () => (
  <>
    <footer className="mt-24 bg-white shadow">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          {textLinks.map(({href, text}) => (
            <div className="px-5 py-2" key={text}>
              <NextLink
                href={href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {text}
              </NextLink>
            </div>
          ))}
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          {socialLinks.map(({href, text, icon}) => (
            <NextLink
              href={href}
              key={text}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{text}</span>
              {icon}
            </NextLink>
          ))}
        </div>
        <p className="mt-8 text-base text-center text-gray-400">
          © {new Date().getFullYear()} Borislav Hadzhiev
        </p>
      </div>
    </footer>
  </>
);

function FacebookIcon({className = 'w-6 h-6'}) {
  return <FaFacebook className={className} />;
}

function InstagramIcon({className = 'w-6 h-6'}) {
  return <FaInstagram className={className} />;
}

function TwitterIcon({className = 'w-6 h-6'}) {
  return <FaTwitter className={className} />;
}

function GithubIcon({className = 'w-6 h-6'}) {
  return <FaGithub className={className} />;
}

function DribbleIcon({className = 'w-6 h-6'}) {
  return <FaDribbble className={className} />;
}
