import Link from 'next/link';
import PageShell, { Hero, Card, InfoBox } from '@/components/forms/PageShell';
import DealerForm from './DealerForm';
import { dealerText } from '@/configtext/forms';
import { langOf } from '@/lib/seo';

export default function DealershipPage({ params }) {
  const lang = langOf(params.locale);
  const t = dealerText[lang];
  return (
    <PageShell
      hero={<Hero title={t.heroTitle} intro={t.heroIntro} note={t.heroNote} />}
      aside={
        <>
          <InfoBox title={t.howTitle}>
            <ol className="list-decimal space-y-2 pl-5">
              {t.howSteps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </InfoBox>
          <InfoBox title={t.outsideTitle}>
            <p>{t.outsideBody}</p>
            <p>
              <Link href={`/${lang}/notify-me`} className="font-semibold text-primary-main underline">
                {lang === 'kn' ? 'ಗ್ರಾಹಕರಾಗಿದ್ದೀರಾ? "ಲಭ್ಯವಾದಾಗ ತಿಳಿಸಿ" →' : 'A customer? "Notify me when available" →'}
              </Link>
            </p>
          </InfoBox>
          <InfoBox title={t.chatTitle}>
            <p>{t.chatBody}</p>
          </InfoBox>
        </>
      }
    >
      <Card title={t.formTitle} intro={t.formIntro}>
        <DealerForm lang={lang} />
      </Card>
    </PageShell>
  );
}
