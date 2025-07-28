import { AddCircleOutline, Delete } from '@mui/icons-material';
import { Button, Chip, IconButton, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatActionType, getActionIcon } from '../../lib/utils';
import type { ActionType } from '../../types';

function createData(
  actionOrder: number,
  actionOrderName: string,
  action?: ActionType,
  target?: string
) {
  return { actionOrder, actionOrderName, action, target };
}

const rows = [
  createData(1, 'Première action', 'GOOGLE_REVIEW', 'https://google.com.fr'),
  createData(2, 'Deuxième action', undefined, 'https://google.com.fr'),
  createData(3, 'Dernière action', undefined, 'https://google.com.fr'),
];

export default function CampaignActionsTable() {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 6 }}>
      <Table
        sx={{
          minWidth: 650,
          '& th': {
            fontWeight: 'bold',
          },
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Ordre des actions</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Cible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.actionOrder}>
              <TableCell sx={{ color: 'GrayText' }}>
                {row.actionOrderName}
              </TableCell>
              {row.action ? (
                <>
                  <TableCell>
                    <Stack direction={'row'} gap={1}>
                      {(() => {
                        const Icon = getActionIcon(row.action);
                        return Icon ? <Icon color="primary" /> : null;
                      })()}
                      <Typography>{formatActionType(row.action)}</Typography>
                    </Stack>
                  </TableCell>
                  <Stack direction={'row'} alignItems={'center'}>
                    <TableCell sx={{ flexGrow: 1 }}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Typography>{row.target}</Typography>
                        <Chip label="Intégré" color="success" size="small" />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </Stack>
                </>
              ) : (
                <TableCell>
                  <Button
                    startIcon={<AddCircleOutline />}
                    sx={{ textTransform: 'initial' }}
                  >{`Ajouter une ${row.actionOrderName}`}</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
