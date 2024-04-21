import { CustomError } from "../../../../errors/custom.error";
import { IRegistersRepository } from "../../Repositories/registers.repository";
import PDFDocument from 'pdfkit';

class ExportRegistersReportService {
  constructor(
    private registersRepository: IRegistersRepository
  ){}

  async execute(user_id: string, startDate: string, endDate: string) {
    if (!user_id) throw new CustomError("User id is required!", 400);
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

      const timeTaken = register.time_taken as Date;
      timeTaken.setHours(timeTaken.getHours() + 3);
      const hours = timeTaken.getHours();
      const minutes = timeTaken.getMinutes();

      doc.fontSize(12).text(`Horário: ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`);
      
      const day = timeTaken.getDate();
      const month = timeTaken.getMonth() + 1;
      const year = timeTaken.getFullYear();
      
      doc.fontSize(12).text(`Data: ${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`);
      doc.moveDown();
    });

    return new Promise<string>((resolve, reject) => {
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers).toString('base64');
        resolve(pdfData);
      });
      doc.on('error', reject);
      doc.end();
    });
  }
}

export { ExportRegistersReportService };
