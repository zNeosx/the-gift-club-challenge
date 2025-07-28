import { Clear, FileUpload as FileUploadIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { convertToBase64 } from '../../lib/utils';

type Props = {
  accept?: string;
  name: string;
};
const FileUpload = ({ name, accept = 'image/*' }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const { control } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({ name, control });

  const [preview, setPreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (value) {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.type.startsWith('image/')) {
      const base64 = await convertToBase64(file);
      setPreview(base64);
      onChange(base64);
    } else {
      alert('Veuillez uploader un fichier image.');
    }
  };

  return (
    <Stack spacing={2}>
      <div style={{ position: 'relative' }}>
        <div
          role="button"
          className="drop-zone"
          style={{
            border: isFocused ? '2px dashed blue' : '2px dashed lightgray',
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();

            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleDrop}
          onClick={() => {
            if (inputFileRef.current) {
              inputFileRef.current.click();
            }
          }}
          data-dragging={isDragging || undefined}
        >
          <input
            type="file"
            accept={accept}
            className="sr-only"
            aria-label="Upload file"
            ref={inputFileRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {preview ? (
            <div
              className="inset-0"
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          ) : (
            <Stack
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 1,
                  bgcolor: 'lightgray',
                  borderRadius: '100%',
                }}
              >
                <FileUploadIcon sx={{ fill: 'white' }} />
              </Box>
              <Button
                variant="contained"
                sx={{ boxShadow: 'none' }}
                onClick={() => {
                  if (inputFileRef.current) {
                    inputFileRef.current.click();
                  }
                }}
              >
                <Typography sx={{ fontSize: '14px' }}>
                  Sélectionnez un fichier
                </Typography>
              </Button>
            </Stack>
          )}
        </div>
        {preview && (
          <Box sx={{ position: 'absolute', top: '16px', right: '16px' }}>
            <IconButton
              aria-label="Remove image"
              onClick={() => {
                setPreview(null);
                onChange('');
                if (inputFileRef.current) {
                  inputFileRef.current.value = '';
                }
              }}
            >
              <Clear />
            </IconButton>
          </Box>
        )}
      </div>
    </Stack>
  );
};

export default FileUpload;
