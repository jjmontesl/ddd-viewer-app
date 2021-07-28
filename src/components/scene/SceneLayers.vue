<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8"  >

            <div style="background-color: white;">

                <v-card class="" style="overflow-x: hidden;">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Layers</v-card-title>

                    <div style="height: 20px;"> </div>

                    <v-card-text class="text-left">

                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td><b>Layer</b></td>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="layer in viewerState.layers" :key="layer.key">
                                <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                                    <v-btn class="btn" :input-value="layer.visible" x-small @click="showHideLayer(layer)"><v-icon>mdi-eye</v-icon></v-btn>
                                </td>
                                <td style="white-space: nowrap; width: 100%;" :title="layer.key">
                                    {{ layer.label }}
                                </td>
                            </tr>
                            </tbody>
                        </v-simple-table>

                    </v-card-text>


                    <v-card-text class="text-left">
                        <v-btn to="/3d/layers/create" class="mx-2" dark color="primary"><v-icon dark>mdi-plus</v-icon> Add Layer</v-btn>
                    </v-card-text>


                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>
/*tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
}*/
/*
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 2px;
}
*/
</style>


<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import { GeoJson3DLayer } from 'ddd-viewer';


const testGeoJsonLayerPoints = {
    "type": "FeatureCollection",
    "name": "test-geojson-coruna",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404975183396386, 43.384659774474109 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404796061689986, 43.386062790394071 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401014603443789, 43.385093700392034 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401512163739342, 43.384356024483452 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.402606796389557, 43.383329048957805 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.403661624216127, 43.382620281054209 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405233914750072, 43.38225866158453 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40569167022198, 43.382866181061509 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406328547400287, 43.382952969061265 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407104741461348, 43.383155473910833 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407462984874147, 43.38327119066404 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407522692109612, 43.383343513522611 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.408219276523386, 43.383488158980946 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.408816348878048, 43.383517088031198 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409353713997245, 43.3833724426419 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409811469469153, 43.383141009301148 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409871176704618, 43.382764928238124 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409930883940087, 43.382186337431747 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.409791567057331, 43.381564346156296 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40073596967828, 43.385498695113057 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400298116618195, 43.385730119453108 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399800556322642, 43.385874759216982 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399442312909844, 43.385961542909655 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398785533319716, 43.386366531832685 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398188460965054, 43.386409923342534 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.3978700223759, 43.386352067989165 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39749187655128, 43.386120646023528 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39739236449217, 43.385932615025901 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.397054023491195, 43.385643335429116 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.396695780078398, 43.385469767008424 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.396257927018311, 43.385440838889991 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.395541440192716, 43.385339590366762 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.395063782308986, 43.385252805783679 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.3946259292489, 43.385209413445558 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394387100307036, 43.385137092812982 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39424778342428, 43.384963522942783 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394128368953348, 43.384674238721409 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394188076188815, 43.384370488803235 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394387100307036, 43.383936557708552 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394645831660721, 43.383864235557446 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.394705538896188, 43.383835306672857 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.395800171546403, 43.379654937728894 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.39643704872471, 43.380088899469932 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.396815194549328, 43.380378205571724 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.397054023491195, 43.380681975492863 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.397969534435012, 43.381188255312658 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398088948905944, 43.381231650529067 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398467094730563, 43.381260580656068 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399143776732515, 43.381390766056818 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399442312909844, 43.381564346156296 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399720946675354, 43.38172346081091 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40015879973544, 43.381882575047932 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400417531089127, 43.382128478047406 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400536945560059, 43.382388844842083 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.400954896208322, 43.382779392937529 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401432554092056, 43.382880645736762 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401571870974809, 43.382967433715805 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401611675798453, 43.38301082765873 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.401750992681208, 43.383039756936761 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.403263575979686, 43.383126544688025 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404079574864392, 43.383054221570596 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.404716452042699, 43.382924039741816 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405094597867318, 43.382895110408562 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405253817161896, 43.382866181061509 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406109620870245, 43.38285171638281 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406348449812111, 43.385484231062463 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406109620870245, 43.385498695113043 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405870791928379, 43.385686727456637 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405671767810158, 43.386019398635739 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405731475045625, 43.386221893242201 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.405990206399315, 43.386409923342526 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406388254635756, 43.386569025279542 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406786302872197, 43.386540097685696 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40708483904953, 43.386424387172227 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407164448696816, 43.38629421258058 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407244058344103, 43.386091718215702 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.40718435110864, 43.385831367324059 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.407025131814063, 43.385657799441745 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406766400460375, 43.38545530295093 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.406567376342153, 43.385382982611702 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399402508086203, 43.384703167205664 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399283093615269, 43.384399417432448 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399223386379802, 43.384269238492294 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399084069497047, 43.383849771116886 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398924850202471, 43.383517088031198 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398845240555183, 43.38327119066404 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398805435731539, 43.383227796907462 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.398944752614293, 43.384630845969141 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399143776732515, 43.384196916738091 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399223386379802, 43.383994415367297 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399263191203447, 43.383922093285236 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399442312909844, 43.383560481580687 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399521922557133, 43.383314584389538 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399541824968956, 43.383155473910833 ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ -8.399502020145311, 43.383097615451412 ] } }
    ]
    };

