import { ImageSourcePropType } from 'react-native';

export const festivalSources: Record<string, ImageSourcePropType> = {
  ultra: require('../../assets/festivals/festival-ultra.png'),
  coachella: require('../../assets/festivals/festival-coachella.png'),
  arena: require('../../assets/festivals/festival-arena.png'),
  burningman: require('../../assets/festivals/festival-burningman.png'),
  stadium: require('../../assets/festivals/festival-stadium.png'),
  warehouse: require('../../assets/festivals/festival-warehouse.png'),
};

export function resolveFestival(key?: string | null): ImageSourcePropType {
  if (key && festivalSources[key]) return festivalSources[key];
  return festivalSources.stadium;
}
