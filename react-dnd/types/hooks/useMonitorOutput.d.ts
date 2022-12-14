import { HandlerManager, MonitorEventEmitter } from '../types';
export declare function useMonitorOutput<Monitor extends HandlerManager, Collected>(monitor: Monitor & MonitorEventEmitter, collect: (monitor: Monitor) => Collected, onCollect?: () => void): Collected;
