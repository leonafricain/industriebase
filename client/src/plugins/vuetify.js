import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
          primary: "#3f51b5",
          secondary: "#03a9f4",
          accent: "#00bcd4",
          error: "#e91e63",
          warning: "#ff9800",
          info: "#607d8b",
          success: "#4caf50"
      },
    },
  },
});
