export interface ViralMetrics {
  shares: string;
  reach: string;
  platforms: number;
}

export interface Claim {
  id: string;
  timestamp: string;
  category: string;
  status: 'debunked' | 'verified' | 'suspicious' | 'unknown';
  confidence: number;
  headline: string;
  description: string;
  thumbnail: string;
  viralMetrics: ViralMetrics;
  sources: string[];
  expert: string;
}
