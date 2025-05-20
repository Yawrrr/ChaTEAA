
interface Order {
  timestamp: string;
  email: string;
  name: string;
  contact: string;
  block: string;
  drinks: Array<{
    drink: string;
    size: string;
    iceLevel: string;
    sugarLevel: string;
    quantity: string;
  }>;
  paymentProof: string;
  remarks: string;
}