export function formatInputToMoney(event: any, field: string) {
  let value = event.target.value.replace(/\D/g, '');

  return (value / 100).toFixed(2);
}

export function formatDate(date: Date | string) {
  const data = new Date(date);
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
