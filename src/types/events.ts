export interface EventData<T> {
  detail?: T;
}

interface AccentColorEvent {
  name: string;
  color: string;
}

export type AccentColorEventData = EventData<AccentColorEvent>;
