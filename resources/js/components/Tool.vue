<template>
    <div>
        <heading class="mb-6">Translation Manager</heading>

        <div class="flex flex-wrap -mx-2">
            <div class="w-1/2 px-2">
                <card class="p-6">
                    <h3 class="mb-4">{{ __('Import Translations') }}</h3>
                    <div class="flex items-end">
                        <div class="w-1/3">
                            <select class="form-control form-input form-input-bordered w-full" size="1" v-model="importType">
                                <option value="replace">{{ __('Replace') }}</option>
                                <option value="append">{{ __('Append') }}</option>
                            </select>
                        </div>
                        <div class="w-1/3 px-2">
                            <button class="btn btn-default btn-primary w-full" @click="importTranslations">
                                {{ __('Import') }}
                            </button>
                        </div>
                    </div>
                </card>
            </div>

            <div class="w-1/2 px-2">                
                <card class="p-6">
                    <h3 class="mb-4">{{ __('Select A Group') }}</h3>
                    <div class="flex items-end">
                        <div class="w-1/2">
                            <select class="form-control form-input form-input-bordered w-full" size="1" v-model="group" @change="setGroup">
                                <option :value="item" v-for="(item, index) in groups">{{ item }}</option>
                            </select>
                        </div>
                    </div>
                </card>
            </div>

            <div class="w-1/2 px-2 mt-6">
                <card class="p-6">
                    <h3 class="mb-4">{{ __('Create A Group') }}</h3>
                    <div class="flex items-end">
                        <div class="w-1/3">
                            <input class="form-control form-input form-input-bordered w-full" v-model="newGroup">
                        </div>
                        <div class="w-1/3 px-2">
                            <button class="btn btn-default btn-primary w-full" @click="createGroup">
                                {{ __('Create Group') }}
                            </button>
                        </div>
                        <div class="w-1/3"></div>
                    </div>
                </card>
            </div>

            <div class="w-1/2 px-2 mt-6">
                <card class="p-6">
                    <h3 class="mb-4">{{ __('Locales') }}</h3>
                    <!-- <div class="flex items-end">
                        <div class="w-1/3">
                            <input class="form-control form-input form-input-bordered w-full" v-model="newGroup">
                        </div>
                        <div class="w-1/3 px-2">
                            <button class="btn btn-default btn-primary w-full" @click="createGroup">
                                {{ __('Create Locale') }}
                            </button>
                        </div>
                        <div class="w-1/3"></div>
                    </div> -->

                    <div class="flex">
                        <div class="w-1/3">
                            <select class="form-control form-input form-input-bordered w-full" size="1" v-model="selectedLocale">
                                <option :value="locale" v-for="(locale, index) in locales">{{ locale }}</option>
                            </select>
                        </div>
                        <div class="w-1/3 px-2">
                            <button class="btn btn-default btn-danger" @click="openDeleteLocaleModal">
                                {{ __('Delete Locale') }}
                            </button>
                        </div>
                    </div>
                </card>
            </div>

            <div class="w-1/2 px-2 mt-6">
                <card class="p-6">
                    <h3 class="mb-4">{{ __('Create Locale') }}</h3>
                    <div class="flex items-end">
                        <div class="w-1/3">
                            <input class="form-control form-input form-input-bordered w-full" v-model="newLocale">
                        </div>
                        <div class="w-1/3 px-2">
                            <button class="btn btn-default btn-primary w-full" @click="createLocale">
                                {{ __('Create Locale') }}
                            </button>
                        </div>
                    </div>
                </card>
            </div>

        </div>


        <div v-if="groupSelected" class="mt-6">
            <button class="btn btn-default btn-primary mr-3" v-if="groupSelected" @click="openCreateModal">
                {{ __('Add Keyword') }}
            </button>
            
            <button class="btn btn-default btn-primary mr-3" v-if="groupSelected" @click="exportTranslations">
                {{ __('Publish') }}
            </button>

            <button class="btn btn-default btn-primary mr-3" @click="exportAllTranslations">
                {{ __('Publish All Groups') }}
            </button>

            <button class="btn btn-default btn-primary mr-3" v-if="groupSelected" @click="fixMissingTranslations">
                {{ __('Fix Translations') }}
            </button>
            
            <button class="btn btn-default btn-danger" v-if="groupSelected" @click="openDeleteGroupModal">
                {{ __('Delete Group') }}
            </button>
        </div>

        <card v-if="groupSelected" class="mt-6">
            <table class="table w-full">
                <thead>
                    <th class="text-left">Keyword</th>
                    <th class="text-left" v-for="(locale, index) in locales">{{ locale }}</th>
                    <th class="text-right"></th>
                </thead>
                <tbody>
                    <tr v-for="translation in translations" v-if="translation[defaultLocale]">
                        <td>
                            <span class="cursor-pointer" @click="openUpdateKeywordModal(translation[defaultLocale].key)">
                                {{ translation[defaultLocale].key }}
                            </span>
                        </td>
                        <td v-for="(locale, index) in locales" @click="openUpdateModal(translation[locale])" v-if="translation[locale]">
                            <span class="cursor-pointer" v-if="translation[locale] && translation[locale].value !== null">
                                <span v-if="translation[locale].value.length > 80">{{ translation[locale].value.substring(0, 80) }}...</span>
                                <span v-else>{{ translation[locale].value }}</span>
                            </span>
                            <span v-else>
                                <em class="text-danger">{{ __('Not Available') }}</em>
                            </span>
                        </td>
                        <td v-else>
                            <button class="btn btn-default btn-icon btn-white float-right" @click="fixMissingTranslation(translation)">
                                {{ __('Fix Translation') }}
                            </button>
                        </td>
                        <td class="text-right">      
                            <button class="btn btn-default btn-icon btn-white float-right" @click="openDeleteModal(translation[defaultLocale].id)">
                                <icon type="delete" class="text-80" />
                            </button>
                        </td>
                    </tr>

                    <tr v-else>
                        <td>
                            <span class="text-danger">{{ __('This translation needs fixing') }}</span>
                        </td>
                        <td v-for="(locale, index) in locales"></th>
                        <td class="text-right">      
                            <button class="btn btn-default btn-icon btn-white float-right" @click="fixMissingTranslation(translation)">
                                {{ __('Fix Translation') }}
                            </button>
                        </td>
                    </tr>  

                </tbody>
            </table>

            
        </card>


        <portal to="modals">
            <transition name="fade">

                <modal v-if="updateKeywordModalOpened" class="modal" tabindex="-1" role="dialog">
                    <card class="w-full">
                        
                        <heading :level="2" class="pt-8 px-8">{{ __('Update Keyword') }}</heading>

                        <div class="p-8">
                            <input class="w-full form-input form-input-bordered p-4" v-model="updatedKeyword">
                        </div>

                        <div class="bg-30 px-6 py-3 flex">
                            <div class="flex items-center ml-auto">
                                <button type="button" @click.prevent="closeUpdateKeywordModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="updateKeyword" class="btn btn-default btn-primary">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </div>
                    </card>
                </modal>


                <modal v-if="updateModalOpened" class="modal" tabindex="-1" role="dialog">
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
                                <button type="button" @click.prevent="closeUpdateModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="updateTranslation" class="btn btn-default btn-primary">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </div>
                    </card>
                </modal>

                <modal v-if="createModalOpened" class="modal" tabindex="-1" role="dialog">
                    <card class="w-full">
                        
                        <heading :level="2" class="pt-8 px-8">{{ __('Add Keywords') }}</heading>

                        <div class="px-8 mt-3">
                            <p>{{ __('Add 1 key per line, without the group prefix') }}</p>
                        </div>

                        <div class="p-8">
                            <textarea 
                                class="w-full form-input form-input-bordered p-4" 
                                rows="6" cols="90"
                                v-model="keywords"
                            ></textarea>
                        </div>

                        <div class="bg-30 px-6 py-3 flex">
                            <div class="flex items-center ml-auto">
                                <button type="button" @click.prevent="closeCreateModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="createKeywords" class="btn btn-default btn-primary">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </div>
                    </card>
                </modal>

                <modal v-if="deleteModalOpened" class="modal" tabindex="-1" role="dialog">
                    <card class="w-full">

                        <heading :level="2" class="pt-8 px-8">{{ __('Delete This Translation') }}</heading>

                        <div class="px-8 mt-3 mb-3">
                            <p>{{ __('Are you sure?') }}</p>
                        </div>

                        <div class="bg-30 px-6 py-3 flex">
                            <div class="flex items-center ml-auto">
                                <button type="button" @click.prevent="closeDeleteModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="deleteKeyword" class="btn btn-default btn-danger">
                                    {{ __('Delete') }}
                                </button>
                            </div>
                        </div>
                    </card>
                </modal> 

                <modal v-if="deleteGroupModalOpened" class="modal" tabindex="-1" role="dialog">
                    <card class="w-full">

                        <heading :level="2" class="pt-8 px-8">{{ __('Delete This Group') }}</heading>

                        <div class="px-8 mt-3 mb-3">
                            <p>{{ __('Are you sure?') }}</p>
                        </div>

                        <div class="bg-30 px-6 py-3 flex">
                            <div class="flex items-center ml-auto">
                                <button type="button" @click.prevent="closeDeleteGroupModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="deleteGroup" class="btn btn-default btn-danger">
                                    {{ __('Delete') }}
                                </button>
                            </div>
                        </div>
                    </card>
                </modal>   

                <modal v-if="deleteLocaleModalOpened" class="modal" tabindex="-1" role="dialog">
                    <card class="w-full">

                        <heading :level="2" class="pt-8 px-8">{{ __('Delete This Locale') }}</heading>

                        <div class="px-8 mt-3 mb-3">
                            <p>{{ __('Are you sure?') }}</p>
                        </div>

                        <div class="bg-30 px-6 py-3 flex">
                            <div class="flex items-center ml-auto">
                                <button type="button" @click.prevent="closeDeleteLocaleModal" class="btn text-80 font-normal h-9 px-3 mr-3 btn-link">
                                    {{ __('Cancel') }}
                                </button>

                                <button type="submit" @click.prevent="deleteLocale" class="btn btn-default btn-danger">
                                    {{ __('Delete') }}
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
            newGroup: null,
            selectedGroup: null,
            importType: null,
            keywords: null,
            updatedKeyword: null,
            selectedKeyword: null,
            locales: [],
            newLocale: null,
            defaultLocale: null,
            selectedLocale: null,
            selected: {},
            translations: [],
            createModalOpened: false,
            updateModalOpened: false,
            deleteModalOpened: false,
            deleteGroupModalOpened: false,
            deleteLocaleModalOpened: false,
            updateKeywordModalOpened: false,
            apiUrl: '/voicecode/nova-translation-manager/',
        }
    },

    mounted() {
        this.getGroups();
        this.getLocales();
    },

    methods: {

        getGroups() {
            axios.get(this.apiUrl + 'translations').then(response => { 
                this.groups = response.data;
            })
        },

        getLocales() {
            axios.get(this.apiUrl + 'locales').then(response => { 
                this.locales = response.data.locales;
                this.defaultLocale = response.data.defaultLocale;
            })
        },

        setGroup() {            
            axios.get(this.apiUrl + 'translations/' + this.group).then(response => {
                this.translations = response.data;
            })
        },

        createGroup() {
            if(this.newGroup !== null && this.newGroup !== '') {
            
                var data = {}
                data.group = this.newGroup

                axios.post(this.apiUrl + 'groups', data).then(response => {

                    // Set formatted group name.
                    this.group = response.data.group

                    // Get new groups list.
                    this.getGroups();

                    // Switch to the new group.
                    this.setGroup(this.group);

                    // Reset new group value.
                    this.newGroup = null;
                }).catch(error => {

                    // Show message.
                    this.$toasted.show(error.response.data.errors.group[0], { type: 'error' })
                })
            }
        },

        deleteGroup() {
            
            if(this.group !== null && this.group !== '') {

                // Delete group.
                axios.delete(this.apiUrl + 'groups/' + this.group).then(response => {
                    // Show message.
                    this.$toasted.show('The group has been deleted!', { type: 'success' })

                    // Get new groups list.
                    this.getGroups();

                    // Reset group value.
                    this.group = null;

                    // Close the modal.
                    this.deleteGroupModalOpened = false;

                });
            }
        },

        createKeywords() {
            // Setup data.
            var data = {}
            data.group = this.group
            data.keywords = this.keywords

            axios.post(this.apiUrl + 'translations', data).then(response => {

                // Close the modal.
                this.closeCreateModal();

                // Make sure the data is being refreshed.
                this.setGroup(this.group);

                // Show message.
                this.$toasted.show('The translation has been created!', { type: 'success' })
            })
        },

        updateKeyword() {
            if(
                this.selectedGroup !== null && this.selectedGroup !== '' && 
                this.selectedKeyword !== null && this.selectedKeyword !== '' &&
                this.updatedKeyword !== null && this.updatedKeyword !== '') {

                    // Setup data.
                    var data = {}
                    data.group = this.selectedGroup
                    data.new_key = this.updatedKeyword
                    data.old_key = this.selectedKeyword

                    axios.put(this.apiUrl + 'translations/key', data).then(response => {
                        
                        // Make sure the data is being refreshed.
                        this.setGroup(this.group); 

                        // Close the modal.
                        this.closeUpdateKeywordModal();

                        // Show message.
                        this.$toasted.show('The keyword has been updated!', { type: 'success' })
                    });
            }
        },

        deleteKeyword() {

            if(
                this.selectedGroup !== null && this.selectedGroup !== '' && 
                this.selectedKeyword !== null && this.selectedKeyword !== '') {
                    
                    axios.delete(this.apiUrl + 'translations/' + this.selectedGroup + '/' + this.selectedKeyword).then(response => {
                        
                        // Make sure the data is being refreshed.
                        this.setGroup(this.group); 

                        // Close the modal.
                        this.closeDeleteModal();

                        // Show message.
                        this.$toasted.show('The translation has been updated!', { type: 'success' })
                    });
            }
        },

        updateTranslation() {
            // Setup data.
            var data = {}
            data.id = this.selected.id
            data.value = this.selected.value

            axios.put(this.apiUrl + 'translations/' + this.selected.id, data).then(response => {

                // Close the modal.
                this.closeUpdateModal();

                // Make sure the data is being refreshed.
                this.setGroup(this.group);

                // Show message.
                this.$toasted.show('The translation has been updated!', { type: 'success' })
            });
        },

        exportTranslations() {
            // Setup data.
            var data = {}
            data.group = this.group

            axios.post(this.apiUrl + 'translations/export', data).then(response => {
                // Show message.
                this.$toasted.show('The translations have been exported!', { type: 'success' })
            });
        },

        exportAllTranslations() {
            // Setup data.
            var data = {}
            data.group = "*"

            axios.post(this.apiUrl + 'translations/export', data).then(response => {
                // Show message.
                this.$toasted.show('The translations have been exported!', { type: 'success' })
            });
        },

        importTranslations() {
            
            if(this.importType !== null && this.importType !== '') {
                // Setup data.
                var data = {}
                data.type = this.importType 

                axios.post(this.apiUrl + 'translations/import', data).then(response => {
                    // Show message.
                    this.$toasted.show('The translations have been imported!', { type: 'success' })
                });
            }
        },

        // Fix a single missing translation.
        fixMissingTranslation(translation) {

            // Get the first key of the translation object.
            var trans = translation[Object.keys(translation)[0]];

            // Setup data.
            var data = {}
            data.key = trans.key
            data.group = trans.group

            axios.post(this.apiUrl + 'translations/fix', data).then(response => {

                // Make sure the data is being refreshed.
                this.setGroup(this.group);

                // Show message.
                this.$toasted.show('The translation has been fixed!', { type: 'success' })
            });
        },

        // Fix all missing translations from within a group.
        fixMissingTranslations() {

            // Setup data.
            var data = {}
            data.group = this.group

            axios.post(this.apiUrl + 'translations/fix/group', data).then(response => {

                // Make sure the data is being refreshed.
                this.setGroup(this.group);

                // Show message.
                this.$toasted.show('All translations within this group have been fixed!', { type: 'success' })
            });
        },

        createLocale() {
            if(this.newLocale !== null && this.newLocale !== '') {

                var data = {}
                data.locale = this.newLocale
                
                axios.post(this.apiUrl + 'locales', data).then(response => {
                    // Reload locales
                    this.getLocales();

                    // Reset new locale value
                    this.newLocale = null;

                    // Show message.
                    this.$toasted.show('The locale has been created!', { type: 'success' })
                }).catch(error => {

                    // Show message.
                    this.$toasted.show(error.response.data.errors.locale[0], { type: 'error' })
                })
            }
        },

        deleteLocale() {

            if(this.selectedLocale !== null && this.selectedLocale !== '') {

                axios.delete(this.apiUrl + 'locales/' + this.selectedLocale).then(response => {
                    
                    // Close the modal.
                    this.closeDeleteLocaleModal();

                    // Make sure the data is being refreshed.
                    this.setGroup(this.group);

                    // Reload locales
                    this.getLocales();

                    // Show message.
                    this.$toasted.show('The locale has been deleted!', { type: 'success' })
                });
            }
        },

        openCreateModal() {
            this.createModalOpened = true;
        },

        closeCreateModal() {
            this.keywords = null;
            this.createModalOpened = false;
        },

        openUpdateModal(data) {
            this.selected = Object.assign({}, data)
            this.updateModalOpened = true;
        },

        closeUpdateModal() {
            this.selected = Object.assign({}, {})
            this.updateModalOpened = false;
        },

        openDeleteGroupModal() {
            this.deleteGroupModalOpened = true;
        },

        closeDeleteGroupModal() {
            this.deleteGroupModalOpened = false;
        },

        openDeleteModal(id) {
            this.selectedGroup = this.group;
            this.selectedKeyword = id;
            this.deleteModalOpened = true;
        },

        closeDeleteModal() {
            this.selectedGroup = null;
            this.selectedKeyword = null;
            this.deleteModalOpened = false;
        },

        openUpdateKeywordModal(keyword) {
            this.selectedGroup = this.group;
            this.updatedKeyword = keyword;
            this.selectedKeyword = keyword;
            this.updateKeywordModalOpened = true;
        },

        closeUpdateKeywordModal() {
            this.selectedKeyword = null;
            this.updatedKeyword = null;
            this.updateKeywordModalOpened = false;
        }, 

        openDeleteLocaleModal() {
            this.deleteLocaleModalOpened = true;
        }, 

        closeDeleteLocaleModal() {
            this.deleteLocaleModalOpened = false;
        }
    }
}
</script>
