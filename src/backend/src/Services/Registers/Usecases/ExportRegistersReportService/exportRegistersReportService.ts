import { CustomError } from "../../../../errors/custom.error";
import { IRegistersRepository } from "../../Repositories/registers.repository";
import fs from 'fs';
const PDFDocument = require('pdfkit');

class ExportRegistersReportService {
  constructor(
    private registersRepository: IRegistersRepository
  ){}

  async execute(user_id: string, startDate: string, endDate: string) {
    if (!user_id) throw new CustomError("UserId is required!", 400);
    if (!startDate) throw new CustomError("Start date is required!", 400);
    if (!endDate) throw new CustomError("End date is required!", 400);

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(startDate)) {
      throw new CustomError("Invalid start date format!", 400)
    }

    if (!dateRegex.test(endDate)) {
      throw new CustomError("Invalid end date format!", 400)
    }

    const registers = await this.registersRepository.findByUserIdInPeriod(user_id, new Date(startDate), new Date(endDate))

    if (registers.length === 0) throw new CustomError("Registers not found!", 404);

    
    const doc = new PDFDocument();

    doc.fontSize(18).text('Gestão Med - Relatório de Medicamentos', { align: 'center' }).moveDown(0.5);

    registers.forEach(register => {
      doc.fontSize(12).text(`Nome: ${register.medication_name}`);
      doc.fontSize(12).text(`Ingerido: ${register.medication_taken ? "Sim" : "Não"}`);
      doc.fontSize(12).text(`Horário: ${(register.time_taken as Date).getHours() + ":" + 
        (register.time_taken as Date).getMinutes()}`);
      doc.fontSize(12).text(`Data: ${(register.created_at as Date).toLocaleDateString('pt-BR')}`);
      doc.moveDown();
    });

    doc.end();

    const filePath = 'temp_report.pdf';

    doc.pipe(fs.createWriteStream(filePath));

    const pdfData = fs.readFileSync(filePath, { encoding: 'base64' });

    fs.unlinkSync(filePath);

    return pdfData;
  }
}

export { ExportRegistersReportService };
