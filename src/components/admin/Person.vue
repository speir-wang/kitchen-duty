<template>
    <div>
        <h3>{{person.firstName}} {{person.lastName}}</h3>
        <p>{{person.email}}</p>
    </div>
</template>


<script>
export default {
	name: "Person",
	props: ["person"]
};
</script>
