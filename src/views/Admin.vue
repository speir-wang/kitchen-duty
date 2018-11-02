<template>
    <div id="admin" class="">
        <h1 class="display-2 font-weight-black my-5 text-xs-center">Town Square People List</h1>

        <PersonList></PersonList>
    </div>
</template>


<script>
import PersonList from "@/components/admin/PersonList";

export default {
	components: {
		PersonList
	},
	mounted() {
		this.$store.dispatch("fetchAllPeople");
	}
};
</script>

