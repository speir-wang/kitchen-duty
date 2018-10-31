<template>
    <div class="current-date">
        <h3>{{getDate()}}</h3>
        <h4>{{getDay()}}</h4>
    </div>
</template>

<script>
export default {
	name: "CurrentDate",
	data() {
		return {
			currentDate: new Date()
		};
	},
	methods: {
		getDay() {
			return this.currentDate.toLocaleDateString("en-AU", { weekday: "long" });
		},

		getDate() {
			return this.currentDate.toLocaleDateString();
		}
	}
};
</script>


