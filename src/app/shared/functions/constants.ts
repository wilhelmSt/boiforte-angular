export function formatInputToMoney(event: any, field: string) {
  let value = event.target.value.replace(/\D/g, '');

  return (value / 100).toFixed(2);
}
