import {NextLink} from '@components/next-link';
import {FaBlog, FaGithub, FaTwitter} from 'react-icons/fa';

const socialLinks = [
  {
    text: 'Twitter',
    href: 'https://twitter.com/bobbyhadz',
    icon: <TwitterIcon />,
  },
  {text: 'Github', href: 'https://github.com/bobbyhadz', icon: <GithubIcon />},
  {text: 'Blog', href: 'https://bobbyhadz.com', icon: <BlogIcon />},
];

export const Footer = () => (
  <>
    <footer className="mt-24 bg-white shadow">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center mt-8 space-x-6">
          {socialLinks.map(({href, text, icon}) => (
            <NextLink
              href={href}
              key={text}
              className="text-gray-400 hover:text-gray-500"
              target="_blank"
            >
              <span className="sr-only">{text}</span>
              {icon}
            </NextLink>
          ))}
        </div>
        <p className="mt-8 text-base text-center text-gray-400">
          {new Date().getFullYear()} Borislav Hadzhiev
        </p>
      </div>
    </footer>
  </>
);

function TwitterIcon({className = 'w-6 h-6'}) {
  return <FaTwitter className={className} />;
}

function GithubIcon({className = 'w-6 h-6'}) {
  return <FaGithub className={className} />;
}

function BlogIcon({className = 'w-6 h-6'}) {
  return <FaBlog className={className} />;
}