const testGeoJsonLayerLines = {
    "type": "FeatureCollection",
    "name": "test-geojson-coruna-lines",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
    { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.409938347344516, 43.382511795439768 ], [ -8.409639811167185, 43.383075918514884 ], [ -8.408992982782967, 43.383437533109785 ], [ -8.408087423045062, 43.383437533109785 ], [ -8.40748039948449, 43.383206100017517 ], [ -8.406753961452983, 43.382924039741802 ], [ -8.405659328802768, 43.382837251700643 ], [ -8.404276111181133, 43.382931272072959 ], [ -8.403280990590028, 43.383104847761842 ], [ -8.403579526767359, 43.383582178343772 ], [ -8.403629282796915, 43.383958254337038 ], [ -8.403997477415624, 43.384312631503391 ], [ -8.403947721386068, 43.384623613840724 ], [ -8.403768599679669, 43.384724863559796 ], [ -8.403828306915138, 43.385057540017485 ], [ -8.4042462575634, 43.385260037837 ], [ -8.404843329918062, 43.385440838889984 ], [ -8.406007621009655, 43.385643335429101 ], [ -8.406753961452983, 43.3854625349801 ], [ -8.407400789837201, 43.385824135338872 ], [ -8.407380887425379, 43.38613510992225 ], [ -8.407191814513068, 43.386446082910318 ], [ -8.406425571657918, 43.386612416644418 ], [ -8.406037474627388, 43.386583489071278 ], [ -8.40481347630033, 43.38613510992225 ], [ -8.403708892444204, 43.385614407393483 ], [ -8.402843137529942, 43.385498695113029 ], [ -8.401639041614706, 43.385621639403695 ], [ -8.401360407849198, 43.385657799441717 ], [ -8.400673774641335, 43.385737351449485 ], [ -8.400106555904404, 43.385672263450907 ], [ -8.399608995608853, 43.385332358322906 ], [ -8.399400020284721, 43.38495629085407 ], [ -8.399439825108365, 43.384594685318518 ], [ -8.399897580580275, 43.384406649587589 ], [ -8.400405092081737, 43.384290935001729 ], [ -8.400574262582225, 43.384139059272592 ], [ -8.400673774641335, 43.38389316442823 ], [ -8.401181286142799, 43.383538784809822 ], [ -8.401678846438351, 43.383329048957798 ], [ -8.401987333821593, 43.382916807409785 ], [ -8.401967431409771, 43.382779392937522 ], [ -8.401629090408795, 43.382699837048044 ], [ -8.401400212672842, 43.382844484042153 ], [ -8.401330554231464, 43.382989130691143 ], [ -8.401430066290576, 43.383083150827908 ], [ -8.401519627143774, 43.383112080071434 ] ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.404972695594909, 43.38451513181122 ], [ -8.404813476300331, 43.384211381095817 ], [ -8.405032402830374, 43.383835306672836 ], [ -8.40537074383135, 43.38357494609027 ], [ -8.405808596891436, 43.383502623507773 ], [ -8.406186742716054, 43.383502623507773 ], [ -8.406385766834276, 43.383690662042795 ], [ -8.406345962010631, 43.384066737363078 ], [ -8.406027523421479, 43.384356024483445 ], [ -8.40556976794957, 43.384457274649435 ], [ -8.405171719713129, 43.384413881741857 ], [ -8.40537074383135, 43.383979950957773 ], [ -8.405609572773216, 43.38396548654481 ], [ -8.405928011362366, 43.384066737363078 ], [ -8.405768792067791, 43.384211381095817 ], [ -8.405510060714104, 43.384225845450111 ] ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.403101868883633, 43.384804416791852 ], [ -8.40328099059003, 43.384399417432427 ], [ -8.403121771295453, 43.38415352364413 ], [ -8.402763527882657, 43.383922093285214 ], [ -8.402325674822571, 43.383835306672836 ], [ -8.401708700056085, 43.383893164428223 ], [ -8.401231042172356, 43.38429816716981 ], [ -8.4010917252896, 43.384587453185787 ], [ -8.401330554231466, 43.384862273622318 ], [ -8.40202713864524, 43.385021379621385 ], [ -8.402723723059012, 43.384934594582752 ], [ -8.402863039941767, 43.384645310223334 ], [ -8.402902844765411, 43.384327095833527 ], [ -8.402683918235367, 43.38419691673807 ], [ -8.402285869998925, 43.384139059272584 ], [ -8.401867919350662, 43.38415352364413 ], [ -8.401549480761508, 43.384341560160216 ], [ -8.401629090408798, 43.384572988917775 ], [ -8.401947528997949, 43.384674238721395 ], [ -8.402206260351637, 43.384659774474088 ], [ -8.402484894117146, 43.384428346047834 ] ] } },
    { "type": "Feature", "properties": { }, "geometry": { "type": "LineString", "coordinates": [ [ -8.408475520075596, 43.384211381095817 ], [ -8.407938154956399, 43.38463084596912 ], [ -8.407977959780043, 43.384211381095817 ], [ -8.407460497072668, 43.38444281035035 ], [ -8.407380887425381, 43.384008879773347 ], [ -8.407022644012581, 43.38429816716981 ], [ -8.407042546424405, 43.383979950957773 ] ] } }
    ]
}

