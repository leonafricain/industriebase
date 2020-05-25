<template>
    <v-row no-gutters="">
       <v-col cols="8" offset="2">
            <v-data-table :headers="headers" :items="desserts" sort-by="name" class="elevation-8" :search="search">
                <template v-slot:top>
                    <v-toolbar color="primary" flat >
                        <v-toolbar-title class="text-capitalize white--text font-weight-bold">Mes documents</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field
                            style="width:50%"
                            class="mr-8"
                            v-model="search"
                            dense
                            append-icon="mdi-magnify"
                            dark
                            flat
                            solo-inverted
                            hide-details
                            clearable
                      ></v-text-field>

                      <!-- ######################## -->
                        <v-dialog v-model="dialog" max-width="700px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="secondary" v-on="on">
                                    <v-icon size="20" left>mdi-cloud-upload-outline</v-icon>
                                    <span class="text-capitalize my_text">New Item</span>
                               </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="d-flex justify-center">
                                    <span class="display-2 primary--text">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.typeDoc" label="type doc"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.expediteur" label="Expediteur"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editedItem.subject" label="Objet"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                            <!--  -->
                                                            <v-menu
                                                                    ref="menu"
                                                                    v-model="menu"
                                                                    :close-on-content-click="false"
                                                                    :return-value.sync="editedItem.dateIn"
                                                                    transition="scale-transition"
                                                                    offset-y
                                                                    min-width="250px"
                                                                    max-width="250px"
        
                                                                >
                                                                    <template v-slot:activator="{ on }">
                                                                    <v-text-field
                                                                        v-model="editedItem.dateIn"
                                                                        label="date..."
                                                                        prepend-icon="mdi-calendar-clock"
                                                                        readonly
                                                                        v-on="on"
                                                                    ></v-text-field>
                                                                    </template>
                                                                    <v-date-picker v-model="date" no-title scrollable>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                                                    </v-date-picker>
                                                                </v-menu>

                                                                <!--  -->


                                            </v-col>
                                             <v-col cols="12" sm="6" md="6">
                                               <v-file-input v-model="filepdf" accept="application/pdf, image/*" label="fichier..."></v-file-input>
                                            </v-col>
                                           
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">exit</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <!-- ################################ -->
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2 green--text" @click="editItem(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon class="red--text text--darken-4" small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:item.fileLink ="{ item }">
                   {{item.link_file}}
                   <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-pdf" class="svg" @click="dialog = true"
                        role="img" xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 384 512">
                        
                        <path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z">
                    </path>
                </svg>
                         <!-- <v-rating small  dense v-model="item.protein"></v-rating>
                         
 -->                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
                <template v-slot:item.dateIn = {item}>
                     <v-icon :class="item.dateIn > new Date() ? 'red--text': 'green--text'"  class="mx-1" size="14">  
                         {{ item.dateIn > new Date() ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                     </v-icon>{{`${item.dateIn}`}}
                </template>
            </v-data-table>
       </v-col>
    </v-row>
</template> 

<script>
    export default {
        data: () => ({
            filepdf:null,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            dialog: false,
            search: '',
            headers: [{
                    text: 'Document',
                    align: 'start',
                    value: 'typeDoc',
                },
                {
                    text: 'expéditeur',
                    value: 'expediteur'
                },
                {
                    text: 'Objet',
                    value: 'subject'
                },
                {
                    text: 'Date',
                    value: 'dateIn'
                },
                {
                    text: 'Lien',
                    value: 'fileLink'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                typeDoc: '',
                expediteur: '',
                subject: '',
                dateIn: '',
                fileLink: '',
            },
            defaultItem: {
                typeDoc: '',
                expediteur: '',
                subject: '',
                dateIn: '',
                fileLink: '',
                
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },
        watch: {
            dialog(val) {
                
                val || this.close();
                console.log("dialog -> val", val)
            },
        },

        created() {
            this.initialize();
        },

        methods: {
            initialize() {
                this.desserts = [{
                        typeDoc: 'lettre',
                        expediteur: "Premier Ministre",
                        subject: "Corona verus",
                        dateIn: new Date().toISOString().substr(0, 10),
                        fileLink: "4.0",
                    }
                ]
            },

            editItem(item) {
                this.editedIndex = this.desserts.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                    this.desserts.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>
<style scoped>
.my_text{
    letter-spacing: -0.1px;
    font-size: 14px;
    font-weight: bold;
}
svg{
    color: rgb(182, 13, 13);
    font-size: 14px;
    width: 14px;
    cursor: pointer;
}
</style>