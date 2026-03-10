export type Unit = 'm' | 'cm' | 'ft';

export type Garden = {
  id: string;
  userId: string;
  name: string;
  width: number;
  height: number;
  unit: Unit;
  notes?: string;
};

export type FieldType =
  | 'open'
  | 'raised'
  | 'greenhouse'
  | 'tunnel'
  | 'herb'
  | 'flower'
  | 'orchard'
  | 'other';

export type Field = {
  id: string;
  gardenId: string;
  name: string;
  type: FieldType;
  width: number;
  height: number;
  x: number;
  y: number;
  orientation?: number;
  notes?: string;
};

export type Row = {
  id: string;
  fieldId: string;
  name: string;
  length: number;
  width: number;
  orientation?: number;
  x: number;
  y: number;
  notes?: string;
};

export type Plant = {
  id: string;
  name: string;
  category?: string;
  variety?: string;
  sowingDate?: string;
  plantingDate?: string;
  harvestDate?: string;
  quantity?: number;
  spacingCm?: number;
  companionNotes?: string;
  notes?: string;
};

export type PlantPlacement = {
  id: string;
  plantId: string;
  gardenId: string;
  fieldId?: string;
  rowId?: string;
  structureId?: string;
  x?: number;
  y?: number;
  quantity?: number;
};

export type StructureType =
  | 'greenhouse'
  | 'tunnel'
  | 'cold_frame'
  | 'raised_bed'
  | 'compost'
  | 'water_point'
  | 'irrigation'
  | 'feeding'
  | 'storage'
  | 'tool_area'
  | 'path'
  | 'fence'
  | 'animal_enclosure'
  | 'fruit_zone'
  | 'herb_zone'
  | 'flower_border'
  | 'seed_starting'
  | 'other';

export type StructureStatus = 'active' | 'planned' | 'needs_repair' | 'seasonal';

export type Structure = {
  id: string;
  gardenId: string;
  type: StructureType;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  status?: StructureStatus;
  notes?: string;
};

export type WaterPoint = {
  id: string;
  gardenId: string;
  type: 'tap' | 'rain_barrel' | 'pond' | 'pump' | 'hose';
  name: string;
  x: number;
  y: number;
  coverageRadius?: number;
  notes?: string;
};

export type FeedingPoint = {
  id: string;
  gardenId: string;
  name: string;
  x: number;
  y: number;
  notes?: string;
};

export type CompostZone = {
  id: string;
  gardenId: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  notes?: string;
};

export type AnimalZone = {
  id: string;
  gardenId: string;
  type: 'chicken' | 'duck' | 'rabbit' | 'goat' | 'bee' | 'other';
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  notes?: string;
  feedNotes?: string;
  waterNotes?: string;
};

export type TaskType =
  | 'sowing'
  | 'planting'
  | 'watering'
  | 'fertilizing'
  | 'pruning'
  | 'harvesting'
  | 'cleaning'
  | 'animal_care'
  | 'maintenance'
  | 'other';

export type TaskStatus = 'open' | 'scheduled' | 'done' | 'skipped';

export type Task = {
  id: string;
  title: string;
  type: TaskType;
  dueDate: string;
  status: TaskStatus;
  notes?: string;
  linkedType?: string;
  linkedId?: string;
};
