import { Request, Response } from "express";
import { ReportMachineService } from "../services/ReportMachineService";

import PDFPrinter from "pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import fs from "fs";

class ReportMachineController {
  async handle(request: Request, response: Response) {
    const { idMachine } = request.params;

    console.log(request.params);

    const reportMachineService = new ReportMachineService();

    const machine = await reportMachineService.execute(idMachine);

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      },
    };

    const machineReports = JSON.parse(machine.reports);

    const body = [];

    const columnsTitle: TableCell[] = [
      { text: "User", style: "columnsTitle"},
      { text: "Description", style: "columnsTitle" },
      { text: "Update Date", style: "columnsTitle" },
    ];

    const columnsBody = new Array();

    columnsTitle.forEach(column => columnsBody.push(column));
    body.push(columnsBody);

    for await (let reports of machineReports) {
      const rows = new Array();
      rows.push(reports.user);
      rows.push(reports.description);
      rows.push(reports.updated_at);

      body.push(rows);
    }

    const docDefinitions : TDocumentDefinitions = {
      content: [
        {
          text: `Relatório de Manutenção Máquina ${machine.id} \n\n`, style: [ 'header', 'anotherStyle' ],
        },
        {
          table: {
            widths: [150, 250, "auto"],
            heights: function(row) {
              return 15;
            },
            body,
          }
        }
        
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        anotherStyle: {
          italics: true,
          alignment: 'center'
        },
        columnsTitle: {
          fontSize: 13,
          bold: true,
          fillColor: "#7159c1",
          color: "#FFF",
          alignment: "center",
        }
      },
      defaultStyle: {font: 'Helvetica'}
    };

    const printer = new PDFPrinter(fonts);

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    
    //pdfDoc.pipe(fs.createWriteStream(`${idMachine.}.pdf`));
    const chunks = [];

    pdfDoc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on("end", () => {
      const result = Buffer.concat(chunks);
      return response.end(result);
    });

    //return response.end(machine);
  }
}

export { ReportMachineController };