// Initialize Cloud FireStore through Firebase

const db = firebase.firestore();
const employeesRef = db.collection('employees');

// этот код запишет данные в БД, после записи код закоментировать
// .doc('R.Dikles') - создает документ
// .set({...}) - устанавливает свойства этого документа
// employeesRef.doc('R.Dikles').set({
//   fName: 'Ranice',
//   lName: 'Dikles',
//   email: 'rdikles@hatena.ne.jp',
//   age: 39,
//   gender: 'Female',
//   yearsOfExprerience: 9,
//   isFullTime: true
// });

// чтение данных из БД
employeesRef.get()
.then(querySnapshot => {
  // отображает 'R.Dikles' - как идентификатор документа
  querySnapshot.forEach(doc => console.log(`${doc.id}`));
})
.catch(err => console.log(err));
