import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import theme from '../../styles/theme';
import BarCode from 'react-jsbarcode';
import html2canvas from 'html2canvas';
import downloadPDF from '../utilities/downloadPdf';
import './betsTable.css';
import { useSelector } from 'react-redux';
import { UserInterface } from '../../store/stateTypes';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: theme.palette.secondary.main,
    overflowX: 'auto',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
}));
/*
const StyledTableCellFooter = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    fontSize: '0.7rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.7rem',
    color: theme.palette.secondary.main,
    overflowX: 'auto',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
}));*/
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const USDollar = new Intl.NumberFormat('en-US', {
  currency: 'USD',
});
/*function createData(date: string, event: string, market: string, choise: string, cuote: number, state: string) {
  return { date, event, market, choise, cuote, state };
}*/

const BetsTable: React.FC<{ betId: string }> = ({ betId }) => {
  const userData = useSelector((state: { userData: UserInterface }) => state.userData);
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>();
  const [showBarCode, setShowBarCode] = React.useState(false);
  const [notCombinedBetId, setNotCombinedBetId] = React.useState('');
  const createCanvas = async () => {
    const element = document.getElementById(`${betId}barCode`);
    setShowBarCode(false);
    if (element !== null) {
      const canvas = await html2canvas(element);
      setCanvas(canvas);
    }
  };
  React.useEffect(() => {
    if (canvas !== null && canvas !== undefined) {
      const barCodeImage = canvas.toDataURL('image/jpg');
      downloadPDF(betId, notCombinedBetId, barCodeImage, userData);
      setNotCombinedBetId('');
    }
  }, [canvas]);
  React.useEffect(() => {
    if (showBarCode) {
      createCanvas();
    }
  }, [showBarCode]);

  return Object.keys(userData.bets).length >= 1 ? (
    <>
      <TableContainer component={Paper} id={betId}>
        <Table sx={{ minWidth: '280px' }} size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ minWidth: '80px' }}>Evento</StyledTableCell>
              <StyledTableCell>Mercado</StyledTableCell>
              <StyledTableCell>Elección</StyledTableCell>
              <StyledTableCell>Cuota</StyledTableCell>
              {!userData.bets[betId].couponFooter.combined && (
                <>
                  <StyledTableCell>Apuesta</StyledTableCell>
                  <StyledTableCell>Ganancia</StyledTableCell>
                  <StyledTableCell>Estado</StyledTableCell>
                </>
              )}

              {!userData.bets[betId].couponFooter.combined && <StyledTableCell>Descargar</StyledTableCell>}
            </TableRow>
          </TableHead>
          <TableBody sx={{ padding: 'unset!important' }}>
            {Object.keys(userData.bets[betId].couponData).map((bet) => {
              const betEarning =
                +userData.bets[betId].couponFooter.betsDivided[bet] * userData.bets[betId].couponData[bet].result.Odd;
              return (
                <StyledTableRow key={bet} sx={{ padding: 'unset!important' }}>
                  <StyledTableCell sx={{ minWidth: '80px' }}>
                    {userData.bets[betId].couponData[bet].name}
                  </StyledTableCell>
                  <StyledTableCell>{userData.bets[betId].couponData[bet].game.Name}</StyledTableCell>
                  <StyledTableCell>{userData.bets[betId].couponData[bet].result.Name}</StyledTableCell>
                  <StyledTableCell>{userData.bets[betId].couponData[bet].result.Odd}</StyledTableCell>

                  {!userData.bets[betId].couponFooter.combined && (
                    <>
                      <StyledTableCell>
                        {USDollar.format(+userData.bets[betId].couponFooter.betsDivided[bet])}
                      </StyledTableCell>
                      <StyledTableCell>{USDollar.format(+betEarning.toFixed(2))}</StyledTableCell>
                    </>
                  )}

                  {!userData.bets[betId].couponFooter.combined && (
                    <StyledTableCell>{userData.bets[betId].couponFooter.state}</StyledTableCell>
                  )}

                  {!userData.bets[betId].couponFooter.combined && (
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.secondary.contrastText,
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.light,
                          },
                        }}
                        onClick={() => {
                          setNotCombinedBetId(bet);
                          setShowBarCode(true);
                        }}
                        data-testid="print-bet-button"
                      >
                        <DownloadIcon />
                      </Button>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
        {showBarCode && (
          <div id={`${betId}barCode`} style={{ zIndex: '-10000', position: 'absolute' }}>
            <BarCode value={betId} options={{ width: 1 }} />
          </div>
        )}
      </TableContainer>
      <table id="tableId">
        <tr>
          <td>Total Apostado</td>
          {Object.keys(userData.bets[betId].couponFooter.betsDivided).length >= 2 && <td>Combinada</td>}
          {userData.bets[betId].couponFooter.combined && (
            <>
              {Object.keys(userData.bets[betId].couponData).length >= 2 && <td>Cuota Combinada</td>}

              <td>Ganancias Estimadas</td>
              <td>Estado</td>
            </>
          )}
        </tr>
        <tbody style={{ padding: 'unset!important' }}>
          <td>{USDollar.format(+userData.bets[betId].couponFooter.totalBet)}</td>
          {Object.keys(userData.bets[betId].couponFooter.betsDivided).length >= 2 && (
            <td>{userData.bets[betId].couponFooter.combined ? 'Sí' : 'No'}</td>
          )}

          {userData.bets[betId].couponFooter.combined && (
            <>
              {Object.keys(userData.bets[betId].couponData).length >= 2 && (
                <td>{USDollar.format(+userData.bets[betId].couponFooter.betOddWithMultipleBets)}</td>
              )}

              <td>{USDollar.format(+userData.bets[betId].couponFooter.betEarnings)}</td>
              <td>{userData.bets[betId].couponFooter.state}</td>
            </>
          )}
        </tbody>
      </table>
      {userData.bets[betId].couponFooter.combined && (
        <Button
          variant="contained"
          style={{
            marginTop: theme.spacing(1.5),
            backgroundColor: theme.palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
            },
          }}
          onClick={() => {
            setShowBarCode(true);
          }}
          data-testid="print-bet-button"
        >
          <DownloadIcon />
        </Button>
      )}
    </>
  ) : null;
};
export default BetsTable;
