export interface CountryData {
  name: string;
  code: string;
  states: string[];
}

export const countries: CountryData[] = [
  {
    name: 'United States',
    code: 'US',
    states: [
      'Alabama',
      'Alaska',
      // ... all states
    ]
  },
  // ... other countries
]; 