import logo from '../../images/Logo.png';
import { jsPDF } from 'jspdf';
import { UserInterface } from '../../store/stateTypes';

const downloadPDF = (betId: string, notCombinedBetId: string, barCodeImage: string, userData: UserInterface) => {
  const doc = new jsPDF();

  const betData = userData.bets[betId]; //if bet is combined then iterate over the couponFooter.betsDivided object
  const betsDividedKeys = Object.keys(betData.couponFooter.betsDivided);

  //add dates to page
  const dateFormated = new Date().toLocaleDateString();
  doc.text(dateFormated, 10, 10);
  doc.text(dateFormated, 162, 10);

  //add logo
  doc.addImage(logo, 'PNG', 87, 20, 41, 7.5);

  //copy paste content here
  doc.setFontSize(10);
  doc.text('La adrenalina de ganar', 89, 30);

  let y = 0;
  let pageAdded = false;
  const checkSize = (coordY: number, pageHeight: number) => {
    if (coordY >= pageHeight) {
      doc.addPage();
      y = 0;
      pageAdded = true;
    }
  };
  let pdfName = betId;
  let state = userData.bets[betId].couponFooter.state;
  let totalBet = userData.bets[betId].couponFooter.totalBet;
  const notCombinedBetIdCopy = betsDividedKeys.length === 1 ? betsDividedKeys[0] : notCombinedBetId;
  if (notCombinedBetId !== '' || betsDividedKeys.length === 1) {
    pdfName = notCombinedBetIdCopy;
    totalBet =
      betsDividedKeys.length >= 2 ? userData.bets[betId].couponFooter.betsDivided[notCombinedBetIdCopy] : totalBet;
    state = userData.bets[betId].couponFooter.notCombinedBetsState[notCombinedBetIdCopy];
    //pdfName = notCombinedBetId;
    //add bet date
    doc.setFontSize(6);
    //add bet date

    doc.setFont('inherit', 'bold');
    doc.text('Fecha Apuesta:', 76, 38 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(betData.time.toLocaleDateString(), 91, 38 + y);
    //create header information
    doc.setFont('inherit', 'bold');
    doc.text('Usuario:', 118, 35 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.id, 127, 35 + y);
    doc.setFont('inherit', 'bold');
    doc.text('Id:', 123, 38 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(notCombinedBetIdCopy, 127, 38 + y);
    doc.line(75, 39 + y, 140, 39 + y);

    //doc.line(75, 39 + y, 140, 39 + y);

    //events info
    doc.setFont('inherit', 'bold');
    doc.text('Evento:', 76, 42 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.bets[betId].couponData[notCombinedBetIdCopy].name, 84, 42 + y);
    doc.setFont('inherit', 'bold');
    doc.text('Mercado:', 76, 45 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.bets[betId].couponData[notCombinedBetIdCopy].game.Name, 86, 45 + y);
    doc.setFont('inherit', 'bold');
    doc.text('Elección:', 76, 48 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.bets[betId].couponData[notCombinedBetIdCopy].result.Name, 86, 48 + y);
    doc.setFont('inherit', 'bold');
    doc.text('Estado:', 76, 51 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.bets[betId].couponFooter.state, 84, 51 + y);
    doc.setFont('inherit', 'bold');
    doc.text('Combinada:', 94, 51 + y);
    doc.setFont('inherit', 'inherit');
    let combined = '';
    combined = betsDividedKeys.length === 1 ? 'No' : userData.bets[betId].couponFooter.combined ? 'Sí' : 'No';
    doc.text(combined, 106, 51 + y);
    doc.setFont('inherit', 'bold');
    doc.text('Cuota:', 110, 51 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.bets[betId].couponData[notCombinedBetIdCopy].result.Odd.toString(), 117, 51 + y);
    doc.line(75, 53 + y, 140, 53 + y);
  } else {
    betsDividedKeys.forEach((bet, ind) => {
      const pageHeight = doc.internal.pageSize.height;
      if (ind >= 1) {
        checkSize(y + 16, pageHeight);
        y += 16;
      }

      //add bet date
      doc.setFontSize(6);
      if (ind === 0) {
        //add bet date

        doc.setFont('inherit', 'bold');
        checkSize(38 + y, pageHeight);
        doc.text('Fecha Apuesta:', 76, 38 + y);
        doc.setFont('inherit', 'inherit');
        doc.text(betData.time.toLocaleDateString(), 91, 38 + y);
        //create header information
        doc.setFont('inherit', 'bold');
        checkSize(35 + y, pageHeight);
        doc.text('Usuario:', 76, 35 + y);
        doc.setFont('inherit', 'inherit');
        doc.text(userData.id, 85, 35 + y);
        doc.setFont('inherit', 'bold');
        checkSize(38 + y, pageHeight);
        doc.text('Id:', 123, 38 + y);
        doc.setFont('inherit', 'inherit');
        doc.text(bet, 127, 38 + y);
        checkSize(39 + y, pageHeight);
        doc.line(75, 39 + y, 140, 39 + y);
      } else {
        doc.setFont('inherit', 'bold');
        const marginBottom = 10; //sometimes the id appears just in the bottom of the page without adding a new page, so add a margin
        checkSize(39 + y + marginBottom, pageHeight);
        doc.text('Id:', 123, 39 + y);
        doc.setFont('inherit', 'inherit');
        doc.text(bet, 127, 39 + y);
      }

      //events info
      doc.setFont('inherit', 'bold');
      checkSize(42 + y, pageHeight);
      doc.text('Evento:', 76, 42 + y);
      doc.setFont('inherit', 'inherit');
      doc.text(userData.bets[betId].couponData[bet].name, 84, 42 + y); //Uncaught TypeError: Cannot read properties of undefined (reading 'name')
      doc.setFont('inherit', 'bold');
      checkSize(45 + y, pageHeight);
      doc.text('Mercado:', 76, 45 + y);
      doc.setFont('inherit', 'inherit');
      doc.text(userData.bets[betId].couponData[bet].game.Name, 86, 45 + y);
      doc.setFont('inherit', 'bold');
      checkSize(48 + y, pageHeight);
      doc.text('Elección:', 76, 48 + y);
      doc.setFont('inherit', 'inherit');
      doc.text(userData.bets[betId].couponData[bet].result.Name, 86, 48 + y);
      doc.setFont('inherit', 'bold');
      checkSize(51 + y, pageHeight);
      doc.text('Estado:', 76, 51 + y);
      doc.setFont('inherit', 'inherit');
      doc.text(state, 84, 51 + y);
      if (Object.keys(userData.bets[betId].couponData).length >= 2) {
        doc.setFont('inherit', 'bold');
        checkSize(51 + y, pageHeight);
        doc.text('Combinada:', 94, 51 + y);
        doc.setFont('inherit', 'inherit');
        const combined = betsDividedKeys.length === 1 ? 'No' : userData.bets[betId].couponFooter.combined ? 'Sí' : 'No';
        doc.text(combined, 106, 51 + y);
      }
      if (Object.keys(userData.bets[betId].couponData).length >= 2) {
        doc.setFont('inherit', 'bold');
        checkSize(51 + y, pageHeight);
        doc.text('Cuota:', 110, 51 + y);
        doc.setFont('inherit', 'inherit');
        doc.text(userData.bets[betId].couponData[bet].result.Odd.toString(), 117, 51 + y);
      }
      // checkSize(53 + y, pageHeight);
      doc.line(75, 53 + y, 140, 53 + y);
    });
  }
  const pageHeight = doc.internal.pageSize.height;
  //Summary info
  doc.setFont('inherit', 'bold');
  checkSize(56 + y, pageHeight);
  doc.text('Apuesta Total:', 76, 56 + y);
  doc.setFont('inherit', 'inherit');
  doc.text(totalBet, 90, 56 + y); //totalBet is null
  doc.setFont('inherit', 'bold');
  doc.text('Pago:', 103, 56 + y);
  doc.setFont('inherit', 'inherit');
  doc.text(userData.bets[betId].couponFooter.state, 109, 56 + y);
  if (notCombinedBetIdCopy === '') {
    doc.setFont('inherit', 'bold');
    doc.text('Cuota:', 122, 56 + y);
    doc.setFont('inherit', 'inherit');
    doc.text(userData.bets[betId].couponFooter.betOddWithMultipleBets, 129, 56 + y);
    //Error: Invalid arguments passed to jsPDF.text
  }
  checkSize(58 + y, pageHeight);
  doc.line(75, 58 + y, 140, 58 + y);
  checkSize(61 + y, pageHeight);
  doc.text('Todas las apuestas están sujetas al reglamento de adrebet.com', 81, 61 + y);
  checkSize(62 + y, pageHeight);
  doc.addImage(barCodeImage, 'PNG', 93, 62 + y, 30, 18);
  checkSize(82 + y, pageHeight);
  doc.text('Jugar con responsabilidad es parte del juego.', 90, 82 + y);
  checkSize(85 + y, pageHeight);
  doc.text('Apostar sin control puede causar adicción.', 91, 85 + y);
  checkSize(88 + y, pageHeight);
  doc.text('Prohibida la venta a menores de edad.', 93, 88 + y);
  //add betRectangle
  checkSize(92 + y, pageHeight);

  if (!pageAdded) {
    doc.rect(68, 15, 80, 92 + y);
  }
  doc.save(`${pdfName}.pdf`);
};
export default downloadPDF;
