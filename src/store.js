import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(Vuex);

const config = {
	apiKey: "AIzaSyCpxsKMjKAW8OfaRPoMAH5o3_Qtysy99hA",
	authDomain: "townies-a79c2.firebaseapp.com",
	databaseURL: "https://townies-a79c2.firebaseio.com",
	projectId: "townies-a79c2",
	storageBucket: "townies-a79c2.appspot.com",
	messagingSenderId: "751437557211"
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default new Vuex.Store({
	state: {
		townSquarePeople: [],
		personOnDuty: {}
	},
	mutations: {
		setTownSquarePeople(state, person) {
			state.townSquarePeople = state.townSquarePeople.concat(person);
		},
		// addPersonToList
		addPersonToList(state, newPerson) {
			let newTownSquarePeople = state.townSquarePeople.concat(newPerson);
			state.townSquarePeople = [...newTownSquarePeople];
		},

		personOnDuty(state, personOnDuty) {
			state.personOnDuty = { ...personOnDuty };
		}
	},
	actions: {
		// addPersonToList
		addPersonToList: ({ commit }, newPerson) => {
			db.collection("users")
				.add(newPerson)
				.then(function(docRef) {
					commit("addPersonToList", newPerson);
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function(error) {
					console.error("Error adding document: ", error);
				});
		},
		fetchAllPeople: ({ commit }) => {
			db.collection("users")
				.get()
				.then(querySnapshot => {
					querySnapshot.forEach(doc => {
						commit("setTownSquarePeople", doc.data());
					});
				});
		},
		deleteUserByEmail: ({ commit, dispatch }, email) => {
			db.collection("users")
				.where("email", "==", email)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						console.log(doc.id, " => ", doc.data());
						doc.ref.delete();
					});
				});
		}
	},
	getters: {
		getTownSquarePeople: state => state.townSquarePeople,
		getPersonOnDuty: state => state.personOnDuty
	}
});
