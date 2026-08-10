import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HiLayout from '@site/src/components/highskin/HiLayout';
import HeroSection from '@site/src/components/highskin/sections/HeroSection';
import ProblemSection from '@site/src/components/highskin/sections/ProblemSection';
import FacePickerSection from '@site/src/components/highskin/sections/FacePickerSection';
import CustomFaceSection from '@site/src/components/highskin/sections/CustomFaceSection';
import BathSystemSection from '@site/src/components/highskin/sections/BathSystemSection';
import FamilySection from '@site/src/components/highskin/sections/FamilySection';
import MoodSelectorSection from '@site/src/components/highskin/sections/MoodSelectorSection';
import TravelSwimSection from '@site/src/components/highskin/sections/TravelSwimSection';
import RefillSection from '@site/src/components/highskin/sections/RefillSection';
import IngredientSection from '@site/src/components/highskin/sections/IngredientSection';
import HiFriendSection from '@site/src/components/highskin/sections/HiFriendSection';
import BrandStorySection from '@site/src/components/highskin/sections/BrandStorySection';

/**
 * HI-SKIN 홈페이지 — HOME (12-Step 롱스크롤)
 *
 * 흐름:
 *   HERO → PROBLEM → FACE(PLAY) → CUSTOM → SYSTEM → FAMILY
 *   → MOOD → TRAVEL → REFILL → INGREDIENT → QUIZ → STORY+CTA
 *
 * GEO: Brand + Organization 구조화 데이터 포함
 */
export default function HighSkinHome(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: 'HI-SKIN 하이피부',
    description:
      '표정을 고르는 즐거움부터, 사용하는 편리함까지. 민감피부 당사자부터 가족까지 함께 사용하는 패밀리 배스케어 브랜드.',
    slogan: '오늘, 어떤 표정으로 씻을래?',
    url: `${siteConfig.url}${siteConfig.baseUrl}highskin`,
    category: 'Family Bath Care · Solid & Travel Bath System',
  };

  return (
    <HiLayout
      title=""
      description="HI-SKIN 하이피부 · 표정을 고르는 즐거움부터, 사용하는 편리함까지. 가족의 일상에 즐거운 목욕 습관. Happy Natural Care."
      jsonLd={jsonLd}>
      <HeroSection />
      <ProblemSection />
      <FacePickerSection />
      <CustomFaceSection />
      <BathSystemSection />
      <FamilySection />
      <MoodSelectorSection />
      <TravelSwimSection />
      <RefillSection />
      <IngredientSection />
      <HiFriendSection />
      <BrandStorySection />
    </HiLayout>
  );
}
