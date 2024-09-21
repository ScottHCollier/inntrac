import { Button } from '@/components/ui/button/button';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  open: boolean;
  close: () => void;
  handleConfirm: () => void;
}

export function ConfirmDialog({ open, close, handleConfirm }: Props) {
  return (
    <Dialog isOpen={open} onClose={close} title={'Confirm'}>
      <div>Would you like to repeat the schedule for next week?</div>
      <div>
        <Button onClick={close}>No</Button>
        <Button onClick={handleConfirm}>Yes</Button>
      </div>
    </Dialog>
  );
}
