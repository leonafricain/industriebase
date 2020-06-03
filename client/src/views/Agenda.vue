<template>
  <v-row class="mt-0 pt-0">
    <v-col cols="12">
      <v-sheet height=48>
        <v-toolbar dense flat>
          <v-btn small outlined color="success" class="mr-2 font-weight-bold" @click="dialog = true">Nouvelle Activité
          </v-btn>
          <v-btn small outlined class="mr-0 caption font-weight-bold" color="purple darken-2" @click="setToday">
            Aujourd'hui</v-btn>
          <v-btn fab text small color="grey darken-3" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title class="text-capitalize teal--text font-weight-bold" v-html="title"></v-toolbar-title>
          <v-btn small fab text color="grey darken-3" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu bottom transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn outlined color="teal darken-2" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Jour</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mois</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar ref="calendar" 
          :short-weekdays="false" v-model="focus" locale="fr" color="primary"
          :weekdays="[0,1,2,3,4,6]" first-interval="7" :events="events" :event-color="getEventColor" :now="today"
          :type="type" @click:event="showEvent" @click:more= "viewDay" @click:date= "viewDay" @change="updateRange"
          @click:day= "clickDay" @click:interval= "clickInterval"  @click:time= "clickTime">
        </v-calendar>

        <!-- panneau popup dialog pour ajouter un evenement  -->
        <v-dialog v-model="dialog" max-width="80%" scrollable :overlay="false" transition="dialog-transition">
          <v-card>
            <v-card-title class="headline text-uppercase grey lighten-2 font-weight-bold title grey--text text--darken-2">
                <div class="d-flex justify-center flex-grow-1">
                    <v-avatar color="grey" size="30">
                      <v-icon dark>mdi-plus</v-icon>
                     </v-avatar>
               <span class="mx-2" style="letter-spacing:-0.7px"> Evenement</span>
               <v-spacer></v-spacer>
               <v-icon color="red darken" style="cursor:pointer" @click="dialog = false"  >mdi-close-box</v-icon>
                </div>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="addEvent" class="mt-3">
                <v-text-field prepend-inner-icon="mdi-folder-edit-outline" dense outlined v-model="nom"
                  label="Titre"></v-text-field>
                <v-textarea outlined prepend-inner-icon="mdi-format-indent-increase" v-model="detaille"
                  label="Details activité"></v-textarea>
                <date-time-picker label="Date debut" v-model="debut"></date-time-picker>
                <date-time-picker label="Date Fin" v-model="fin"></date-time-picker>
                <v-combobox label="couleur" prepend-inner-icon="mdi-palette" clearable dense outlined
                  v-model="selectColor" :items="colors" small-chips>
                  <template v-slot:item="{ index, item }">
                    <v-chip :color="`${item.color}`" dark label small>{{ item.text }}</v-chip>
                  </template>
                  <template v-slot:selection="{ attrs, item, parent, selected }">
                    <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color}`" :input-value="selected"
                      label small>
                      <span class="pr-2">{{ item.text }}</span>
                    </v-chip>
                  </template>
                </v-combobox>
                <v-btn class="float-right" color="success" type="submit">valider</v-btn>
                <v-btn class="float-left" color="secondary" @click="dialog = false">fermer</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- fin panneau -->

        <!--      Peanau de event avec sa couleur -->
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
          <v-card color="white" min-width="400">
            <v-toolbar flat dense :color="selectedEvent.color" dark>
              <v-btn small icon @click="boiteDelete = true">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon small @click.stop="editEvent(selectedEvent)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-divider class="grey lighten-4 mx-4" vertical></v-divider>
              <v-toolbar-title class="body-1 font-weight-bold text-capitalize "
                v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn small icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>

    <!-- boite dialogue de delete confirmation -->
    <v-dialog v-model="boiteDelete" max-width="300" >
      <v-card>
        <v-card-title class="headline">Effacer Evenement</v-card-title>
        <v-card-text>
          Voulez-vous vraiment vouloir effacer cette activitée de la base de données ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="boiteDelete = false">
            Annuler
          </v-btn>
          <v-btn color="green darken-1" text @click="deletEvent(selectedEvent)">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- form event  -->
    <v-dialog v-model="showClickAddEvent" max-width="450">
        <form-event 
           @showClickAddEventClose="showClickAddEvent = false" 
           :clearFileds = "showClickAddEvent" 
           :currentClickTime = "currentClickTime" 
           icon= "credit-card-plus-outline" 
           title= "Evenement" 
           btnText= "Sauver" 
           @addformEvent="addEvent($event)">
        </form-event>
    </v-dialog>

    <!-- SNACKBAR INFO -->
        <v-snackbar v-model= "snackbar" top color="red darken-4">
          {{error}}
          <v-btn text fab small color="white" @click.native="snackbar = false">x</v-btn>
        </v-snackbar>
  </v-row>
</template>
<script>
  //import eventsbis from "../events/events.json";
  import { db } from "../firebase/firebaseApp";
  import {colors} from '../events/colorsList.json'
  export default {
    name: 'agenda',
    components: {
      "date-time-picker": () => import("../components/DateTimePicker"),
      'form-event': () => import('../components/FormEvent.vue')
    },
    data: () => ({
      snackbar: false,
      showClickAddEvent: false,
      boiteDelete: false,
      selectColor: "",
      colors,
      today: new Date().toISOString().substr(0, 10),
      focus: new Date().toISOString().substr(0, 10),
      type: "week",
      typeToLabel: {
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        "4day": "4 Days"
      },
      start: null,
      end: null,
      details: 'null',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      /* ajout de moi  */
      nom: null,
      detaille: null,
      debut: null,
      fin: null,
      color: "rgba(50,130,200, 0.1)",
      dialog: false,
      currentlyEditing: null,
      currentClickTime: null,
      error: ''
    }),
    computed: {
      title() {
        const {start, end } = this;
        if (!start || !end) {
          return "";
        } 
        const startMonth = this.monthFormatter(start);
        const endMonth = this.monthFormatter(end);
        const suffixMonth = startMonth === endMonth ? "" : endMonth;
        // les suffix sont la au cas ou la date est a cheval entre deux mois ou deux années
        const startYear = start.year;
        const endYear = end.year;
        const suffixYear = startYear === endYear ? "" : endYear;

        const startDay = start.day; // + this.nth(start.day);
        const endDay = end.day; // + this.nth(end.day);

        switch (this.type) {
          case "month":
            return `${startMonth} ${startYear}`;
          case "week":
          case "4day":
            return `${startDay} ${startMonth}  ${startYear} - ${endDay}  ${suffixMonth} ${suffixYear}`;
          case "day":
            return `<span style="color: red; font-size: 16px">${startDay}</span> ${startMonth}  ${startYear}`;
        }
        return "";
      },
      monthFormatter() {
        return this.$refs.calendar.getFormatter({
          timeZone: "UTC",
          month: "long"
        });
      }
    },

    methods: {
      essai(dataEvent) {
          console.log('dataEvent from formEvent component :', dataEvent);
      },
      clickTime (event) {
        console.log('event de clickTime  :', event);
         const { day, time, weekday, hour, date } = event
         this.showClickAddEvent = true
         this.currentClickTime = {day, time, weekday, hour, date,  mois: this.monthFormatter(event)}
      },
      clickDay(event) {
         this.dialog = true;
         console.log('event from click day in mont case :', event);
      },
      clickInterval(ev) {
          console.log('event de click:interval :', ev );
      },
      editEvent(event) {
        this.nom = event.name;
        this.detaille = event.details,
          this.debut = event.start;
        this.fin = event.end;
        this.selectColor = {
          text: `${event.color}`,
          color: event.color
        }; // car color est sous forme de color:{text:"Color", color: "color"}
        this.dialog = true
      },
      async deletEvent(event) {
        this.boiteDelete = true;
        try {
          await db.collection('calEvent').doc(event.id).delete();
          this.selectedOpen = false
          this.boiteDelete = false
        } catch (error) {
          console.log('error :', error);
        }
      },
      async addEvent(eventform) {

        console.log('eventform =>>>>>>>>>>>>>>>>>>>>>>:', eventform);
        try {
          if (this.nom && this.debut) {
            await db.collection('calEvent').add({
              name: this.nom,
              details: this.detaille,
              start: this.debut,
              end: this.fin,  
              color: this.selectColor
            });
            this.dialog = false
            this.nom = this.detaille = this.debut = this.fin = this.selectColor = null;
          } else {
              await db.collection('calEvent').add(eventform);
           this.showClickAddEvent = false
            console.log('eventForm :', eventform);
          }
        } catch (error) {
            this.error = error.message + " login first"
          console.log('error :', error);
          this.snackbar = true
          
        }

      },
      async getEvents() {
        try {
          let snapshot = await db.collection("calEvent").get();
          const events = [];
          snapshot.docs.forEach(el => {

            let evenData = el.data();
            //console.log('evenData :', this.formatDate(evenData.start.toDate(), false));
            evenData.id = el.id;
            evenData.start = this.formatDate(evenData.start.toDate(), true);
            evenData.end = this.formatDate(evenData.end.toDate(), true);
            evenData.color = evenData.color.color
            events.push(evenData);
          });
          this.events = events;
        } catch (error) {
          console.log("error :", error);
        }
      },
      viewDay({date}) {
        console.log('click:date et click:more date de view day just for month and week clicker sur le rond du chiifre du jour:', date);
        this.focus = date;
        this.type = "day";
      },
      getEventColor(event) {
        return event.color;
      },
      setToday() {
        this.focus = this.today;
      },
      prev() {
        this.$refs.calendar.prev();
      },
      next() {
        this.$refs.calendar.next();
      },
      showEvent(e) {
        console.log("e de showEvent function :", e);
        const open = () => {
          this.selectedEvent = e.event;
          this.selectedElement = e.nativeEvent.target;
          setTimeout(() => (this.selectedOpen = true), 50);
        };

        if (this.selectedOpen) {
          this.selectedOpen = false;
          setTimeout(open, 10);
        } else {
          open();
        }

        e.nativeEvent.stopPropagation();
      },
      updateRange({
        start,
        end
      }) {
        /* moi  */
        //console.log("changeEvent  @change :", changeEvent);
        /*  let start = changeEvent.start;
         let end = changeEvent.end;
         
         /*  */
        console.log('start :', start);
        const events = [];

        const min = new Date(`${start.date}T00:00:00`);
        const max = new Date(`${end.date}T23:59:59`);
        const days = (max.getTime() - min.getTime()) / 86400000;
        const eventCount = this.rnd(days, days + 20);
        console.log('eventCount :', eventCount);
        console.log("min :", min);
        console.log("max :", max);
        console.log("days:", days);

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0;
          console.log('allDay :', allDay);
          const firstTimestamp = this.rnd(min.getTime(), max.getTime());
          const first = new Date(firstTimestamp - (firstTimestamp % 900000));
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
          const second = new Date(first.getTime() + secondTimestamp);
          console.log('second :', second);
          events.push({
            name: "mon action",
            start: this.formatDate(first, !allDay),
            end: this.formatDate(second, !allDay),
            color: "red"
          });
        }
        this.start = start;
        this.end = end;
        console.log('events :', events);
        // this.events = events;
      },
      /* nth(d) {
        return d > 3 && d < 21
          ? "th"
          : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
      }, */
      rnd(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
      },
      formatDate(a, withTime) {
        return withTime ?
          `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}` :
          `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
      }
    },
    mounted() {
      this.$refs.calendar.checkChange();
      console.log('je suis pas la');
      let events = [];
      let docData = {}
      db.collection('calEvent').onSnapshot(ref => {
        ref.docChanges().forEach(change => {
          const { newIndex, oldIndex, doc, type } = change;
          docData = doc.data()
          docData.start = this.formatDate(doc.data().start.toDate(), true);
          docData.end = this.formatDate(doc.data().end.toDate(), true);
          docData.color = doc.data().color.color
          docData.id = doc.id
          if (type === 'added') {
            events.splice(newIndex, 0, docData)
          } else if (type === 'modified') {
            events.splice(oldIndex, 1)
            events.splice(newIndex, 0, docData)
          } else if (type === 'removed') {
            events.splice(oldIndex, 1)
          }
        })
      });
      this.events = events
    },
  };
</script>
<style scoped>
  ::v-deep .v-btn__content {
    letter-spacing: -0.1px;
  }

  ::v-deep .v-label {
    font-size: 13px;
  }

  textarea {
    font-size: 12px;
  }

  .v-input {
    font-size: 13px;
  }

  ::v-deep .caption {
    letter-spacing: -4px;
  }
</style>