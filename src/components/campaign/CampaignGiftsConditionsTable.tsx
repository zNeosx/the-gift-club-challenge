import { AddCircleOutline, Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Conditions, Gift } from '../../types';
import { useFormContext } from 'react-hook-form';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';

type Props = {
  gifts: Gift[];
  conditions: Conditions[];
  handleEditCondition: (index: number, condition: Conditions) => void;
  handleAddCondition: (giftId: string) => void;
  handleRemoveCondition: (index: number) => void;
};

const CampaignGiftsConditionsTable = ({
  gifts,
  conditions,
  handleEditCondition,
  handleAddCondition,
  handleRemoveCondition,
}: Props) => {
  const { watch } = useFormContext<CampaignFormData>();

  const conditionType = watch('configuration.conditionsType');

  const isConditionNone = conditionType === 'NONE';

  return (
    <Stack spacing={4}>
      <Stack spacing={1} sx={{ paddingLeft: { xs: 2, md: 4 } }}>
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
              .map((gift, index) => {
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
                    <TableCell>
                      {condition ? (
                        <Typography>{condition.name}</Typography>
                      ) : (
                        <Typography color="gray">Aucune</Typography>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        pointerEvents: isConditionNone ? 'none' : 'initial',
                        '& > .MuiButton-root': {
                          color: isConditionNone ? 'lightgray' : 'blue',
                        },
                      }}
                    >
                      {condition ? (
                        <Button
                          sx={{
                            textTransform: 'initial',
                            color: 'primary.main',
                            minWidth: 0,
                            padding: 0,
                          }}
                          startIcon={<EditIcon fontSize="small" />}
                          onClick={() => handleEditCondition(index, condition)}
                        >
                          Modifier
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            textTransform: 'initial',
                            color: 'primary.main',
                            minWidth: 0,
                            padding: 0,
                          }}
                          startIcon={<AddCircleOutline fontSize="small" />}
                          onClick={() => handleAddCondition(gift.id)}
                        >
                          Ajouter une condition
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {condition && (
                        <IconButton
                          size="small"
                          sx={{ color: '#757575' }}
                          onClick={() => handleRemoveCondition(index)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
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
