// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

let statusBtn=document.querySelector('#status');
let completeBtn=document.querySelector('#complete');

(() => {
  'use strict';

  const form = document.querySelector('.needs-validation');
  const submitBtn = document.getElementById('submitBtn');

  // Enable / disable button on input change
  form.addEventListener('input', () => {
    submitBtn.disabled = !form.checkValidity();
  });

  // Bootstrap validation on submit
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  });
})();
