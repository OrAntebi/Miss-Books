export async function addReviewPopup() {
  const { value: formValues } = await Swal.fire({
    title: "Enter a new review 😃",
    html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" type="text" required>
        <input id="swal-input2" class="swal2-input" placeholder="Rating (1-5)" type="number" min="1" max="5" required>
        <input id="swal-input3" class="swal2-input" value="Read at" type="date" required>
      `,
    focusConfirm: false,
    preConfirm: () => {
      const nameInput = document.getElementById("swal-input1");
      const ratingInput = document.getElementById("swal-input2");
      const readAtInput = document.getElementById("swal-input3");

      const name = nameInput.value.trim();
      const rating = ratingInput.value.trim();
      let readAt = readAtInput.value.trim();

      const today = new Date().toISOString().split('T')[0];

      nameInput.style.border = '';
      ratingInput.style.border = '';
      readAtInput.style.border = '';

      if (!name) {
        nameInput.style.border = '2px solid red';
        Swal.showValidationMessage("Name is required");
        return false;
      }
      if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        ratingInput.style.border = '2px solid red';
        Swal.showValidationMessage("Rating must be a number between 1 and 5");
        return false;
      }
      if (!readAt) {
        readAtInput.style.border = '2px solid red';
        Swal.showValidationMessage("Read at date is required");
        return false;
      }
      if (!readAt || readAt >= today) {
        readAtInput.style.border = '2px solid red';
        Swal.showValidationMessage("Read at date must be in the past");
        return false;
      }

      return { name, rating: +rating, readAt};
    }
  });

  if (formValues) {
    return formValues;
  }
}
