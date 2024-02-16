import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  close: () => void;
  handleConfirm: () => void;
}

export function ConfirmDialog({ open, close, handleConfirm }: Props) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
            Would you like to repeat the shift schedule for next week?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={close}>No</Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
