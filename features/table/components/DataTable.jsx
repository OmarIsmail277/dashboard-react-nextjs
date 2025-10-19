"use client";

import { useCallback, useMemo, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
} from "@heroui/react";

import { columns, renderCell } from "../../../app/dashboard/tables/columns";
import { SearchIcon } from "../../../components/icons";

import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export default function DataTable({ products }) {
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue, hasSearchFilter]);

  const rowsPerPage = 8;
  const [page, setPage] = useState(1);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const exportToExcel = () => {
    const data = filteredItems.map((row) => {
      const obj = {};
      columns.forEach((col) => {
        if (col.key === "date_added") {
          obj[col.label] = new Date(row[col.key]).toLocaleDateString();
        } else {
          obj[col.label] = row[col.key];
        }
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    const headers = [["ID", ...columns.map((col) => col.label)]];

    const rows = filteredItems.map((row) => [
      row.id,
      ...columns.map((col) =>
        col.key === "date_added"
          ? new Date(row[col.key]).toLocaleDateString()
          : row[col.key]
      ),
    ]);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 10,
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 15 },
      },
    });

    doc.save("products.pdf");
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by product name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Export XLSX
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  return (
    <Table
      aria-label="Products table"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      }
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      classNames={{
        wrapper: "min-h-[222px] bg-background text-foreground",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            {...(column.key === "name" ? { allowsSorting: true } : {})}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems} emptyContent={"No products to display."}>
        {(product) => (
          <TableRow key={product.id}>
            {(columnKey) => (
              <TableCell>{renderCell(product, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
