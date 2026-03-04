const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>© {new Date().getFullYear()} Sagar Kumar. All rights reserved.</p>
        <p>Built with React and deployed on GitHub Pages.</p>
      </div>
    </footer>
  );
};

export default Footer;
