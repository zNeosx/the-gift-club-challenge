import {
  AddCircleOutline,
  CheckCircleOutline,
  Delete,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  formatActionPriority,
  formatActionType,
  getActionIcon,
  getFrenchOrdinal,
} from '../../lib/utils';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';

type Props = {
  handleAddAction: (priority: number) => void;
  handleRemoveAction: (index: number) => void;
  fields: CampaignFormData['configuration']['actions'][number][];
};

export default function CampaignActionsTable({
  fields,
  handleAddAction,
  handleRemoveAction,
}: Props) {
  const maxLength = 2;

  return (
    <TableContainer
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
      }}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
        aria-label="Tableau des actions"
      >
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
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
              Ordre des actions
            </TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Cible</TableCell>
            <TableCell width={150}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[0, 1, 2].map((priority, index) => {
            const action = fields.find((f) => f.priority === priority);
            return (
              <TableRow
                key={action ? action.id : index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& > .MuiTableCell-root': {
                    borderBottom: '1px solid #e0e0e0',
                    padding: '12px 16px',
                    fontSize: '0.9rem',
                  },
                }}
              >
                <TableCell sx={{ color: 'GrayText', whiteSpace: 'nowrap' }}>
                  {index === maxLength
                    ? 'Dernière action'
                    : formatActionPriority(action ? action.priority : index)}
                </TableCell>
                {action?.type ? (
                  <TableCell>
                    <Stack
                      direction={'row'}
                      sx={{ alignItems: 'center' }}
                      gap={2}
                    >
                      {(() => {
                        const Icon = getActionIcon(action.type);
                        return Icon ? (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 1,
                              boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.35)',
                              borderRadius: '100%',
                            }}
                          >
                            <Icon color="primary" />
                          </Box>
                        ) : null;
                      })()}
                      <Typography>{formatActionType(action.type)}</Typography>
                    </Stack>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Button
                      startIcon={<AddCircleOutline />}
                      onClick={() => handleAddAction(index)}
                      sx={{ textTransform: 'initial', whiteSpace: 'nowrap' }}
                    >{`Ajouter une ${
                      index === maxLength
                        ? 'dernière'
                        : getFrenchOrdinal(index + 1)
                    } action`}</Button>
                  </TableCell>
                )}
                <TableCell>
                  {action?.target ? (
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                      <Typography>{action?.target}</Typography>
                      <Chip
                        label="Intégré"
                        size="small"
                        color="success"
                        icon={<CheckCircleOutline />}
                        sx={{
                          borderRadius: '8px',
                          paddingX: 1,
                          color: (theme) => theme.palette.success.main,
                          bgcolor: (theme) =>
                            alpha(theme.palette.success.light, 0.4),
                        }}
                      />
                    </Stack>
                  ) : null}
                </TableCell>
                <TableCell align="right">
                  {action?.type ? (
                    <IconButton
                      size="small"
                      sx={{ color: '#757575' }}
                      onClick={() => {
                        console.log('actions', fields);
                        console.log('index', index);
                        handleRemoveAction(index);
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
