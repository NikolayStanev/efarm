<template>
  <div>
    <v-parallax class="opacity" :src="pic2">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <h1 id="eFarm" class="font-weight-thin mb-2">
            eFarm
          </h1>
        <h4 class="subheading">
          Oнлайн  платформа за управление на бизнеса, която е фокусирана върху българските земеделски производители.
        </h4>
        <v-btn size="x-large" class="ma-16 bg-orange-accent-4" >Subscribe</v-btn>
      </div>
    </v-parallax>
    <v-container>
      <v-row justify="center"
             class="ma-6"
             >
        <v-card
            width="500"
            class="ma-5"
            v-for="n in list"
            :key="n">
          <v-img
              height="200"
              :src="n.pic"
              cover
              class="text-white"
          ></v-img>
          <v-card-text>{{ n.text }}</v-card-text>
        </v-card>
      </v-row>
<!--      <v-list class="pa-16 justify-center d-flex flex-row">-->
<!--        <v-list-item v-for="n in list"-->
<!--                     :key="n">-->

<!--          <v-card-->
<!--                  width="400"-->
<!--                  title="This is a title"-->
<!--                  subtitle="This is a subtitle"-->
<!--                  :text="n.text">-->
<!--            <v-img-->
<!--                height="200"-->
<!--                :src="n.pic"-->
<!--                cover-->
<!--                class="text-white"-->
<!--            ></v-img>-->
<!--          </v-card>-->

<!--        </v-list-item>-->



<!--      </v-list>-->

    </v-container>
    <v-footer color="secondary" class="footer">
      <div>
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            :icon="icon"
            variant="text"
        ></v-btn>
      </div>

      <div class="pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </div>

      <v-divider></v-divider>

      <div>
        {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </div>
</template>

<script>

export default {
  mounted () {
    console.log(this.$vuetify.display.mobile)
  },

  name: "HomePage",
  data: () => ({
    pic1: require('@/assets/Farming service banner ad - Made with PosterMyWall.png'),
    pic2: require('@/assets/49618245.jpg'),
    list: [
      {
        text: 'Осъзнавайки колко важна за нашите потребители е възможността да ‘видят\' реално  местоположението  на обработваните масиви и точното им  позициониране, ние решихме да разработим нова визия на програмата, която да ни позволи да добавим тази функционалнот за тях. Надяваме се с това да направим достъпни за всеки възможности, които досега изискаваха сериозна финансова инвестиция както за софтуер, така и за специализирани GPS устройства.',
        pic: require('@/assets/efarmGif.gif')},
      { text: 'С еFarmbg Вие може да очертавате Вашите площи директно върху сателитна карта, да въвеждате очертани с GPS устройства масиви, които в последствие да експортвате във формат, позволяващ директното им предоставяне в Общинските служби по земеделие. И за да може това да е достъпно за всеки, без нужда от инвестиране в скъпи GPS устройства, на  нашите клиенти, платили едногодишен абонамент в размер на 96лв с ДДС, ние предоставяме GPS устройства за временно ползване. Всеки, който желае да заеме такова устройство, ще получи  инструкции как да очертаете своите масиви и след връщането му ние ще качим данните  в програмата. Оттам те могат да бъдат разглеждани и коригирани при нужда.',
      pic: require('@/assets/19-HRW-OK-Peters-12-scaled-1.jpg')}],
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),

}
</script>

<style scoped>
#eFarm {
  font-size: 20em !important;
  letter-spacing: 0.05em !important;
  font-family:oswald sans-serif !important;
}
.subheading {
  font-size: 1.5em !important;
}
.max-width{
  max-width: 600px;
}
/*.opacity{*/
/*  max-height: 1000px;*/
/*}*/


</style>
