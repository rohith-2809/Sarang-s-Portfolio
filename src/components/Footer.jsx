const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary py-8 text-center border-t border-slate-700">
      <p className="text-dark-text text-sm">
        © {currentYear} Sarang Rayaji Akhade. All rights reserved.
      </p>
      <p className="text-xs text-slate-600 mt-1">
        Built with React & Tailwind CSS.
      </p>
    </footer>
  );
};
export default Footer;
