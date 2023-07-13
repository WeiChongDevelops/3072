// import { initializeApp } from "firebase/app"
// import {
//     getFirestore, collection, getDocs,
//     addDoc, deleteDoc, doc,
//     onSnapshot,
//     query, where,
//     getDoc,
//     updateDoc,
// } from "firebase/firestore";
//
// import {
//     getAuth
// } from "firebase/auth";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyARoz7vxBta9P9NpxhdN5UUzhS4cRL4UEg",
//     authDomain: "project-6879488829692436243.firebaseapp.com",
//     projectId: "project-6879488829692436243",
//     storageBucket: "project-6879488829692436243.appspot.com",
//     messagingSenderId: "139903065424",
//     appId: "1:139903065424:web:8a7a2e8bb9cbe5e7516055",
//     measurementId: "G-2FF4XYNNDZ"
// };
//
// // Init firebase app
// initializeApp(firebaseConfig);
//
// // Init services
// const db = getFirestore();
// const auth = getAuth();
//
// // Get collection reference
// const collectionRef = collection(db, "books");
//
// // Queries
// const q = query(collectionRef, where("author", "==", "author2"))
//
// // Get collection data
// // getDocs(collectionRef)
// // .then( (snapshot) => {
// //     let books = [];
// //     snapshot.docs.forEach( (doc) => {
// //         books.push({ ...doc.data(), id: doc.id })
// //     })
// //     console.log(books);
// // })
// // .catch ( err => {
// //     console.log(err.message)
// // })
//
// // On Snapshot realtime collection data
//
// // Sets up subscription to (starts listening to) specified collection, each time running the function
// onSnapshot(q, (snapshot) => {
//     let books = [];
//     snapshot.docs.forEach( (doc) => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books);
// })
//
//
// // // Adding documents
// // const addBookForm = document.querySelector(".add");
// // addBookForm.addEventListener("submit", (e) => {
// //     e.preventDefault();
// //     addDoc(collectionRef, {
// //         title: "title3",
// //         author: "author3"
// //     })
// // })
//
// addDoc(collectionRef, {
//     title: "title3",
//     author: "author3"
// })
//
// // Deleting documents
// // const deleteBookForm = document.querySelector(".delete");
// // deleteBookForm.addEventListener("submit", (e) => {
// //     e.preventDefault();
// //
// //     // doc() gets doc reference
// //     const docRef = doc(db, "books", id)
// //     deleteDoc(docRef)
// //         .then(() => {
// //             deleteBookForm.reset();
// //         })
// // })
//
// // Get a single document
// const docRef = doc(db, "books", "2f29GSal3hRtycWQ6CAo")
// onSnapshot(docRef, (doc) => {
//     console.log(doc.data(), doc.id)
// })
//
// // Updating a document
// const updateForm = document.querySelector(".update");
// updateForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const docRef = doc(db, "books", updateForm.id.value)
//
//     updateDoc(docRef, {
//         title: "updated title"
//     })
// })