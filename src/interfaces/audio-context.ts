import { IAnalyserNode } from './analyser-node';
import { IAudioNode } from './audio-node';
import { IBaseAudioContext } from './base-audio-context';
import { IMinimalAudioContext } from './minimal-audio-context';
import { IOscillatorNode } from './oscillator-node';

export interface IAudioContext extends IBaseAudioContext, IMinimalAudioContext {

    // @todo This should move into the IBaseAudioContext interface.
    createAnalyser (): IAnalyserNode;

    // @todo This should move into the IBaseAudioContext interface.
    createChannelMerger (numberOfInputs?: number): IAudioNode;

    // @todo This should move into the IBaseAudioContext interface.
    createChannelSplitter (numberOfOutputs?: number): IAudioNode;

    // @todo This should move into the IBaseAudioContext interface.
    createOscillator (): IOscillatorNode;

}
