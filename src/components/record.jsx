import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import { FaMicrophone, FaPause } from 'react-icons/fa'

export default function Record() {
    const [isRecording, setIsRecording] = useState(false);
    let audioRecorder;
    let audioChunks = [];
    const playBtn = useRef();
    const startBtn = useRef();
    const stopBtn = useRef();
    const cancelBtn = useRef();
    const [doneRecord, setDoneRecord] = useState(false);
    const [audioLink, setAudioLink] = useState("");
    const [list, setList] = useState([])
    const saveBtn = useRef()


    useEffect(() => {


        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                audioRecorder = new MediaRecorder(stream);

                audioRecorder.addEventListener('dataavailable', (e) => {
                    audioChunks.push(e.data);
                })


                const recordingStart = () => {
                    audioChunks = [];
                    audioRecorder.start();
                }

                const recordingStop = () => {
                    audioRecorder.stop();
                    console.log("Audio recording is stopped!")
                }


                startBtn.current.addEventListener('click', () => {
                    setIsRecording(true);
                    setDoneRecord(false);

                    recordingStart();

                })

                stopBtn.current.addEventListener('click', () => {
                    setIsRecording(false)
                    setDoneRecord(true);
                    recordingStop();
                })

                const handlePlay = () => {
                    const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(blobObj);
                    const audio = new Audio(audioUrl);
                    setAudioLink(audioUrl);
                    audio.play();
                    console.log("Audio is playing!");
                }

                playBtn.current.addEventListener('click', () => {
                    handlePlay();
                })


                const cancelFunc = () => {
                    if (audioRecorder.state === 'recording') {
                        audioRecorder.stop(); 
                    }

                    audioChunks = [];
                    setDoneRecord(false);
                    setAudioLink('');
                    console.log('Cancelled!');
                };


                cancelBtn.current.addEventListener('click', () => {
                    cancelFunc()
                })

                const saveFunc = () => {
                    if(audioLink){
                        list.push(audioLink)
                    }else{
                        alert("Record something first!")
                    }
                }

                saveBtn.current.addEventListener('click', () => {
                    saveFunc();
                })

            }).catch(error => {
                console.log(error)
            })

    }, [])

    useEffect(() => {
        console.log(list)
    }, [list])

    return (
        <div className='record-parent'>
            <div className='record-div'>
                <button className='record-button'>{isRecording ? (
                    <FaPause />
                ) : (
                    <FaMicrophone />
                )}</button>
                {isRecording ? (
                    <h4>Recording...</h4>
                ) : <h4>Start Recording</h4>}
                <br />
                <div>
                    <button className='start-btn' ref={startBtn}>Start Recording</button>
                    <button className='stop-btn' ref={stopBtn}>Stop Recording</button>
                </div>
                <section>

                </section>
                <div className='audioBox'>
                    {doneRecord && audioLink ? (
                        <audio src={audioLink} controls={true} />
                    ) : ""}
                </div>
                <br />
                <div>
                    <a className='play-btn' ref={playBtn}>Play</a>
                    <a className='save-btn' download={doneRecord && audioLink ? true : false} href={audioLink} ref={saveBtn}>Save</a>
                    <a className='cancel-btn' ref={cancelBtn}>Cancel</a>
                </div>
            </div>
        </div>
    )
}
