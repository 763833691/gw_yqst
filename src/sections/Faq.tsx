import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqConfig } from '../config';

export default function Faq() {
  if (!faqConfig.title || faqConfig.items.length === 0) return null;

  return (
    <section id="faq" className="section-shell faq-section">
      <div className="site-container">
        <div className="section-kicker">{faqConfig.sectionLabel}</div>
        <div className="section-rule" />
        <div className="faq-layout">
          <div className="faq-intro">
            <h2>{faqConfig.title}</h2>
            <p>{faqConfig.description}</p>
          </div>
          <Accordion type="single" collapsible className="faq-list">
            {faqConfig.items.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index + 1}`} className="faq-item">
                <AccordionTrigger className="faq-trigger">
                  <span className="faq-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="faq-content">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
