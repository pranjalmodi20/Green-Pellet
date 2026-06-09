import React, { useEffect, useState, useCallback } from 'react';
import AboutHero from '../../components/about/AboutHero';
import MissionVisionSection from '../../components/about/MissionVisionSection';
import JourneyTimeline from '../../components/about/JourneyTimeline';
import LeadershipSection from '../../components/about/LeadershipSection';
import SustainabilitySection from '../../components/about/SustainabilitySection';
import AchievementsSection from '../../components/about/AchievementsSection';
import AboutCTA from '../../components/about/AboutCTA';
import { fetchAboutPage } from '../../services/aboutService';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAbout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAboutPage();
      setAboutData(data);
    } catch (err) {
      console.error('Failed to load about page:', err);
      setError(err.response?.data?.message || 'Unable to load About page content. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAbout();
  }, [loadAbout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          <p className="font-body-md text-on-surface-variant">Loading About Us...</p>
        </div>
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-grid-margin-desktop">
        <div className="text-center max-w-lg space-y-6">
          <p className="font-headline-lg text-headline-lg-mobile text-primary">Something went wrong</p>
          <p className="font-body-md text-on-surface-variant">{error}</p>
          <button
            type="button"
            onClick={loadAbout}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps uppercase"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-24">
      <AboutHero hero={aboutData.hero} companyStory={aboutData.companyStory} />
      <MissionVisionSection
        purpose={aboutData.purpose}
        vision={aboutData.vision}
        mission={aboutData.mission}
      />
      <JourneyTimeline timeline={aboutData.timeline} />
      <LeadershipSection leadership={aboutData.leadership} />
      <SustainabilitySection sustainability={aboutData.sustainability} />
      <AchievementsSection achievements={aboutData.achievements} />
      <AboutCTA cta={aboutData.cta} />
    </div>
  );
};

export default About;
