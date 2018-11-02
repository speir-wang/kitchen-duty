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
		updateStaff(state, updatedStaff) {
			let updatedtownSquarePeople = [...state.townSquarePeople.filter(staff => staff.email !== updatedStaff.email), updatedStaff];
			state.townSquarePeople = [...updatedtownSquarePeople];
		},
		deleteStaff(state, deletedStaff) {
			state.townSquarePeople = [...state.townSquarePeople.filter(staff => staff.email !== deletedStaff.email)];
		},
		personOnDuty(state, personOnDuty) {
			state.personOnDuty = { ...personOnDuty };
		}
	},
	actions: {
		// addPersonToList
		addPersonToList: ({ commit }, newPerson) => {
			return new Promise((resolve, reject) => {
				db.collection("users")
					.doc(newPerson.email)
					.set(newPerson)
					.then(function(docRef) {
						commit("addPersonToList", newPerson);
						resolve("Data is added");
						console.log("Document written with ID: ", docRef.id);
					})
					.catch(function(error) {
						reject("Failed");
						console.error("Error adding document: ", error);
					});
			});
		},
		updateStaff: ({ commit }, updatedStaff) => {
			return new Promise((resolve, reject) => {
				db.collection("users")
					.doc(updatedStaff.email)
					.set({
						firstName: updatedStaff.firstName,
						lastName: updatedStaff.lastName,
						email: updatedStaff.email
					})
					.then(function(docRef) {
						commit("updateStaff", updatedStaff);
						resolve(`user ${updatedStaff.email} is updated`);
					})
					.catch(function(error) {
						reject("Failed");
						console.error("Error adding document: ", error);
					});
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
		deleteStaff: ({ commit, dispatch }, deletedStaff) => {
			return new Promise((resolve, reject) => {
				console.log(deletedStaff);
				db.collection("users")
					.doc(deletedStaff.email)
					.delete()
					.then(function() {
						resolve("deleted");
						commit("deleteStaff", deletedStaff);
						console.log("Document successfully deleted!");
					})
					.catch(function(error) {
						console.error("Error removing document: ", error);
					});
			});
		}
	},
	getters: {
		getTownSquarePeople: state => state.townSquarePeople,
		getPersonOnDuty: state => state.personOnDuty
	}
});
