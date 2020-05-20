<template>
    <v-dialog v-model="display" :width="dialogWidth">
      <template v-slot:activator="{ on }">
        <v-text-field
           dense
           v-bind="textFieldProps"
          :disabled="disabled"
           prepend-inner-icon="mdi-calendar-clock"  
          :label="label"
          :value="formattedDatetime"
          v-on="on"
          outlined
          readonly
        >
        </v-text-field>
      </template>
      <v-card >
        <v-card-text>
          <v-tabs  fixed-tabs v-model="activeTab" icons-and-text >
            <v-tab key="calendar" >
                  <span class="caption">Date</span>
                <v-icon size="large">mdi-calendar-range</v-icon>
            </v-tab>
            <v-tab key="timer" :disabled="dateSelected">
                <span class="caption">Heure</span>
                <v-icon size="large">mdi-clock-outline</v-icon>
            </v-tab>
            <v-tab-item transition="slide-x-transition"   key="calendar" class="text-center" >
              <v-date-picker class="mt-4 " locale ="fr" v-model="date" @input="showTimePicker"></v-date-picker>
            </v-tab-item>
            <v-tab-item key="timer" class="text-center" >
              <v-time-picker  
                ref="timer"
                class="mt-4"
                v-model="time"
              ></v-time-picker>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
        <v-card-actions class="grey lighten-4">
              
          <v-spacer></v-spacer>
          <slot name="actions" :parent="this">
            <v-btn small dark tile color="grey darken-3"  @click.native="clearHandler">{{ clearText }}</v-btn>
            <v-btn tile  small dark color="green darken-1"  @click="okHandler">{{ okText }}</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { format, parse } from 'date-fns'
const DEFAULT_DATE = ''
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
const DEFAULT_DIALOG_WIDTH = 400
const DEFAULT_CLEAR_TEXT = 'CLEAR'
const DEFAULT_OK_TEXT = 'OK'
export default {
  name: 'v-datetime-picker',
  model: {
    prop: 'datetime',
    event: 'input'
  },
  props: {
    datetime: {
      type: [Date, String],
      default: null
    },
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: Number,
      default: DEFAULT_DIALOG_WIDTH
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT
    },
    timeFormat: {
      type: String,
      default: 'HH:mm'
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT
    },
    textFieldProps: {
      type: Object
    },
    datePickerProps: {
      type: Object
    },
    timePickerProps: {
      type: Object
    }
  },
  data() {
    return {
      display: false,
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + ' ' + this.timeFormat
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
    },
    formattedDatetime() {
      return this.selectedDatetime ? format(this.selectedDatetime, this.dateTimeFormat) : ''
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = this.date + ' ' + this.time
        if (this.time.length === 5) {
          datetimeString += ':00'
        }
        return parse(datetimeString, this.defaultDateTimeFormat, new Date())
      } else {
        return null
      }
    },
    dateSelected() {
      return !this.date
    }
  },
  methods: {
    dayFormat() {
      return 'hello'
    },
    init() {
      if (!this.datetime) {
        return
      }
      let initDateTime
      if (this.datetime instanceof Date) {
        initDateTime = this.datetime
      } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
        // see https://stackoverflow.com/a/9436948
        initDateTime = parse(this.datetime, this.dateTimeFormat, new Date())
      }
      this.date = format(initDateTime, DEFAULT_DATE_FORMAT)
      this.time = format(initDateTime, DEFAULT_TIME_FORMAT)
    },
    okHandler() {
      this.resetPicker()
      this.$emit('input', this.selectedDatetime)
    },
    clearHandler() {
      this.resetPicker()
      this.date = DEFAULT_DATE
      this.time = DEFAULT_TIME
      this.$emit('input', null)
    },
    resetPicker() {
      this.display = false
      this.activeTab = 0
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true
      }
    },
    showTimePicker() {
      this.activeTab = 1
    }
  },
  watch: {
    datetime: function() {
      this.init()
    }
  }
}
</script>

<style scoped>
::v-deep .v-label{
  font-size: 13px;
}
.v-tabs--icons-and-text > .v-tabs-bar{
  height: 50px;
}

.v-time-picker-title__time .v-picker__title__btn{
font-size: 60px;
}
.v-input{
  font-size: 13px;
}
</style>