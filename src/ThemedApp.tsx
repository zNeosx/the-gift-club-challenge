import App from './App.tsx';
import ModalRoot from './components/modals/ModalRoot.tsx';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCampaignStore } from './stores/campaign.store.ts';

export default function ThemedApp() {
  const { campaign } = useCampaignStore();

  const theme = createTheme({
    palette: {
      primary: {
        main: campaign?.configuration.colors.primary,
      },
      secondary: { main: campaign?.configuration.colors.secondary },
    },
    spacing: 8,
  });

  return (
    <ThemeProvider theme={theme}>
      <App />
      <ModalRoot />
    </ThemeProvider>
  );
}
