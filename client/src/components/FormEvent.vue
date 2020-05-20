  <template>
  <v-card  class="pa-1 white">
    
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <v-icon class="ml-8" color="primary" size="24">{{`mdi-${icon}`}}</v-icon>
        <v-card-title class=" display-1 grey--text text--darken-2 font-weight-light">{{title}}</v-card-title>
      </div>
      <v-icon color="red darken-3" class="mr-4" style="cursor:pointer" @click="$emit('showClickAddEventClose')" >mdi-close-box</v-icon>
    </div>
    <v-sheet :color="defaultColor" width="100%" height="50" elevation="1" >
        <v-row no-gutters class="">
          <v-col cols="1" class="d-flex align-center justify-center"  >
            <v-icon class="mt-n2" dark>mdi-clock-outline</v-icon>
          </v-col>
          <v-col >
            <div class="mt-2 white--text">
              <span class="body-2">{{formatDateAfficher}}</span>
              <p class="caption">{{formatTimeAffiher}}</p>
            </div>
          </v-col>  
        </v-row>
    </v-sheet>

    <v-form v-model="isValid">
        <div class="pa-8">
          <v-text-field
            outlined
            dense
            color="blue darken-2"
            label="Titre event"
            prepend-inner-icon="mdi-folder-edit-outline"
            v-model="name"
          ></v-text-field>
    
          <v-textarea
            outlined
            prepend-inner-icon="mdi-format-indent-increase "
            color="blue darken-2"
            label="Détails"
            v-model="details"
          ></v-textarea>
         <v-row no-gutters>
           <v-col>
              <v-combobox label="couleur" prepend-inner-icon="mdi-palette" clearable dense outlined
                      v-model="selectColor" :items="colors" small-chips>
                      <template v-slot:item="{ index, item }">
                        <v-chip :color="`${item.color}`" dark label small>{{ item.text }}</v-chip>
                      </template>
                      <template v-slot:selection="{ attrs, item, parent, selected }">
                        <v-chip dark v-if="item === Object(item)" v-bind="attrs" :color="`${item.color}`" :input-value="selected"
                          label small>
                          <span class="pr-2 text--white">{{ item.text }}</span>
                        </v-chip>
                      </template>
                    </v-combobox>
           </v-col>
           <v-col class="mx-1" >
             <v-card flat outlined max-height="40">
                <div class="mx-2 mt-1">
                    <v-slider
                      v-model="slider"
                      label="Durée?"
                      step="1"  
                      min="0"
                      max="4"
                      thumb-size="18"
                      value="1"
                      ticks
        >
          <template v-slot:thumb-label = "{value}">
            <span style="font-size:10px; font-family:'ubuntu'">{{`${value}h`}}</span>
          </template>
        </v-slider>
                </div>
             </v-card>
           </v-col>
         </v-row>
        </div>
        <v-card-actions class="d-flex justify-end pr-8">
          <v-btn
            @click= "saveFormEvent"
            class="font-weight-light caption"
            color="success"
            :disabled="!isValid"
            :loading="loading">
            <span class="px-4 font-weight-bold">{{btnText}}</span>
          </v-btn>
        </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import { colors } from '../events/colorsList.json'
export default {
  props: {
    clearFileds : Boolean,
    title: String,
    btnText: String,
    icon: String,
    loading: Boolean,
    currentClickTime: Object,
  }, // ["title", "btnText", "loading", "icon", "currentClickTime"],
  data: () => ({
    slider:1,  
    isValid: false,
    colors,
    selectColor : null,
    defaultColor: "#797979",
    name: "",
    details: "",
    error: null,
    showIcon: false
  }),
   methods:{
   dayOfWeekAsInteger (num) {
   console.log('num :', num);
  return ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][num];
},
 saveFormEvent () {
              /*  this.name = null
               this.details = null
               this.start = null
               this.selectColor = null
               this.slider = 1 */
   let endValue = this.currentClickTime.hour + this.slider
   let startValue = this.currentClickTime.hour
   
   if (endValue < 10) {
     endValue = '0'+endValue
   }
    if (startValue < 10) {
     startValue = '0'+startValue
   }
   console.log('start end end value :', startValue, endValue);
   let startValueFom = new Date(`${this.currentClickTime.date}T${startValue}:00:00`);
   let endValueForm =  new Date(`${this.currentClickTime.date}T${endValue}:00:00`);
   console.log('this.selectColor ========================++> :', this.selectColor);
   this.$emit('addformEvent', {
              name: this.name,
              details: this.details,
              start: startValueFom,   //new Date(`${start.date}T00:00:00`)
              end: endValueForm,
              color: this.selectColor
   })
 }
  },
  computed: {
    formatDateAfficher() {
      return `${this.dayOfWeekAsInteger(this.currentClickTime['weekday'])},   ${this.currentClickTime.day} ${this.currentClickTime.mois} `
    },
    formatTimeAffiher() {
      let timeSelected = `${this.currentClickTime.hour}:00`
      return timeSelected
    },
    
  },
  watch:{
    selectColor(n) {
      if(n) {
        this.defaultColor = n.color
      } else {
        this.defaultColor = "#797979"
      }
    },
    clearFileds() {
              this.name = null
               this.details = null
               this.start = null
               this.selectColor = null
               this.slider = 1
    } 
  /*   selectColor :{
      handler: function(n) {
        if(n) {
          this.defaultColor = n.color
        } else {
          this.defaultColor = "#797979"
        }
      },
      deep: true
    } */
  }
 
};
</script>
<style lang="css">
input {
  font-size: 13px;
  font-weight: 400;
}
textarea{
  font-size: 13px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}
.theme--light.v-card.v-card--outlined {
  border: thin solid rgba(0, 0, 0, 0.39);
}
</style>
