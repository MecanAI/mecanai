export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mediaUrls?: string[];
  mediaType?: 'image' | 'video' | 'audio';
}

export interface DiagnosticResult {
  id: string;
  problem: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  solution: string;
  estimatedCost: string;
  urgency: string;
  vehicleInfo?: VehicleInfo;
  aiAnalysis?: AIAnalysis;
  createdAt?: Date;
}

export interface VehicleInfo {
  brand: string;
  model: string;
  year: string;
  mileage: string;
}

export interface AIAnalysis {
  openai?: string;
  anthropic?: string;
  gemini?: string;
  mistral?: string;
  cohere?: string;
  confidence: number;
  consensus: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  planType: 'free' | 'pro' | 'workshop';
  planExpiresAt?: Date;
  createdAt: Date;
}

export interface Plan {
  id: 'pro' | 'workshop';
  name: string;
  price: number;
  currency: string;
  period: string;
  users: string;
  features: string[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  validUntil?: Date;
  active: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: Date;
}
