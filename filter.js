$(document).ready(function() {
  $('#onlyMalesFilter').click(function() {
    console.log('onlyMalesFilter Filter executed');
    // простая фильтрация использует одно поле документа
    // параметры: поле, оператор, значение
    employeesRef.where('gender', '==', 'Male').onSnapshot(data => {
      loadTableData(data);
    });
  });

  $('#fullTimeFilter').click(function() {
    console.log('fullTimeFilter Filter executed');
    employeesRef.where('isFullTime', '==', true).onSnapshot(data => {
      loadTableData(data);
    });
  });

  $('#olderThenFilter').click(function() {
    console.log('olderThenFilter Filter executed');
    employeesRef.where('age', '>=', 30).onSnapshot(data => {
      loadTableData(data);
    });
  });

  $('#ageBetweenFilter').click(function() {
    console.log('ageBetweenFilter Filter executed');
    // сложная фильтрация использует несколько методов .where(), если поле одно и то же
    employeesRef
      .where('age', '>=', 35)
      .where('age', '<=', 50)
      .onSnapshot(data => {
        loadTableData(data);
      });
  });

  $('#yearsOfExperienceFilter').click(function() {
    console.log('yearsOfExperienceFilter Filter executed');
    // сложная фильтрация использует несколько employeesRef и .where(), если поля разные
    employeesRef.where('gender', '==', 'Femail');
    employeesRef
      .where('yearsOfExperience', '>=', 5)
      .where('yearsOfExperience', '<=', 10)
      .onSnapshot(data => {
        loadTableData(data);
      });
  });

  $('#clearFilter').click(function() {
    console.log('clearFilter Filter executed');
    employeesRef
      .orderBy('fName', 'desc') // сортировка
      // .orderBy('age') // сортировка, но нужно создавать индекс
      .limit(1) // показать только одного
      .get()
      .then(data => loadTableData(data));
  });

  $('#searchEmployee').change(function() {
    console.log('You entered: ', $(this).val());
    const searchValue = $(this).val();
    employeesRef.where('fName', '==', searchValue).onSnapshot(data => {
      loadTableData(data);
    });
  });

  // как только что-то произойдет с коллекцией, появится событие
  db.collection('employees').onSnapshot(data => {
    console.log('something changed');

    data.docChanges.forEach(change => {
      console.log(change.type); // может быть 'added', 'modified', 'removed'
    });
    loadTableData(data);
  });

  function loadTableData(data) {
    let tableRow = '';

    data.forEach(doc => {
      const document = doc.data();
      tableRow += `
        <tr>
            <td class="fname">${document.fName}</td>
            <td class="lname">${document.lName}</td>
            <td class="email">${document.email}</td>
            <td class="age">${document.age}</td>
            <td class="gender">${document.gender}</td>
            <td class="yearsofexperience">${document.yearsOfExperience}</td>
            <td class="isfulltime">${document.isFullTime}</td>
            <td class="editEmployee"><i class="fa fa-pencil" aria-hidden="true" style="color: green;"></i></td>
            <td class="deleteEmployee"><i class="fa fa-trash" aria-hidden="true" style="color: red;"></i></td>
        </tr>
        `;
    });
    $('tbody.tbodyData').html(tableRow);
  }
});
