<template>
  <v-row>
    <v-col>
      <v-sheet height="600">
        <v-calendar 
           ref="calendar"
           color="primary"
           :now= "now"
           v-model="now"
           :short-weekdays = "false"
           :show-interval-label = "showIntevaLabel"
           event-height= "5"
           first-interval="7"
           locale="fr"
           interval-count="11"
           :interval-format="intervalFormat"
           interval-height="80"
           :interval-style="intervalStyle"
           interval-width="70"
           :day-format = "dayFormat"
           type="month"
           :events="events"
           :event-color="getEventColor" 
           @click:day= "clickDay"
           @click:interval= "clickInterval"
           @click:date= "clickDate"
           @click:time= "clickTime"
           >
          <!-- <template v-slot:day-header="objt">
            <template v-if="objt.present" class="text-center">Today</template>
          </template> -->
          <template v-slot:interval="obj">
                  <v-row>
                    <v-col>
                     colonne 1 {{obj.day}}
                    </v-col>
                    <v-col>
                       colonne 2 {{obj.day}}
                    </v-col>
                  <v-col>
                        
                  </v-col>
                  </v-row>
          </template>
         
       <template v-slot:event= "even">
            <span class="red--text">{{even}}</span>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
export default {
    methods:{
      clickTime (event) {
          console.log('event de click:time :', event);
      },
      clickDay(event) {
          console.log('event de click:day :', event );
      },
      clickInterval(ev) {
          console.log('event de click:interval :', ev );
      },
      clickDate (event) {
        console.log('event de click:date :', event);
      },
        getEventColor(ev) {
            return ev.color
        },
        intervalFormat(interval) {
      //    console.log('interval :', interval);
            return interval.time
        },
         intervalStyle(/* style */){
       //   console.log('style :', style);
          return {
            'backgroundColor': '#ccc',
            'font-size': '12px'
          }
        },
        dayFormat (format) {
        //  console.log('format :', format);
          return format.day + "²"
        },
        showIntevaLabel (labelformat) {
       //   console.log('labelformat :', labelformat);
          return labelformat
        }
    },
  data: () => ({
    now: "2020-03-22", // new Date().toISOString().substr(0, 10),
    shortWeek: false,
    events: [
      {
        name: "Hakim diner",
        start: "2020-3-22 10:15",
        end: "2020-3-22 11:00",
        color: "#5345"
      },
      {
        name: "Hakim repas",
        start: "2020-3-11 09:15",
        end: "2020-3-11 10:55",
        color: "orange"
      },
      {
        name: "Hakim repas",
        start: "2020-3-11 14:00",
        end: "2020-3-11 15:00", 
        color: "red"
      }
    ]
  }),
  mounted () {
      console.log('this.$refs.calendar :', this.$refs.calendar);
      this.action()
      this.$refs.calendar.checkChange();
  }
};
</script>
