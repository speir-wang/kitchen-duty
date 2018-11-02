<template>
    <div>
        <v-date-picker v-model="picker" :allowed-dates="allowedDates" locale="en-GB" full-width :min="current" :landscape="landscape" :reactive="reactive" @click.native="onClick">
        </v-date-picker>
        {{this.picker}}

    </div>
</template>


<script>
export default {
	data() {
		return {
			picker: new Date().toISOString().split("T")[0],
			landscape: true,
			reactive: true,
			current: new Date().toISOString().split("T")[0],
			pickerDate: null
		};
	},
	methods: {
		onClick(e) {
			// e.preventDefault();
			// e.stopPropagation();
			console.log(this.picker);
		},
		allowedDates: val => {
			return new Date(val).getDay() !== 0 && new Date(val).getDay() !== 6;
		}
	}
};
</script>
