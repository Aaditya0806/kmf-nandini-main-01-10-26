import Link from 'next/link';
import PageShell, { Hero, Card, InfoBox } from '@/components/forms/PageShell';
import NotifyForm from './NotifyForm';
import { notifyText } from '@/configtext/forms';
import { langOf } from '@/lib/seo';

export default function NotifyMePage({ params, searchParams }) {
  const lang = langOf(params.locale);
  const t = notifyText[lang];
  const initial = {
    pincode: /^[1-9]\d{5}$/.test(String(searchParams?.pincode || '')) ? String(searchParams.pincode) : '',
    product: typeof searchParams?.product === 'string' ? searchParams.product.slice(0, 60) : '',
  };
  return (
    <PageShell
      hero={<Hero title={t.heroTitle} intro={t.heroIntro} note={t.heroNote} />}
      aside={
        <>
          <InfoBox title={t.whyTitle}>
            <p>{t.whyBody}</p>
          </InfoBox>
          <InfoBox title={t.dealerTitle}>
            <p>{t.dealerBody}</p>
            <p>
              <Link href={`/${lang}/dealership`} className="font-semibold text-primary-main underline">
                {t.dealerLink} →
              </Link>
            </p>
          </InfoBox>
        </>
      }
    >
      <Card title={t.formTitle}>
        <NotifyForm lang={lang} initial={initial} />
      </Card>
    </PageShell>
  );
}
