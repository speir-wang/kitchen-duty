<template>
    <div id="admin">
        <h1>This is admin page</h1>

        <AddPersonToList></AddPersonToList>
        <PersonList></PersonList>
    </div>
</template>


<script>
import AddPersonToList from "@/components/admin/AddPersonToList";
import PersonList from "@/components/admin/PersonList";

export default {
	components: {
		AddPersonToList,
		PersonList
	},
	mounted() {
		this.$store.dispatch("fetchAllPeople");
	}
};
</script>

