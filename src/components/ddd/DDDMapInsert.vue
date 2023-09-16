<template>

    <div style="padding: 2px; pointer-events: auto;" class="hidden-sm-and-up">
        <div class="ddd-map-insert" id="ddd-map-insert" style="height: 400px;">
        </div>
    </div>

</template>

<script>

export default {

  inject: [
      //'getViewerState'
  ],

  methods: {

      resize: function() {
          this.checkMountMap();
      },

      checkMountMap: function() {
            // Check if insert is visible as per https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
            let el = this.$el.querySelector('.ddd-map-insert').parentNode;
            let visible = window.getComputedStyle(el).display !== 'none'; // ; (el.parentNode.parentOffset !== null);
            //console.debug("CheckMountMap");

            if (visible) {
                if (this.mountedMap === null) {
                    this.mountMap();
                }
            } else {
                if (this.mountedMap !== null) {
                  this.unmountMap();
                }
            }
      },

      mountMap: function() {
        let el = document.getElementById('ddd-map-parent');
        if (el) {
            console.debug('Mounting DDD map insert.');
            this.renderBackEl = el.parentNode;
            this.$el.querySelector('.ddd-map-insert').appendChild(el);
            this.mountedMap = el;

            window.dispatchEvent(new Event('resize'));
        }
      },

      unmountMap: function() {
        let el = this.$el.querySelector('.ddd-map-insert').firstChild;
        if (el) {
            //console.debug("Unmounting DDD map insert.");
            //document.getElementById('ddd-map-parent').insertBefore(el, document.getElementById('ddd-map').firstChild);  // Must be the first child, as used in mount
            this.renderBackEl.appendChild(el);  // Must be first child as used in mount
            this.mountedMap = null;
            this.renderBackEl = null;

            window.dispatchEvent(new Event('resize'));
        }
      }

  },


  mounted() {
    this.mountedMap = null;
    this.checkMountMap();
    window.addEventListener('resize', this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.unmountMap();
  }

}

</script>
