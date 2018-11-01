<template>
    <v-dialog v-model="dialog" max-width="500px" lazy persistent>
        <v-btn slot="activator" color="primary" dark class="mb-2">Add New Staff</v-btn>
        <v-card>
            <v-card-title>
                <span class="headline px-2 pt-4">Add New Staff</span>
            </v-card-title>

            <v-card-text class="pa-0">
                <v-form v-model="valid" ref="addNewStaffForm">
                    <v-container grid-list-xs>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="firstName" label="First name" :rules="[rules.required]"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="lastName" label="Last Name" :rules="[rules.required]"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="email" label="Email Address" :rules="[rules.required, rules.email, rules.emailExists]"></v-text-field>
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions class="pb-4">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="primary" @click.native="save" :loading="loading" :disabled="loading">Save</v-btn>
            </v-card-actions>

            <v-card-text v-if="success">
                <v-alert outline class="pa-3" :value="success" type="success" transition="fade-transition">
                    {{firstName}} {{lastName}} is now joining the list
                </v-alert>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			rules: {
				required: value => !!value || "Required.",
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return pattern.test(value) || "Invalid e-mail.";
				},
				emailExists: value => {
					let email = this.getTownSquarePeople.find(staff => staff.email === value);
					if (email) return "Email exists, please try another one.";
					return true;
				}
			},
			dialog: false,
			loading: false,
			valid: false,
			success: false,
			firstName: "",
			lastName: "",
			email: ""
		};
	},

	computed: {
		...mapGetters([
			// `mapActions` also supports payloads:
			"getTownSquarePeople" // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
		])
	},
	methods: {
		...mapActions([
			// `mapActions` also supports payloads:
			"addPersonToList" // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
		]),
		close() {
			this.dialog = false;
			this.loading = false;
			this.success = false;
			this.$refs.addNewStaffForm.reset();
		},
		save() {
			this.$refs.addNewStaffForm.validate();

			const newStaff = {
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email
			};

			if (this.valid) {
				this.loading = true;
				this.$store.dispatch("addPersonToList", newStaff).then((resolve, reject) => {
					if (resolve) {
						this.success = true;
						this.loading = false;
					}
				});
			}
		},
		deleteStaff(staff) {
			console.log(staff);
		}
	}
};
</script>


<style lang="scss" scoped>
input {
	display: block;
	width: 100%;
}
</style>
