<template>
  <v-dialog
    :value="show"
    persistent
    max-width="500">
    <v-card>
      <v-toolbar dark card color="primary">
        <v-icon>description</v-icon>
        <v-toolbar-title>Create Module</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog()">
            <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-progress-linear 
        :indeterminate="true"
        height="3"
        class="ma-0"
        color="secondary lighten-1"
        :active="loading" />
      <v-card-title class="pb-0 mb-0">
        <v-form class="full-width">
          <v-container fluid grid-list-md>
            <v-layout>
              <v-text-field
                label="Module Name"
                :error-messages="moduleNameError" 
                :disabled="loading"
                v-model="$store.state.module.moduleName" />
            </v-layout>
          </v-container>
        </v-form>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          :loading="loading"
          @click="closeDialog()">
          Dismiss
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          @click="saveModuleName()" >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'CreateModuleDialog',
  data: () => ({
    loading: false,
    moduleNameError: []
  }),
  methods: {
    closeDialog() {
      this.$store.commit('dialog/closeDialog', {dialog:"createModuleDialog"})
    },
    saveModuleName() {
      this.loading = true
      this.moduleNameError = []
      axios.post(this.baseUrl + 'api/module/create',{
        testCaseId: this.$cookies.get('testCaseId'),
        moduleName: this.moduleName
      }).then((res) => {
        this.loading = false
        if(res.data.status) {
          this.closeDialog()

          this.$store.commit('module/setModules', {modules : res.data.modules})

          this.$router.push('/testscenario')
        } else {
          this.moduleNameError = res.data.error
        }
      }).catch((e) => {
        this.loading = false
        this.$store.commit('snackbar/showError', { "text" : "Internal Server Error!" })
      })
    }
  },
  computed: mapGetters({
    show: 'dialog/createModuleDialog',
    baseUrl: 'extras/baseUrl',
    moduleName: 'module/moduleName'
  })
}
</script>

<style>

</style>
