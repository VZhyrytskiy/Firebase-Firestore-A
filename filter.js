$(document).ready(function() {
  $('#onlyMalesFilter').click(function() {
    console.log('onlyMalesFilter Filter executed');
  });

  $('#fullTimeFilter').click(function() {
    console.log('fullTimeFilter Filter executed');
  });

  $('#olderThenFilter').click(function() {
    console.log('olderThenFilter Filter executed');
  });

  $('#ageBetweenFilter').click(function() {
    console.log('ageBetweenFilter Filter executed');
  });

  $('#yearsOfExperienceFilter').click(function() {
    console.log('yearsOfExperienceFilter Filter executed');
  });

  $('#clearFilter').click(function() {
    console.log('clearFilter Filter executed');
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
