$(document).ready(function() {
  //get all the data on app startup
  $('#createEmployee').click(function() {
    $('.employeeForm').css('display', 'block');
    $('#dynamicBtn').text('Save Changes');
  });

  $('#dynamicBtn').click(function() {
    //employee form values
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var email = $('#email').val();
    var age = $('#age').val();
    var gender = $('#gender').val();
    var yearsOfExperience = $('#yearsOfExperience').val();
    var isfulltime = $('#isFullTime').is(':checked');

    //check if you need to create or update an employee
    if ($(this).text() == 'Save Changes') {
      // Добавим пользователя, используя его имя как идентификатор документа
      // Пример: Anna Borisova -> A.Borisova
      const docId = `${fname[0]}.${lname}`;
      db
        .collection('employees')
        .doc(docId)
        .set({
          fName: fname,
          lName: lname,
          email,
          age,
          gender,
          yearsOfExperience,
          isFullTime: isfulltime
        })
        .then(docRef => {
          $('#operationStatus')
            .html(
              '<div class="alert alert-success"><strong>Success!</strong> Employee was created!</div>'
            )
            .delay(2500)
            .fadeOut('slow');
          $('.employeeForm').css('display', 'none');
        })
        .catch(err => {
          console.log(err);
          $('#operationStatus')
            .html(
              '<div class="alert alert-danger"><strong>Error!</strong> Employee was not created!</div>'
            )
            .delay(2500)
            .fadeOut('slow');
        });
    } else {
      // Изменим пользователя, используя его имя как идентификатор документа
      // Пример: Anna Borisova -> A.Borisova
      const docId = `${fname[0]}.${lname}`;
      db
        .collection('employees')
        .doc(docId)
        .set(
          {
            fName: fname,
            lName: lname,
            email,
            age,
            gender,
            yearsOfExperience,
            isFullTime: isfulltime
          },
          {
            merge: true // чтобы не создавать новый документ, а обновить текущий
          }
        )
        .then(docRef => {
          $('#operationStatus')
            .html(
              '<div class="alert alert-success"><strong>Success!</strong> Employee was updated!</div>'
            )
            .delay(2500)
            .fadeOut('slow');
          $('.employeeForm').css('display', 'none');
        })
        .catch(err => {
          $('#operationStatus')
            .html(
              '<div class="alert alert-danger"><strong>Error!</strong> Employee was not updated!</div>'
            )
            .delay(2500)
            .fadeOut('slow');
        });
    }
  });

  // Cancel the Employee form
  $('#cancel').click(function() {
    $('.employeeForm').css('display', 'none');
  });

  // Get the data of the employee you want to edit
  $('tbody.tbodyData').on('click', 'td.editEmployee', function() {
    $('.employeeForm').css('display', 'block');
    $('#dynamicBtn').text('Update Employee');

    $('#fname').val(
      $(this)
        .closest('tr')
        .find('.fname')
        .text()
    );
    $('#lname').val(
      $(this)
        .closest('tr')
        .find('.lname')
        .text()
    );
    $('#email').val(
      $(this)
        .closest('tr')
        .find('.email')
        .text()
    );
    $('#age').val(
      $(this)
        .closest('tr')
        .find('.age')
        .text()
    );
    $('#gender').val(
      $(this)
        .closest('tr')
        .find('.gender')
        .text()
    );
    $('#yearsOfExperience').val(
      $(this)
        .closest('tr')
        .find('.yearsofexperience')
        .text()
    );
    $('#isFullTime').prop(
      'checked',
      $(this)
        .closest('tr')
        .find('.isfulltime')
        .text() === 'true'
    );
  });

  // Delete employee
  $('tbody.tbodyData').on('click', 'td.deleteEmployee', function() {
    //Get the Employee Data
    var fName = $(this)
      .closest('tr')
      .find('.fname')
      .text(); //First Name
    var lName = $(this)
      .closest('tr')
      .find('.lname')
      .text(); //Last Name

    // Удалим пользователя, используя его имя как идентификатор документа
    // Пример: Anna Borisova -> A.Borisova
    const docId = `${fName[0]}.${lName}`;
    db
      .collection('employees')
      .doc(docId)
      .delete()
      .then(docRef => {
        $('#operationStatus')
          .html(
            '<div class="alert alert-success"><strong>Success!</strong> Employee was deleted!</div>'
          )
          .delay(2500)
          .fadeOut('slow');
      })
      .catch(err => {
        $('#operationStatus')
          .html(
            '<div class="alert alert-danger"><strong>Error!</strong> Employee was not deleted!</div>'
          )
          .delay(2500)
          .fadeOut('slow');
      });
  });

  $('#searchEmployee').change(function() {
    console.log('You entered: ', $(this).val());
  });
});
