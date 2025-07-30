
document.getElementById('bookingForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const booking = {
    name: document.getElementById('name').value,
    from: document.getElementById('from').value,
    to: document.getElementById('to').value,
    date: document.getElementById('date').value
  };

  const response = await fetch('http://localhost:3000/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });

  const data = await response.json();
  alert(data.message);
});
