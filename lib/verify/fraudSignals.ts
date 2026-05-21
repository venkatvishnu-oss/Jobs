const FRAUD_INDICATORS = ['pay to apply', 'upfront fee', 'money transfer', 'bitcoin', 'western union'];

export function checkFraudSignals(text: string | undefined): boolean {
  if (!text) return false;
  const lowercase = text.toLowerCase();
  return FRAUD_INDICATORS.some((indicator) => lowercase.includes(indicator));
}
