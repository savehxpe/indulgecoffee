export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'brewing' | 'meals';
  description: string;
  price: string;
  altitude?: string;
  isSignature?: boolean;
}

export interface LeadSubmission {
  id: string;
  name: string;
  contact: string;
  type: 'order' | 'event' | 'newsletter' | 'direction';
  message?: string;
  createdAt: string;
}

export interface EventBooking {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  guests: string;
  date: string;
  notes?: string;
  createdAt: string;
}
