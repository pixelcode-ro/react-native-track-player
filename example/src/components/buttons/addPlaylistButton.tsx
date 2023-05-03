import React, { useImperativeHandle, useState } from 'react';
import { IconButton } from 'react-native-paper';
import Dialog from '../dialogs/NewPlaylistDialog';
import Playlist from '../../objects/Playlist';
import { View } from 'react-native';

const ICON = 'plus-circle-outline';

export default React.forwardRef(
  (
    {
      fromList,
    }: {
      fromList: Playlist | null;
    },
    ref
  ) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    useImperativeHandle(ref, () => ({ setOpen: () => setDialogOpen(true) }), [
      dialogOpen,
    ]);

    return (
      <React.Fragment>
        <IconButton
          icon={ICON}
          onPress={() => setDialogOpen(true)}
          size={30}
          style={{ position: 'absolute', right: 120 }}
        />
        <Dialog
          visible={dialogOpen}
          fromList={fromList}
          onClose={() => setDialogOpen(false)}
          onSubmit={() => setDialogOpen(false)}
        />
      </React.Fragment>
    );
  }
);
