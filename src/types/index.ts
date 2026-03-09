export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Garden {
  id: string;
  userId: string;
  name: string;
  width: number;
  height: number;
  unit: 'meters' | 'feet' | 'centimeters';
  createdAt?: string;
}

export interface Field {
  id: string;
  gardenId: string;
  name: string;
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
  notes?: string;
}

export interface Row {
  id: string;
  fieldId: string;
  name: string;
  orientation?: string;
  length: number;
  width: number;
  notes?: string;
}

export interface Plant {
  id: string;
  gardenId: string;
  fieldId?: string;
  rowId?: string;
  structureId?: string;
  name: string;
  category?: string;
  variety?: string;
  sowingDate?: string;
  plantingDate?: string;
  harvestDate?: string;
  quantity: number;
  notes?: string;
}

export interface Structure {
  id: string;
  gardenId: string;
  name: string;
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
  notes?: string;
  status: 'active' | 'planned' | 'repair' | 'seasonal';
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  type: string;
  date: string;
  status: 'pending' | 'completed';
  linkedEntityId?: string;
  linkedEntityType?: string;
  notes?: string;
  reminderAt?: string;
}
