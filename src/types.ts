export interface ConfigData {
  modelCodes: Record<string, string>;
  sizes: Record<string, string>;
  heightAdjustment: Record<string, Record<string, string>>;
  tilt: Record<string, string>;
  arms: Record<string, string>;
  armpadUpholstery: Record<string, string>;
  backSupport: Record<string, string>;
  frameFinish: Record<string, string>;
  chassisFinish: Record<string, string>;
  baseFinish: Record<string, string>;
  casters: Record<string, string>;
  armpadFinish: Record<string, string>;
}

export interface DecodedSerial {
  model: { code: string; description: string };
  size: { code: string; description: string };
  heightAdjustment: { code: string; description: string };
  tilt: { code: string; description: string };
  arms: { code: string; description: string };
  armpadUpholstery: { code: string; description: string };
  backSupport: { code: string; description: string };
  frameFinish: { code: string; description: string };
  chassisFinish: { code: string; description: string };
  baseFinish: { code: string; description: string };
  casters: { code: string; description: string };
  armpadFinish: { code: string; description: string };
  remaining?: string;
}
