<template>
    <v-dialog v-model="dialog" max-width="500px" lazy persistent>
        <v-card>
            <v-card-title>
                <span class="headline pt-4">Edit</span>
            </v-card-title>

            <v-card-text class="pa-0">
                <v-form v-model="valid" ref="updateStaffForm">
                    <v-container grid-list-xs>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field v-model="editedStaff.firstName" label="First name" :rules="[rules.required]"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="editedStaff.lastName" label="Last Name" :rules="[rules.required]"></v-text-field>
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions class="pb-4 px-3">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="primary" @click.native="update" :loading="loading" :disabled="loading">Update</v-btn>
            </v-card-actions>

            <v-card-text v-if="success">
                <v-alert outline class="pa-3" :value="success" type="success" transition="fade-transition">
                    {{editedStaff.firstName}} {{editedStaff.lastName}} is now updated
                </v-alert>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	props: ["editDialogState", "staff"],
	watch: {
		editDialogState(newDialogState) {
			this.dialog = newDialogState;
		},
		staff(editedStaff) {
			console.log(editedStaff.email);
			this.editedStaff = editedStaff;
		}
	},
	data() {
		return {
			rules: {
				required: value => !!value || "Required."
			},

			dialog: false,

			loading: false,

			valid: false,
			success: false,
			editedStaff: {
				firstName: "",
				lastName: "",
				email: ""
			}
		};
	},

	methods: {
		...mapActions([
			// `mapActions` also supports payloads:
			"updateStaff" // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
		]),
		close() {
			this.dialog = false;
			this.loading = false;
			this.success = false;
			this.$refs.updateStaffForm.reset();
			this.$emit("closeEditDialog");
		},
		update() {
			this.$refs.updateStaffForm.validate();

			if (this.valid) {
				this.loading = true;
				this.$store
					.dispatch("updateStaff", {
						firstName: this.editedStaff.firstName,
						lastName: this.editedStaff.lastName,
						email: this.editedStaff.email
					})
					.then((resolve, reject) => {
						console.log(resolve);
						if (resolve) {
							this.success = true;
							this.loading = false;
						}
					});
			}
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
