<template>
    <div>
        <h2>Add Person to list</h2>
        <input type="text" placeholder="First Name" v-model="firstName" required>
        <input type="text" placeholder="Last Name" v-model="lastName" required>
        <input type="email" name="email" id="email" placeholder="Email" v-model="email" required>
        <button @click.prevent="addToList">Add to list</button>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			firstName: "",
			lastName: "",
			email: ""
		};
	},
	mounted() {
		this.$store.dispatch("deleteUserByEmail", "he@townsquare.agency");
	},
	methods: {
		addToList() {
			const newPerson = {
				firstName: "He",
				lastName: "Wang",
				email: "he@townsquare.agency"
			};
			this.$store.dispatch("addPersonToList", newPerson);
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
