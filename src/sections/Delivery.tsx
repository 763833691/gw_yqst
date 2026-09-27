import { deliveryConfig } from '../config';

export default function Delivery() {
  if (!deliveryConfig.title) return null;

  return (
    <section id="delivery" className="section-shell delivery-section">
      <div className="site-container">
        <div className="section-kicker">{deliveryConfig.sectionLabel}</div>
        <div className="section-rule" />
        <div className="delivery-intro">
          <h2>{deliveryConfig.title}</h2>
          <p>{deliveryConfig.description}</p>
        </div>
        <div className="delivery-modes">
          {deliveryConfig.modes.map((mode, index) => (
            <article key={mode.title}>
              <span>0{index + 1}</span>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
            </article>
          ))}
        </div>
        <div className="delivery-path">
          <div className="delivery-path__heading">
            <span>建议合作路径</span>
            <strong>从目标确认到持续运营</strong>
          </div>
          <ol>
            {deliveryConfig.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
