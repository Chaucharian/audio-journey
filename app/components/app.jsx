import React, { useReducer, useEffect } from 'react';
import RecordingModal from './recordingModal';
import Modal from './modal';
import AudioRecorder from '../audioRecorder';

const state = {
    modalResponse: false,
    audioRecorder: false,
    showModal: false,
    currentStep: 'INITIAL',
    loading: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.payload
            }
        case 'SET_MODAL_RESPONSE':
            return {
                ...state,
                modalResponse: action.payload
            }
        case 'INSTANCE_AUDIO_RECORDER':
            return {
                ...state,
                audioRecorder: action.payload
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: action.payload
            }
        case 'CHANGE_STEP':
            return {
                ...state,
                currentStep: action.payload
            }
    }
}

const App = ({ game }) => {
    const [{ showModal, loading, modalResponse, audioRecorder, currentStep }, dispatch] = useReducer(reducer, state);

    const onModalHandler = action => {
        if (action === 'close') {
            modalResponse.resolve(action);
            dispatch({ type: "SHOW_MODAL", payload: false });
        } else if (action === 'startRecording') {
            audioRecorder.start();
        } else if (action === 'stopRecording') {
            audioRecorder.stop().then(({ audioUrl }) => {
                modalResponse.resolve(audioUrl);
                dispatch({ type: "SHOW_MODAL", payload: false });
                dispatch({ type: "CHANGE_STEP", payload: 'INITIAL' });
            });
        } else {
            modalResponse.resolve(action);
            dispatch({ type: "SHOW_MODAL", payload: false });
        }
    }

    const viewToRender = () => {
        let view = <></>
        if (!loading) {
            if (currentStep === 'TUTORIAL') {
                const content = 
                    <>
                        <p>Inclina tu celular hacia adelante, atras y los lados para desplazarte. Tocando la pantalla añades sonidos.</p>
                        <p>Enjoy :)</p>
                    </>;
                view = <Modal
                    canClose={true}
                    open={showModal}
                    title="Tutorial"
                    content={content}
                    onAction={onModalHandler}
                />;
            } else if (currentStep === 'MOBILE_NEEDED') {
                view = <Modal
                    open={showModal}
                    title="Esta experiencia esta diseñada para celulares"
                    content="Por favor abrela desde uno &#x1F4F1;"
                    onAction={onModalHandler}
                />;
            } else if (currentStep === 'BETTER_DEVICE_NEEDED_BARAT') {
                view = <Modal
                    open={showModal}
                    title="A tu dispositivo le falta papa!"
                    onAction={onModalHandler}
                />;
            } else if (currentStep === 'RECORD_AUDIO') {
                view = <RecordingModal
                    open={showModal}
                    title={"Manten presionado el microfono y graba una pista"}
                    onAction={onModalHandler}
                />
            }
        } else {
            view = <Modal
                open={showModal}
                title="LOADING..."
                onAction={onModalHandler}
            />
        }
        return view;
    }

    useEffect(() => {
        let gameSubscription = game.subscribe({
            next: ({ callback, action: { type, payload } }) => {
                console.log(type);
                dispatch({ type: "LOADING", payload: false });
                switch(type) {
                    case "TUTORIAL":{
                        dispatch({ type: "SHOW_MODAL", payload: true });
                        dispatch({ type: "CHANGE_STEP", payload: type });
                        callback(new Promise(resolve => {
                            const promiseResolver = { resolve: data => resolve(data) };
                            dispatch({ type: 'SET_MODAL_RESPONSE', payload: promiseResolver });
                        }));
                    }
                    break;
                    case "MOBILE_NEEDED":{
                        dispatch({ type: "SHOW_MODAL", payload: true });
                        dispatch({ type: "CHANGE_STEP", payload: type });
                    }
                    break;
                    case "RECORD_AUDIO": {
                        dispatch({ type: "SHOW_MODAL", payload: true });
                        dispatch({ type: "CHANGE_STEP", payload: type });
                        AudioRecorder().then(({ start, stop }) => {
                            dispatch({ type: 'INSTANCE_AUDIO_RECORDER', payload: { start, stop } });
                        });
                        callback(new Promise(resolve => {
                            const promiseResolver = { resolve: data => resolve(data) };
                            dispatch({ type: 'SET_MODAL_RESPONSE', payload: promiseResolver });
                        }));
                    }
                    break;
                    case "BETTER_DEVICE_NEEDED_BARAT": {
                        dispatch({ type: "CHANGE_STEP", payload: type });
                        dispatch({ type: "SHOW_MODAL", payload: true });
                    } 
                    break;
                    case "LOADING": {
                        dispatch({ type: "LOADING", payload: true });
                        dispatch({ type: "SHOW_MODAL", payload: true });
                    }
                    break;
                    case "PLAY": {
                        dispatch({ type: "CHANGE_STEP", payload: "PLAYING" });
                        dispatch({ type: "SHOW_MODAL", payload: false });
                    }
                    break;
                }
            }
        });
        return () => gameSubscription.unsubscribe();
    }, []);

    return (
        viewToRender()
    );
}

export default App;