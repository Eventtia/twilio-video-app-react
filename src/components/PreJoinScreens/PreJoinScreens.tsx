import React, { useState, useEffect, FormEvent } from 'react';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import RoomNameScreen from './RoomNameScreen/RoomNameScreen';
import { useAppState } from '../../state';
import { useParams } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import GuestForm from '../GuestForm/GuestForm';
import useQuery from '../../hooks/useQuery/useQuery';
import i18next from 'i18next';

export enum Steps {
  // roomNameStep,
  guestLoginStep,
  deviceSelectionStep,
}

export default function PreJoinScreens() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  // const { URLRoomName } = useParams<{ URLRoomName?: string }>();

  const { token: queryToken, locale } = useQuery();

  const [token, setToken] = useState(queryToken || '');
  const [step, setStep] = useState(queryToken ? Steps.deviceSelectionStep : Steps.guestLoginStep);

  // const [name, setName] = useState<string>(user?.displayName || '');
  // const [roomName, setRoomName] = useState<string>('');

  const [mediaError, setMediaError] = useState<Error>();

  const [hasBeenStarted, setHasBeenStarted] = useState(false);

  // const startCall = (token: string) => {
  //   if (token) {
  //     setHasBeenStarted(true);
  //     connect(token)
  //     .then((newRoom) => {
  //       if (newRoom) {
  //         const endDate = getEndDateFromToken(token);
  //         let disconnectOnEnd;
  //         disconnectOnEnd = setInterval(() => {
  //           const now = new Date();
  //           if (now > endDate) {
  //             clearInterval(disconnectOnEnd);
  //             newRoom.disconnect();
  //           }
  //         }, 1000);
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (URLRoomName) {
  //     setRoomName(URLRoomName);
  //     if (user?.displayName) {
  //       setStep(Steps.deviceSelectionStep);
  //     }
  //   }
  // }, [user, URLRoomName]);

  useEffect(() => {
    if (locale) i18next.changeLanguage(locale as string);
  }, [locale]);

  useEffect(() => {
    if (token) setStep(Steps.deviceSelectionStep);
  }, [token]);

  useEffect(() => {
    if (step === Steps.deviceSelectionStep && !mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, step, mediaError]);

  // never used
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
  //   // @ts-ignore
  //   if (!window.location.origin.includes('twil.io') && !window.STORYBOOK_ENV) {
  //     window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
  //   }
  //   setStep(Steps.deviceSelectionStep);
  // };

  return (
    <IntroContainer>
      <MediaErrorSnackbar error={mediaError} />
      {/* never used for eventtia */}
      {/* {step === Steps.roomNameStep && (
        <RoomNameScreen
          name={name}
          roomName={roomName}
          setName={setName}
          setRoomName={setRoomName}
          handleSubmit={handleSubmit}
        />
      )} */}

      {step === Steps.guestLoginStep && <GuestForm setToken={setToken} />}

      {step === Steps.deviceSelectionStep && <DeviceSelectionScreen token={token as string} />}
    </IntroContainer>
  );
}
