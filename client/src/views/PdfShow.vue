<template>
  <v-row>
    <v-col md="7" offset-md="3">
      <v-card elevation="6">
        <v-toolbar flat>
            <span>
             <v-btn color="success" fab small to="/dashboard">
               <v-icon>mdi-arrow-left-bold-outline</v-icon>
             </v-btn>
             </span>   
             <span class="mx-auto">
              {{pdfDetails.subject}} 
            </span>
        </v-toolbar>
      <iframe v-if="pdfDetails" :src="`http://localhost:5000/${pdfDetails.pdfname}`" width="760" height="500" class="ml-3" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Service from "../services/PdfService";
const PdfService = new Service();
export default {
  props: ["pdfId"],
  data() {
    return {
      pdfDetails: ""
    };
  },
  async beforeMount() {
    let response = await PdfService.getOnePdf(this.pdfId);
    console.log("beforeMount -> pdf", response.data.pdf)
   
    this.pdfDetails = response.data.pdf;
  }
};
</script>

<style>
</style>