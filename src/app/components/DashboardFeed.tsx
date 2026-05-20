import { useState, useEffect } from 'react';
import { Claim } from '../types';
import { mockClaims } from '../mockData';
import { ClaimCard } from './ClaimCard';
import { CarouselRow } from './CarouselRow';

export function DashboardFeed() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setClaims(mockClaims);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5BFF]"></div>
      </div>
    );
  }

  const fypClaims = [...claims].sort(() => 0.5 - Math.random()).slice(0, 4);
  const breakingClaims = claims.filter(c => c.status === 'debunked' || c.status === 'suspicious');
  const politicsClaims = claims.filter(c => c.category === 'Politics');
  const techClaims = claims.filter(c => c.category === 'Technology');

  return (
    <div className="w-full -mx-6 md:mx-0 py-8">
      <CarouselRow title="For You" subtitle="Personalized recommendations based on your activity">
        {fypClaims.map(claim => <ClaimCard key={`fyp-${claim.id}`} claim={claim} />)}
      </CarouselRow>

      <CarouselRow title="Breaking Now" subtitle="High-impact claims actively being verified">
        {breakingClaims.map(claim => <ClaimCard key={`brk-${claim.id}`} claim={claim} />)}
      </CarouselRow>

      <CarouselRow title="Politics">
        {politicsClaims.map(claim => <ClaimCard key={`pol-${claim.id}`} claim={claim} />)}
      </CarouselRow>

      <CarouselRow title="Technology">
        {techClaims.map(claim => <ClaimCard key={`tech-${claim.id}`} claim={claim} />)}
      </CarouselRow>
    </div>
  );
}
