<template v-slot:activator="{ on }">
  <div>
    <v-app-bar class="white" flat height="40">
      <div class="headline ml-0">
        <div v-resize-text class="ddd-logo-wrapper">
          <img src="../../../public/img/ddd-logo.png" class="ddd_logo" />
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer; position: relative; top: -3px; left: 10px; font-weight: bold;"
            class="primary--text ddd-logo-letter"
            v-if="isTokenSet"
            >
            {{ appTitle }}</router-link>
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer; position: relative; top: -3px; left: 10px; font-weight: bold;"
            class="primary--text ddd-logo-letter"
            v-else
            >{{ appTitle }}</router-link>

          <small class="ml-5" style="font-size: 50%; vertical-align: bottom;">experimental</small>

        </div>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-items class="primary--text">
        <v-btn
          text
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class, 'primary--text']"
        >
          <v-icon style="font-size: 17px; padding: 0.35rem;">{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>

        <!-- <v-list-item class="hidden-sm-and-down">
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action>
            <v-switch v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon class="pl-2">mdi-weather-night</v-icon>
        </v-list-item> -->

        <v-menu v-if="admin" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text class="btnAdmin hidden-sm-and-down">
              <v-icon>mdi-lock</v-icon>
              &nbsp;{{ $t('adminItems.ADMIN') }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in adminItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-item-icon class="mr-2 primary--text">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          text
          v-if="isTokenSet"
          @click="userLogout"
          class="hidden-sm-and-down btnLogout"
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          {{ $t('menuItems.LOGOUT') }}
        </v-btn>

        <span class="hidden-md-and-up">
            <v-app-bar-nav-icon class="primary--text" style="width: 40px; height: 40px; position: relative; right: 0;" @click="sidebar = !sidebar"></v-app-bar-nav-icon>
        </span>

        <!-- <LocaleChanger /> -->

      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="sidebar" fixed disable-resize-watcher>
      <v-list>
        <v-list-item>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn icon class="my-8" @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-item-action class="primary--text">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-list-group v-if="admin" prepend-icon="mdi-lock" no-action>
          <v-list-item slot="activator" class="pl-0">
            <v-list-item-content>{{
              $t('adminItems.ADMIN')
            }}</v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="(item, index) in adminItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item v-if="isTokenSet" @click="userLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ $t('menuItems.LOGOUT') }}
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item>
          <v-list-item-action></v-list-item-action>
          <v-icon>mdi-weather-sunny</v-icon>
          <v-list-item-action class="ml-2">
            <v-switch id="themeSwitcher" v-model="isDark" inset></v-switch>
          </v-list-item-action>
          <v-icon>mdi-weather-night</v-icon>
        </v-list-item> -->

      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<style scoped lang="scss">
.ddd-logo-wrapper {
    display: flex;
    align-items: center;
}

.ddd_logo {
    display: inline-block;
    width: 36px;
    padding: 5px;
}

.ddd-logo-letter {
    padding-top: 6px;
    font-size: 20px;
}

.ddd-toolbar-map-button {
  font-size: 1rem;
}
</style>

<script>
import { mapGetters } from 'vuex'
import LocaleChanger from '@/components/core/LocaleChanger'
import ResizeText from 'vue-resize-text'

export default {
  name: 'Toolbar',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    }
  },
  components: {
    LocaleChanger
  },
  directives: {
    ResizeText
  },
  data() {
    return {
      isDark: false,
      sidebar: false
    }
  },
  props: [
      'viewerState'
  ],
  computed: {
    ...mapGetters(['appTitle', 'isTokenSet', 'user',]),
    admin() {
      return this.user !== null ? this.user.role === 'admin' : false
    },
    adminItems() {
      return [
        {
          title: this.$t('adminItems.CITIES'),
          link: 'admin-cities',
          icon: 'mdi-city',
          class: 'btnAdminCities'
        },
        {
          title: this.$t('adminItems.USERS'),
          link: 'admin-users',
          icon: 'mdi-account-supervisor',
          class: 'btnAdminUsers'
        }
      ]
    },
    menuItems() {
      if (this.isTokenSet) {
        return [
          {
            title: this.$t('menuItems.VIEW_MAP'),
            link: 'map',
            icon: 'mdi-video-map',
            class: 'btnViewMap ddd-toolbar-map-button'
          },
          {
            title: this.$t('menuItems.HOME'),
            link: 'home',
            icon: 'mdi-home',
            class: 'btnHome'
          },
          {
            title: this.$t('menuItems.VIEW_3D'),
            link: 'view-3d',
            icon: 'mdi-video-3d',
            class: 'btnView3D'
          },
          {
            title: this.$t('menuItems.ABOUT'),
            link: 'about',
            icon: 'mdi-help-circle',
            class: 'btnAbout'
          },
          {
            title: this.$t('menuItems.MY_PROFILE'),
            link: 'profile',
            icon: 'mdi-face',
            class: 'btnProfile'
          }
        ]
      }
      let links = [];
      links = [
        /*
        {
          title: this.$t('menuItems.HOME'),
          link: 'home',
          icon: 'mdi-home'
        },
        */
        {
            title: 'map',
            link: 'mapMain',
            icon: 'mdi-map',
            class: 'btnViewMap ddd-toolbar-map-button'
        }
      ];

      if (true) {
        links.push({
          title: 'dddserver',
          link: 'dddServerTasks',
          icon: 'mdi-monitor-edit',
          class: 'btnViewMap'
        });
      }

      links.extend([
        {
            title: 'home',
            link: 'landing',
            icon: 'mdi-home',
            class: 'btnViewMap'
        },
        {
          title: 'blog',
          link: 'blog',
          icon: 'mdi-lead-pencil',
          class: 'btnViewMap'
        },
        {
          title: 'docs',
          link: 'docs',
          icon: 'mdi-book',
          class: 'btnViewMap'
        }
      ]);

      links.push({
          title: "about", //this.$t('menuItems.ABOUT')
          link: 'about',
          icon: 'mdi-help-circle',
          class: 'btnAbout'
        });
        /*
        {
          title: this.$t('menuItems.LOGIN'),
          link: 'login',
          icon: 'mdi-lock',
          class: 'btnLogin'
        },
        {
          title: this.$t('menuItems.SIGNUP'),
          link: 'signup',
          icon: 'mdi-plus-circle-outline',
          class: 'btnLogin'
        }
        */
      return links;
    }
  },
  methods: {
    userLogout() {
      this.$store.dispatch('userLogout')
    }
  },
  watch: {
    // isDark() {
    //   this.$vuetify.theme.dark = this.isDark
    //   localStorage.setItem('dark', this.isDark)
    // },
    'viewerState.sceneVisible'() {
        this.$forceUpdate();
    }
  },
  created() {
    // const dark = localStorage.getItem('dark')
    // this.isDark = dark ? JSON.parse(dark) : false
  }
}

</script>
