import { assignNativeAudioNodeOptions } from '../helpers/assign-native-audio-node-options';
import { cacheTestResult } from '../helpers/cache-test-result';
import { IAnalyserOptions } from '../interfaces';
import { testAnalyserNodeGetFloatTimeDomainDataMethodSupport } from '../support-testers/analyser-node-get-float-time-domain-data-method';
import { TNativeAnalyserNode, TUnpatchedAudioContext, TUnpatchedOfflineAudioContext } from '../types';
import { wrapAnalyserNodeGetFloatTimeDomainDataMethod } from '../wrappers/analyser-node-get-float-time-domain-data-method';

const isSupportingAnalyserNodeGetFloatTimeDomainDataMethod = (nativeAnalyserNode: TNativeAnalyserNode) => cacheTestResult(
    testAnalyserNodeGetFloatTimeDomainDataMethodSupport,
    () => testAnalyserNodeGetFloatTimeDomainDataMethodSupport(nativeAnalyserNode)
);

export const createNativeAnalyserNode = (
    nativeContext: TUnpatchedAudioContext | TUnpatchedOfflineAudioContext,
    options: Partial<IAnalyserOptions> = { }
): TNativeAnalyserNode => {
    const nativeNode = nativeContext.createAnalyser();

    assignNativeAudioNodeOptions(nativeNode, options);

    if (options.fftSize !== undefined) {
        nativeNode.fftSize = options.fftSize;
    }

    if (options.maxDecibels !== undefined) {
        nativeNode.maxDecibels = options.maxDecibels;
    }

    if (options.minDecibels !== undefined) {
        nativeNode.minDecibels = options.minDecibels;
    }

    if (options.smoothingTimeConstant !== undefined) {
        nativeNode.smoothingTimeConstant = options.smoothingTimeConstant;
    }

    // Bug #37: Only Edge and Safari create an AnalyserNode with the default properties.
    if (nativeNode.channelCount === 1) {
        nativeNode.channelCount = 2;
    }

    // Bug #36: Safari does not support getFloatTimeDomainData() yet.
    if (!isSupportingAnalyserNodeGetFloatTimeDomainDataMethod(nativeNode)) {
        wrapAnalyserNodeGetFloatTimeDomainDataMethod(nativeNode);
    }

    return nativeNode;
};