export const STORE_PATIENT_DEMPOGRAPHICS = "STORE_PATIENT_DEMPOGRAPHICS";

export function storePatientDemographics(demographics){
    return {type: STORE_PATIENT_DEMPOGRAPHICS, demographics}
}