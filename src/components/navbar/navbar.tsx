import {Avatar} from '@components/avatar';
import {CloseIcon} from '@components/icons/icons';
import {Flex} from '@components/layout';
import {NextLink} from '@components/next-link';
import {useAuth} from '@context/auth';
import Link from 'next/link';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {GoSignIn, GoSignOut} from 'react-icons/go';
import {HiCog, HiHashtag, HiMenu} from 'react-icons/hi';
import {IoCubeSharp} from 'react-icons/io5';
import {ROUTE_PATHS} from 'src/constants';
import {ActiveLink} from './active-link';
import {MobileMenuButton, MobileMenuLinks} from './mobile-menu';
import {useClickOutside} from './use-click-outside';
import {useLogout} from './use-logout';
import {UserDropdownButton, UserDropdownLinks} from './user-dropdown';

const commonLinks = [
  {href: '/', text: 'Home'},
  {href: '/random', text: 'Random'},
  {href: '/test', text: 'Test'},
];
const authenticatedLinks = [{href: '/todos', text: 'Todos'}];

const anonymousDropdownLinks = [
  {
    href: ROUTE_PATHS.LOGIN,
    text: 'Log in',
    icon: (
      <LoginIcon className="inline w-5 h-5 mr-2 text-gray-800 align-text-bottom" />
    ),
  },
  {
    href: ROUTE_PATHS.REGISTER,
    text: 'Sign Up',
    icon: <HashTagIcon className="inline w-5 h-5 mr-2 align-text-bottom" />,
  },
];

const authenticatedDropdownLinks = [
  {
    href: ROUTE_PATHS.SETTINGS,
    text: 'Settings',
    icon: <CogIcon className="inline w-5 h-5 mr-2 align-text-bottom" />,
  },
];

export function Navbar() {
  const {
    state: {isAuthenticated, user},
    initializeUser,
  } = useAuth();
  const handleLogout = useLogout();
  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  const [showsUserDropdown, setShowsUserDropdown] = useState(false);
  const [showsMobileMenu, setShowsMobileMenu] = useState(false);
  const closeMobileMenu = () => setShowsMobileMenu(false);
  const closeUserDropdown = () => setShowsUserDropdown(false);

  const closeMenus = () => {
    closeMobileMenu();
    closeUserDropdown();
  };

  const navbarRef = useRef<HTMLDivElement>(null);

  useClickOutside(navbarRef, closeMenus);

  const toggleUserDropdown = () => {
    setShowsUserDropdown(prev => !prev);
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setShowsMobileMenu(prev => !prev);
    closeUserDropdown();
  };

  const links = [...commonLinks];

  if (isAuthenticated) {
    links.push(...authenticatedLinks);

    if (user?.isAdmin) {
      links.push({href: ROUTE_PATHS.CONTACTS, text: 'Contacts'});
    }
  }

  const dropdownLinks = isAuthenticated
    ? authenticatedDropdownLinks
    : anonymousDropdownLinks;

  return (
    <>
      <div className="bg-gray-50" style={{minHeight: '172px'}}>
        <nav ref={navbarRef} className="bg-white shadow">
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Flex className="relative justify-between h-16">
              <Flex className="absolute inset-y-0 left-0 items-center sm:hidden">
                <MobileMenuButton onClick={toggleMobileMenu}>
                  {showsMobileMenu ? <CloseIcon /> : <BurgerIcon />}
                </MobileMenuButton>
              </Flex>
              <Flex className="items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Flex className="items-center flex-shrink-0">
                  <NextLink
                    href="/"
                    className="text-gray-900 title-font md:mb-0"
                    aria-label="home"
                  >
                    <BrandIcon />
                  </NextLink>
                </Flex>
                {/* regular navlinks */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {links.map(link => (
                    <ActiveLink
                      key={link.href}
                      href={link.href}
                      activeClassName="border-indigo-500 text-gray-900"
                      inactiveClassName="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      <a className="inline-flex items-center px-1 pt-1 text-base font-medium border-b-2">
                        {link.text}
                      </a>
                    </ActiveLink>
                  ))}
                </div>
              </Flex>
              <Flex className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3">
                  <div>
                    <UserDropdownButton onClick={toggleUserDropdown}>
                      <Avatar src={user?.picture || ''} />
                    </UserDropdownButton>
                  </div>
                  <UserDropdownLinks
                    className={`${
                      !showsUserDropdown ? 'hidden' : ''
                    } absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}
                  >
                    {dropdownLinks.map(link => (
                      <Link key={link.href} href={link.href}>
                        <a
                          onClick={closeUserDropdown}
                          role="menuitem"
                          className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                        >
                          {link.icon}
                          {link.text}
                        </a>
                      </Link>
                    ))}
                    {isAuthenticated && (
                      <LogoutButton
                        onClick={() => {
                          handleLogout();
                          closeUserDropdown();
                        }}
                      >
                        <LogoutIcon className="inline w-5 h-5 mr-2 align-text-bottom" />{' '}
                        Log Out
                      </LogoutButton>
                    )}
                  </UserDropdownLinks>
                </div>
              </Flex>
            </Flex>
          </div>

          <MobileMenuLinks
            className={`${showsMobileMenu ? 'block' : 'hidden'} sm:hidden`}
          >
            <div className="pt-2 pb-4 space-y-1">
              {links.map(link => (
                <ActiveLink
                  key={link.href}
                  href={link.href}
                  activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700"
                  inactiveClassName="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  <a
                    onClick={closeMobileMenu}
                    role="link"
                    className="block py-2 pl-3 pr-4 text-base font-medium border-l-4"
                  >
                    {link.text}
                  </a>
                </ActiveLink>
              ))}
            </div>
          </MobileMenuLinks>
        </nav>
      </div>
    </>
  );
}

function LogoutButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link href="#">
      <a
        onClick={onClick}
        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        {children}
      </a>
    </Link>
  );
}

function BurgerIcon({className = 'w-6 h-6'}) {
  return <HiMenu className={className} />;
}

function BrandIcon() {
  return (
    <IoCubeSharp
      className="p-2 text-gray-700 rounded-full w-9 h-9 bg-gray-50 hover:bg-gray-200"
      fill="currentColor"
      stroke="currentColor"
    />
  );
}

function CogIcon({className}: {className: string}) {
  return <HiCog className={className} />;
}

function LogoutIcon({className}: {className: string}) {
  return <GoSignOut className={className} />;
}

function LoginIcon({className}: {className: string}) {
  return <GoSignIn className={className} />;
}

function HashTagIcon({className}: {className: string}) {
  return <HiHashtag className={className} />;
}
