const saveQuery = (data) => {
  fetch('/api/saveQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export default saveQuery;
