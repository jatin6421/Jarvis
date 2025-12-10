export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export enum ConnectionState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}

export interface SystemStatus {
  battery: number;
  cpu: number;
  memory: number;
  network: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}
