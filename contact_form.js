document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Perform form validation and data submission here
    // You can use AJAX or fetch() to send form data to the server and handle the submission
  
    // Show confirmation message after successful form submission
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('confirmationMsg').style.display = 'block';
    
  });
  // https://elasticemail.com/account#/create-account?r=20b444a2-b3af-4eb8-bae7-911f6097521c