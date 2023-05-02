import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import Dialog from '../dialogs/NewPlaylistDialog';
import Playlist from '../../objects/Playlist';

const ICON = 'shuffle';

export default ({ fromList }: { fromList: Playlist | null }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <IconButton
        icon={ICON}
        onPress={() => setDialogOpen(true)}
        mode="contained"
        size={30}
        style={{ top: 10 }}
      />
      <Dialog
        visible={dialogOpen}
        fromList={fromList}
        onClose={() => setDialogOpen(false)}
        onSubmit={() => setDialogOpen(false)}
      />
    </React.Fragment>
  );
};
