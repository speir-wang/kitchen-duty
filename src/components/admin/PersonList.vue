<template>
    <v-card>
        <v-card-title>
            <v-text-field aria-placeholder="Search by first name" placeholder="Search by first name" v-model="search" append-icon="search" label="Search" single-line hide-details class="mb-3"></v-text-field>
            <v-spacer></v-spacer>
            <AddPersonToList></AddPersonToList>

        </v-card-title>
        <v-data-table class="px-3 pb-5" v-model="selected" :headers="headers" :items="getTownSquarePeople" :search="search" hide-actions :customFilter="searchByFirstName">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.firstName }}</td>
                <td class="text-xs-left">{{ props.item.lastName }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
                <td class="text-xs-left">

                    <v-icon small @click="deleteStaff(props.item)">
                        delete
                    </v-icon>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AddPersonToList from "@/components/admin/AddPersonToList";

export default {
	components: {
		AddPersonToList
	},
	data() {
		return {
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
		searchByFirstName(items, search, filter) {
			search = search.toString().toLowerCase();
			return items.filter(item => filter(item.firstName, search));
		}
	}
};
</script>
