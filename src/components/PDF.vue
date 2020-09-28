<template>
  <div id="pdfContainer">
  </div>
</template>

<script>
  import PDFObject from 'pdfobject'
  import {getFileInfo} from '../utils/mUtils'
  export default {
    name: 'PDF',
    props: ["pdfURL"],
    mounted () {
      PDFObject.embed(getFileInfo(this.pdfURL), '#pdfContainer')
    },
    watch: {
      pdfURL: function () {
        const url = getFileInfo(this.pdfURL)
        PDFObject.embed(url, '#pdfContainer')
      }
    }
  }
</script>
<style scoped>
  #pdfContainer {
    height: 650px;
    width: 100%;
  }
</style>
