
/**
 * Patient to set number digits
 * @param {*} patient_id 
 * @returns 
 */
exports.validatePatient = (patient_id) => {
  return patient_id.length <= 10
    ? patient_id.padStart(10, "0")
    : patient_id.slice(0, 10);
}