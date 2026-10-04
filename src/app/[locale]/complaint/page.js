import PageShell, { Hero, Card, InfoBox } from '@/components/forms/PageShell';
import ComplaintForm from './ComplaintForm';
import ComplaintStatus from './ComplaintStatus';
import { complaintText } from '@/configtext/forms';
import { langOf } from '@/lib/seo';
import { CONTACT } from '@/lib/site';

export default function ComplaintPage({ params, searchParams }) {
  const lang = langOf(params.locale);
  const t = complaintText[lang];
  const ticket = typeof searchParams?.ticket === 'string' ? searchParams.ticket.slice(0, 20) : '';
  return (
    <PageShell
      hero={<Hero title={t.heroTitle} intro={t.heroIntro} note={t.heroNote} />}
      aside={
        <>
          <Card title={t.statusTitle} intro={t.statusIntro} id="status">
            <ComplaintStatus lang={lang} initialTicket={ticket} />
          </Card>
          <InfoBox title={t.otherWays}>
            <p>
              <a href={`tel:${CONTACT.tollFreeDial}`} className="font-semibold text-primary-main underline">
                1800 425 8030
              </a>{' '}
              · 080-260 96800
            </p>
            <p>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-main underline">
                WhatsApp 7899683696
              </a>
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary-main underline break-all">
                {CONTACT.email}
              </a>
            </p>
          </InfoBox>
        </>
      }
    >
      <Card title={t.formTitle}>
        <ComplaintForm lang={lang} />
      </Card>
    </PageShell>
  );
}
