<template>
    <div>
        <div v-for="(person, index) in getTownSquarePeople" :key=index>
            <Person :person=person></Person>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Person from "@/components/admin/Person";
export default {
	components: {
		Person
	},
	computed: {
		...mapGetters([
			"getTownSquarePeople"
			// ...
		])
	}
};
</script>
