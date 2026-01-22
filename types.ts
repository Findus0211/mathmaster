export interface DataPoint {
  x: number;
  y: number | null;
}

export enum ViewState {
  HOME = 'HOME',
  GRAPH = 'GRAPH',
  TUTOR = 'TUTOR'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
