import { AddCircleOutline, Delete } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Conditions, Gift } from '../../types';

type Props = {
  gifts: Gift[];
  conditions: Conditions[];
};
const CampaignGiftsConditionsTable = ({ gifts, conditions }: Props) => {
  return (
    <Stack spacing={4}>
      <Stack spacing={1} sx={{ paddingLeft: 4 }}>
        <Typography
          component={'p'}
          sx={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          Conditions personnalisées par gain
        </Typography>
        <Typography component={'p'} sx={{ fontSize: '14px', color: 'gray' }}>
          Vous pouvez définir une condition spécifique sur un ou plusieurs
          gains.
        </Typography>
      </Stack>
      <TableContainer
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="table des gains">
          <TableHead>
            <TableRow
              sx={{
                '& > .MuiTableCell-root': {
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: '0.95rem',
                },
              }}
            >
              <TableCell sx={{ borderRight: 1, borderColor: 'lightgray' }}>
                Gain
              </TableCell>
              <TableCell sx={{ borderRight: 1, borderColor: 'lightgray' }}>
                Condition
              </TableCell>
              <TableCell>Action</TableCell>
              <TableCell width={50}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gifts
              .filter((gift) => gift.type !== 'LOSS')
              .map((gift) => {
                const [condition] = conditions.filter(
                  (condition) => condition.giftId === gift.id
                );

                return (
                  <TableRow
                    key={gift.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '& > .MuiTableCell-root': {
                        borderBottom: '1px solid #e0e0e0',
                        padding: '12px 16px',
                        fontSize: '0.9rem',
                      },
                    }}
                  >
                    <TableCell>{gift.name}</TableCell>
                    <TableCell>{condition.name}</TableCell>
                    <TableCell>
                      {condition.value === 'null' ? null : (
                        <Button
                          sx={{ textTransform: 'initial' }}
                          startIcon={<AddCircleOutline />}
                        >
                          Ajouter une condition
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: '#757575' }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CampaignGiftsConditionsTable;
