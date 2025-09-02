import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Clock, Globe } from "lucide-react";

const Contact = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@globalunlockhub.com';
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to unlock your devices? Contact our expert team for fast and professional service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">WhatsApp Support</h3>
                  <p className="text-muted-foreground">Instant messaging support</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Get immediate assistance through WhatsApp. Our team is ready to help with your unlocking needs.
              </p>
              <Button variant="hero" onClick={handleWhatsApp} className="w-full">
                Chat on WhatsApp
              </Button>
            </div>

            <div className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Email Support</h3>
                  <p className="text-muted-foreground">Professional email support</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Send us detailed inquiries and get comprehensive responses from our technical team.
              </p>
              <Button variant="glow" onClick={handleEmail} className="w-full">
                Send Email
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-semibold text-foreground">Business Hours</p>
                    <p className="text-muted-foreground">24/7 Support Available</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-semibold text-foreground">Global Service</p>
                    <p className="text-muted-foreground">Worldwide Device Support</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">support@globalunlockhub.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-muted-foreground">+1 (234) 567-8900</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-bold mb-2 text-foreground">Need Immediate Help?</h4>
              <p className="text-muted-foreground mb-4">
                Our support team is standing by to assist you with any questions or technical issues.
              </p>
              <div className="flex gap-3">
                <Button variant="hero" onClick={handleWhatsApp} className="flex-1">
                  WhatsApp
                </Button>
                <Button variant="glow" onClick={handleEmail} className="flex-1">
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;