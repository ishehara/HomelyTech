const validateForm = (title, description, persentage, promoCode, startDate, dueDate) => {
  const errors = {};
  const today = new Date().toISOString().split('T')[0]; 
  
  if (!title) {
    errors.title = "Please fill out this field";
  }

  if (!description) {
    errors.description = "Please fill out this field";
  }

  if (persentage < 0 || persentage > 100 || !persentage) {
    errors.persentage = "Please fill valid percentage";
  }

  if (!promoCode) {
    errors.promoCode = "Please fill out this field";
  }

  if (!startDate) {
    errors.startDate = "Please fill out this field";
  } else if (startDate < today) {
    errors.startDate = "Start date cannot be in the past";
  }

  if (!dueDate) {
    errors.dueDate = "Please fill out this field";
  } else if (dueDate < today) {
    errors.dueDate = "Due date cannot be in the past";
  } else if (dueDate < startDate) {
    errors.dueDate = "Due date cannot be before start date";
  }

  return errors;
};

export default validateForm;
