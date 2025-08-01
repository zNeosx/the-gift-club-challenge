import { useModalStore } from '../../stores/modal.store';
import CampaignAdActionModal from './campaign/CampaignAddActionModal';
import ConditionModal from './campaign/ConditionsModal';
import ConfigurePinCodeModal from './campaign/ConfigurePinCodeModal';
import PinCodeModal from './campaign/PinCodeModal';
import QrCodeModal from './campaign/QrCodeModal';
import SaveCampaignModal from './campaign/SaveCampaignModal';
import AddGiftModal from './gift/AddGift.modal';
import EditGiftModal from './gift/EditGiftModal';

export default function ModalRoot() {
  const { currentModal } = useModalStore();

  if (!currentModal) return null;

  return (
    <>
      <PinCodeModal />
      <QrCodeModal />
      <SaveCampaignModal />
      <ConfigurePinCodeModal />
      <CampaignAdActionModal />
      <AddGiftModal />
      <EditGiftModal />
      <ConditionModal />
    </>
  );
}
