import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import EditableTextfield from '../containers/EditableTextfield';
import InfoCard from '../containers/InfoCard';
import {Sets} from '../../types';
import {putToBackend, retrieveClientEvent} from '../../server/apiCalls';
import {useGlobalState} from '../../state/initialState';

interface Props {
  set: Sets;
}

const EditSetNotes = ({set}: Props) => {
  const [notes, setNotes] = useState(set.notesFromClient);
  const [loading, setLoading] = useState(false);
  const {user, clientEvent, setClientEvent} = useGlobalState();
  const handleSaveNotes = async () => {
    setLoading(true);
    try {
      if (!clientEvent || !user.data) {
        return;
      }
      const endpoint = `/api/sets/${set.id}`;
      const data = JSON.stringify({data: {notesFromClient: notes}});
      const res = await putToBackend(endpoint, user.data.jwt, data);
      if (!res.ok) {
        throw new Error(`Update notes failed with status: ${res.status}`);
      }
      retrieveClientEvent(user.data, setClientEvent);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView>
      <InfoCard
        label={`Notes for ${set.name}`}
        loading={loading}
        input={
          <EditableTextfield
            value={notes}
            onChangeText={text => {
              setNotes(text);
            }}
            save={handleSaveNotes}
            placeholder="Here you can add notes for the band, be a specific as you like."
            multiline
          />
        }
      />
    </SafeAreaView>
  );
};

export default EditSetNotes;
