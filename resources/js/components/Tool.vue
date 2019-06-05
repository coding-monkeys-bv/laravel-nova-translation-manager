<template>
    <div>
        <heading class="mb-6">Translation Manager</heading>

        <card class="p-6">
            <div class="flex items-end">
                <div>
                    <label class="block mb-4">{{ __('Select a group') }}</label>
                    <select class="form-control form-input form-input-bordered" size="1" v-model="group" @change="setGroup">
                        <option :value="item" v-for="(item, index) in groups">{{ item }}</option>
                    </select>
                </div>
                <div class="ml-4">
                    <button class="btn btn-default btn-primary" v-if="groupSelected" @click="exportTranslations">
                        {{ __('Publish') }}
                    </button>
                </div>
            </div>
        </card>

        <card v-if="groupSelected" class="mt-6">
            <table class="table w-full">
                <thead>
                    <th class="text-left">Keyword</th>
                    <th class="text-left" v-for="(locale, index) in locales">{{ locale }}</th>
                </thead>
                <tbody>
                    <tr v-for="translation in translations">
                        <td>{{ translation[locales[0]].key }}</td>
                        <td v-for="(locale, index) in locales" @click="showModal(translation[locale])">
                            <span class="cursor-pointer" v-if="translation[locale]">
                                <span v-if="translation[locale].value.length > 80">{{ translation[locale].value.substring(0, 80) }}...</span>
                                <span v-else>{{ translation[locale].value }}</span>
                            </span>
                            <span v-else>
                                <em class="text-danger">{{ __('Not Available') }}</em>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </card>


        <portal to="modals">
            <transition name="fade">
                <modal v-if="modalOpen" class="modal" tabindex="-1" role="dialog">
                    
                    <card class="w-full">
                        <heading :level="2" class="pt-8 px-8">{{ __('Update Translation') }}</heading>

                        <div class="p-8">
                            <textarea 
                                class="w-full form-input form-input-bordered p-4" 
                                rows="6" cols="90"
                                v-model="selected.value"
                            ></textarea>
                        </div>

                        <div class="bg-30 px-6 py-3 flex">
                            <div class="flex items-center ml-auto">
                                <button type="button" @click.prevent="closeModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="updateTranslation" class="btn btn-default btn-primary">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </div>

                    </card>

                </modal>
            </transition>
        </portal>

    </div>
</template>

<script>

export default {

    computed: {
        groupSelected() {
            return this.group !== null;
        }
    },
        
    data() {
        return {
            group: null,
            groups: [],
            selectedGroup: null,
            locales: [],
            modalOpen: false,
            selected: {},
            translations: [],
            apiUrl: '/voicecode/nova-translation-manager/',
        }
    },

    mounted() {
        this.getGroups();
        this.getLocales();
    },

    methods: {

        showModal(data) {
            this.selected = Object.assign({}, data)
            this.modalOpen = true;
        },

        closeModal() {
            this.selected = Object.assign({}, {})
            this.modalOpen = false;
        },

        getGroups() {
            axios.get(this.apiUrl + 'translations').then(response => { 
                this.groups = response.data;
            })
        },

        getLocales() {
            axios.get(this.apiUrl + 'locales').then(response => { 
                this.locales = response.data;
            })
        },

        setGroup() {
            axios.get(this.apiUrl + 'translations/' + this.group).then(response => {
                this.translations = response.data;
            })
        },

        updateTranslation() {
            // Setup data.
            var data = {}
            data.id = this.selected.id
            data.value = this.selected.value;

            axios.put(this.apiUrl + 'translations/' + this.selected.id, data).then(response => {

                // Close the modal.
                this.closeModal();

                // Make sure the data is being refreshed.
                this.setGroup(this.group);

                // Show message.
                this.$toasted.show('The translation has been updated!', { type: 'success' })
            })
        },

        exportTranslations() {
            // Setup data.
            var data = {}
            data.group = this.group

            axios.post(this.apiUrl + 'translations/export', data).then(response => {
                // Show message.
                this.$toasted.show('The translations have been exported!', { type: 'success' })
            });
        }
    }
}
</script>
