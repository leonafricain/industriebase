<template>
  <v-card max-width="95%" style="margin:0 auto">
    <v-toolbar dense color="teal darken-3" dark flat>
      <span style="font-size:24px;">
        <i class="fas fa-server"></i>
      </span>
      <v-toolbar-title class="ml-2 font-weight-bold headline">Organigramme</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field
          class="mt-1"
          v-model="search"
          dense
          append-icon="fas fa-search"
          dark
          flat
          solo-inverted
          hide-details
          clearable
        ></v-text-field>
      </v-toolbar-items>
    </v-toolbar>
    <v-row>
      <v-col cols="3">
        <v-card-text>
          <v-treeview
            v-model="tree"
            :items="items"
            dense
            item-text="name_long"
            :search="search"
            activatable
            :active="active"
          ></v-treeview>
        </v-card-text>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="12" md="6">
        <v-card-text>
          <div>
            Example of an inline
            <code>code</code> element.
          </div>
          <!--  <div v-if="tree.length === 0" key="title"
                        class="title font-weight-light grey--text pa-4 text-center">
                        Select your favorite breweries
          </div>-->
          <!--  <v-scroll-x-transition group hide-on-leave>
                        <v-chip v-for="(selection, i) in tree" :key="i" color="grey" dark small class="ma-1">
                            <v-icon left small>mdi-beer</v-icon>
                            {{ selection.name }}
                        </v-chip>
          </v-scroll-x-transition>-->
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import items from "../events/structure.json";
export default {
  name: "structure",
  data: () => ({
    search: "",
    active: [],
    tree: [],
    items
  }),
  mounted () {
      let variable = 34;
      console.log("mounted -> variable", variable)
  },
};
</script>