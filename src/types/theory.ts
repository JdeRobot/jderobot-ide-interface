interface CarouselImage {
  title: string;
  desc: string;
  img: string;
}

export interface CarouselData {
  section: string;
  images: CarouselImage[];
}

export interface TimelineEntry {
  title: string;
  era?: string;
  desc: string[] | string;
  image: string;
  link?: string;
  type?: string;
}

export interface TimelineComparisonEntry {
  title: string;
  timeline: TimelineEntry[];
}
