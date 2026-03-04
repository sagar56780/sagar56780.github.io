const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header reveal-up">
      <p className="eyebrow">Portfolio</p>
      <h1>{title}</h1>
      {subtitle ? <p className="subtle">{subtitle}</p> : null}
    </div>
  );
};

export default SectionHeader;
