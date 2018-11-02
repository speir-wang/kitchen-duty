<template>
    <v-card>
        <v-card-title>
            <v-text-field aria-placeholder="Search by first name" placeholder="Search by first name" v-model="search" append-icon="search" label="Search" single-line hide-details class="mb-3"></v-text-field>

            <v-spacer></v-spacer>
            <v-btn @click="addNewStaff" color="primary" dark class="mb-2">Add New Staff</v-btn>
            <AddDialog :addDialogState="addDialogState" @closeAddDialog="closeAddDialog"></AddDialog>
            <EditDialog :staff="editedStaff" :editDialogState="editDialogState" @closeEditDialog="closeEditDialog"></EditDialog>

        </v-card-title>
        <v-data-table class="px-3 pb-5" v-model="selected" :headers="headers" :items="getTownSquarePeople" :search="search" hide-actions :customFilter="searchByFirstName">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.firstName }}</td>
                <td class="text-xs-left">{{ props.item.lastName }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">
                    <v-btn small right flat icon class="mr-0">
                        <v-icon small @click="editStaff(props.item)">
                            edit
                        </v-icon>
                    </v-btn>
                    <v-btn small right light flat icon class="ml-0">
                        <v-icon small @click="deleteStaff(props.item)">
                            delete
                        </v-icon>
                    </v-btn>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
            <template slot="no-data">
                <div class="text-xs-center mt-5">
                    <v-progress-circular :size="50" :width="5" indeterminate color="primary" v-if="!getTownSquarePeople.length"></v-progress-circular>
                </div>
                <v-alert :value="true" color="error" icon="warning" v-if="getTownSquarePeople.length">
                    Sorry, nothing to display here :(
                </v-alert>

            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AddDialog from "@/components/admin/AddDialog";
import EditDialog from "@/components/admin/EditDialog";

export default {
	components: {
		AddDialog,
		EditDialog
	},
	data() {
		return {
			addDialogState: false,
			editDialogState: false,
			editedStaff: {},
			search: "",
			selected: [],
			headers: [
				{
					text: "First Name",
					align: "left",
					sortable: true,
					value: "firstName"
				},
				{
					text: "Last Name",
					align: "left",
					sortable: false,
					value: "lastName"
				},
				{
					text: "Email Address",
					align: "left",
					sortable: false,
					value: "email"
				},
				{ text: "Actions", value: "name", sortable: false }
			]
		};
	},

	computed: {
		...mapGetters([
			"getTownSquarePeople"
			// ...
		])
	},
	methods: {
		...mapActions([
			"deleteStaff"
			// ...
		]),
		searchByFirstName(items, search, filter) {
			search = search.toString().toLowerCase();
			return items.filter(item => filter(item.firstName, search));
		},
		addNewStaff() {
			this.addDialogState = true;
		},
		editStaff(staff) {
			this.editedStaff = Object.assign({}, staff);

			this.editDialogState = true;
		},
		closeAddDialog() {
			this.addDialogState = false;
		},
		closeEditDialog() {
			this.editDialogState = false;
		},
		deleteStaff(staff) {
			this.$store.dispatch("deleteStaff", staff).then((resolve, reject) => {
				if (resolve) {
				}
			});
			console.log(staff);
		}
	}
};
</script>
