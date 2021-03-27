import {Button} from '@components/forms';
import {Heading, SubHeading} from '@components/heading/heading';
import {Image} from '@components/image';
import {Center} from '@components/layout';
import {NextSeo} from 'next-seo';
import Link from 'next/link';
import {FcSearch} from 'react-icons/fc';
import {IMAGE_PATHS} from 'src/constants';

const title = 'Page Not Found';

const PageNotFound = () => (
  <>
    <NextSeo title={title} />
    <div className="w-full px-4">
      <Center className="flex-col lg:flex-row">
        <div className="flex flex-col items-center">
          <div className="mt-8">
            <Heading>
              Sorry, we couldn&apos;t find this page
              <MagnifyingGlassIcon className="inline-block w-8 h-8 ml-1" />
            </Heading>
          </div>
          <div className="mt-4">
            <SubHeading>
              But don&apos;t worry, you can find plenty of other things on our
              homepage
            </SubHeading>
          </div>
          <div className="mt-8 text-center">
            <Link href="/">
              <a>
                <Button color="secondary">Go Home</Button>
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full h-full mt-8">
          <Image
            src={IMAGE_PATHS.PAGE_NOT_FOUND}
            alt="page not found"
            aspectRatio={999 / 834}
          />
        </div>
      </Center>
    </div>
  </>
);

export default PageNotFound;

function MagnifyingGlassIcon({className = 'w-6 h-6'}) {
  return <FcSearch className={className} />;
}
