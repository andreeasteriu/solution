export const validateForm = (formElements) => {
  let formIsValid = true;
  let invalids = [];
  formElements.forEach((input) => {
    if (!validateInputValue(input.type, input.val)) {
      formIsValid = false;
      invalids.push(input.type);
    }
  });
  return { formIsValid, invalids };
};

const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// ====================== VALIDATION FOR EACH INPUT ======================
export const validateInputValue = (type, value) => {
  switch (type) {
    // ====================== POST VALIDATION ======================
    case "title":
      return value.length >= 4 && value.length <= 60;
    case "description":
      return value.length >= 4 && value.length <= 800;
    case "photos":
      return typeof value === "string" && isJSON(value);

    default:
      console.log(`Validation failed! No validation for ${type}!`);
      return false;
  }
};
