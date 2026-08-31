const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} Sagar Kumar. All rights reserved.</p>
        <p>
          QA Automation · Full-Stack · <span className="mono">CI/CD</span> — built with React, deployed via GitHub Actions.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
