export default function(currentStep) {
  if (currentStep < 3) {
    return 0;
  } else if (currentStep === 16 || currentStep === 17) {
    return 2;
  } else if (currentStep > 17) {
    return 3;
  } else {
    return 1;
  }
}
