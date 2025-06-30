const Footer = () => {
  return (
    <footer className="bg-cyan-900 text-white text-center py-4">
      <div className="space-x-4">
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <a href="#" className="hover:underline">
          Terms
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </div>
      <hr className="my-2" />
      <p className="text-xs">&copy; 2025 Notes App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
