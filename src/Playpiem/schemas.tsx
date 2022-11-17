interface Time {
  readonly unixTime: number;
  readonly readableTime: string;
}

interface Location {
  readonly city: string;
  readonly lat: string;
  readonly lng: string;
}

export type { Time, Location };
