'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay, FreeMode } from 'swiper/modules';
import { ParallaxBanner } from 'react-scroll-parallax';
import { useQuery } from '@tanstack/react-query';
import { FaShoppingCart, FaMapMarkerAlt, FaVideo, FaStore, FaBell, FaRegCommentDots, FaBriefcase, FaBoxOpen, FaChevronDown, FaRegHandPointRight } from 'react-icons/fa';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi.js';
import { useMyContext } from '@/context/headerContext.js';
import { homeText, FEATURE_CARDS, QUICK_LINKS } from '@/configtext/home';
import { notices as fallbackNotices } from '@/app/tenter-home.js';
import { FeatureCard, QuickLink } from './Cards';

import milkglassImg from '@/images/homeImages/milkglass.png';
import milkglassKnImg from '@/images/homeImages/milk-glass-kn.png';
import cert1 from '@/images/homeImages/certi/NABL_24b98112d5.jpg';
import cert2 from '@/images/homeImages/certi/FSSAI_5e558596c3.png';
import cert3 from '@/images/homeImages/certi/download_1_c196cc66d7.png';
import cert4 from '@/images/homeImages/certi/FSSC_bb32b0de10.png';
import feat1 from '@/images/homeImages/feat/Ksheera_Sagara_white.png';
import feat2 from '@/images/homeImages/feat/starpi.jpg';
import feat3 from '@/images/homeImages/feat/strpi2.jpg';
import feat4 from '@/images/homeImages/feat/stapi3.jpg';
import feat5 from '@/images/homeImages/feat/far.jpg';
import feat6 from '@/images/homeImages/feat/featured1.jpg';
import know1 from '@/images/homeImages/certi/nutrition.svg';
import know2 from '@/images/homeImages/certi/importance.svg';
import know3 from '@/images/homeImages/certi/type.svg';
import know4 from '@/images/homeImages/certi/age.svg';
import notiKulfiEn from '@/images/homeImages/notification/Pista-Kulfi-02.jpg';
import notiKulfiKn from '@/images/homeImages/notification/Pista-Kulfi-kannada.jpg';
import notiIceEn from '@/images/homeImages/notification/Ice ENG_page-0001.jpg';
import notiIceKn from '@/images/homeImages/notification/Ice KAN_page-0001.jpg';
import notiNaturals from '@/images/homeImages/notification/Naturals-kannada.jpg';
import notiBanner1 from '@/images/homeImages/notification/new-banner-1.jpeg';
import notiBanner from '@/images/homeImages/notification/new-banner.jpeg';
import notiGhee from '@/images/homeImages/quality-ghee.jpg';
import notiMilk from '@/images/homeImages/image-milk.jpg';

// The home page for both languages. `locale` is 'en' (/ and /en) or 'kn' (/kn).
// Layout contract kept from the old page: the whole page is absolutely
// positioned behind the transparent header, and the hero shrinks once the
// header context reports the page has been scrolled.

const FEAT = { feat1, feat2, feat3, feat4, feat5, feat6 };
const ICONS = {
  products: <FaBoxOpen size={26} />,
  order: <FaShoppingCart size={26} />,
  dealer: <FaStore size={26} />,
  notify: <FaBell size={26} />,
  complaint: <FaRegCommentDots size={26} />,
  careers: <FaBriefcase size={26} />,
  tour: <FaMapMarkerAlt size={26} />,
  video: <FaVideo size={26} />,
};
const KNOW_ICONS = [know1, know2, know4, know3];
const LOCAL_CERTS = [cert1, cert2, cert3, cert4];

const fetchJson = (axios, path) => axios.get(path).then((r) => r.data);

function SectionTitle({ eyebrow, title, sub, light = false }) {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      {eyebrow && <p className={`text-xs font-semibold uppercase tracking-[0.2em] md:text-sm ${light ? 'text-secondary-lighter' : 'text-secondary-darker'}`}>{eyebrow}</p>}
      <h2 className={`mt-2 font-heading text-2xl uppercase md:text-4xl ${light ? 'text-white' : 'text-primary-main'}`}>{title}</h2>
      {sub && <p className={`mt-3 text-sm md:text-lg ${light ? 'text-white/80' : 'text-neutral-dark2'}`}>{sub}</p>}
      <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-secondary-main" aria-hidden="true" />
    </div>
  );
}

