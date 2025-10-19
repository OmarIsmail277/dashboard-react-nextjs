export const columns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "stock", label: "Stock" },
  { key: "rating", label: "Rating" },
  { key: "date_added", label: "Date Added" },
];

export const renderCell = (product, columnKey) => {
  const cellValue = product[columnKey];

  switch (columnKey) {
    case "date_added":
      return <span>{new Date(cellValue).toLocaleDateString()}</span>;

    default:
      return cellValue;
  }
};
