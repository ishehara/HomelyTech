const validateForm = (title, description, persentage, promoCode, startDate, dueDate) => {
    const errors = {};
  
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
    }
  
    if (!dueDate) {
      errors.dueDate = "Please fill out this field";
    }
  
    return errors;
  };
  
  export default validateForm;
  