import Image from 'next/image';
import { useContext } from 'react';
import { ChevronDown } from 'react-feather';
import GradientText from '../GradientText';
import { ThemeContext } from '../Kbar';

const bGradient = { dir: 'left-to-right', from: '#00d2ff', to: '#3a7bd5' };
const gGradient = { dir: 'left-to-right', from: '#a8ff78', to: '#78ffd6' };
const rGradient = { dir: 'left-to-right', from: '#ee0979', to: '#ff6a00' };

const NameTitle = () => <GradientText bg={bGradient}>{`I'm Borja Leiva`}</GradientText>;
const BusinessGradient = () => <GradientText highlight bg={gGradient}>{`business`}</GradientText>;
const ProductGradient = () => <GradientText highlight bg={rGradient}>{`product design`}</GradientText>;

export default function HomeIntro() {
  const [isDark, _] = useContext(ThemeContext);
  const darkLogos = '/assets/images/companies.webp';
  const lightLogos = '/assets/images/companies-light.webp';
  const logosUrl = isDark ? darkLogos : lightLogos;

  return (
    <div className="mt-6 sm:mt-4 flex flex-col justify-start items-start text-center sm:text-left">
      <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between w-full">
        <div className="flex flex-col mt-4 sm:mt-0">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight dark:text-white m-0 p-0">
            Hi <span className="animate-wiggle">👋 </span>
          </h1>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 leading-tight sm:leading-none lg:mt-1">
            <NameTitle />
          </h1>
        </div>
        <div className="w-32 h-32">
          <Image
            src="/assets/images/me.webp"
            blurDataURL="/assets/images/me.webp"
            alt="Picture of Borja Leiva"
            width={240}
            height={240}
            className="rounded-xl"
            placeholder="blur"
          />
        </div>
      </div>
      <p className="my-4 dark:text-gray-400 sm:tracking-wide lg:tracking-wider lg:mt-5">
        I’m a product engineer, originally from Spain, currently based in London. <br /> Software engineer by trade with
        a passion for <BusinessGradient /> {' & '} <ProductGradient />.
      </p>
      <p className="w-full text-gray-500 text-sm mt-10 mb-3">SOME COMPANIES I HAVE DONE WORK FOR</p>
      <div className="w-full flex items-center border-t border-neutral-200 dark:border-neutral-900 pt-8">
        <Image
          src={logosUrl}
          blurDataURL={logosUrl}
          alt="Logos of companies Borja Leiva has done work for"
          width={760}
          height={32}
          placeholder="blur"
        />
      </div>
      <a
        href="#end-of-page"
        className="mt-8 mb-4 border-t border-neutral-200 dark:border-neutral-900 pt-10 pb-4 flex flex-col w-full items-center text-gray-500"
      >
        <p>Read my life story from the early days all the way til today.</p>
        <ChevronDown size={24} aria-label="Activity Info" />
      </a>
    </div>
  );
}
