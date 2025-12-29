import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

/* ================= TYPES ================= */

export interface DeviceInfo {
  fingerprint: string;
  deviceName: string;
  os: string;
  arch: string;
}

/* ================= HOOK ================= */

/**
 * Returns device info from Tauri
 * Stable per device (Rust generated)
 */
export const useDeviceFingerprint = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDeviceInfo = async () => {
      try {
        const result = await invoke<DeviceInfo>("get_device_info");

        if (!mounted) return;

        setDeviceInfo(result);
        setLoading(false);
      } catch (err) {
        if (!mounted) return;
        setError(err as Error);
        setLoading(false);
      }
    };

    loadDeviceInfo();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    deviceInfo,                 // full object
    fingerprint: deviceInfo?.fingerprint ?? "",
    loading,
    error,
  };
};
