const SectionHeader = ({ title, subtitle, eyebrow }) => {
  return (
    <div className="section-header reveal-up">
      <p className="eyebrow">{eyebrow || 'Sagar Kumar'}</p>
      <h1>{title}</h1>
      {subtitle ? <p className="subtle">{subtitle}</p> : null}
    </div>
  );
};

export default SectionHeader;
