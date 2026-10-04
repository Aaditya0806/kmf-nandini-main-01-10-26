'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Fade from 'react-reveal/Fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow, Autoplay, FreeMode } from 'swiper/modules';
import { ParallaxBanner } from 'react-scroll-parallax';
import { useQuery } from '@tanstack/react-query';
import { FaShoppingCart, FaMapMarkerAlt, FaVideo, FaStore, FaBell, FaRegCommentDots, FaBriefcase, FaBoxOpen, FaChevronDown } from 'react-icons/fa';
import Footer from '@/components/Footer';
import useApi from '@/hooks/useApi.js';
import { useMyContext } from '@/context/headerContext.js';
import { homeText, FEATURE_CARDS, QUICK_LINKS } from '@/configtext/home';
import { notices as fallbackNotices } from '@/app/tenter-home.js';
import { FeatureCard, QuickLink } from './Cards';

import cert1 from '@/images/homeImages/certi/NABL_24b98112d5.jpg';
import cert2 from '@/images/homeImages/certi/FSSAI_5e558596c3.png';
import cert3 from '@/images/homeImages/certi/download_1_c196cc66d7.png';
import cert4 from '@/images/homeImages/certi/fssc-22000.png';
import feat1 from '@/images/homeImages/feat/ksheerasagara-kmf.webp';
import feat2 from '@/images/homeImages/feat/starpi.jpg';
import feat3 from '@/images/homeImages/feat/strpi2.jpg';
import feat4 from '@/images/homeImages/feat/stapi3.jpg';
import feat5 from '@/images/homeImages/feat/far.jpg';
import feat6 from '@/images/homeImages/feat/featured1.jpg';
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
  products: <FaBoxOpen size={22} />,
  order: <FaShoppingCart size={22} />,
  dealer: <FaStore size={22} />,
  notify: <FaBell size={22} />,
  complaint: <FaRegCommentDots size={22} />,
  careers: <FaBriefcase size={22} />,
  tour: <FaMapMarkerAlt size={22} />,
  video: <FaVideo size={22} />,
};
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
  const todayIST = new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);
  const tenderRows = (tenders?.data || [])
    .map((it) => ({ title: it.attributes?.title?.trim(), ref: it.attributes?.c_no?.trim() || '', lastDate: it.attributes?.last_date || '', open: !!it.attributes?.last_date && it.attributes.last_date >= todayIST }))
    .filter((r) => r.title)
    .sort((a, b) => Number(b.open) - Number(a.open) || String(b.lastDate).localeCompare(String(a.lastDate)));
  const noticeRows = tenderRows.length ? tenderRows : fallbackNotices.slice(0, 10).map((title) => ({ title }));
  const certImages = certificates?.data?.[0]?.attributes?.image?.data?.map((i) => i?.attributes?.url).filter(Boolean);
  const certs = certImages?.length ? certImages : LOCAL_CERTS.map((c) => c.src);
  const notiImages = [notiMilk, notiGhee, lang === 'kn' ? notiKulfiKn : notiKulfiEn, notiNaturals, lang === 'kn' ? notiIceKn : notiIceEn, notiBanner1, notiBanner];

  return (
    <div className={`absolute z-[-1] h-full w-full ${isScroll ? 'top-[170px] md:top-48' : ''}`}>
      {/* ---------- Hero ---------- */}
      <section className="relative w-full bg-primary-darker">
        <div className="relative aspect-video w-full overflow-hidden bg-black md:max-h-screen">
          <video className="absolute inset-0 h-full w-full object-contain" src="/video/banner2026.mp4" muted autoPlay loop playsInline aria-hidden="true" />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-black/80 via-black/15 to-transparent md:block" aria-hidden="true" />
          <a href="#explore" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-white/80 motion-safe:animate-bounce md:block" aria-label="Scroll down">
            <FaChevronDown size={22} />
          </a>
        </div>
        {/* Phones: a card that overlaps the bottom of the video, on a milk-splash ground. Desktop: text over the video. */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#0b3d7a] to-primary-darker px-5 pb-9 pt-7 text-center text-white md:absolute md:inset-0 md:flex md:items-end md:bg-none md:bg-transparent md:p-0 md:text-left md:shadow-none">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-secondary-main/15 blur-3xl md:hidden" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl md:px-6 md:pb-20">
            <Fade bottom>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-lighter md:text-sm md:tracking-[0.25em]">{t.eyebrow}</p>
              <h1 className="mx-auto mt-4 max-w-3xl font-heading text-[26px] uppercase leading-[1.15] text-white md:mx-0 md:mt-3 md:text-4xl md:drop-shadow lg:text-6xl">{t.welcome}</h1>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85 md:mx-0 md:mt-4 md:text-lg lg:text-xl">{t.heroText}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:flex md:flex-wrap md:gap-4">
                <Link href={href('/our-product')} className={`${btnPrimary} w-full md:w-auto`}>
                  {t.exploreProducts}
                </Link>
                <Link href={href('/contact')} className={`${btnGhost} w-full md:w-auto`}>
                  {t.contactUs}
                </Link>
              </div>
            </Fade>
          </div>
        </div>
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
            initialSlide={2}
            coverflowEffect={{ rotate: 35, stretch: 0, depth: 220, modifier: 1, slideShadows: false }}
            autoplay={{ delay: 1800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={1100}
            modules={[Navigation, Pagination, A11y, EffectCoverflow, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.25}
            breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 40 } }}
            navigation
            pagination={{ clickable: true }}
            loop
            loopAdditionalSlides={3}
            className="max-w-7xl"
          >
            {FEATURE_CARDS.map((c) => (
              <SwiperSlide className="swiper-sldier-card lg:p-10" key={c.img}>
                <FeatureCard imgUrl={FEAT[c.img].src} title={c[lang]} href={href(c.path)} />
              </SwiperSlide>
            ))}
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
                  <p className="mt-4 whitespace-pre-line text-left text-sm leading-relaxed md:text-justify md:text-base">{aboutText(about?.about1)}</p>
                </article>
              </Fade>
              <Fade right>
                <article className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md md:p-8">
                  <h3 className="font-heading text-lg uppercase text-secondary-lighter md:text-2xl">{t.ourBrand}</h3>
                  <p className="mt-4 whitespace-pre-line text-left text-sm leading-relaxed md:text-justify md:text-base">{aboutText(about?.about2)}</p>
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

      {/* ---------- Know your milk (designed image, no text) ---------- */}
      <section className="w-full bg-white" aria-label={t.knowYourMilk}>
        <picture>
          <source media="(max-width: 767px)" srcSet="/images/know-your-milk-nandini-mobile.webp" />
          <img loading="lazy" decoding="async" src="/images/know-your-milk-nandini.webp" alt={t.knowYourMilk} className="block h-auto w-full" />
        </picture>
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
                  <Link href={href('/blog/notification')} className={`flex gap-3 px-5 py-3 text-sm transition-colors hover:bg-primary-subtle ${n.lastDate && !n.open ? 'opacity-70' : ''}`}>
                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${n.open ? 'bg-emerald-500' : n.lastDate ? 'bg-neutral-dark4' : 'bg-secondary-main'}`} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug text-gray-900">{n.title}</span>
                      {n.ref && <span className="block truncate text-xs text-neutral-dark2">{n.ref}</span>}
                      {n.lastDate && (
                        <span className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                          <span className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-wide ${n.open ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-light2 text-neutral-dark2'}`}>{n.open ? t.open : t.closed}</span>
                          <span className="text-neutral-dark2">
                            {t.lastDate}: {fmtDate(n.lastDate, lang)}
                          </span>
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
                  <div key={i} className="h-64 flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-light3 md:h-[420px]" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                    <img loading={i < notiImages.length ? 'eager' : 'lazy'} decoding="async" width={img.width} height={img.height} className="h-full w-full object-cover" src={img.src} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Quick links ---------- */}
      <section className="relative w-full overflow-hidden bg-primary-subtle py-16 md:py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-secondary-main/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary-main/15 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <SectionTitle eyebrow={t.quickEyebrow} title={t.quickLinks} sub={t.quickSub} />
          <Fade bottom>
            <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-5">
              {QUICK_LINKS.map((q, i) => (
                <QuickLink key={q.path} icon={ICONS[q.icon]} title={q[lang]} desc={q[`${lang}Desc`]} href={href(q.path)} featured={q.featured} image={q.featured ? '/images/milk-bg-cat.jpg' : undefined} className={i === QUICK_LINKS.length - 1 ? 'col-span-2 md:col-span-1' : ''} />
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