const btnPrimary = 'inline-flex min-h-[44px] items-center justify-center rounded-full bg-secondary-main px-5 text-xs md:min-h-[48px] md:px-7 md:text-sm font-bold uppercase tracking-wide text-primary-darker shadow-lg transition-all hover:-translate-y-0.5 hover:bg-secondary-lighter md:text-base';
const btnGhost = 'inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-white/80 px-5 text-xs md:min-h-[48px] md:px-7 md:text-sm font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-primary-main md:text-base';
const btnBlue = 'inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary-main px-7 text-sm font-bold uppercase tracking-wide text-white shadow transition-all hover:-translate-y-0.5 hover:bg-primary-darker md:text-base';

// Moves the "Explore" carousel off its first slide after 3 s so the 3D effect is visible.
function NextSlider() {
  const swiper = useSwiper();
  useEffect(() => {
    if (swiper.activeIndex === 0) {
      const t = setTimeout(() => swiper.slideTo(1, 1000), 3000);
      return () => clearTimeout(t);
    }
  }, [swiper]);
  return null;
}

const fmtDate = (iso, locale) => {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(locale === 'kn' ? 'kn-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
  } catch (e) {
    return iso;
  }
};

export default function HomePage({ locale = 'en' }) {
  const lang = locale === 'kn' ? 'kn' : 'en';
  const t = homeText[lang];
  const { isScroll } = useMyContext();
  const axios = useApi();
  const [newsHome, setNewsHome] = useState(null);
  const href = (path) => `/${lang}${path}`;

  const { data: certificates } = useQuery({ queryKey: ['certificates'], queryFn: () => fetchJson(axios, '/api/certificates?populate=*'), staleTime: 3600e3 });
  const { data: homeAbouts } = useQuery({ queryKey: ['homeabouts', lang], queryFn: () => fetchJson(axios, `/api/homeabouts?locale=${lang}`), staleTime: 3600e3 });
  const { data: tenders } = useQuery({ queryKey: ['home-tenders'], queryFn: () => fetchJson(axios, '/api/tender-notifications?sort[0]=createdAt:desc&pagination[pageSize]=10'), staleTime: 1800e3 });

  // Important / caution strip (CMS "home-new"; silently absent when the CMS has none).
  useEffect(() => {
    let alive = true;
    axios
      .get('/api/home-new')
      .then((r) => alive && setNewsHome(r.data?.data || null))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [axios]);

  const about = homeAbouts?.data?.[0]?.attributes;
  const aboutText = (blocks) => blocks?.map((b) => b?.children?.map((c) => c?.text).join('')).filter(Boolean).join('\n\n') || '';
  const tenderRows = (tenders?.data || []).map((it) => ({ title: it.attributes?.title?.trim(), lastDate: it.attributes?.last_date })).filter((r) => r.title);
  const noticeRows = tenderRows.length ? tenderRows : fallbackNotices.slice(0, 10).map((title) => ({ title }));
  const certImages = certificates?.data?.[0]?.attributes?.image?.data?.map((i) => i?.attributes?.url).filter(Boolean);
  const certs = certImages?.length ? certImages : LOCAL_CERTS.map((c) => c.src);
  const notiImages = [notiMilk, notiGhee, lang === 'kn' ? notiKulfiKn : notiKulfiEn, notiNaturals, lang === 'kn' ? notiIceKn : notiIceEn, notiBanner1, notiBanner];
  const heroH = isScroll ? 'h-[440px] md:h-[812px]' : 'h-[440px] md:h-screen';

  return (
    <div className={`absolute z-[-1] h-full w-full ${isScroll ? 'top-[170px] md:top-48' : ''}`}>
      {/* ---------- Hero ---------- */}
      <section className={`relative w-full overflow-hidden bg-primary-darker ${heroH}`}>
        <video className="absolute inset-0 h-full w-full object-cover" src="/video/banner2026.mp4" muted autoPlay loop playsInline aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" aria-hidden="true" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-5 pb-10 md:px-6 md:pb-20">
            <Fade bottom>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary-lighter md:text-sm md:tracking-[0.25em]">{t.eyebrow}</p>
              <h1 className="mt-2 max-w-3xl font-heading text-2xl uppercase leading-tight text-white drop-shadow md:mt-3 md:text-4xl lg:text-6xl">{t.welcome}</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/90 md:mt-4 md:text-lg lg:text-xl">{t.heroText}</p>
              <div className="mt-4 flex flex-wrap gap-3 md:mt-8 md:gap-4">
                <Link href={href('/our-product')} className={btnPrimary}>
                  {t.exploreProducts}
                </Link>
                <Link href={href('/contact')} className={btnGhost}>
                  {t.contactUs}
                </Link>
              </div>
            </Fade>
          </div>
        </div>
        <a href="#explore" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/80 motion-safe:animate-bounce md:block" aria-label="Scroll down">
          <FaChevronDown size={22} />
        </a>
      </section>

      {newsHome?.attributes?.important && (
        <div className="flex min-h-14 w-full items-center justify-center bg-red-600 px-4 py-3">
          <p className="text-center text-sm font-semibold text-white md:text-base">
            {t.important}: {newsHome.attributes.important}
          </p>
        </div>
      )}
      {newsHome?.attributes?.caution && (
        <div className="marquee-latest flex min-h-12 w-full items-center overflow-hidden bg-white px-4">
          <p className="mr-3 font-bold uppercase text-red-600">{t.caution}:</p>
          <div className="w-full text-nowrap text-sm font-bold text-green-900">{newsHome.attributes.caution}</div>
        </div>
      )}

      {/* ---------- Explore ---------- */}
      <section id="explore" className="relative z-[1] w-full bg-primary-subtle py-16 md:py-24">
        <SectionTitle eyebrow={t.exploreEyebrow} title={t.exploreTitle} sub={t.tagline} />
        <div className="relative z-10 mt-10 w-full">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            coverflowEffect={{ rotate: 30, stretch: 0, depth: 200, modifier: 1, slideShadows: false }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.25}
            breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 40 } }}
            navigation
            pagination={{ clickable: true }}
            loop
            className="max-w-7xl"
          >
            {FEATURE_CARDS.map((c) => (
              <SwiperSlide className="swiper-sldier-card lg:p-10" key={c.img}>
                <FeatureCard imgUrl={FEAT[c.img].src} title={c[lang]} href={href(c.path)} />
              </SwiperSlide>
            ))}
            <NextSlider />
          </Swiper>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <ParallaxBanner layers={[{ image: '/images/home-about.png', speed: -20 }]} className="w-full">
        <section className="w-full px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow={t.aboutEyebrow} title="KMF Nandini" light />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Fade left>
                <article className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md md:p-8">
                  <h3 className="font-heading text-lg uppercase text-secondary-lighter md:text-2xl">{t.aboutKmf}</h3>
                  <p className="mt-4 whitespace-pre-line text-justify text-sm leading-relaxed md:text-base">{aboutText(about?.about1)}</p>
                </article>
              </Fade>
              <Fade right>
                <article className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md md:p-8">
                  <h3 className="font-heading text-lg uppercase text-secondary-lighter md:text-2xl">{t.ourBrand}</h3>
                  <p className="mt-4 whitespace-pre-line text-justify text-sm leading-relaxed md:text-base">{aboutText(about?.about2)}</p>
                </article>
              </Fade>
            </div>
            <div className="mt-8 text-center">
              <Link href={href('/about/company-profile')} className={btnPrimary}>
                {t.readMore}
              </Link>
            </div>
          </div>
        </section>
      </ParallaxBanner>

      {/* ---------- Know your milk ---------- */}
      <section className="relative w-full overflow-hidden bg-[#30ABDC]">
        <img loading="lazy" decoding="async" src="/images/Curve.svg" className="absolute inset-0 hidden h-full w-full object-cover opacity-60 md:block" alt="" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <Fade left>
            <div className="flex items-center justify-center">
              <img loading="lazy" decoding="async" src={lang === 'kn' ? milkglassKnImg.src : milkglassImg.src} className="max-h-[480px] w-auto" alt="" />
            </div>
          </Fade>
          <div>
            <Fade right>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-darker md:text-sm">{t.milkEyebrow}</p>
              <h2 className="mt-2 font-heading text-2xl uppercase text-white md:text-4xl">{t.knowYourMilk}</h2>
              <p className="mt-4 text-justify text-sm leading-relaxed text-white/95 md:text-base">{t.milkText}</p>
            </Fade>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              {t.milkTiles.map((label, i) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl bg-white/15 p-3 backdrop-blur-sm md:p-4">
                  <img loading="lazy" decoding="async" src={KNOW_ICONS[i].src} alt="" className="h-12 w-12 shrink-0 md:h-16 md:w-16" />
                  <span className="text-xs font-semibold text-white md:text-base">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Notifications & tenders ---------- */}
      <section className="w-full bg-white py-16 md:py-24">
        <SectionTitle eyebrow={t.noticesEyebrow} title={t.notices} />
        <div className="mx-auto mt-10 grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-light1 shadow-sm">
            <h3 className="bg-primary-gradient px-5 py-4 font-heading text-sm uppercase text-white md:text-base">{t.tenderNotices}</h3>
            <ul className="max-h-[420px] divide-y divide-neutral-light2 overflow-y-auto">
              {noticeRows.map((n, i) => (
                <li key={i}>
                  <Link href={href('/blog/notification')} className="flex gap-3 px-5 py-3 text-sm transition-colors hover:bg-primary-subtle">
                    <FaRegHandPointRight className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                    <span>
                      <span className="block text-gray-900">{n.title}</span>
                      {n.lastDate && (
                        <span className="block text-xs text-neutral-dark2">
                          {t.lastDate}: {fmtDate(n.lastDate, lang)}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-light2 p-4 text-right">
              <Link href={href('/blog/notification')} className="text-sm font-bold text-primary-main underline-offset-4 hover:underline">
                {t.viewAll} →
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-3 font-heading text-sm uppercase text-primary-main md:text-base">{t.latestFromNandini}</h3>
            <div className="w-full overflow-hidden rounded-2xl">
              <div className="animate-scroll flex w-max gap-4">
                {[...notiImages, ...notiImages].map((img, i) => (
                  <div key={i} className="h-64 w-72 flex-shrink-0 overflow-hidden rounded-2xl md:h-[420px] md:w-[340px]">
                    <img loading="lazy" decoding="async" className="h-full w-full object-cover" src={img.src} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Quick links ---------- */}
      <section className="relative w-full overflow-hidden bg-neutral-light3 py-16 md:py-24">
        <video src="/video/vid.webm" autoPlay muted loop playsInline className="absolute inset-0 z-0 h-full w-full object-cover opacity-20" aria-hidden="true" />
        <div className="relative z-[1]">
          <SectionTitle eyebrow={t.quickEyebrow} title={t.quickLinks} />
          <Fade bottom>
            <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
              {QUICK_LINKS.map((q) => (
                <QuickLink key={q.path} icon={ICONS[q.icon]} title={q[lang]} href={href(q.path)} />
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ---------- Our story (video) ---------- */}
      <section className="w-full bg-white py-16 md:py-24">
        <SectionTitle eyebrow={t.storyEyebrow} title={t.ourStory} />
        <div className="mx-auto mt-10 max-w-5xl px-4">
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
            <iframe src="https://www.youtube.com/embed/UAgaqU1kQeA?si=CNrdzt5pl7mkoLJq" title="KMF Nandini" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={href('/blog/gallery')} className={btnBlue}>
              {t.gallery}
            </Link>
            <Link href={href('/contact')} className={btnPrimary}>
              {t.getInTouch}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Certificates ---------- */}
      <section className="w-full bg-primary-subtle py-16 md:py-24">
        <SectionTitle eyebrow={t.certEyebrow} title={t.certificates} />
        <div className="mx-auto mt-10 max-w-6xl px-4">
          <Swiper watchSlidesProgress slidesPerView={2} spaceBetween={16} breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 24 }, 1024: { slidesPerView: 4, spaceBetween: 24 } }} autoplay={{ delay: 2500, disableOnInteraction: false }} loop={certs.length > 4} modules={[FreeMode, Autoplay]} className="w-full">
            {certs.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex h-40 items-center justify-center rounded-2xl border border-neutral-light1 bg-white p-4 shadow-sm">
                  <img loading="lazy" decoding="async" src={src} alt={`Certificate ${idx + 1}`} className="max-h-full w-auto object-contain" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Footer />
    </div>
  );
}
