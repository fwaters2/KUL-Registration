export default function(currentStep) {
  console.log(("currentStep", currentStep));
  if (currentStep < 3) {
    return 0;
  } else if (currentStep === 15 || currentStep === 16) {
    return 2;
  } else if (currentStep > 16) {
    return 3;
  } else {
    return 1;
  }
}
