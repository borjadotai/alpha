import Image from 'next/image';
import GradientText from '../GradientText';

const bGradient = { dir: 'left-to-right', from: '#00d2ff', to: '#3a7bd5' };
const gGradient = { dir: 'left-to-right', from: '#a8ff78', to: '#78ffd6' };
const rGradient = { dir: 'left-to-right', from: '#ee0979', to: '#ff6a00' };

const NameTitle = () => <GradientText bg={bGradient}>{`I'm Borja Leiva`}</GradientText>;
const BusinessGradient = () => <GradientText highlight bg={gGradient}>{`business`}</GradientText>;
const ProductGradient = () => <GradientText highlight bg={rGradient}>{`product design`}</GradientText>;

export default function HomeIntro() {
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
            src="/assets/images/me.jpeg"
            blurDataURL="/assets/images/me.jpeg"
            alt="Picture of Borja Leiva"
            width={120}
            height={120}
            className="rounded-xl"
            placeholder="blur"
          />
        </div>
      </div>
      <p className="my-4 dark:text-gray-400 sm:tracking-wide lg:tracking-wider lg:mt-5">
        I’m a product engineer, originally from Spain, currently based in London. <br /> Software engineer by trade with
        a passion for <BusinessGradient /> {' & '} <ProductGradient />.
      </p>
    </div>
  );
}
