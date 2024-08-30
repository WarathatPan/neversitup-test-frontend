import React from 'react';

const Bonus: React.FC = () => {
  const jsonData = {
    columns: [
      { key: "id", name: "" },
      { key: "no", name: "No." },
      { key: "title", name: "Title" },
      { key: "desc", name: "Description" },
      { key: "date", name: "Created Date" }
    ],
    data: [
      ["f22ecad5-cbb6-402b-995f-6867792bc9c6", 1, "Job 1", "This is job 1", "1 Oct 2023 12:03:48"],
      ["6a412fa7-2c3b-4e38-8973-2b32479bffab", 2, "Job 2", "This is job 2", "11 Oct 2023 10:03:48"],
      ["2c302941-3ba7-413d-84a6-20503355b08a", 3, "Job 3", "This is job 3", "14 Oct 2023 18:34:48"],
      ["eff7e063-3e18-4790-95b4-abf62470e874", 4, "Job 4", "This is job 4", "1 Oct 2023 09:26:48"]
    ]
  };

  const transformedData = jsonData.data.map(row => {
    const transformedRow: Record<string, any> = {};
    jsonData.columns.forEach((column, index) => {
      transformedRow[column.key] = row[index];
    });
    return transformedRow;
  });

  const displayedColumns = ["no", "title", "desc", "date"];

  return (
    <div className="container mx-auto p-4 h-[93vh] bg-gray-100 text-black">
      <h1 className="text-2xl font-bold mb-4">Table Plus</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {jsonData.columns
              .filter(column => displayedColumns.includes(column.key))
              .map(column => (
                <th key={column.key} className="py-2 px-4 border-b">
                  {column.name}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {transformedData.map((row, index) => (
            <tr key={index}>
              {displayedColumns.map(colKey => (
                <td key={colKey} className="py-2 px-4 border-b">
                  {row[colKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bonus;