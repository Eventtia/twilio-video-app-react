import React, { useState, useRef, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Stop from '@material-ui/icons/Stop';

const AUDIO_URL =
  'https://s3.amazonaws.com/eventtia/event_files/83598/original/mixkit-sleepy-cat-135_1_mp3cut.net.mp3?1629304240';

export default function TestAudioButton(props: { className?: string }) {
  const [isPlaying, togglePlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      togglePlaying(false);
      audioRef.current?.pause();
    } else {
      togglePlaying(true);
      audioRef.current?.play();
    }
  };

  useEffect(() => {
    const reset = () => togglePlaying(false);
    audioRef.current?.addEventListener('ended', reset);
    return () => {
      audioRef.current?.removeEventListener('ended', reset);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={AUDIO_URL} />
      <Button className={props.className} onClick={toggleAudio} startIcon={isPlaying ? <Stop /> : <PlayCircleFilled />}>
        {isPlaying ? 'Stop' : 'Test audio output'}
      </Button>
    </>
  );
}
