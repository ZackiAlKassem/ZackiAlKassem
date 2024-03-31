const sheetId = "1PZbqcUKyRKKlQK0I3k6B_hzpGCxxXN3CnpR6t55ufNA";
const url = "./assets/json/";

async function readData(fileTitle) {
  var fileTitle = "home";
  var jsonData = {};

  console.log("ready");

  await fetch(url + fileTitle + ".json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      jsonData = data.info;
      console.log(jsonData);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  return jsonData;
}

async function readDataFromExcel(sheetName) {
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  //   const sheetName = "home";
  const query = encodeURIComponent("Select *");
  const url = `${base}&sheet=${sheetName}&tq=${query}`;
  const data = [];

  console.log("ready");

  await fetch(url)
    .then((res) => res.text())
    .then((rep) => {
      console.log("Raw JSON data:", rep); // Log raw JSON data for inspection
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      console.log("Parsed JSON data:", jsonData); // Log parsed JSON data for inspection

      const colNames = [];
      jsonData.table.cols.forEach((col) => {
        if (col.label) {
          colNames.push(col.label);
        }
      });
      console.log("Column names:", colNames); // Log column names for inspection

      jsonData.table.rows.forEach((row) => {
        const rowData = {};
        colNames.forEach((colName, index) => {
          rowData[colName] = row.c[index] != null ? row.c[index].v : "";
        });
        data.push(rowData);
      });
      console.log("Final data:", data); // Log final data array

      // Further processing or rendering of data can go here
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return data;
}
