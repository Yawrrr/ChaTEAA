
interface DrinkSummary {
  [key: string]: {
    total: number;
    customizations: {
      [key: string]: number;
    };
  };
}