const testGeoJsonLayerTest = {"features": [{"geometry": {"coordinates": [-3.6840577999999997,
  40.4262994997222],
 "type": "Point"},
"properties": {"secondsfromstart": 4521,
 "speed": 7.27,
 "var": "28001,ES,Madrid,Madrid,CALLE VELAZQUEZ 42,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6843165997222203, 40.4225665],
 "type": "Point"},
"properties": {"secondsfromstart": 4462,
 "speed": 7.11,
 "var": "28001,ES,Madrid,Madrid,CALLE VELAZQUEZ 12,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.68222249972222, 40.4212747997222],
 "type": "Point"},
"properties": {"secondsfromstart": 4402,
 "speed": 3.36,
 "var": "28009,ES,Madrid,Madrid,CALLE ODONNELL,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6805816, 40.4187574997222],
 "type": "Point"},
"properties": {"secondsfromstart": 4342,
 "speed": 6.38,
 "var": "28009,ES,Madrid,Madrid,PASEO FERNAN NU�EZ,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6794983, 40.4148162997222],
 "type": "Point"},
"properties": {"secondsfromstart": 4282,
 "speed": 4.33,
 "var": "28009,ES,Madrid,Madrid,PASEO FERNAN NU�EZ,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.67827109972222, 40.4120331],
 "type": "Point"},
"properties": {"secondsfromstart": 4222,
 "speed": 5.69,
 "var": "28009,ES,Madrid,Madrid,PASEO URUGUAY,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6767390997222202, 40.4105125997222],
 "type": "Point"},
"properties": {"secondsfromstart": 4163,
 "speed": 5.77,
 "var": "28007,ES,Madrid,Madrid,AVDA MENENDEZ PELAYO 75,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6758984999999997, 40.4087656],
 "type": "Point"},
"properties": {"secondsfromstart": 4103,
 "speed": 1.55,
 "var": "28007,ES,Madrid,Madrid,CALLE CONDE DE CARTAGENA 11,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6733608, 40.4075060997222],
 "type": "Point"},
"properties": {"secondsfromstart": 4043,
 "speed": 5.91,
 "var": "28007,ES,Madrid,Madrid,CALLE ANTONIO DIAZ-CA�ABATE 33,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6703427997222198, 40.4062478],
 "type": "Point"},
"properties": {"secondsfromstart": 3984,
 "speed": 2.22,
 "var": "28007,ES,Madrid,Madrid,PLAZA CONDE DE CASAL,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6673083, 40.4052369997222],
 "type": "Point"},
"properties": {"secondsfromstart": 636,
 "speed": 4.5,
 "var": "28007,ES,Madrid,Madrid,CALLE FEDERICO MORENO TORROBA 9,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6701125, 40.4062835], "type": "Point"},
"properties": {"secondsfromstart": 576,
 "speed": 6.75,
 "var": "28007,ES,Madrid,Madrid,PLAZA CONDE DE CASAL,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.67322799972222, 40.4068983],
 "type": "Point"},
"properties": {"secondsfromstart": 517,
 "speed": 8.16,
 "var": "28007,ES,Madrid,Madrid,AVDA MEDITERRANEO 28,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6742466, 40.4091870997222],
 "type": "Point"},
"properties": {"secondsfromstart": 457,
 "speed": 11.66,
 "var": "28007,ES,Madrid,Madrid,CALLE AMADO NERVO 15,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6772133, 40.4123124997222],
 "type": "Point"},
"properties": {"secondsfromstart": 397,
 "speed": 5.36,
 "var": "28009,ES,Madrid,Madrid,PASEO URUGUAY,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.67925, 40.414464], "type": "Point"},
"properties": {"secondsfromstart": 337,
 "speed": 6.69,
 "var": "28009,ES,Madrid,Madrid,PASEO FERNAN NU�EZ,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6804898, 40.4180759997222],
 "type": "Point"},
"properties": {"secondsfromstart": 278,
 "speed": 6.97,
 "var": "28009,ES,Madrid,Madrid,PASEO FERNAN NU�EZ,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6822153, 40.4213385997222],
 "type": "Point"},
"properties": {"secondsfromstart": 218,
 "speed": 1.44,
 "var": "28009,ES,Madrid,Madrid,CALLE ODONNELL,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.68290929972222, 40.4219357997222],
 "type": "Point"},
"properties": {"secondsfromstart": 158,
 "speed": 1.8,
 "var": "28001,ES,Madrid,Madrid,CALLE NU�EZ DE BALBOA 4,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6827838, 40.4244373], "type": "Point"},
"properties": {"secondsfromstart": 99,
 "speed": 4.69,
 "var": "28001,ES,Madrid,Madrid,CALLE NU�EZ DE BALBOA 31,Madrid"},
"type": "Feature"},
{"geometry": {"coordinates": [-3.6827617999999998, 40.4266897997222],
 "type": "Point"},
"properties": {"secondsfromstart": 39,
 "speed": 5.47,
 "var": "28001,ES,Madrid,Madrid,CALLE NU�EZ DE BALBOA 45,Madrid"},
"type": "Feature"}],
"type": "FeatureCollection"}

export default {
  mounted() {

    //window.addEventListener('resize', this.resize);
    //this.resize();
    //window.addEventListener('beforeunload', this.beforeUnload);

    this.$emit('dddViewerMode', 'scene');

    window.dispatchEvent(new Event('resize'));

    setTimeout(() =>  {
        const geoJsonLayerPoints = new GeoJson3DLayer(testGeoJsonLayerPoints);
        this.getSceneViewer().layerManager.addLayer("test-geojson-points", geoJsonLayerPoints);
        const geoJsonLayerLines = new GeoJson3DLayer(testGeoJsonLayerLines);
        this.getSceneViewer().layerManager.addLayer("test-geojson-lines", geoJsonLayerLines);
        const geoJsonLayerTest = new GeoJson3DLayer(testGeoJsonLayerTest);
        this.getSceneViewer().layerManager.addLayer("test-geojson-madrid-transport", geoJsonLayerTest);
    }, 0);

  },
  beforeDestroy() {
  },

  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('sceneTools.TITLE')} - %s`
    }
  },
  inject: [
    'getSceneViewer',
  ],
  data() {
    return {
        selectedLayer: null
    }
  },
  computed: {
  },
  props: [
      'viewerState',
  ],
  watch: {
  },

    components: {
        DDDScene,
        DDDSceneInsert,
    },

    methods: {
        selectLayer(layer) {
            this.selectedLayer = layer;
        },

        showHideLayer(layer) {
            layer.visible = ! layer.visible;
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(layer.key);
            sceneViewerLayer.setVisible(layer.visible)
        }
    },

}
</script>

