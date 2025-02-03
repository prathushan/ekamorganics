// document.addEventListener('DOMContentLoaded', function () {
//   const popupContainer = document.querySelector('.popup-container');
//   const closeButton = document.querySelector('.popup-close');
//   const popupForm = document.querySelector('.popup-form');
//   const firstNameInput = popupForm.querySelector('input[placeholder="First Name"]');
//   const emailInput = popupForm.querySelector('input[placeholder="Email"]');

//   // Check if the popup has already been shown in the current session
//   if (!localStorage.getItem('popupShown')) {
//     setTimeout(() => {
//       popupContainer.style.display = 'flex';
//     }, 1000); // Show popup after 1 second
//     localStorage.setItem('popupShown', 'true'); // Mark popup as shown
//   }

//   // Close popup on button click
//   closeButton.addEventListener('click', () => {
//     popupContainer.style.display = 'none';
//   });

//   // Handle form submission
//   popupForm.addEventListener('submit', (e) => {
//     e.preventDefault(); // Prevent form from reloading the page
    
//     // Get input values
//     const firstName = firstNameInput.value;
//     const email = emailInput.value;
    
//     // Check if the inputs are valid (basic validation)
//     if (!firstName || !email) {
//       alert('Please fill in both fields.');
//       return;
//     }

//     // Retrieve existing registered users
//     let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

//     // Check if email already exists
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//       alert('This email is already registered.');
//       return;
//     }

//     // Store user data in localStorage
//     users.push({ name: firstName, email: email, offerClaimed: false, orderHistory: [] });
//     localStorage.setItem('registeredUsers', JSON.stringify(users));

//     // Show success message
//     alert('Thank you for signing up! You’ve earned 15% off your first order.');
//     popupContainer.style.display = 'none';
//   });

//   // Function to apply 15% discount on first order with minimum order value of $50
//   function applyDiscount(email, orderAmount) {
//     const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//     const user = users.find(user => user.email === email);

//     if (!user) {
//       return alert('User not found!');
//     }

//     if (user.offerClaimed) {
//       return alert('You have already claimed your 15% off on your first order.');
//     }

//     // Check if it's the first order and if the order value is at least $50
//     if (user.orderHistory.length === 0 && orderAmount >= 50) {
//       // Apply 15% discount
//       const discount = orderAmount * 0.15;
//       const discountedAmount = orderAmount - discount;
      
//       // Mark the offer as claimed and add the order to the history
//       user.offerClaimed = true;
//       user.orderHistory.push({ orderAmount, discountedAmount });

//       // Update the user data in localStorage
//       localStorage.setItem('registeredUsers', JSON.stringify(users));

//       alert(`Discount applied! Your final amount is $${discountedAmount.toFixed(2)}.`);
//     } else if (orderAmount < 50) {
//       // Show message if cart value is less than $50
//       alert('Minimum cart value must be $50 to apply the coupon.');
//       showViewAllProductsLink(); // Display the "View All Products" link
//     } else {
//       alert('You can only use the 15% discount on your first order.');
//     }
//   }

//   // Function to show "View All Products" link
//   function showViewAllProductsLink() {
//     const linkContainer = document.querySelector('#view-all-products-link');
//     if (!linkContainer) {
//       const newLink = document.createElement('a');
//       newLink.href = '/products';  // Redirect to the product page
//       newLink.textContent = 'View All Products';
//       newLink.id = 'view-all-products-link';
//       document.body.appendChild(newLink);
//     }
//   }

//   // Example of how to call this function when the user places an order
//   // Assuming the email is retrieved from the user's session and the order amount is passed
//   // Example: applyDiscount('user@example.com', 60);

// });
