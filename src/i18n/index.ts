import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to GardenGrid',
      dashboard: 'Dashboard',
      gardens: 'My Gardens',
      addGarden: 'Add Garden',
      tasks: 'Tasks',
      settings: 'Settings',
      profile: 'Profile',
      plants: 'Plants',
      structures: 'Structures',
      animals: 'Animals',
      noGardens: 'No gardens found. Start by creating one!',
      createGarden: 'Create New Garden',
      gardenName: 'Garden Name',
      dimensions: 'Dimensions',
      width: 'Width',
      height: 'Height',
      unit: 'Unit',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      meters: 'Meters',
      feet: 'Feet',
      centimeters: 'Centimeters',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
