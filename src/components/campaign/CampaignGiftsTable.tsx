import { AddCircleOutline, CalendarMonth, Delete } from '@mui/icons-material';
import { Button, IconButton, Stack, Switch, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { getFrenchOrdinal, translateGiftType } from '../../lib/utils';
import type { CampaignFormData } from '../../lib/validations/campaign.schema';
import type { Gift } from '../../types';

type Props = {
  handleAddGift: () => void;
  handleEditGift: (field: Gift, index: number) => void;
  handleRemoveGift: (index: number) => void;
  fields: CampaignFormData['configuration']['gifts'][number][];
};
const CampaignGiftsTable = ({
  handleAddGift,
  handleEditGift,
  handleRemoveGift,
  fields,
}: Props) => {
  const formatStock = (limit: number) => ({
    isUnlimited: limit === -1,
    displayValue: limit === -1 ? 'Illimité' : limit.toString(),
  });

  const formatDrawDate = (drawDate?: string) => {
    if (!drawDate) return null;

    return new Date(drawDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  return (
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
              Nom du Gain
            </TableCell>
            <TableCell sx={{ borderRight: 1, borderColor: 'lightgray' }}>
              Catégorie
            </TableCell>
            <TableCell>Nombre de stock</TableCell>
            <TableCell width={50}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((gift, index) => {
            const { isUnlimited, displayValue } = formatStock(gift.limit);
            const drawDateFormatted = formatDrawDate(gift.drawDate);

            return (
              <TableRow
                key={gift.id}
                sx={{
                  cursor: 'pointer',
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& > .MuiTableCell-root': {
                    borderBottom: '1px solid #e0e0e0',
                    padding: '12px 16px',
                    fontSize: '0.9rem',
                  },
                }}
                onDoubleClick={() => handleEditGift(gift, index)}
              >
                <TableCell>{gift.name}</TableCell>
                <TableCell>
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography component={'p'}>
                      {translateGiftType(gift.type)}
                    </Typography>
                    {gift.type === 'DRAW' && gift.drawDate ? (
                      <Stack
                        sx={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <CalendarMonth color="disabled" />
                        <Typography
                          component={'p'}
                          sx={{ color: 'lightgray', fontSize: '14px' }}
                        >
                          {`Jusqu'au ${drawDateFormatted}`}
                        </Typography>
                      </Stack>
                    ) : null}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      component={'p'}
                      sx={{
                        color: isUnlimited ? 'lightgray' : 'black',
                      }}
                    >
                      {displayValue}
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography
                        component={'p'}
                        sx={{
                          color: !isUnlimited ? 'lightgray' : 'black',
                        }}
                      >
                        Illimité
                      </Typography>
                      <Switch
                        disabled={!isUnlimited}
                        checked={isUnlimited}
                        onChange={(event) => {
                          const value = event.target.valueAsNumber;

                          if (value > 0) {
                            return false;
                          } else {
                            return true;
                          }
                        }}
                      />
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    sx={{ color: '#757575' }}
                    onClick={() => handleRemoveGift(index)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>
              <Button startIcon={<AddCircleOutline />} onClick={handleAddGift}>
                <Typography
                  variant="body2"
                  sx={{ textTransform: 'initial' }}
                  component={'p'}
                >
                  Ajouter un {getFrenchOrdinal(fields.length + 1)} Gain
                </Typography>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(CampaignGiftsTable);
