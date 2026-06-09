import React, { useState } from 'react';

const TestimonialsCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultTestimonials = [
    {
      _id: 'anil-sharma',
      quote: "Green Pellets India has transformed our fuel logistics. Their precision in caloric output is unmatched in the Indian biomass market.",
      name: "Anil Sharma",
      role: "COO",
      company: "Heavy Industries Ltd.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZbqeaTqHVyAIltYNEx9CXLmV0_Q9R-XMNTovo0_FtTEgynM_cw59STfKqTEgkf17uGyEfGDrhKUv_K9ENQKIMSncGcniFOZvuQ68W5vxsJ1benA2cwgESPxcSVFwV3vG8rftHeUM-JivpbpsbVfKCvB8zx24G8NZHnzAFzrEdMLhRIpHLlTvje2RiGJh6YyuTBBwymgqeZsSnTxz8jC338hku_qei3x4XB0QgwEwiCsARTVAa_qG9csf_C04lEwAlmdUCfFhugBI"
    },
    {
      _id: 'meera-kapoor',
      quote: "Switching to their Pine Pellets reduced our carbon footprint by 42% in just one quarter. It’s both a financial and ecological win.",
      name: "Meera Kapoor",
      role: "Sustainability Lead",
      company: "Global Textiles",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtjOlLxrB4Y7f5h4ijLVOmHaIBmmkWOweLkwAozq3ZgvYmnHQoCM5nxu8D466Pc65vrXwrsihHRiYGzeSkvoi2HrmqYiI0q9FY3JBTCPEiAqH9G0Ymb_cPcDflLLeRufkZYI8sCUFDRZOGTrueT-n7-_uv_WP-9yZzrCadJ9fqX94OQD2S1Aphy3ZzeKwCpcsaEC3ML8QAu6HcBMfuCiLf_pski5Gd8v78fC5c4BW3dP0FWsXqpPOlSIj5KgEOn47rMIVJGyyLTFA"
    },
    {
      _id: 'vikram-singh',
      quote: "Their supply chain reliability is what sets them apart. We never have to worry about energy stockouts even during peak seasons.",
      name: "Vikram Singh",
      role: "Director",
      company: "Radiant Energy Corp.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNRiMSRXWqwIBUrm-PpomJFpZvOKNzz-eYD71elZx3EhL4jSw-76Dp1ZnR-YGMbNIN23P-peekWCs5xylOA2WH_sXdwyqjx5JFiQ0z52iTmzR2AWw16sd7oDrJXfkZcpAwWnZn173lM8TdnRtI2hgSVKAVof4JoHKv9APhm-bp70AmmcKfTATs7Ed45zsOd7jP-NZT4WnByQrcQd1s0884jeVX-k1_FbuovcCk2O8CDH9DjM6ygl3vb3R5tnmjji9HtFmiHywwM7o"
    }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, displayTestimonials.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= displayTestimonials.length - 3 ? 0 : prev + 1));
  };

  const visibleTestimonials = displayTestimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-section-gap-desktop bg-surface-container-low">
      <div className="max-w-container-max-width mx-auto px-grid-margin-desktop">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-24">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8 lg:mb-0">Executive Voices</h2>
          <div className="flex space-x-4">
            <button 
              onClick={handlePrev} 
              className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={handleNext} 
              className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-grid-gutter">
          {visibleTestimonials.map((item) => (
            <div key={item._id} className="glass-panel p-12 rounded-[48px] ambient-glow flex flex-col justify-between min-h-[400px]">
              <span className="material-symbols-outlined text-6xl text-primary/10" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              <p className="font-body-lg text-on-surface text-xl leading-relaxed mb-8">"{item.quote || item.content}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 overflow-hidden">
                  <img className="w-full h-full object-cover" src={item.avatar || item.image} alt={item.name} />
                </div>
                <div>
                  <span className="block font-label-caps text-label-caps text-primary">{item.name}</span>
                  <span className="block font-technical-data text-technical-data text-on-surface-variant">
                    {item.role}, {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
