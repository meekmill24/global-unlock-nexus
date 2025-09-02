const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">GU</span>
            </div>
            <span className="font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Global Unlock Hub
            </span>
          </div>
          
          <div className="text-muted-foreground text-sm text-center md:text-right">
            <p>© 2024 Global Unlock Hub. All rights reserved.</p>
            <p className="mt-1">Professional phone unlocking and software solutions worldwide.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;