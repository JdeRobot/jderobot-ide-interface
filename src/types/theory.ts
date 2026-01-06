interface CarouselImage {
  title: string;
  desc: string;
  img: string;
}

export interface CarouselData {
  section: string;
  images: CarouselImage[];
}