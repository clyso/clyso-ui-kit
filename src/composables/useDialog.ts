import { type Ref, ref } from 'vue';
import type { Dialog, DialogConfig } from '../types/dialog';

function* getDialogIdGenerator(): Generator<string, string> {
  let id = 1;

  while (true) {
    yield String(id);
    id++;
  }
}

const dialogIdGenerator = getDialogIdGenerator();

function generateId() {
  return dialogIdGenerator.next().value;
}

export function configureDialogs() {
  const dialogs = ref<Ref<Dialog>[]>([]);

  function createDialog(config: DialogConfig): Ref<Dialog> {
    const dialogRef = ref<Dialog>({
      id: generateId(),
      isShown: false,
      ...config,
    });

    setTimeout(() => {
      dialogRef.value.isShown = true;
    });

    dialogs.value.push(dialogRef);

    return dialogRef;
  }

  function removeDialog(id: string) {
    const index = dialogs.value.findIndex(
      (dialogRef) => dialogRef.value.id === id,
    );

    if (index === -1) {
      return;
    }

    dialogs.value.splice(index, 1);
  }

  return () => ({
    dialogs,
    createDialog,
    removeDialog,
  });
}

const useDialog = configureDialogs();

export default useDialog;
