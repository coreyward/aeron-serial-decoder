import type { ConfigData, DecodedSerial } from './types';
import configData from '../config-data.json';

const config = configData as ConfigData;

/**
 * Extracts a code from the serial string by checking against valid values
 */
function extractCode(
  serial: string,
  validCodes: string[],
  startIndex: number
): { code: string; nextIndex: number } | null {
  // Sort by length descending to match longer codes first
  const sortedCodes = [...validCodes].sort((a, b) => b.length - a.length);

  for (const code of sortedCodes) {
    const substring = serial.substring(startIndex, startIndex + code.length);
    if (substring === code) {
      return { code, nextIndex: startIndex + code.length };
    }
  }

  return null;
}

export function decodeSerial(serial: string): DecodedSerial | null {
  if (!serial) return null;

  const upperSerial = serial.toUpperCase();
  let index = 0;

  try {
    // 1. Model code
    const modelResult = extractCode(upperSerial, Object.keys(config.modelCodes), index);
    if (!modelResult) return null;
    const model = {
      code: modelResult.code,
      description: config.modelCodes[modelResult.code]
    };
    index = modelResult.nextIndex;

    // 2. Size
    const sizeResult = extractCode(upperSerial, Object.keys(config.sizes), index);
    if (!sizeResult) return null;
    const size = {
      code: sizeResult.code,
      description: config.sizes[sizeResult.code]
    };
    index = sizeResult.nextIndex;

    // 3. Height adjustment (depends on size)
    const heightOptions = config.heightAdjustment[size.code];
    if (!heightOptions) return null;
    const heightResult = extractCode(upperSerial, Object.keys(heightOptions), index);
    if (!heightResult) return null;
    const heightAdjustment = {
      code: heightResult.code,
      description: heightOptions[heightResult.code]
    };
    index = heightResult.nextIndex;

    // 4. Tilt
    const tiltResult = extractCode(upperSerial, Object.keys(config.tilt), index);
    if (!tiltResult) return null;
    const tilt = {
      code: tiltResult.code,
      description: config.tilt[tiltResult.code]
    };
    index = tiltResult.nextIndex;

    // 5. Arms
    const armsResult = extractCode(upperSerial, Object.keys(config.arms), index);
    if (!armsResult) return null;
    const arms = {
      code: armsResult.code,
      description: config.arms[armsResult.code]
    };
    index = armsResult.nextIndex;

    // 6. Armpad upholstery
    const armpadUpholsteryResult = extractCode(upperSerial, Object.keys(config.armpadUpholstery), index);
    if (!armpadUpholsteryResult) return null;
    const armpadUpholstery = {
      code: armpadUpholsteryResult.code,
      description: config.armpadUpholstery[armpadUpholsteryResult.code]
    };
    index = armpadUpholsteryResult.nextIndex;

    // 7. Back support
    const backSupportResult = extractCode(upperSerial, Object.keys(config.backSupport), index);
    if (!backSupportResult) return null;
    const backSupport = {
      code: backSupportResult.code,
      description: config.backSupport[backSupportResult.code]
    };
    index = backSupportResult.nextIndex;

    // 8. Frame finish
    const frameFinishResult = extractCode(upperSerial, Object.keys(config.frameFinish), index);
    if (!frameFinishResult) return null;
    const frameFinish = {
      code: frameFinishResult.code,
      description: config.frameFinish[frameFinishResult.code]
    };
    index = frameFinishResult.nextIndex;

    // 9. Chassis finish
    const chassisFinishResult = extractCode(upperSerial, Object.keys(config.chassisFinish), index);
    if (!chassisFinishResult) return null;
    const chassisFinish = {
      code: chassisFinishResult.code,
      description: config.chassisFinish[chassisFinishResult.code]
    };
    index = chassisFinishResult.nextIndex;

    // 10. Base finish
    const baseFinishResult = extractCode(upperSerial, Object.keys(config.baseFinish), index);
    if (!baseFinishResult) return null;
    const baseFinish = {
      code: baseFinishResult.code,
      description: config.baseFinish[baseFinishResult.code]
    };
    index = baseFinishResult.nextIndex;

    // 11. Casters
    const castersResult = extractCode(upperSerial, Object.keys(config.casters), index);
    if (!castersResult) return null;
    const casters = {
      code: castersResult.code,
      description: config.casters[castersResult.code]
    };
    index = castersResult.nextIndex;

    // 12. Armpad finish (only if arms are present and not leather)
    let armpadFinish = { code: 'N/A', description: 'Not applicable' };
    if (arms.code !== 'N' && armpadUpholstery.code === 'W') {
      const armpadFinishResult = extractCode(upperSerial, Object.keys(config.armpadFinish), index);
      if (armpadFinishResult) {
        armpadFinish = {
          code: armpadFinishResult.code,
          description: config.armpadFinish[armpadFinishResult.code]
        };
        index = armpadFinishResult.nextIndex;
      }
    }

    // Remaining serial (likely date/batch codes)
    const remaining = upperSerial.substring(index);

    return {
      model,
      size,
      heightAdjustment,
      tilt,
      arms,
      armpadUpholstery,
      backSupport,
      frameFinish,
      chassisFinish,
      baseFinish,
      casters,
      armpadFinish,
      remaining: remaining || undefined
    };
  } catch (error) {
    console.error('Decoding error:', error);
    return null;
  }
}
