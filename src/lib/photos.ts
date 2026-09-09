export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  profile: string;
  unsplash: string;
};

const utm = "utm_source=tinycabin&utm_medium=referral";

export const photos = {
  heroForest: {
    src: "/photos/hero-forest.jpg",
    width: 2200,
    height: 1467,
    alt: "A brown wooden cabin in a sunlit forest",
    photographer: "Olivier Guillard",
    profile: `https://unsplash.com/@olivier_twwli?${utm}`,
    unsplash: `https://unsplash.com/photos/FKJgBUDoVC0?${utm}`,
  },
  zermatt: {
    src: "/photos/zermatt-cabin.jpg",
    width: 1800,
    height: 2700,
    alt: "A wooden cabin nestled in the woods near Zermatt, Switzerland",
    photographer: "Ryan Klaus",
    profile: `https://unsplash.com/@ryankphoto?${utm}`,
    unsplash: `https://unsplash.com/photos/VQVmkIQojVk?${utm}`,
  },
  alpineLake: {
    src: "/photos/alpine-lake.jpg",
    width: 1800,
    height: 1200,
    alt: "A brown house on a still alpine lake at dusk",
    photographer: "Luca Bravo",
    profile: `https://unsplash.com/@lucabravo?${utm}`,
    unsplash: `https://unsplash.com/photos/zAjdgNXsMeg?${utm}`,
  },
  snowCabin: {
    src: "/photos/snow-cabin.jpg",
    width: 1600,
    height: 2400,
    alt: "A wooden cabin beside a frozen pond and pines after snowfall",
    photographer: "Ian Keefe",
    profile: `https://unsplash.com/@iankeefe?${utm}`,
    unsplash: `https://unsplash.com/photos/OgcJIKRnRC8?${utm}`,
  },
  modernCabin: {
    src: "/photos/modern-cabin.jpg",
    width: 1600,
    height: 1067,
    alt: "A dark modern cabin with a metal roof among evergreen trees",
    photographer: "Lili Kovac",
    profile: `https://unsplash.com/@lilschk?${utm}`,
    unsplash: `https://unsplash.com/photos/BSQq5dRT_KU?${utm}`,
  },
  interiorStove: {
    src: "/photos/interior-stove.jpg",
    width: 1600,
    height: 1067,
    alt: "A wood-burning stove glowing inside a cedar cabin",
    photographer: "Clay Banks",
    profile: `https://unsplash.com/@claybanks?${utm}`,
    unsplash: `https://unsplash.com/photos/79yk4XalXCM?${utm}`,
  },
  snowyHut: {
    src: "/photos/snowy-hut.jpg",
    width: 1600,
    height: 900,
    alt: "A small wooden hut in a foggy snowy forest",
    photographer: "Krisztián Korhetz",
    profile: `https://unsplash.com/@kkorhetz?${utm}`,
    unsplash: `https://unsplash.com/photos/dB_OZdHyUws?${utm}`,
  },
  woodsCabin: {
    src: "/photos/woods-cabin.jpg",
    width: 1600,
    height: 2400,
    alt: "A brown wooden house deep in a dark green forest",
    photographer: "Björn Grochla",
    profile: `https://unsplash.com/@bejayoern?${utm}`,
    unsplash: `https://unsplash.com/photos/jXJEnwB1C5Q?${utm}`,
  },
  interiorAframe: {
    src: "/photos/interior-aframe.jpg",
    width: 1600,
    height: 1067,
    alt: "An A-frame cabin living room with a leather sofa and tall windows",
    photographer: "Clay Banks",
    profile: `https://unsplash.com/@claybanks?${utm}`,
    unsplash: `https://unsplash.com/photos/3uuNKtEK8-g?${utm}`,
  },
} as const satisfies Record<string, Photo>;

export const galleryPhotos: Photo[] = [
  photos.zermatt,
  photos.alpineLake,
  photos.snowCabin,
  photos.woodsCabin,
  photos.interiorAframe,
  photos.snowyHut,
];

export const photoList = Object.values(photos);
